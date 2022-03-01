import email
from unittest import result
from flask import Flask, jsonify, render_template, request, flash, redirect, url_for, session
import os
import uuid
from datetime import datetime
from flask_mysqldb import MySQL
import MySQLdb
from facebook import GraphAPI
import json

#access_token = os.getenv('fb_token')
page_post= '113136957951816'

#graph = GraphAPI(access_token=access_token)

UPLOAD_FOLDER = 'static/images'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = "ola_ke_ase"
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'encuentrame'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'encuentraMe'
app.secret_key = 'secret_key'
mysql = MySQL(app)

usersDatab = {
    "andy@gmail.com": ["post01", "post02", "post03"],
    "ayrton@gmail.com": ["post04", "post05", "post06"],
    "ronald@gmail.com": ["post07", "post08", "post09"]
}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/lost_pet', methods=['GET', 'POST'])
def form_lost_pet():
    if request.method == 'GET':
        session['email'] = "andy@gmail.com"
        user = "andy@gmail.com"
        if session['email'] in usersDatab:
            return render_template('form_lost_pet.html')
        else:
            return render_template('modal.html')
    if request.method == 'POST':
        post= "lost" + str(uupostuupost())
        created_at = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
        mascota = request.form['mascota']
        nombre = request.form['nombre']
        fecha = request.form['fecha']
        hora = request.form['hora']
        calle_1 = request.form['calle_1']
        calle_2 = request.form['calle_2']
        barrio = request.form['barrio']
        cursor = mysql.connection.cursor()
        # check if the post request has the file part
        if 'foto' not in request.files:
            flash('Debe subir una imagen')
            return redirect(request.url)
        file = request.files['foto']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('Ninguna imagen seleccionada')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            file.filename = str(uupostuupost()) + '.' + file.filename.rsplit('.', 1)[1].lower()
            filename = file.filename
            file.save(os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename))
        else:
            flash('Formatos soportados: jpg, jpeg, png.')
            return redirect(request.url)
        cursor.execute('INSERT INTO lost_pets VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                       (id, created_at, mascota, nombre, fecha, hora, calle_1, calle_2, barrio, file.filename))
        mysql.connection.commit()
        cursor.close()
        fecha_l = fecha.split('-')
        fecha = fecha_l[2] + '/' + fecha_l[1] + '/' + fecha_l[0]
        message = "¡Se busca a " + nombre + "! Perdpost/a desde el día " + fecha +\
            " última vez visto en las inmediaciones de " + calle_1 + " y " + calle_2 + " barrio " +\
                barrio + " a las " + hora + " horas. Si lo viste por favor comunícate con Usuario."
        #graph.put_photo(image=open(os.path.join(UPLOAD_FOLDER, file.filename), "rb"), message=message, album_path=page_post+ '/photos')
        return redirect('/' + id)


@app.route('/found_pet', methods=['GET', 'POST'])
def form_found_pet():
    if request.method == 'GET':
        return render_template('form_found_pet.html')
    if request.method == 'POST':
        post= "found" + str(uupostuupost())
        created_at = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
        mascota = request.form['mascota']
        fecha = request.form['fecha']
        hora = request.form['hora']
        calle_1 = request.form['calle_1']
        calle_2 = request.form['calle_2']
        barrio = request.form['barrio']
        cursor = mysql.connection.cursor()
        # check if the post request has the file part
        if 'foto' not in request.files:
            flash('Debe subir una imagen')
            return redirect(request.url)
        file = request.files['foto']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('Ninguna imagen seleccionada')
            return redirect(request.url)
        file.filename = str(uupostuupost()) + '.' + file.filename.split('.')[1]
        if file and allowed_file(file.filename):
            filename = file.filename
            file.save(os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename))
        else:
            flash('Archivo no permitpost')
            return redirect(request.url)
        cursor.execute('INSERT INTO found_pets VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)',
                       (id, created_at, mascota, fecha, hora, calle_1, calle_2, barrio, file.filename))
        mysql.connection.commit()
        cursor.close()
        fecha_l = fecha.split('-')
        fecha = fecha_l[2] + '/' + fecha_l[1] + '/' + fecha_l[0]
        message = "¡Se encontró! Perdpost/a desde el día " + fecha +\
            " última vez visto en las inmediaciones de " + calle_1 + " y " + calle_2 + " barrio " +\
                barrio + " a las " + hora + " horas. Si lo viste por favor comunícate con Usuario."
        #graph.put_photo(image=open(os.path.join(UPLOAD_FOLDER, file.filename), "rb"), message=message, album_path=page_post+ '/photos')
        return redirect('/' + id)


@app.route('/api/all_posts')
def get_all_posts():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM lost_pets')
    lost = list(cursor.fetchall())
    cursor.execute('SELECT * FROM found_pets')
    found = list(cursor.fetchall())
    cursor.close()
    return jsonify({"lost": lost, "found": found})


@app.route('/landing')
def landing():
    return render_template('index2.html')

@app.route('/<user>')
def userprofile(user):
    token = "EAAXNS024VDEBALjHYCQrZBZAXpZBCEJYZCyGMVYZB0GvHNZBqvmc1CZA6KRMEIruMZBI6ict3UZAOhRYncCdPI9FKuNCNFfjxXwaKZCNT7F5ABL9jM6lfQ7a3NsbzQPqDstIUeE6X6Jnv3rXMqMnt0msHm5wvyCkycBEUAb3n8O2KLu9ekKTZBOqk8pU5LQ7CXcJZCUZD"
    graph = GraphAPI(token)
    profile = graph.get_object('me',fields='name,email')
    print(json.dumps(profile, indent=4))
    if user in usersDatab:
        return render_template('user.html', result=usersDatab, username=user)
    else:
        return "Invalid user"


# @app.route('/landing')
# def landing():
#     cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
#     cursor.execute('SELECT * FROM lost_pets')
#     articulos_lost = list(cursor.fetchall())
#     cursor.execute('SELECT * FROM found_pets')
#     articulos_found = list(cursor.fetchall())
#     for elem_lost in articulos_lost:
#         elem_lost['foto'] = os.path.join(UPLOAD_FOLDER, elem_lost['foto'])
#         elem_lost['fecha'] = elem_lost['fecha'].strftime('%d/%m/%y')
#     for elem_found in articulos_found:
#         elem_found['foto'] = os.path.join(UPLOAD_FOLDER, elem_found['foto'])
#         elem_found['fecha'] = elem_found['fecha'].strftime('%d/%m/%y')
#     cursor.close()
#     return render_template('index.html', articulos_lost=articulos_lost, articulos_found=articulos_found)


@app.route('/<id>')
def get_post(id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if "lost" in id:
        cursor.execute("SELECT * FROM lost_pets WHERE post%s", [id])
    else:
        cursor.execute("SELECT * FROM found_pets WHERE post%s", [id])
    articulos = list(cursor.fetchall())
    for elem in articulos:
        elem['foto'] = os.path.join(UPLOAD_FOLDER, elem['foto'])
        elem['fecha'] = elem['fecha'].strftime('%d/%m/%y')
    cursor.close()
    return render_template('post_by_posthtml', articulos=articulos)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
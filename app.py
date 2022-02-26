from flask import Flask, render_template, request, flash, redirect, url_for
import os
import uuid
from datetime import datetime
from flask_mysqldb import MySQL
import MySQLdb
from facebook import GraphAPI

#access_token = os.getenv('fb_token')
page_id = '113136957951816'

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

mysql = MySQL(app)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/lost_pet', methods=['GET', 'POST'])
def form_lost_pet():
    if request.method == 'GET':
        return render_template('form_lost_pet.html')
    if request.method == 'POST':
        id = uuid.uuid4()
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
        file.filename = str(uuid.uuid4()) + '.' + file.filename.split('.')[1]
        if file and allowed_file(file.filename):
            filename = file.filename
            file.save(os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename))
        else:
            return redirect(request.url)
        cursor.execute('INSERT INTO lost_pets VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                       (id, created_at, mascota, nombre, fecha, hora, calle_1, calle_2, barrio, file.filename))
        mysql.connection.commit()
        cursor.close()
        fecha_l = fecha.split('-')
        fecha = fecha_l[2] + '/' + fecha_l[1] + '/' + fecha_l[0]
        message = "¡Se busca a " + nombre + "! Perdido/a desde el día " + fecha +\
            " última vez visto en las inmediaciones de " + calle_1 + " y " + calle_2 + " barrio " +\
                barrio + " a las " + hora + " horas. Si lo viste por favor comunícate con Usuario."
        #graph.put_photo(image=open(os.path.join(UPLOAD_FOLDER, file.filename), "rb"), message=message, album_path=page_id + '/photos')
        return redirect(url_for('landing'))


@app.route('/landing')
def landing():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM lost_pets')
    articulos = cursor.fetchall()
    for elem in articulos:
        elem['foto'] = os.path.join(UPLOAD_FOLDER, elem['foto'])
        elem['fecha'] = elem['fecha'].strftime('%d/%m/%y')
    cursor.close()
    return render_template('index.html', articulos=articulos)


@app.route('/<id>')
def get_post(id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM lost_pets WHERE id=%s", [id])
    articulos = cursor.fetchall()
    for elem in articulos:
        elem['foto'] = os.path.join(UPLOAD_FOLDER, elem['foto'])
        elem['fecha'] = elem['fecha'].strftime('%d/%m/%y')
    cursor.close()
    return render_template('post_by_id.html', articulos=articulos)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
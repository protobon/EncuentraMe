from flask import Flask, render_template, request, flash, redirect
from werkzeug.utils import secure_filename
from PIL import Image
import os
import uuid
from flask_mysqldb import MySQL
import MySQLdb

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
        titulo = request.form['titulo']
        descripcion = request.form['descripcion']
        contacto = request.form['contacto']
        cursor = mysql.connection.cursor()
        # check if the post request has the file part
        if 'image' not in request.files:
            flash('Debe subir una imagen')
            return redirect(request.url)
        file = request.files['image']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('Ninguna imagen seleccionada')
            return redirect(request.url)
        file.filename = str(uuid.uuid4()) + '.' + file.filename.split('.')[1]
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename))
        else:
            return redirect(request.url)
        cursor.execute('INSERT INTO lost_pets VALUES (%s, %s, %s, %s, %s)',
                       (uuid.uuid4(), titulo, descripcion, contacto, file.filename))
        mysql.connection.commit()
        cursor.close()
        return redirect(request.url)


@app.route('/landing')
def landing():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM lost_pets')
    articulos = cursor.fetchall()
    for elem in articulos:
        elem['img_id'] = os.path.join(UPLOAD_FOLDER, elem['img_id'])
    cursor.close()
    return render_template('index.html', articulos=articulos)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
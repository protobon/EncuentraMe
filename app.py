from cmath import log
from flask import Flask, jsonify, render_template, request, flash, redirect
from flask_cors import CORS
import os
import uuid
from datetime import datetime, timedelta
from flask_mysqldb import MySQL
import MySQLdb
import logging

access_token = os.getenv('fb_token')

UPLOAD_FOLDER = 'static/images'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'jfif'}
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "0.0.0.0"}})
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = "ola_ke_ase"
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'encuentrame'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'encuentraMe'
app.url_map.strict_slashes = False

mysql = MySQL(app)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def logfile(traceback):
    with open("traceback.txt", 'a') as f:
        send = "-------" + datetime.utcnow().strftime("%m/%d/%Y, %H:%M:%S") +\
               "-------\n" + traceback + "\n"
        f.write(send)
        f.close()
    return False

def date_format(fecha):
    fecha_l = fecha.split('-')
    fecha = fecha_l[2] + '/' + fecha_l[1] + '/' + fecha_l[0]
    return fecha

@app.route('/')
def landing():
    """Landing page"""
    return render_template('index.html')

@app.route('/<user_id>/lost_pet', methods=['GET', 'POST'])
def form_lost_pet(user_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM users WHERE id=%s", [user_id])
    user = list(cursor.fetchall())[0]
    if not user:
        flash("Asegúrate de ingresar con tu usuario")
        return redirect("/")
    if request.method == 'GET':
        return render_template('form_lost_pet.html', user_id=user_id)
    if request.method == 'POST':
        id = "lost" + str(uuid.uuid4())
        estado = "active"
        created_at = datetime.utcnow() - timedelta(hours=3)
        mascota = request.form['mascota']
        nombre = request.form['nombre']
        fecha = date_format(request.form['fecha'])
        hora = request.form['hora']
        calle_1 = request.form['calle_1']
        calle_2 = request.form['calle_2']
        barrio = request.form['barrio']
        file = request.files['foto']
        latitude = request.form['latitude']
        longitude = request.form['longitude']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('Debe subir una foto')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            file.filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
            filename = file.filename
            file.save(os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename))
        else:
            flash('Formatos de imagen soportados: jpg, jpeg, png, jfif.')
            return redirect(request.url)
        try:
            cursor.execute('INSERT INTO lost_pets VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                           (id, user_id, user['name'], estado, created_at, mascota, nombre, fecha, hora, calle_1, calle_2, barrio, file.filename, latitude, longitude))
        except Exception as e:
            flash('Ha ocurrido un error, asegúrese de ingresar los datos correctamente')
            logfile("form_lost_pet(user_id) - in cursor.execute(INSERT INTO lost_pets):\n" + str(e))
            return redirect(request.url)
        mysql.connection.commit()
        cursor.close()
        return redirect('/')


@app.route('/<user_id>/found_pet', methods=['GET', 'POST'])
def form_found_pet(user_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM users WHERE id=%s", [user_id])
    user = list(cursor.fetchall())[0]
    if not user:
        flash("Asegúrate de ingresar con tu usuario")
        return redirect("/")
    if request.method == 'GET':
        return render_template('form_found_pet.html', user_id=user_id)
    if request.method == 'POST':
        id = "found" + str(uuid.uuid4())
        estado = "active"
        created_at = datetime.utcnow() - timedelta(hours=3)
        mascota = request.form['mascota']
        fecha = request.form['fecha']
        hora = request.form['hora']
        calle_1 = request.form['calle_1']
        calle_2 = request.form['calle_2']
        barrio = request.form['barrio']
        file = request.files['foto']
        latitude = request.form['latitude']
        longitude = request.form['longitude']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('Debe subir una foto')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            file.filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
            filename = file.filename
            file.save(os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename))
        else:
            flash('Formatos de imagen soportados: jpg, jpeg, png, jfif.')
            return redirect(request.url)
        try:
            cursor.execute('INSERT INTO found_pets VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                        (id, user_id, user["name"], estado, created_at, mascota, fecha, hora, calle_1, calle_2, barrio, file.filename, latitude, longitude))
        except Exception as e:
            logfile("form_found_pet(user_id) - in cursor.execute(INSERT INTO found_pets):\n" + str(e))
            return redirect(request.url)
        mysql.connection.commit()
        cursor.close()
        return redirect('/')


@app.route('/<id>')
def show_single_post(id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if "lost" in id:
        cursor.execute("SELECT * FROM lost_pets WHERE id=%s", [id])
    else:
        cursor.execute("SELECT * FROM found_pets WHERE id=%s", [id])
    try:
        result = list(cursor.fetchall())
        if len(result) >= 1:
            post = result[0]
    except Exception as e:
        flash("Publicación no encontrada")
        logfile("show_single_post(id) - in post = list(cursor.fetchall())[0]:\n" + str(e))
        cursor.close()
        return redirect('/')
    post['foto'] = os.path.join(UPLOAD_FOLDER, post['foto'])
    cursor.execute("SELECT name FROM users WHERE id=%s", [post['user_id']])
    try:
        result = list(cursor.fetchall())
        if len(result) >= 1:
            user = result[0]
    except Exception as e:
        logfile("show_single_post(id) - in user = list(cursor.fetchall())[0]:\n" + str(e))
    cursor.close()
    return render_template('post_by_id.html', post=post, user=user)


@app.route('/main_map')
def new_map():
    return render_template('main_map.html')    


@app.route('/profile/<user_id>')
def user_profile(user_id):
    """Render user profile with all owner's posts"""
    return render_template('profile.html')


# RESTful APIs
@app.route('/api/posts/')
def api_posts():
    """Retrieve all posts from database and return in JSON format"""
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM lost_pets WHERE estado = 'active' ORDER BY created_at DESC")
    lost = list(cursor.fetchall())
    cursor.execute("SELECT * FROM found_pets WHERE estado = 'active' ORDER BY created_at DESC")
    found = list(cursor.fetchall())
    cursor.close()
    for post in lost:
        del post["estado"]
        del post["user_id"]
    for post in found:
        del post["estado"]
        del post["user_id"]
    return jsonify({"lost": lost, "found": found})


@app.route('/api/users/', methods=['GET', 'POST'])
def api_users():
    if request.method == 'GET':
        """Retrieve all users from database and return in JSON format"""
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT name, email FROM users')
        users = list(cursor.fetchall())
        cursor.close()
        return jsonify(users)
    else:
        """Stores new user into database"""
        cursor = mysql.connection.cursor()
        content_type = request.headers.get('Content-Type')
        if (content_type != 'application/json'):
            return (jsonify("Not a JSON"), 400)
        user = request.get_json()
        try:
            cursor.execute('INSERT INTO users VALUES (%s, %s, %s)', (user['id'], user['name'], user['email']))
        except Exception as e:
            pass
        mysql.connection.commit()
        cursor.close()
        return jsonify(user)


@app.route('/api/users/<user_id>/posts')
def api_user_posts(user_id):
    """Retrieve all posts from user by user_id and return in JSON format"""
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM lost_pets WHERE user_id=%s AND estado=%s', [user_id, "active"])
    lost = list(cursor.fetchall())
    cursor.execute('SELECT * FROM found_pets WHERE user_id=%s AND estado=%s', [user_id, "active"])
    found = list(cursor.fetchall())
    cursor.close()
    for post in lost:
        del post["estado"]
        del post["user_id"]
    for post in found:
        del post["estado"]
        del post["user_id"]
    return jsonify({"lost": lost, "found": found})


@app.route('/api/posts/<id>', methods=['GET', 'PUT', 'DELETE'])
def api_post_by_id(id):
    """All user CRUD operations for one single post by ID"""
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if "lost" in id:
        cursor.execute("SELECT * FROM lost_pets WHERE id=%s", [id])
    else:
        cursor.execute("SELECT * FROM found_pets WHERE id=%s", [id])
    try:
        post = list(cursor.fetchall())[0]
        del post["estado"]
        del post["user_id"]
    except Exception as e:
        logfile("api_post_by_id(id) - in post = list(cursor.fetchall())[0]:\n" + str(e))
        cursor.close()
        return redirect('/')
    if request.method == 'GET':
        cursor.close()
        return jsonify(post)
    if request.method == 'PUT':
        if "lost" in id:
            cursor.execute("UPDATE lost_pets SET estado = 'completed' WHERE id=%s", [id])
        else:
            cursor.execute("UPDATE found_pets SET estado = 'completed' WHERE id=%s", [id])
        mysql.connection.commit()
        cursor.close()
        return jsonify('¡Felicidades! Nos alegra mucho que hayas encontrado a tu mascota :D')
    if request.method == 'DELETE':
        if "lost" in id:
            cursor.execute("UPDATE lost_pets SET estado = 'removed' WHERE id=%s", [id])
        else:
            cursor.execute("UPDATE found_pets SET estado = 'removed' WHERE id=%s", [id])
        mysql.connection.commit()
        cursor.close()
        return jsonify('Publicación eliminada correctamente')


if __name__ == "__main__":
    app.run(host="0.0.0.0")
else:
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)

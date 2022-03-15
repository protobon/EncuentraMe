from flask import Flask, jsonify, render_template, request, flash, redirect
from flask_cors import CORS
import os
import uuid
from datetime import datetime, timedelta
from flask_mysqldb import MySQL
import MySQLdb
import logging


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
        send = "-------" + (datetime.utcnow() - timedelta(hours=3)).strftime("%m/%d/%Y, %H:%M:%S") +\
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
    user = list(cursor.fetchall())
    if not user:
        flash("Asegúrate de ingresar con tu usuario", "info")
        return redirect("/")
    user = user[0]
    if user['estado'] == 'blocked':
        flash('No tienes permisos para realizar una publicación', "error")
        return redirect('/')
    if request.method == 'GET':
        if user['estado'] == 'blocked':
            flash('No tienes permisos para publicar', "error")
            return redirect('/')
        return render_template('form_lost_pet.html', user_id=user_id)
    if request.method == 'POST':
        tel = ''
        if request.form['telefono']:
            tel = request.form['telefono']
            if not user['phone']:
                cursor.execute("UPDATE users SET phone=%s WHERE id=%s", [request.form['telefono'], user_id])
        id = "lost" + str(uuid.uuid4())
        estado = "active"
        created_at = datetime.utcnow()
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
            flash('Debe subir una foto', "info")
            return redirect(request.url)
        if file and allowed_file(file.filename):
            file.filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
            filename = file.filename
            file.save(os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename))
        else:
            flash('Formatos de imagen soportados: jpg, jpeg, png, jfif.', "info")
            return redirect(request.url)
        try:
            cursor.execute('INSERT INTO lost_pets VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                           (id, user_id, user['name'], tel, estado, created_at, mascota, nombre, fecha, hora, calle_1, calle_2, barrio, file.filename, latitude, longitude))
        except Exception as e:
            flash('Ha ocurrido un error, asegúrese de ingresar los datos correctamente', "error")
            logfile("form_lost_pet(user_id) - in cursor.execute(INSERT INTO lost_pets):\n" + str(e))
            return redirect(request.url)
        mysql.connection.commit()
        cursor.close()
        return redirect('/')


@app.route('/<user_id>/found_pet', methods=['GET', 'POST'])
def form_found_pet(user_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM users WHERE id=%s", [user_id])
    user = list(cursor.fetchall())
    if not user:
        flash("Asegúrate de ingresar con tu usuario", "info")
        return redirect("/")
    user = user[0]
    if user['estado'] == 'blocked':
        flash('No tienes permisos para realizar una publicación', "error")
        return redirect('/')
    if request.method == 'GET':
        if user['estado'] == 'blocked':
            flash('No tienes permisos para publicar', "error")
            return redirect('/')
        return render_template('form_found_pet.html', user_id=user_id)
    if request.method == 'POST':
        tel = ''
        if request.form['telefono']:
            tel = request.form['telefono']
            if not user['phone']:
                cursor.execute("UPDATE users SET phone=%s WHERE id=%s", [request.form['telefono'], user_id])
        id = "found" + str(uuid.uuid4())
        estado = "active"
        created_at = datetime.utcnow()
        mascota = request.form['mascota']
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
            flash('Debe subir una foto', "info")
            return redirect(request.url)
        if file and allowed_file(file.filename):
            file.filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
            filename = file.filename
            file.save(os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename))
        else:
            flash('Formatos de imagen soportados: jpg, jpeg, png, jfif.', "info")
            return redirect(request.url)
        try:
            cursor.execute('INSERT INTO found_pets VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                        (id, user_id, user["name"], tel, estado, created_at, mascota, fecha, hora, calle_1, calle_2, barrio, file.filename, latitude, longitude))
        except Exception as e:
            flash('Ha ocurrido un error, asegúrese de ingresar los datos correctamente', "error")
            logfile("form_found_pet(user_id) - in cursor.execute(INSERT INTO found_pets):\n" + str(e))
            return redirect(request.url)
        mysql.connection.commit()
        cursor.close()
        return redirect('/')


@app.route('/<user_id>/report/<post_id>', methods=['GET', 'POST'])
def form_report(user_id, post_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT estado FROM users WHERE id=%s', [user_id])
    user = list(cursor.fetchall())[0]
    if user['estado'] == 'blocked':
        flash('No tienes permisos para denunciar una publicación', "error")
        return redirect('/')
    if request.method == 'GET':
        return render_template('form_report.html', user_id=user_id, post_id=post_id)
    if request.method == 'POST':
        if "lost" in post_id:
            cursor.execute("UPDATE lost_pets SET estado = 'reported' WHERE id=%s", [post_id])
            cursor.execute('SELECT user_id FROM lost_pets WHERE id=%s', [post_id])
        else:
            cursor.execute("UPDATE found_pets SET estado = 'reported' WHERE id=%s", [post_id])
            cursor.execute('SELECT user_id FROM found_pets WHERE id=%s', [post_id])
        try:
            reported_user_id = list(cursor.fetchall())[0]['user_id']
        except Exception as e:
            logfile("form_report(user_id, post_id) - in reported_user = list(cursor.fetchall())[0]:\n" + str(e))
            flash("No es posible acceder a esta publicación", "info")
            return redirect('/')
        cursor.execute("SELECT name FROM users WHERE id=%s", [user_id])
        sender_username = list(cursor.fetchall())[0]['name']
        reporte = request.form['reporte']
        created_at = datetime.utcnow() - timedelta(hours=3)
        try:
            cursor.execute('INSERT INTO reports VALUES (%s, %s, %s, %s, %s, %s)',
                            (created_at, user_id, sender_username, reporte, post_id, reported_user_id))
        except Exception as e:
            logfile("form_report(user_id, post_id) - in cursor.execute(INSERT INTO reports):\n" + str(e))
        mysql.connection.commit()
        cursor.close()
        flash('Gracias por denunciar esta publicación, la revisaremos lo antes posible.', "success")
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
        if not result:
            return redirect('/')
        post = result[0]
    except Exception as e:
        flash("Publicación no encontrada", "info")
        logfile("show_single_post(id) - in post = list(cursor.fetchone())[0]:\n" + str(e))
        cursor.close()
        return redirect('/')
    try:
        if post['estado'] == 'removed':
            flash('No es posible acceder a esta publicación.', "info")
            return redirect('/')
        post['foto'] = os.path.join(UPLOAD_FOLDER, post['foto'])
    except Exception as e:
        logfile("show_single_post:\n" + str(e))
        pass
    cursor.execute("SELECT name FROM users WHERE id=%s", [post['user_id']])
    try:
        result = list(cursor.fetchall())
        if len(result) >= 1:
            user = result[0]
    except Exception as e:
        logfile("show_single_post(id) - in user = list(cursor.fetchall())[0]:\n" + str(e))
        pass
    cursor.close()
    return render_template('post_by_id.html', post=post, user=user)


@app.route('/main_map')
def new_map():
    return render_template('main_map.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/politica_de_privacidad')
def politica():
    return render_template('politica_de_privacidad.html')


@app.route('/landing')
def landing_page():
    return render_template('landing.html')


@app.route('/profile/<user_id>')
def user_profile(user_id):
    """Render user profile with all owner's posts"""
    return render_template('profile.html')


@app.route('/posts/reported')
def moderate_posts():
    return render_template('moderate.html')


# RESTful APIs
@app.route('/api/posts/')
def api_posts():
    """Retrieve all posts from database and return in JSON format"""
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM lost_pets WHERE estado='active' OR estado='reported' ORDER BY created_at DESC")
    lost = list(cursor.fetchall())
    cursor.execute("SELECT * FROM found_pets WHERE estado='active' OR estado='reported' ORDER BY created_at DESC")
    found = list(cursor.fetchall())
    cursor.close()
    for post in lost:
        del post["estado"]
        del post["user_id"]
    for post in found:
        del post["estado"]
        del post["user_id"]
    return jsonify({"lost": lost, "found": found})


@app.route('/api/users/', methods=['GET', 'POST', 'PUT'])
def api_users():
    if request.method == 'GET':
        """Retrieve all users from database and return in JSON format"""
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        try:
            cursor.execute('SELECT name, email, estado FROM users')
        except Exception as e:
            logfile("/api/users GET - in SELECT:\n" + str(e))
        users = list(cursor.fetchall())
        cursor.close()
        return jsonify(users)
    if request.method == 'POST':
        """Stores new user into database"""
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        content_type = request.headers.get('Content-Type')
        if (content_type != 'application/json'):
            return (jsonify("Not a JSON"), 400)
        cursor.execute('SELECT * FROM users')
        all_users = list(cursor.fetchall())
        user = request.get_json()
        try:
            for u in all_users:
                try:
                    if u['id'] == user['id']:
                        return jsonify('User already saved')
                except Exception as e:
                    logfile(str(e))
        except Exception as e:
            logfile(str(e))
            return jsonify(str(e))
        try:
            cursor.execute('INSERT INTO users VALUES (%s, %s, %s, %s)', (user['id'], user['name'], user['email'], 'active'))
        except Exception as e:
            logfile("/api/users - INSERT USER:\n" + str(e))
            return jsonify('User already saved')
        mysql.connection.commit()
        cursor.close()
        return jsonify(user)
    if request.method == 'PUT':
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        user = request.get_json()
        try:
            cursor.execute("UPDATE users SET estado='blocked' WHERE id=%s", [user['id']])
        except Exception as e:
            logfile("/api/users - UPDATE users:\n" + str(e))
            flash("Ha ocurrido un error", "error")
            return jsonify("ERROR")
        mysql.connection.commit()
        cursor.close()
        flash('Usuario bloqueado', "info")
        return jsonify("Usuario bloqueado")


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


@app.route('/api/posts/<id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
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
    if request.method == 'POST':
        if "lost" in id:
            cursor.execute("UPDATE lost_pets SET estado = 'active' WHERE id=%s", [id])
        else:
            cursor.execute("UPDATE found_pets SET estado = 'active' WHERE id=%s", [id])
        mysql.connection.commit()
        cursor.close()
        return jsonify('Publicación activa nuevamente')
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


@app.route('/api/posts/reported')
def reported_posts():
    """Retrieve all reported posts and their users"""
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM lost_pets WHERE estado='reported'")
    reported_lost = list(cursor.fetchall())
    cursor.execute("SELECT * FROM found_pets WHERE estado='reported'")
    reported_found = list(cursor.fetchall())
    cursor.execute("SELECT * FROM reports")
    all_reports = list(cursor.fetchall())
    cursor.close()
    reports = {}
    for post in reported_lost:
        post['comments'] = []
        for report in all_reports:
            if post['id'] == report['post_id']:
                comment = report['sender_uname'] + ": " + report['reporte']
                post['comments'].append(comment)
    for post in reported_found:
        post['comments'] = []
        for report in all_reports:
            if post['id'] == report['post_id']:
                comment = report['sender_uname'] + ": " + report['reporte']
                post['comments'].append(comment)
    reports['lost'] = reported_lost
    reports['found'] = reported_found
    return jsonify(reports)


""" only for test, will be deleted """
@app.route('/layout')
def layout():
    return render_template('layout.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0")
else:
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)

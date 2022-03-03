from flask import Flask, jsonify, render_template, request, flash, redirect
from flask_cors import CORS
import os
import uuid
from datetime import datetime
from flask_mysqldb import MySQL
import MySQLdb
from facebook import GraphAPI

access_token = os.getenv('fb_token')
page_id = '113136957951816'
graph = GraphAPI(access_token=access_token)

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


@app.route('/')
def landing():
    """Landing page"""
    return render_template('index.html')

@app.route('/lost_pet', methods=['GET', 'POST'])
def form_lost_pet():
    if request.method == 'GET':
        fb_user = graph.get_object('me', fields='id,name,email')
        if fb_user:
            return render_template('form_lost_pet.html')
        else:
            flash('Para publicar, debe iniciar sesión con Facebook')
            return redirect('/')
    if request.method == 'POST':
        id = "lost" + str(uuid.uuid4())
        estado = "active"
        created_at = datetime.utcnow()
        mascota = request.form['mascota']
        nombre = request.form['nombre']
        fecha = request.form['fecha']
        hora = request.form['hora']
        calle_1 = request.form['calle_1']
        calle_2 = request.form['calle_2']
        barrio = request.form['barrio']
        user_id = "123456"
        # check if the post request has the file part
        if 'foto' not in request.files:
            flash('Debe subir una imagen')
            return redirect(request.url)
        file = request.files['foto']
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
        cursor = mysql.connection.cursor()
        try:
            cursor.execute('INSERT INTO lost_pets VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                           (id, user_id, estado, created_at, mascota, nombre, fecha, hora, calle_1, calle_2, barrio, file.filename))
        except Exception as e:
            flash('Ha ocurrido un error, asegúrese de ingresar los datos correctamente')
            print(e)
            return redirect(request.url)
        mysql.connection.commit()
        cursor.close()
        fecha_l = fecha.split('-')
        fecha = fecha_l[2] + '/' + fecha_l[1] + '/' + fecha_l[0]
        message = f"¡Se busca a {nombre}! Perdido/a desde el día {fecha} última vez visto\
                   en las inmediaciones de {calle_1} y {calle_2} barrio {barrio}\
                   a las {hora} horas. Si lo viste por favor comunícate con Usuario."
        graph.put_photo(image=open(os.path.join(UPLOAD_FOLDER, file.filename), "rb"), message=message, album_path=page_id + '/photos')
        return redirect('/')


@app.route('/found_pet', methods=['GET', 'POST'])
def form_found_pet():
    if request.method == 'GET':
        return render_template('form_found_pet.html')
    if request.method == 'POST':
        id = "found" + str(uuid.uuid4())
        estado = "active"
        created_at = datetime.utcnow()
        mascota = request.form['mascota']
        fecha = request.form['fecha']
        hora = request.form['hora']
        calle_1 = request.form['calle_1']
        calle_2 = request.form['calle_2']
        barrio = request.form['barrio']
        user_id = "123456"
        # check if the post request has the file part
        if 'foto' not in request.files:
            flash('Debe subir una imagen')
            return redirect(request.url)
        file = request.files['foto']
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
        cursor = mysql.connection.cursor()
        try:
            cursor.execute('INSERT INTO found_pets VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                        (id, user_id, estado, created_at, mascota, fecha, hora, calle_1, calle_2, barrio, file.filename))
        except Exception as e:
            flash('Ha ocurrido un error, asegúrese de ingresar los datos correctamente')
            print(e)
            return redirect(request.url)
        mysql.connection.commit()
        cursor.close()
        fecha_l = fecha.split('-')
        fecha = fecha_l[2] + '/' + fecha_l[1] + '/' + fecha_l[0]
        message = f"¡Se encontró! Perdido/a desde el día {fecha} última vez visto\
                  en las inmediaciones de {calle_1} y {calle_2} barrio {barrio} a las {hora} horas.\
                  Si lo viste por favor comunícate con Usuario."
        graph.put_photo(image=open(os.path.join(UPLOAD_FOLDER, file.filename), "rb"), message=message, album_path=page_id + '/photos')
        return redirect('/')


@app.route('/<id>')
def show_single_post(id):
    return render_template('post_by_id.html')


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
    return jsonify({"lost": lost, "found": found})


@app.route('/api/users/', methods=['GET', 'POST'])
def api_users():
    if request.method == 'GET':
        """Retrieve all users from database and return in JSON format"""
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users')
        users = list(cursor.fetchall())
        cursor.close()
        return jsonify(users)
    else:
        """Stores new user into database"""
        content_type = request.headers.get('Content-Type')
        if (content_type != 'application/json'):
            return (jsonify("Not a JSON"), 400)
        user = request.get_json()
        try:
            cursor.execute('INSERT INTO users VALUES (%s, %s, %s)', (user['id'], user['name'], user['email']))
        except Exception:
            pass
        return jsonify(user)


@app.route('/api/users/<user_id>/posts')
def api_user_posts(user_id):
    """Retrieve all posts from user by user_id and return in JSON format"""
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM lost_pets WHERE user_id=%s', [user_id])
    lost = list(cursor.fetchall())
    cursor.execute('SELECT * FROM found_pets WHERE user_id=%s', [user_id])
    found = list(cursor.fetchall())
    cursor.close()
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
    except Exception:
        flash('Publicación no encontrada')
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
        flash('¡Felicidades! Nos alegra mucho que hayas encontrado a tu mascota :D')
        return redirect('/')
    if request.method == 'DELETE':
        if "lost" in id:
            cursor.execute("UPDATE lost_pets SET estado = 'removed' WHERE id=%s", [id])
        else:
            cursor.execute("UPDATE found_pets SET estado = 'removed' WHERE id=%s", [id])
        mysql.connection.commit()
        cursor.close()
        flash('Publicación eliminada correctamente')
        return redirect('/')


if __name__ == "__main__":
    app.run(host="0.0.0.0")

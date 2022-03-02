# web app
public ipv4 54.94.254.146
private ipv4 172.31.40.105
## installation

virtual environment

``mkdir encuentrame_org``
``cd encuentrame_org``

``python3 -m venv venv``
``. venv/bin/activate``

install flask

``pip install Flask``

create the app

encuentrame_org.py

run flask

``export FLASK_APP=encuentrame_org``
``flask run --port 8000``
``curl localhost:8000``
``curl http://127.0.0.1:8000/``

ssl/tls

certbot and letsencrypt

``sudo certbot --nginx``

``curl -sIL  http://encuentrame.org.xelar.tech``
``curl -sI  https://encuentrame.org.xelar.tech``

run flask to serv outside

flask run --host=0.0.0.0 --port=8000

http://172.31.40.105:8000/

run flask with gunicorn

``sudo apt-get update``
``sudo apt-get install gunicorn``

``gunicorn --version``

gunicorn "urlshort:create_app()" -b 0.0.0.0

curl 172.31.40.105:8000

config nginx for gunicorn

``sudo vim /etc/nginx/sites-enabled/default``

run gunicorn daemon

``gunicorn "urlshort:create_app()" -b 0.0.0.0 --daemon``

``sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled``

``http://encuentrame.org.xelar.tech`` from gunicorn to nginx
``https://encuentrame.org.xelar.tech`` from default nginx

print resolved configuration

``gunicorn --print-config APP_MODULE``

check config

``gunicorn --check-config APP_MODULE``

config file (can be anywhere)

``./gunicorn.conf.py``

only works when specify in command line or as part of an application specific conf
must be in the same directory where gunicorn is running

Deploy using nginx

sudo vim /etc/nginx/nginx.conf



mysql

``sudo mysql -uroot -p``
root password = encuentrame.98

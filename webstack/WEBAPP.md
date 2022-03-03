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

``cat mysql/01-create_database.sql | mysql -u root -p``



***

## deploy flask with gunicorn

``cd encuentrame.org``

create virtual environment

``virtualenv env``

```bash
ubuntu@ip-172-31-40-105:~/encuentrame.org$ virtualenv env
created virtual environment CPython3.8.10.final.0-64 in 1161ms
  creator CPython3Posix(dest=/home/ubuntu/encuentrame.org/env, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/home/ubuntu/.local/share/virtualenv)
    added seed packages: pip==22.0.3, setuptools==60.9.3, wheel==0.37.1
  activators BashActivator,CShellActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator
ubuntu@ip-172-31-40-105:~/encuentrame.org$
```

> edit the activate file

``sudo vim env/bin/activate``

``export FLASK_APP="app"
export FLASK_ENV="production"
# export APP_SETTINGS_MODULE="config.prod``

> activate the virtual environment

``source env/bin/activate``

> install dependencies

``pip install -r requirements.txt``

> levantar gunicorn indicando la instancia de la aplicacion

gunicorn --bind 0.0.0.0:80 app:app

> fuera del entorno virtual

``apt install libmysqlclient-dev``

``pip install Flask-MySQLdb``

``pip install -e git+https://github.com/mobolic/facebook-sdk.git#egg=facebook-sdk``


kill the process ctrl + c to finish gunicorn

gunicorn --workers 2 --bind unix:encuentrame.sock -m 007 app:app &


nginx soporte a aplicaciones

sudo vim /etc/nginx/sites-available/encuentrame

```bash
server {
    listen 80;
    server_name encuentrame.org.xelar.tech;
    location /static {
        alias /home/ubuntu/encuentrame.org/static;

    }
    location /media {
        alias /home/ubuntu/encuentrame.org/media;
    }
    location / {
        include proxy_params;
        proxy_pass http://unix:/home/ubuntu/encuentrame.org/encuentrame.sock;
    }
}
```

Nginx tenga en cuenta la configuración anterior, crea el siguiente enlace simbólico


ln -s /etc/nginx/sites-available/encuentrame /etc/nginx/sites-enabled


test

sudo nginx -t

restart nginx

sudo systemctl restart nginx


sudo service nginx status


debugging the server name conflicting

grep -r "encuentrame.org.xelar.tech" /etc/nginx/sites-enabled/*

    sudo ufw allow 'Nginx Full'
    sudo ufw delete allow 'Nginx HTTP'

run the app on boot on the server

sudo vim /lib/systemd/system/flask.service

```bash
[Unit]
Description=Gunicorn Flask Application
After=network.target
After=systemd-user-sessions.service
After=network-online.target

[Service]
User=root
Type=simple
ExecStart=/var/www/flask/hello-world/start.sh
TimeoutSec=30
Restart=on-failure
RestartSec=15
StartLimitInterval=350
StartLimitBurst=10

[Install]
WantedBy=multi-user.target

```

sudo vim start.sh

```bash
#!/bin/bash
echo Starting Flask example app.
cd /var/www/flask
source hello-world/bin/activate
cd hello-world
gunicorn -w 2 -b 127.0.0.1:8080 app:app
``
chmod 755 start.sh

systemctl enable flask


nginx deactivate the default

rm /etc/nginx/sites-enabled/default

restrict 8080, only nginx can access gunicorn
iptables -A INPUT -p tcp --destination-port 8080 -j DROP

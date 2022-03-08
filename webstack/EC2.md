0) crear instancia ec2
    elegir region san Pablo
    crear instancia ubuntu 20.04
    crear ssh key
    descargar clave.pem
    crear directorio de trabajo
    mover clave.pem a directorio de trabajo
    obtener la ipv4


get.tech

1) registrar sub dominio con la ip del servidor
    Agregar registro A en el DNS

 encuentrame.org.xelar.tech

2) Conectar a la consola

    ssh -i "encuentrame2.pem" ubuntu@ec2-54-94-254-146.sa-east-1.compute.amazonaws.com
    crear directorio local

3) nginx

    sudo apt-get update
    sudo apt install nginx

4) python, pip, packages

sudo apt install python3
sudo apt install python3-pip
sudo pip3 install virtualenv
sudo pip3 install Flask
sudo pip3 install Flask-RESTful
sudo pip3 install gunicorn

5) crear y activar venv

sudo apt install python3.8-venv

python3 -m venv encuentrame.org
source encuentrame.org/bin/activate

6) gunicorn service

which gunicorn
mkdir gunicorn_logs
sudo vim /etc/systemd/system/gunicorn.service
Paste the following code:

[Unit]
Description=Gunicorn Service
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/encuentrame.org
ExecStart=/usr/local/bin/gunicorn — workers 3 — error-logfile /home/ubuntu/gunicorn_logs/error_log — bind unix:encuentrame.org.sock -m 007 app:app


Note:
a. Replace the WorkingDirectory path with your path
b. Use command “pwd” at your project to the exact path of the project
c. Use command “which gunicorn” after activating your venv to know the path of the guinicorn used
d. Create a “gunicorn_logs” directory for error logs of gunicorn

5) Configure Nginx with private ip of EC2 isntance

sudo vim /etc/nginx/sites-available/default


server{
listen 80;
server_name 172.31.40.105;

location / {
proxy_pass http://unix:/home/ubuntu/encuentrame.org/encuentrame.org.sock;
}
}

6. Check Nginx Config for any error:

nginx -t

7. reload guinicorn servicen and nginx

sudo systemctl daemon-reload
sudo service gunicorn stop
sudo service gunicorn start
sudo service gunicorn status
sudo service nginx stop
sudo service nginx start
sudo service nginx status
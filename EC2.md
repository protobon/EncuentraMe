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

3) python, pip, packages

    sudo apt install python3
    sudo apt install python3-pip
    pip3 install virtualenv
    pip3 install Flask
    pip3 install Flask-RESTful
    pip3 install gunicorn


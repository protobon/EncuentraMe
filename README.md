# encuentrame
<!-- tweet -->
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fayrton-hbtn%2FEncuentraMe)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fayrton-hbtn%2FEncuentraMe) <!-- repo size -->
![GitHub repo size](https://img.shields.io/github/repo-size/ayrton-hbtn/EncuentraMe) <!-- lines of code -->
![Lines of code](https://img.shields.io/tokei/lines/github/ayrton-hbtn/EncuentraMe) <!-- code size -->
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ayrton-hbtn/EncuentraMe)
<!-- homehero -->
![HomeHero](/static/img/encuentrame_home_hero.svg)
`Release date: Mar-23-2022`

>[visit website](https://encuentrame.org.xelar.tech)

## Description

The main objective of our application is to bring help to pet owners that are looking for their pets.
We use a post system that shows every pet that is currently missing or pets founds in the street, integrating Google Maps API to show each post location and Facebook API for user identification.

In this initial version of our application you will find three filters on the home page, "Perdidos" that contains posts made by pet owners that register their missing pet info with the location of the last time it was seen;  "Encontrados" that contains posts made when you find a pet in the street and it is lost, it also uses the location functionality to register the exact point where the pet was seen, and by last, "Resueltos" that shows the post of pets that are finally reunited with their families.

We include in this version, the possibilities to moderate posts, i.e., a user that creates a post, can "Delete" their posts and also notify if the pet was found, that way it will be removed from the active list of pets and moved to the "Resueltos" section. 

In addition, the functionality of report publication is added, to report if a post violates our terms and conditions, or if it makes reference to a pet that is not from the post creation. The admins can take down a post that violates the rules and also can block users in case it is required.

In the future, we'd like to include additional functionalities including contacting Veterinaries and Shelters for pet care and adoptions. 

## Trello project

[![Portfolio Project](https://img.shields.io/static/v1?label=&message=Project%20Portfolio&color=2F333A&logo=Trello&labelColor=0052CC)](https://trello.com/b/iS9gBOQm/portfolio-project)

## General overview

### Environment

> A Ubuntu Server running over AWS EC2 with LEMP stack

[![Bash](https://img.shields.io/static/v1?label=&message=GNU%20Bash&color=4EAA25&logo=GNU%20Bash&logoColor=4EAA25&labelColor=2F333A)](https://www.gnu.org/software/bash/)<!-- bash -->
[![Vim](https://img.shields.io/static/v1?label=&message=Vim&color=019733&logo=Vim&logoColor=019733&labelColor=2F333A)](https://www.vim.org/)<!-- vim -->
[![VS Code](https://img.shields.io/static/v1?label=&message=Visual%20Studio%20Code&color=007ACC&logo=Visual%20Studio%20Code&logoColor=007ACC&labelColor=2F333A)](https://code.visualstudio.com/)<!-- vs code -->
[![Pycharm](https://img.shields.io/static/v1?label=&message=Pycharm&color=000000&logo=pycharm&logoColor=000000&labelColor=f3f3f3)](https://www.jetbrains.com/pycharm/)<!-- pycharm -->

### cloud
<!-- AWS -->
[![AWS](https://img.shields.io/static/v1?label=&message=Amazon%20AWS&color=232F3E&logo=Amazon%20AWS&logoColor=232F3E&labelColor=F5F5F5)](https://aws.amazon.com/)

### server stack

[![Ubuntu](https://img.shields.io/static/v1?label=&message=Ubuntu&color=E95420&logo=Ubuntu&logoColor=E95420&labelColor=2F333A)](https://ubuntu.com/)<!-- ubuntu -->
[![Gunicorn](https://img.shields.io/static/v1?label=&message=Gunicorn&color=499848&logo=Gunicorn&logoColor=499848&labelColor=2F333A)](https://gunicorn.org/)<!-- gunicorn -->
[![Flask](https://img.shields.io/static/v1?label=&message=Flask&color=000000&logo=Flask&logoColor=ffffff&labelColor=2F333A)](https://flask.palletsprojects.com/)<!-- flask   -->
[![Jija](https://img.shields.io/static/v1?label=&message=Jinja&color=B41717&logo=jinja&logoColor=B41717&labelColor=2F333A)](https://jinja.palletsprojects.com/)<!-- jinja -->
[![Nginx](https://img.shields.io/static/v1?label=&message=NGINX&color=009639&logo=NGINX&logoColor=009639&labelColor=2F333A)](https://nginx.org/)<!-- nginx -->

### database
<!-- mysql -->
[![MySQL](https://img.shields.io/static/v1?label=&message=MySQL&color=4479A1&logo=MySQL&logoColor=4479A1&labelColor=F5F5F5)](https://www.mysql.com/)

### languages
[![Python](https://img.shields.io/static/v1?label=&message=Python&color=FFD43B&logo=python&logoColor=3776AB&labelColor=2F333A)](https://www.python.org)<!-- python-->
[![SQL](https://img.shields.io/static/v1?label=SQL&message=SQL&color=4479A1&logo=SQL&logoColor=4479A1&labelColor=E8E8E8)](https://www.w3schools.com/sql/)<!-- sql -->
[![HTML5](https://img.shields.io/static/v1?label=&message=HTML5&color=E34F26&logo=HTML5&logoColor=E34F26&labelColor=2F333A)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)<!--HTML5-->
[![CSS3](https://img.shields.io/static/v1?label=&message=CSS3&color=0071B5&logo=CSS3&logoColor=1572B6&labelColor=2F333A)](https://developer.mozilla.org/en-US/docs/Web/CSS)<!-- CSS3 -->
[![JS](https://img.shields.io/static/v1?label=&message=JavaScript&color=D4B830&logo=JavaScript&logoColor=F7DF1E&labelColor=2F333A)](https://www.javascript.com)<!-- JS -->

### apis

* Facebook: ``facebook api``
* Google: ``google maps api``

### css framework
<!-- bootstrap -->
[![Bootstrap](https://img.shields.io/static/v1?label=&message=Bootstrap&color=7952B3&logo=Bootstrap&logoColor=7952B3&labelColor=2F333A)](https://getbootstrap.com/)

### style guideliness
<!-- semistandard -->
<!-- w3 validator -->
<!-- pep8 -->
<!-- pycodestyle -->
<!-- shellcheck -->

<!-- web stack arquitecture -->
## Web arquitecture

![web stack](/static/img/web_arquitecture.svg)

<!-- Introducing the cloud computing -->
## Cloud computing

Cloud based deployment: Run all parts of the application in the cloud
EC2 instance.

* Ubuntu Server 20.04 LTS (HVM), SSD Volume Type - ami-04505e74c0741db8d (64-bit x86)
* Ubuntu Server 20.04 LTS (HVM),EBS General Purpose (SSD) Volume Type. Support available from [Canonical](http://www.ubuntu.com/cloud/services)
* Root device type: ebs Virtualization type: hvm ENA Enabled: Yes
* t2.micro (- ECUs, 1 vCPUs, 2.5 GHz, -, 1 GiB memory, EBS only)

* ec2
* ssh
* ssl
* ufw
* nginx
* mysql

>Public IPv4 address
>
>
>

### ssh to the instance

```bash
$ chmod 400 encuentrame.pem
$
$ ssh -i "encuentrame.pem" ubuntu@ec2-52-23-158-3.compute-1.amazonaws.com
ubuntu@ip-172-31-23-111:~$
```

## CI/CD

> run vagrant image

```bash
$ vagrant init encuentrame/ubuntu-20.04-server-ec2
$
$ vagrant up
$
```

## Configure the environment

> Initial configuration
>
> Upgrade system

``sudo apt-get update``
``apt list --upgradable``
``sudo apt-get upgrade``

> Install Nginx
>
``run script``

> Install MySQL
>
``run script``

``root: encuentrame.98``

> Install Python
>
``sudo apt-get install python3-pip``
``sudo apt-get install python3``

> Install linters
>
``sudo apt-get install shellcheck``
``sudo apt-get install pep8``
``sudo apt-get install pycodestyle``

> netstat
>

``sudo apt install net-tools``

to run ``netstat -tulpn``
tcp
udp
listening
programs
numeric

> Flask
>

virtual environment
``mkdir encuentrame``
``cd encuentrame``
``sudo apt install python3.8-venv``
``python3 -m venv venv``

activate the virtual environment

```bash
ubuntu@ip-172-31-23-111:~/encuentrame$ . venv/bin/activate
(venv) ubuntu@ip-172-31-23-111:~/encuentrame$
```

``pip install Flask``

> integrate nginx, flask and guinicorn
>
``sudo apt update``
``sudo apt install python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools``

entorno virtual

``sudo apt install python3-venv``
``python3 -m venv encuentrameenv``

activar entorno

``source encuentrameenv/bin/activate``

Configurar Flask

``pip install wheel``

``pip install gunicorn flask``

create with hello.py

``sudo ufw allow 8000``

optional
``export FLASK_RUN_PORT=8000``
``export FLASK_APP=hello.py``

``python hello.py``

ubuntu@ip-172-31-23-111:~$ curl http://172.31.23.111:8000/
***************************

``sudo vim /etc/nginx/nginx.conf``



## ssl/tls

> create domain (almost a subdomain)
>
> on get.tech

```script
Zone id. 	11087069

Record Id 	125709711

Name 	encuentrame.xelar.tech

Class 	IN

Type 	A

Status 	Active

Value 	54.147.150.55

TTL 	7200

Creation Date 	2022-02-16 01:35:29.824305
```

> Install snapd and certbot
>

``sudo apt update``
``sudo apt install snapd``
``sudo apt-get upgrade``
``sudo snap install hello-world``
``sudo snap install core; sudo snap refresh core``
``sudo apt-get remove certbot``
``sudo snap install --classic certbot``
``sudo ln -s /snap/bin/certbot /usr/bin/certbot``

> Run the certbot for nginx

``sudo certbot --nginx``


> Allow traffic to the instance in AWS
>

Create security groups for http and https traffic in AWS Console

## Authors

> Andres

<!-- twitter -->
[![Twitter](https://img.shields.io/twitter/follow/aortiz91_?style=social)](https://twitter.com/aortiz91_) <!-- linkedin --> [![Linkedin](https://img.shields.io/badge/LinkedIn-blue?style=social&logo=linkedin)](https://www.linkedin.com/in/aortizm09/) <!-- github --> [![Github](https://img.shields.io/github/followers/Aortiz91?style=social)](https://github.com/Aortiz91)

> Ayrton

[![Linkedin](https://img.shields.io/badge/LinkedIn-blue?style=social&logo=linkedin)](https://www.linkedin.com/in/ayrton-coelho-b91824170/) <!-- github --> [![Github](https://img.shields.io/github/followers/ayrton-hbtn?style=social)](https://github.com/ayrton-hbtn/)

> Ronald

<!-- twitter -->
[![Twitter](https://img.shields.io/twitter/follow/ralex_uy?style=social)](https://twitter.com/ralex_uy) <!-- linkedin --> [![Linkedin](https://img.shields.io/badge/LinkedIn-+22K-blue?style=social&logo=linkedin)](https://www.linkedin.com/in/ronald-rivero/) <!-- github --> [![Github](https://img.shields.io/github/followers/ralexrivero?style=social)](https://github.com/ralexrivero/) <!-- vagrant --> [![Vagrant](https://img.shields.io/static/v1?label=&message=Vagrant%20Profile&color=1868F2&logo=vagrant&labelColor=2F333A)](https://app.vagrantup.com/ralexrivero) <!-- docker --> [![Docker](https://img.shields.io/static/v1?label=&message=Docker%20Profile&color=2496ED&logo=Docker&labelColor=2F333A)](https://hub.docker.com/u/ralexrivero)

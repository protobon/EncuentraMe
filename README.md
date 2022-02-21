# ecuentraMe

**production environment*

<!-- tweet -->
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fralexrivero%2Fencuentrame.pet_ronald)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fralexrivero%2Fencuentrame.pet_ronald) <!-- size -->
![size](https://img.shields.io/github/repo-size/ralexrivero/encuentrame.prod)

<!-- ascii art ansi -->
```bash
███████ ███    ██  ██████ ██    ██ ███████ ███    ██ ████████ ██████   █████  ███    ███ ███████ 
██      ████   ██ ██      ██    ██ ██      ████   ██    ██    ██   ██ ██   ██ ████  ████ ██      
█████   ██ ██  ██ ██      ██    ██ █████   ██ ██  ██    ██    ██████  ███████ ██ ████ ██ █████ 
██      ██  ██ ██ ██      ██    ██ ██      ██  ██ ██    ██    ██   ██ ██   ██ ██  ██  ██ ██    
███████ ██   ████  ██████  ██████  ███████ ██   ████    ██    ██   ██ ██   ██ ██      ██ ███████ 
```

>Public IPv4 address
>
>52.23.158.3
>
>[web page](https://encuentrame.xelar.tech)

## Trello project

[![Portfolio Project](https://img.shields.io/static/v1?label=&message=Project%20Portfolio&color=2F333A&logo=Trello&labelColor=0052CC)](https://trello.com/b/QZYZYZQs/encuentrame)



<!-- homehero -->

## General

## Environment

> A Ubuntu Server running over AWS EC2 with LEMP stack

<!-- ubuntu -->
[![Ubuntu](https://img.shields.io/static/v1?label=&message=Ubuntu&color=E95420&logo=Ubuntu&logoColor=E95420&labelColor=2F333A)](https://ubuntu.com/) <!-- kali linux -->
[![Ubuntu](https://img.shields.io/static/v1?label=&message=Kali%20Linux&color=557C94&logo=Kali%20Linux&logoColor=557C94&labelColor=2F333A)](https://www.kali.org/) <!-- vagrant-->
[![Vagrant](https://img.shields.io/static/v1?label=&message=Vagrant&color=1868F2&logo=vagrant&labelColor=2F333A)](https://app.vagrantup.com/)
<!-- bash -->
[![Bash](https://img.shields.io/static/v1?label=&message=GNU%20Bash&color=4EAA25&logo=GNU%20Bash&logoColor=4EAA25&labelColor=2F333A)](https://www.gnu.org/software/bash/)
<!-- vim -->
[![Vim](https://img.shields.io/static/v1?label=&message=Vim&color=019733&logo=Vim&logoColor=019733&labelColor=2F333A)](https://www.vim.org/) <!-- vs code -->
[![VS Code](https://img.shields.io/static/v1?label=&message=Visual%20Studio%20Code&color=007ACC&logo=Visual%20Studio%20Code&logoColor=007ACC&labelColor=2F333A)](https://code.visualstudio.com/) <!-- pycharm -->
[![Pycharm](https://img.shields.io/static/v1?label=&message=Pycharm&color=000000&logo=pycharm&logoColor=000000&labelColor=f3f3f3)](https://www.jetbrains.com/pycharm/)

### languages

<!-- python-->
[![Python](https://img.shields.io/static/v1?label=&message=Python&color=FFD43B&logo=python&logoColor=3776AB&labelColor=2F333A)](https://www.python.org) <!--HTML5-->
[![HTML5](https://img.shields.io/static/v1?label=&message=HTML5&color=E34F26&logo=HTML5&logoColor=E34F26&labelColor=2F333A)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) <!-- CSS3 -->
[![CSS3](https://img.shields.io/static/v1?label=&message=CSS3&color=0071B5&logo=CSS3&logoColor=1572B6&labelColor=2F333A)](https://developer.mozilla.org/en-US/docs/Web/CSS) <!-- JS -->
[![JS](https://img.shields.io/static/v1?label=&message=JavaScript&color=D4B830&logo=JavaScript&logoColor=F7DF1E&labelColor=2F333A)](https://www.javascript.com) <!-- sql -->
[![SQL](https://img.shields.io/static/v1?label=SQL&message=SQL&color=4479A1&logo=SQL&logoColor=4479A1&labelColor=E8E8E8)](https://www.w3schools.com/sql/)

## frameworks

## database

<!-- mysql -->
[![MySQL](https://img.shields.io/static/v1?label=&message=MySQL&color=4479A1&logo=MySQL&logoColor=4479A1&labelColor=F5F5F5)](https://www.mysql.com/)

## technologies

<!-- AWS -->
[![AWS](https://img.shields.io/static/v1?label=&message=Amazon%20AWS&color=232F3E&logo=Amazon%20AWS&logoColor=232F3E&labelColor=F5F5F5)](https://aws.amazon.com/)

## apis

* Facebook: ``facebook api``
* Google: ``google maps api``

## style guideliness

<!-- semistandard -->
[![Semi-Standard](https://raw.githubusercontent.com/standard/semistandard/master/badge.svg)](https://github.com/standard/semistandard)
<!-- w3 validator -->
<!-- Betty style -->
<!-- pep8 -->
<!-- pycodestyle -->
<!-- shellcheck -->

## Testing

* unit testing: ``unitest``

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
[![Twitter](https://img.shields.io/twitter/follow/Potterhead_uy?style=social)](https://twitter.com/Potterhead_uy) <!-- linkedin --> [![Linkedin](https://img.shields.io/badge/LinkedIn-blue?style=social&logo=linkedin)](https://www.linkedin.com/in/aortizm09/) <!-- github --> [![Github](https://img.shields.io/github/followers/Aortiz91?style=social)](https://github.com/Aortiz91)

> Ayrton

[![Linkedin](https://img.shields.io/badge/LinkedIn-blue?style=social&logo=linkedin)](https://www.linkedin.com/in/ayrton-coelho-b91824170/) <!-- github --> [![Github](https://img.shields.io/github/followers/ayrton-hbtn?style=social)](https://github.com/ayrton-hbtn/)

> Ronald

<!-- twitter -->
[![Twitter](https://img.shields.io/twitter/follow/ralex_uy?style=social)](https://twitter.com/ralex_uy) <!-- linkedin --> [![Linkedin](https://img.shields.io/badge/LinkedIn-+22K-blue?style=social&logo=linkedin)](https://www.linkedin.com/in/ronald-rivero/) <!-- github --> [![Github](https://img.shields.io/github/followers/ralexrivero?style=social)](https://github.com/ralexrivero/) <!-- vagrant --> [![Vagrant](https://img.shields.io/static/v1?label=&message=Vagrant%20Profile&color=1868F2&logo=vagrant&labelColor=2F333A)](https://app.vagrantup.com/ralexrivero) <!-- docker --> [![Docker](https://img.shields.io/static/v1?label=&message=Docker%20Profile&color=2496ED&logo=Docker&labelColor=2F333A)](https://hub.docker.com/u/ralexrivero)

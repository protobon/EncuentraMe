install virtual box
install vagrant
create dir for vmbox
vagrant init ubuntu/focal64
vagrant up
vagrant ssh-config
integrate with vs code
vagrant ssh

sudo apt-get update
sudo apt -y upgrade
sudo apt install python3

sudo apt install python3-pip
sudo apt install python3.8-venv
python3 -m venv venv
source venv/bin/activate

pip install flask
pip install Flask-Cors
./03-install_mysql.sh
sudo apt install libmysqlclient-dev
pip install wheel
pip install Flask-MySQLdb
pip install -e git+https://github.com/mobolic/facebook-sdk.git#egg=facebook-sdk

sudo apt-get update
sudo apt-get install gunicorn

sudo vim venv/bin/activate
dactivate
source venv/bin/activate

execute sql queries

flask run
curl localhost
kill process


forwarded ports vagrant
config.vm.network "forwarded_port", guest: 8000, host: 8080
FLASK_ENV="development"

pip install pyopenssl

openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

app.run(ssl_context=('cert.pem', 'key.pem'))

flask run --cert=cert.pem --key=key.pem

vagrant share

on host localhost:8080



comun
flask run --host=0.0.0.0 --port=8000


ssl
if __name__ == "__main__":
    app.run(ssl_context=('cert.pem', 'key.pem'))

flask run --host=0.0.0.0 --port=8000 --cert=cert.pem --key=key.pem

Vagrantfile
  config.vm.network "forwarded_port", guest: 80, host: 8080, auto_correct: true
  config.vm.network "forwarded_port", guest: 443, host: 8443, auto_correct: true
  config.vm.network "private_network", ip: "192.168.33.10"

if __name__ == "__main__":
    app.run(ssl_context=('cert.pem', 'key.pem'))

flask run --port 8000


generate cert.pem and key.pem

openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

ssl_context=('server.crt', 'server.key')

host='0.0.0.0', port=8000, ssl_context=('server.crt', 'server.key')

--cert='server.crt' --key='server.key'
--cert=server.crt --key=server.key
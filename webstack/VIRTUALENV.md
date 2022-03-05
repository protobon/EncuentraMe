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


flask run --host=0.0.0.0 --port=8000

on host localhost:8080
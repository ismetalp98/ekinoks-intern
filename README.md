# Ekinoks Internship Project

## Project Description:
A backend project for online food ordering.

# Front end set up 
### Install yarn globally
```
npm install --global yarn
```
### Install npm dependencies
```
yarn install
```
### Start application
```
yarn dev
```

# Database set-up with terminal 
### Add the deb file to your source list
```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
```
### Import the repository signing key
```
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```
### Update the system
```
sudo apt-get update
```
### Last step install the PostgreSQL
```
sudo apt-get -y install postgresql
```
## Start PostgreSQL and setup tables, indexs, schemas
#### Start postgresql  
```
/usr/lib/postgresql/11/bin/pg_ctl start
```
#### Login and create database
```
psql postgres
create database {db_name}
```

# Database set-up with Docker
### Download Docker app
    https://docs.docker.com/get-docker/

### Create DockerHub account
    https://hub.docker.com/signup

### Go to PostgreSQL image on DockerHub
    https://hub.docker.com/_/postgres

### Install PostgreSQL image on Docker app
Open terminal and type
```
docker login
```
Then type following command to install the image
```
docker run --name {some-postgres} -p {port:port} -e POSTGRES_PASSWORD={mysecretpassword} -d postgres
```
Give your database credentials and details to .env file.

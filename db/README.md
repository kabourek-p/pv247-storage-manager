# Setup of development DB

How to setup a usable development database for storage-manager

# Prerequisiuties

You need docker and docker-compose installed:
- https://docs.docker.com/engine/install/
- https://docs.docker.com/compose/install/

## Start db

~~~
cd db/
docker compose up -d
~~~
this will pull docker image with postgress database and adminer ui

Database will be available on http://localhost:5432

Adminer ui on [http://localhost:9002](http://localhost:9002)

## Setup prisma

prisma needs acces to database configured using `DATABASE_URL` env var or preferably `.env` file in project root:
~~~
echo 'DATABASE_URL="postgresql://root:123@localhost:5432/pv247-storage-manager?schema=public"'
~~~

## Init database using prisma
call prisma to load all migrations and so initialize the database
~~~
prisma generate && prisma migrate deploy
~~~

## Connect to adminer:
Visit [http://localhost:9002](http://localhost:9002) and login screen will appear:
You can connect to the devel db using:
- System: `PostgreSQL`
- Server: `db` (name provided by docker-compose
- Username: `root`
- Password: `123`
- Database: `pv247-storage-manager`



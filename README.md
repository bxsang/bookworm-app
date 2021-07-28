# bookworm-app

## Prerequisites
All you need is:
* [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/)

## Usage
* Make a copy of the file `.env.example` and rename it to `.env`
* Run the app with docker-compose
```sh
docker-compose up -d
```
* Open a shell in laravel container
```sh
docker exec -it bookworm_app sh
```
* Install php dependencies
```sh
composer install
```
* Fix permissions
```sh
chmod -R 777 storage bootstrap/cache
```
* Generate new application key
```sh
php artisan key:generate
```
* Running database migration and seeding
```sh
php artisan migrate
php artisan db:seed
```
* Create Laravel Passport encryption keys
```sh
php artisan passport:install
```
* Install NPM dependencies
```sh
npm install
```
* Compile React assets (public assets not included in this repo)
```sh
npm run production
```

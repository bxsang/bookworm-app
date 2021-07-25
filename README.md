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
* Compile React assets
```sh
docker exec -it bookworm_app sh
npm run production
```

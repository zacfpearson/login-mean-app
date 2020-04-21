# LoginMeanApp

## Overview
The purpsose of the login-mean-app is to provide a simple login application. The application provides the ability to login or signup when first accessed. Once the user logs in, a token is given to the user and the options change to provide the user options to either logout or delete the user. The deletion of the user is a protected route that requires a valid JWT to execute. 

## Install Dependencies
Install docker

## Build
### Network 
Run `docker network create -d bridge login-bridge`

### Dev
From this directory run: `docker build -t login:dev -f docker/Dockerfile.dev login-mean-app`
### Prod
From this directory run: `docker build --no-cache -t login:prod -f docker/Dockerfile.prod login-mean-app`

### No Docker
See README in `login-mean-app`

## Start MongoDB

This app depends on a MongoDB server running on the same bridge network with the resovable hostname `login-db`. The easiest way to get a mongo database up and runnign is with their Docker image.
`docker run --network=login-bridge --name=login-db --rm mongo:bionic`

## Development server
### Dev
Run `docker run --network=login-bridge -p 3000:3000 --rm login:dev`
### Prod
Run `docker run --network=login-bridge -p 3000:3000 --rm login:prod`

## Todo
* [ ] Make mongoDB hostname a cmd arg
* [ ] Improve UX
* [ ] Improve UI


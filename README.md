# React-colaborator-todo
This is a react colaborator todo project with frontend and backend in node js

## Colaborator todo frontend
The frontend of colaborator todo project, in this app you can create different projects and inside that project you can add todo and also you can add comments, descriptions, nested comment, and upload files. <br/>
along with that you can also assign todo to others by their email id in `assigned_to` section wile creating a new todo. <br/>
the frontend is designed with *Material-UI* and for data management *Redux store* is used.

## Colaborator todo backend
The backend is in *node express* and *MySql* database with *ORM* (Sequelize-migration) <br/>
file uploading on aws s3.

## Requirement and Execution
1. First clone the project from github or run the command in your terminal `git clone https://github.com/jagannath-swarnkar/React-colaborator-todo.git` to clone this project <br/>
2. Now go to the `Colaborator_todo_frontend` directory for frontend & Install the necessary dependencies to your app by running `npm install` on the terminal. <br/>
3. Launch the development build of the app, by running `npm start` on the terminal. <br/>
4. and visit http://localhost:3000/ to use this app in your browser. <br/>
5. Along with this use backend too which is already in your clone with name `colaborator_todo_backend`, for that open another terminal and go to that directory and run command `npm install` to install all the necessary dependencies for backend and along with that you also need to install MySql database and create a database in CLI <br/>
6. for credentials you need to create a *.env* file inside this backend directory. use `touch .env` to create *.env* file and inside that file use the *.env_example* file details (given inside the directory)
6. run command `node server.js` to run the backend.

onece refresh your app again


*To use file uploading process* <br/>
to use file uploading features you need an AWS account and create a bucket on AWS S3 and follow the credentials <br/>

for Aws access id and Aws security key, go to *my security console* and create a new access key. <br/>
and you can also copy the *region* from the params of the aws s3 tab on browser and bucket name from s3.

# Companies
## Statement
The project is a web application created in NodeJS and Angular, MongoDB database engine. The objective of the project is to show the registered companies, employees of each company.
It has administration modules that allow you to create, edit, delete and list companies, employees and positions.
### Directory backend
```bash
├───controllers
├───database
│   └───collections
├───middlewares
├───models
├───routes
└───utils
```
## Directory frontend
```bash
├───app
│   ├───classes
│   ├───components
│   │   ├───companies
│   │   │   ├───create-company
│   │   │   ├───show-all
│   │   │   ├───show-by-id
│   │   │   └───show-employees-by-company-id
│   │   ├───employees
│   │   │   ├───create-employee
│   │   │   ├───show-all-emlpoyees
│   │   │   └───show-employee-by-id
│   │   ├───header
│   │   ├───login
│   │   ├───position
│   │   │   ├───create-position
│   │   │   ├───show-all-positions
│   │   │   └───show-position-by-id
│   │   └───spinner
│   ├───guards
│   │   ├───admin
│   │   └───auth
│   └───services
│       ├───admin
│       ├───auth
│       ├───companies
│       ├───employees
│       ├───forms
│       ├───positions
│       └───spinner
├───assets
│   ├───fonts
│   └───img
└───environments
```
# Execution
## Prerequisites
* Have installed node version v14 or higher
* Have installed npm version 6.14 or higher
* Have Angular CLI version 12 or higher installed.
## Run
* To install the packages required for the application deployment, the ``npm i`` command is used. This should be done in the backend and frontend folder.
* Cargar las colecciones de la base de datos en MongoDB. Las colecciones se encuentran en la carpeta ``backend/collections``
* Run backend: use the ``npm run dev`` command to run the service
* Run frontend: use the ``ng serve`` command to run the service

# PIZZA API

A RESTful API using Node.js for managing Pizza ordering.

The starting point of the application is `index.js`

## Install

    npm install

## Run the app in production

    npm start

## Run the app in development

    npm run dev

## Run the app using Docker

    docker pull shubhamjr/pizza_api or build the image using dockerfile
    docker run -p 80:4000 shubhamjr/pizza_api

## Start the Local PostgressSql server

    Open the psql or any similar command line utility tool and execute the query written in
    db.sql file present on root directory of the project.

# REST API

The REST API is described below.

## Signup

### Request

`POST /auth/login`

    http://localhost:4000/api/v1/auth/signup

    {
    "name":"sheru",
    "email":"sheru2@gmail.com",
    "password":"test1234",
    "address":"abc"



### Response

    {
    "status": true,
    "message": "fetched successfully",
    "data": {
        "id": 3,
        "name": "sheru",
        "email": "sheru2@gmail.com",
        "password": "$2a$10$2O99NBQCif6pPsOuwLGBl.JfiQwsZ7Fu0EHGwrtGDpO9HVZdCkvla",
        "address": "abc"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDE1MjY2NTMsImV4cCI6MTcwMTYxMzA1M30.fdot1gxD9KzYP8LB33ubWjoEsMus43T8Q4cwve6aqcQ"



## Login

### Request

`POST /auth/login`

     http://localhost:4000/api/v1/auth/login

    {
    "email":"sheru2@gmail.com",
    "password":"test1234"



### Response

    {
    "status": true,
    "message": "fetched successfully",
    "data": {
        "id": 3,
        "name": "sheru",
        "email": "sheru2@gmail.com",
        "address": "abc",
        "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzAxNTgyMTU4LCJleHAiOjE3MDE2Njg1NTh9.VesGxbdz0MxLqE_1RMqeOvPrRKepwCRzAajZmH3JihU"



## Create order

### Request

`POST /order`

    http://localhost:4000/api/v1/order
    {
    "userId":1, "pizzaId":1, "quantity":10, "address":"ng", "totalPrice":120
    }

### Response

    Ex :

    {
    "createdOrder": [
        {
            "id": 2,
            "userid": 1,
            "pizzaid": 1,
            "quantity": 10,
            "address": "ng",
            "status": "Pending",
            "totalprice": "1230.00"
        }
    ]



## Get all orders

### Request

`GET /order/id`

### Response

    {
    "status": "succcess",
    "data": {
        "totalOrder": 2,
        "orders": [
            {
                "id": 1,
                "userid": 1,
                "pizzaid": 1,
                "quantity": 10,
                "address": "ng",
                "status": "delivered",
                "totalprice": "120.00",
                "username": "sheru",
                "pizza_type": "chilly"
            },
            {
                "id": 2,
                "userid": 1,
                "pizzaid": 1,
                "quantity": 10,
                "address": "ng",
                "status": "Pending",
                "totalprice": "1230.00",
                "username": "sheru",
                "pizza_type": "chilly"
            }
        ]
    }



## Update Order

### Request

`PATCH /order/id`

    http://localhost:4000/api/v1/order/{id}
    {
    "status":"delivered"
    }

### Response

    {
    "status": "succcess",
    "data": [
        {
            "id": 1,
            "userid": 1,
            "pizzaid": 1,
            "quantity": 10,
            "address": "ng",
            "status": "delivered",
            "totalprice": "120.00"
        }
    ]



## Cancel Order

### Request

`DELETE /order/id`

    http://localhost:4000/api/v1/order/{id}

### Response

    Ex :
    {
    "status": "success",
    "message":"cancelled successfully"
    }

## Get all pizzas

### Request

`GET /pizzas`

### Response

    {
    "totalPizza": 1,
    "pizzas": [
        {
            "id": 1,
            "type": "chilly",
            "description": "very masaala",
            "price": "123.00"
        }
    ]



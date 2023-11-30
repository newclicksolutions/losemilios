## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

//export RUNNER_ALLOW_RUNASROOT="1"

## Support

Newclicksoluciones

## Stay in touch nestjs framework

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## REST-API

```bash

Pruebe la API con http://localhost:4000/api/v1/
```

## Respuestas

la api devuelve una respuesta JSON en el siguiente formato:

```bash
{
  "message" : string,
  "success" : bool,
  "data"    : string
}
```

Mostrar todos los usuarios

Devuelve datos json sobre todos los usuarios.

URL

/users

Method:

GET

URL Params

None

Data Params

None

Success Response:

Code: 200
Content:

```bash

   {
       "user_id": 6,
       "name": "Rolando Barberi",
       "last_name": "rolandobarberi",
       "phone": "34554345",
       "email": "web@marketinghotelero.co",
       "user_login": "rolandobarberi",
       "user_pass": "$P$BiskqP84rD6ltHP7nqHaD26hclK3kx1",
       "user_status": 0,
       "user_registered": "2020-04-25T07:54:54.000Z",
       "client_type_id": {
           "client_type_id": 1,
           "client_type_name": "comprador"
       },
       "user_type_id": {
           "user_type_id": 2,
           "user_type_name": "usuario Administrador"
       }
   }

```

Mostrar un usuario

Devuelve datos json sobre un solo usuario.

URL

/users/:id

Method:

GET

URL Params

Required:

id=[integer]

Data Params

None

Success Response:

Code: 200
Content:

```bash

   {
       "user_id": 6,
       "name": "Rolando Barberi",
       "last_name": "rolandobarberi",
       "phone": "34554345",
       "email": "web@marketinghotelero.co",
       "user_login": "rolandobarberi",
       "user_pass": "$P$BiskqP84rD6ltHP7nqHaD26hclK3kx1",
       "user_status": 0,
       "user_registered": "2020-04-25T07:54:54.000Z",
       "client_type_id": {
           "client_type_id": 1,
           "client_type_name": "comprador"
       },
       "user_type_id": {
           "user_type_id": 2,
           "user_type_name": "usuario Administrador"
       }
   }

```

Crear usuario

URL

/users

Method:

POST

URL Params

none:

Data Params

```bash

   {
       "name": "Rolando Barberi",
       "last_name": "rolandobarberi",
       "phone": "34554345",
       "email": "web@marketinghotelero.co",
       "user_login": "rolandobarberi",
       "user_pass": "$P$BiskqP84rD6ltHP7nqHaD26hclK3kx1",
       "user_status": 0,
       "client_type_id": {
           "client_type_id": 1,
       },
       "user_type_id": {
           "user_type_id": 2,
       }
   }

```

Success Response:

Code: 200
Content:

```bash

   { success : "User create successfully" }

```

Update usuario

URL

/users

Method:

PUT

URL Params

none:

Data Params:
se debe poner en el json data el user_id

```bash
   {
       "user_id": 1,
       "name": "Rolando Barberi",
       "last_name": "rolandobarberi",
       "phone": "34554345",
       "email": "web@marketinghotelero.co",
       "user_login": "rolandobarberi",
       "user_pass": "",
       "user_status": 0,
       "client_type_id": {
           "client_type_id": 1,
       },
       "user_type_id": {
           "user_type_id": 2,
       }
   }

```

Success Response:

Code: 200
Content:

```bash

   { success : "User Update successfully" }

```

Delete usuario

URL

/users/:id

Method:

DELETE

URL Params

Required:

id=[integer]

Data Params:

none

Success Response:

Code: 200
Content:

```bash

   { success : "User Delete successfully" }

```

Mostrar tipos de usuarios

Devuelve datos json sobre todos los tipos de usuarios.

URL

/usertype

Method:

GET

URL Params

None

Data Params

None

Success Response:

Code: 200
Content:

```bash

    {
        "user_type_id": 1,
        "user_type_name": "Super administrador"
    },
    {
        "user_type_id": 2,
        "user_type_name": "usuario Administrador"
    },
    {
        "user_type_id": 3,
        "user_type_name": "usuario comprador"
    },
    {
        "user_type_id": 4,
        "user_type_name": "Repartidor"
    }


```

Crear tipo de usuario

URL

/usertype

Method:

POST

URL Params

none:

Data Params

```bash

    {

        "user_type_name": "test administrador"
    }


```

Data param para crear mas de un tipo de usuario

```bash

 [
     {
        "user_type_name": "test administrador"
    },
    {

        "user_type_name": "test administrador 2"
    }

]

```

Success Response:

Code: 200
Content:

```bash

   { success : "User type create successfully" }

```

Mostrar tipos de cliente

Devuelve datos json sobre todos los tipos de cliente

URL

/typeclient

Method:

GET

URL Params

None

Data Params

None

Success Response:

Code: 200
Content:

```bash


    {
        "client_type_id": 1,
        "client_type_name": "comprador"
    },
    {
        "client_type_id": 2,
        "client_type_name": "vendedor"
    },

```

Crear tipo de cliente

URL

/typeclient

Method:

POST

URL Params

none:

Data Params

```bash

    {

        "client_type_name": "test client"
    }


```

Data param para crear mas de un tipo de cliente

```bash

 [
     {
        "user_type_name": "test client"
    },
    {

        "user_type_name": "test client 2"
    }

]

```

Success Response:

Code: 200
Content:

```bash

   { success : "Client type create successfully" }

```

Crear orden

URL

/order

Method:

POST

URL Params

none:

Data Params

```bash

  {
        "order_date": "2020-03-19T05:00:00.000Z",
        "date_created": "2020-05-31T03:23:49.000Z",
        "product_qty": 23,
        "tax_amount": 60,
        "shipped_date": "2020-03-19T05:00:00.000Z",
        "shipping_amount": 40,
        "total_sale": 350,
        "shipping": "[{json con iformacion del shipping}]",
        "ship": "[{json con iformacion del ship}]",}
        "User": {
            "user_id": 15
        },
        "OrderStatus": {
            "order_status_id": 1
        },
        "Paymethod": [
            {
                "paymethod_id": 1
            }
        ],
        "Product": [
            {
                "product_id": 2
            },
            {
                "product_id": 5

            }
        ]
    }

```

Success Response:

Code: 200
Content:

```bash

   { response : "json con la data del a orden creada y su id" }

```

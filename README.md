# FoodFabric API Spec

## Running API tests locally

To locally run the provided Postman collection against your backend, execute:

```
APIURL=http://localhost:3000/api
```

## Considerations for your backend with [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

If the backend is about to run on a different host/port than the frontend, make sure to handle `OPTIONS` too and return correct `Access-Control-Allow-Origin` and `Access-Control-Allow-Headers` (e.g. `Content-Type`).

### Authentication Header:

`Authorization: Token jwt.token.here`

## JSON Objects returned by API:

Make sure the right content type like `Content-Type: application/json; charset=utf-8` is correctly returned.

### Users (for authentication)

```JSON
{
  "user": {
    "email": "jake@jake.jake",
    "phone": "phone",
    "name": "jake",
    "surname": "surname",
    "secondName": "secondName",
    "password": "password",
    "cart": {
      "items": [
        {
          "count":  0,
          "productId": "productId"
        }
      ]
    },
    "image": null
  }
}
```

### Profile

```JSON
{
  "profile": {
     "name": "jake",
     "surname": "surname",
     "secondName": "secondName",
     "image": "https://static.productionready.io/images/smiley-cyrus.jpg"
  }
}
```

### Single Product

```JSON
{
 "product": {
     "slug": "how-to-train-your-dragon",
     "title": "How to train your dragon",
     "price": "price",
     "active": true,
     "categoryId": "categoryId",
     "composition": {
       "name": "name"
     },
     "weight": 100,
     "images": [
       "https://static.productionready.io/images/smiley-cyrus.jpg",
       "https://static.productionready.io/images/smiley-cyrus.jpg",
       "https://static.productionready.io/images/smiley-cyrus.jpg"
     ],
     "description": "Ever wonder how?",
     "createdAt": "2016-02-18T03:22:56.637Z",
     "updatedAt": "2016-02-18T03:48:35.824Z",
     "favorited": false,
     "favoritesCount": 0
   }
}
```

### Multiple Products

```JSON
{
  "products":[{
   "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "price": "price",
    "active": true,
    "categoryId": "categoryId",
    "composition": {
      "name": "name"
    },
    "weight": 100,
    "images": [
      "https://static.productionready.io/images/smiley-cyrus.jpg",
      "https://static.productionready.io/images/smiley-cyrus.jpg",
      "https://static.productionready.io/images/smiley-cyrus.jpg"
    ],
    "description": "Ever wonder how?",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0
  }, {
    "slug": "how-to-train-your-dragon",
     "title": "How to train your dragon",
     "price": "price",
     "active": true,
     "categoryId": "categoryId",
     "composition": {
       "name": "name"
     },
     "weight": 100,
     "images": [
       "https://static.productionready.io/images/smiley-cyrus.jpg",
       "https://static.productionready.io/images/smiley-cyrus.jpg",
       "https://static.productionready.io/images/smiley-cyrus.jpg"
     ],
     "description": "Ever wonder how?",
     "createdAt": "2016-02-18T03:22:56.637Z",
     "updatedAt": "2016-02-18T03:48:35.824Z",
     "favorited": false,
     "favoritesCount": 0
  }],
  "productsCount": 2
}
```


### Single Category

```JSON
{
 "category": {
     "slug": "category-slug",
     "title": "category",
     "products": [
       {
         "productId": "productId"
       }
     ],
     "active": true,
     "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
     "createdAt": "2016-02-18T03:22:56.637Z",
     "updatedAt": "2016-02-18T03:48:35.824Z"
   }
}
```

### Multiple Category

```JSON
{
  "categories":[{
       "slug": "category-slug",
        "title": "category",
        "products": [
          {
            "productId": "productId"
          }
        ],
        "active": true,
        "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
        "createdAt": "2016-02-18T03:22:56.637Z",
        "updatedAt": "2016-02-18T03:48:35.824Z"
  }, {
        "slug": "category-slug",
         "title": "category",
         "products": [
           {
             "productId": "productId"
           }
         ],
         "active": true,
         "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
         "createdAt": "2016-02-18T03:22:56.637Z",
         "updatedAt": "2016-02-18T03:48:35.824Z"
}],
  "categoriesCount": 2
}
```

### Basket

```JSON
{
 "basket": {
     "id": "id",
     "products": [
       {
         "productId": "productId",
         "count": 10
       }
     ],
     "price": 100,
     "userId": "userId",
     "discount": 30,
     "coupon": "coupon",
     "delivery": true,
     "createdAt": "2016-02-18T03:22:56.637Z"
   }
}
```

### Order

```JSON
{
  "order": {
      "id": "id",
      "info": "basketId",
      "status": "status",
      "createdAt": "2016-02-18T03:22:56.637Z",
      "orderNumber": "orderNumber"
    }
}
```

### Multiple Order

```JSON
{
  "orders":[{
   "id": "id",
    "info": "basketId",
    "status": "status",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "orderNumber": "orderNumber"
  }, {
   "id": "id",
   "info": "basketId",
   "status": "status",
   "createdAt": "2016-02-18T03:22:56.637Z",
   "orderNumber": "orderNumber"
  }],
  "ordersCount": 2
}
```

### Place

```JSON
{
  "title:": "place",
     "address": "address",
     "info": "info",
     "email": "email",
     "phone": "phone",
     "director": "director",
     "description": "description",
     "createdAt": "2016-02-18T03:22:56.637Z"
}
```

### FeedBack

```JSON
{
  "feedback": {
      "name:": "name",
      "email": "email",
      "subject": "subject",
      "message": "message",
      "agreement": true,
      "status": "status",
      "createdAt": "2016-02-18T03:22:56.637Z"
    }
}
```


### Multiple Feedback

```JSON
{
  "feedback":[{
    "name:": "name",
    "email": "email",
    "subject": "subject",
    "message": "message",
    "agreement": true,
    "status": "status",
    "createdAt": "2016-02-18T03:22:56.637Z"
  }, {
     "name:": "name",
     "email": "email",
     "subject": "subject",
     "message": "message",
     "agreement": true,
     "status": "status",
     "createdAt": "2016-02-18T03:22:56.637Z"
  }],
  "feedbackCount": 2
}
```

### Coupon

```JSON
{
  "coupon": {
      "id": "id",
      "name:": "name",
      "expire": "2016-02-18T03:22:56.637Z",
      "type": "type",
      "count": 10
    }
}
```


### Multiple Coupon

```JSON
{
  "coupons":[{
     "id": "id",
     "name:": "name",
     "expire": "2016-02-18T03:22:56.637Z",
     "type": "type",
     "count": 10
  }, {
     "id": "id",
     "name:": "name",
     "expire": "2016-02-18T03:22:56.637Z",
     "type": "type",
     "count": 10
  }],
  "couponsCount": 2
}
```

### Errors and Status Codes

If a request fails any validations, expect a 422 and errors in the following format:

```JSON
{
  "errors":{
    "body": [
      "can't be empty"
    ]
  }
}
```

#### Other status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request


## Endpoints:

### Authentication:

`POST /api/users/login`

Example request body:
```JSON
{
  "user":{
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

No authentication required, returns a [User](#users-for-authentication)

Required fields: `email`, `password`


### Registration:

`POST /api/users`

Example request body:
```JSON
{
  "user":{
    "email": "jake@jake.jake",
    "name": "jake",
    "surname": "surname",
    "secondName": "secondName",
    "password": "password"
  }
}
```

No authentication required, returns a [User](#users-for-authentication)

Required fields: `email`, `name`, `surname`, `password`


### Get Current User

`GET /api/user`

Authentication required, returns a [User](#users-for-authentication) that's the current user


### Update User

`PUT /api/user`

Example request body:
```JSON
{
  "user":{
       "email": "jake@jake.jake",
       "phone": "phone",
       "name": "jake",
       "surname": "surname",
       "secondName": "secondName",
       "password": "password",
        "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
```

Authentication required, returns the [User](#users-for-authentication)

Required fields: `email`, `name`, `surname`, `secondName`, `password`
Accepted fields: `password`, `image`

### Get Profile

`GET /api/profiles/:userId`

Authentication optional, returns a [Profile](#profile)


### List Category

`GET /api/categories`

Returns most recent products globally by default, provide `price` query parameter to filter results

Limit number of products (default is 20):

`?limit=20`

Offset/skip number of products (default is 0):

`?offset=0`

Authentication optional, will return [multiple categories](#multiple-category), ordered by most recent first


### Get Category

`GET /api/category/:slug`

No authentication required, will return [single article](#single-category)

### Create Category

`POST /api/category`

Example request body:

```JSON
{
  "category": {
      "title": "category",
      "image": "https://static.productionready.io/images/smiley-cyrus.jpg"
    }
}
```

Authentication required, will return an [Category](#single-category)

Required fields: `title`; 

The `title` is unique;

Optional fields: `images`;


### Update Product

`PUT /api/products/:slug`

Example request body:

```JSON
{
   "category": {
       "title": "category",
       "active": true,
       "image": "https://static.productionready.io/images/smiley-cyrus.jpg"
     }
}
```

Authentication required, returns the updated [Category](#single-category)

Required fields: `title`;

Optional fields: `images`, `active`;

The `slug` also gets updated when the `title` is changed;
The `title` is unique;


### Delete Category

`DELETE /api/category/:slug`

Authentication required

The Category can't deleted, if Category.products has any product;

### List Products

`GET /api/products`

Returns most recent products globally by default, provide `price` query parameter to filter results

Query Parameters:

Filter by price:

`?price=desc`

Limit number of products (default is 20):

`?limit=20`

Offset/skip number of products (default is 0):

`?offset=0`

Authentication optional, will return [multiple products](#multiple-products), ordered by most recent first


### Get Product

`GET /api/products/:slug`

No authentication required, will return [single product](#single-product)

### Create Product

`POST /api/products`

Example request body:

```JSON
{
  "product": {
       "title": "How to train your dragon",
        "price": "price",
        "categoryId": "categoryId",
        "composition": {
          "name": "name"
        },
        "weight": 100,
        "images": [
          "https://static.productionready.io/images/smiley-cyrus.jpg",
          "https://static.productionready.io/images/smiley-cyrus.jpg",
          "https://static.productionready.io/images/smiley-cyrus.jpg"
        ],
        "description": "Ever wonder how?"
  }
}
```

Authentication required, will return an [Product](#single-product)

Required fields: `title`, `description`, `price`, `categoryId`, `composition`, `weight`

Optional fields: `images` as an array of Strings


### Update Product

`PUT /api/products/:slug`

Example request body:

```JSON
{
  "product": {
    "title": "How to train your dragon",
    "price": "price",
    "categoryId": "categoryId",
    "composition": {
      "name": "name"
    },
    "weight": 100,
    "images": [
      "https://static.productionready.io/images/smiley-cyrus.jpg",
      "https://static.productionready.io/images/smiley-cyrus.jpg",
      "https://static.productionready.io/images/smiley-cyrus.jpg"
    ],
    "description": "Ever wonder how?"
  }
}
```

Authentication required, returns the updated [Product](#single-product)

Required fields: `title`, `description`, `price`, `categoryId`, `composition`, `weight`

Optional fields: `images` as an array of Strings

The `slug` also gets updated when the `title` is changed


### Delete Product

`DELETE /api/products/:slug`

Authentication required

### Favorite Product

`POST /api/products/:slug/favorite`

Authentication required, returns the [Product](#single-product)

No additional parameters required


### Unfavorite Product

`DELETE /api/products/:slug/favorite`

Authentication required, returns the [Product](#single-product)

No additional parameters required


### Get Basket

`GET /api/:basketId`

Authentication optional, will return [Basket](#basket)

### Create Basket

`POST /api/basket`

Example request body:

```JSON
{
  "basket": {
      "products": [
        {
          "productId": "productId",
          "count": 10
        }
      ],
      "coupon": "coupon",
      "delivery": true
    }
}
```

Authentication optional, will return an [Basket](#basket)

Required fields: `products`, `delivery`;

Optional fields: `coupon`;


### Update Basket

`PUT /api/basketId`

Example request body:

```JSON
{
   "basket": {
        "products": [
          {
            "productId": "productId",
            "count": 10
          }
        ],
        "coupon": "coupon",
        "delivery": true
      }
}
```

Authentication optional, will return an [Basket](#basket)

Required fields: `products`, `delivery`;

Optional fields: `coupon`;


### Delete Basket

`DELETE /api/basketId`

Authentication optional




### Get Order

`GET /api/:orderId`

Authentication required with `ADMIN or authentication USER` role, will return [Order](#order)

### Create Order

`POST /api/order/:basketId`

Authentication optional, will return an [Order](#order)

### Update Order

`PUT /api/orderId`

Example request body:

```JSON
{
   "order": {
       "status": "status"
      }
}
```

Authentication required with `ADMIN` role, will return an [Order](#order)

Required fields: `status`


### Delete Order

`DELETE /api/orderId`

Authentication required with `ADMIN`


### Get Place

`GET /api/:placeId`

Authentication required with `ADMIN` role, will return [Place](#place)

### Create Place

`POST /api/place`

Example request body:

```JSON
{
  "place": {
      "title:": "place",
      "address": "address",
      "info": "info",
      "email": "email",
      "phone": "phone",
      "director": "director",
      "description": "description"
    }
}
```

Required fields: `title`, `address`, `info`, `email`, `phone`, `director`, `description`

Authentication required with `ADMIN` role, will return an [Place](#place)

### Update Place

`PUT /api/placeId`

Example request body:

```JSON
{
  "place": {
      "title:": "place",
      "address": "address",
      "info": "info",
      "email": "email",
      "phone": "phone",
      "director": "director",
      "description": "description"
    }
}
```

Required fields: `title`, `address`, `info`, `email`, `phone`, `director`, `description`

Authentication required with `ADMIN` role, will return an [Place](#place)


### Delete Place

`DELETE /api/placeId`

Authentication required with `ADMIN` role, will return an [Place](#place)



### Get Feedback

`GET /api/feedbackId`

Authentication required with `ADMIN` role, will return [Feedback](#feedback)

### Create Feedback

`POST /api/feedback`

Example request body:

```JSON
{
  "feedback": {
      "name:": "name",
      "email": "email",
      "subject": "subject",
      "message": "message",
      "agreement": true
    }
}
```

Required fields: `name`, `email`, `subject`, `message`, `agreement`

Authentication optional, will return an [Feedback](#feedback)

### Update Feedback

`PUT /api/feedbackId`

Example request body:

```JSON
{
  "feedback": {
     "status": "status"
    }
}
```

Required fields: `status`

Authentication required with `ADMIN` role, will return an [Feedback](#feedback)

### List Feedback

`GET /api/feedback`

Returns most recent products globally by default, provide `status` query parameter to filter results

Query Parameters:

Filter by status:

`?status=new`

Limit number of products (default is 20):

`?limit=20`

Offset/skip number of products (default is 0):

`?offset=0`

Authentication required with `ADMIN` role, will return [Feedback](#multiple-feedback), ordered by most recent first





### Get Coupon

`GET /api/:couponId`

Authentication optional, will return [Coupon](#coupon)

### Create Coupon

`POST /api/coupon`

Example request body:

```JSON
{
  "coupon": {
      "name:": "name",
      "expire": "2016-02-18T03:22:56.637Z",
      "type": "type",
      "count": 10
    }
}
```

Required fields: `name`, `expire`, `type`, `count`

Authentication required with `ADMIN` role, will return an [Coupon](#coupon)

### Update Coupon

`PUT /api/couponId`

Example request body:

```JSON
{
  "coupon": {
    "name:": "name",
    "expire": "2016-02-18T03:22:56.637Z",
    "type": "type",
    "count": 10
    }
}
```

Required fields: `name`, `expire`, `type`, `count`

Authentication required with `ADMIN` role, will return an [Coupon](#coupon)

### List Coupon

`GET /api/coupon`

Returns most recent products globally by default, provide  query parameter to filter results

Query Parameters:

Limit number of products (default is 20):

`?limit=20`

Offset/skip number of products (default is 0):

`?offset=0`

Authentication required with `ADMIN` role, will return [Coupon](#multiple-coupon), ordered by most recent first

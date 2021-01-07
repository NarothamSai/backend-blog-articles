Requirements: 
1.node
2.mongodb

``` npm install```
``` npm start```

## APIs [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/fb392e00f24328b20c0d)

Common Endpoint: ```localhost:3000/api```

### User

1. Signup user

```
Endpoint : /user/signup
METHOD: POST
```

2. Login User 

```
Endpoint : /user/login
METHOD: PUT
```

3. Get user details
```
Endpoint : /user/
METHOD: GET
Authoristation :Bearer <jwt>
```

### Article
1. Publish Article
```
Endpoint : /article/publish
METHOD: POST
Authoristation :Bearer <jwt>
```
2. Get All Articles for Homepage
```
Endpoint : /article/
METHOD: GET
```
3. Get One article
```
Endpoint : /article/<article_id>
METHOD: GET
```

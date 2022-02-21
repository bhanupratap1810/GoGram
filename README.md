# GoGram

### How to run locally
- Run docker desktop
- Run `docker run -p 27017:27017 mongo` in your terminal for mongoDb
- Clone this repository and run `npm install` in your terminal
- Create a `.env` file and set `DB_CONNECTION`, `PORT` and `TOKEN_SECRET`
- Create `uploads/postsImages` and `uploads/profilePic` directories in the base repository as shown below.
    <img width="347" alt="Screenshot 2022-02-21 at 12 00 20 PM" src="https://user-images.githubusercontent.com/52910511/154901408-3383a662-5aaa-4473-9c04-9237b1933a35.png">
- Run `npm start` in your terminal to start the server

## cURLs
### register cURL:
```bash
curl --location --request POST 'http://localhost:3000/api/v1/auth/register' \
--header 'file;' \
--form 'image=@"/Users/bhanupratapsingh/Desktop/Screenshot 2022-02-18 at 3.48.15 PM.png"' \
--form 'name="bhanu pratap"' \
--form 'email="bhanupratap@mailinator.com"' \
--form 'password="Password1@"'
```

### url to see your profile pic:
```bash
http://localhost:3000/profile-pic/{profilePic.address}
```

### login cURL
```bash
curl --location --request POST 'http://localhost:3000/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "bhanupratap@mailinator.com",
    "password": "Password1@"
}'
```

### reset password cURL
```bash
curl --location --request POST 'http://localhost:3000/api/v1/auth/reset-password' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmhhbnUgcHJhdGFwIHNpbmdoIiwiaWQiOiI2MjExZjAyZDQ5MThjOWNjYjVlYWEzZDYiLCJpYXQiOjE2NDUzNDQxMDR9.t-MusfLkcD1xwGagRBgqbYGoBwkigSrHwKF9goyztD8' \
--header 'Content-Type: application/json' \
--data-raw '{
    "password": "Password2@"
}'
```

### forgot password cURL
```bash
curl --location --request POST 'http://localhost:3000/api/v1/auth/forgot-password' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "bhanupratap@mailinator.com",
    "password": "Password3@"
}'
```

### logout cURL
```bash
curl --location --request POST 'http://localhost:3000/api/v1/auth/logout' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmhhbnUgcHJhdGFwIiwiaWQiOiI2MjExZjAyZDQ5MThjOWNjYjVlYWEzZDYiLCJpYXQiOjE2NDUzNDM1OTN9.XI5YJzf5f0l_vG-Qb5Mf86otkz_PYrU-21_K_jF1ZpU'
```

### get user details cURL
```bash
curl --location --request GET 'http://localhost:3000/api/v1/user/me' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmhhbnUgcHJhdGFwIiwiaWQiOiI2MjExZjAyZDQ5MThjOWNjYjVlYWEzZDYiLCJpYXQiOjE2NDUzNDM1OTN9.XI5YJzf5f0l_vG-Qb5Mf86otkz_PYrU-21_K_jF1ZpU'
```

### update user details cURL
```bash
curl --location --request PATCH 'http://localhost:3000/api/v1/user' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmhhbnUgcHJhdGFwIiwiaWQiOiI2MjExZjAyZDQ5MThjOWNjYjVlYWEzZDYiLCJpYXQiOjE2NDUzNDM1OTN9.XI5YJzf5f0l_vG-Qb5Mf86otkz_PYrU-21_K_jF1ZpU' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "bhanu pratap singh"
}'
```

### cURL to make a post
```bash
curl --location --request POST 'http://localhost:3000/api/v1/posts/' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmhhbnUgcHJhdGFwIiwiaWQiOiI2MjExZjAyZDQ5MThjOWNjYjVlYWEzZDYiLCJpYXQiOjE2NDUzNDM1OTN9.XI5YJzf5f0l_vG-Qb5Mf86otkz_PYrU-21_K_jF1ZpU' \
--form 'image=@"/Users/bhanupratapsingh/Downloads/RENT RECEIPT.jpg"' \
--form 'description="rent reciept three"'
```

### url to see your post pic:
```bash
http://localhost:3000/posts-images/{postImageAddress}
```

### cURL to see your own posts
```bash
curl --location --request GET 'http://localhost:3000/api/v1/posts/me' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmhhbnUgcHJhdGFwIiwiaWQiOiI2MjExZjAyZDQ5MThjOWNjYjVlYWEzZDYiLCJpYXQiOjE2NDUzNDM1OTN9.XI5YJzf5f0l_vG-Qb5Mf86otkz_PYrU-21_K_jF1ZpU'
```

### cURL to see all the posts on network [infinite scrolling]
```bash
curl --location --request GET 'http://localhost:3000/api/v1/posts?offset=1&count=2' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmhhbnUgcHJhdGFwIiwiaWQiOiI2MjExZjAyZDQ5MThjOWNjYjVlYWEzZDYiLCJpYXQiOjE2NDUzNDM1OTN9.XI5YJzf5f0l_vG-Qb5Mf86otkz_PYrU-21_K_jF1ZpU'
```

### cURL to delete your own post
```bash
curl --location --request DELETE 'http://localhost:3000/api/v1/posts/{postId}' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmhhbnUgcHJhdGFwIiwiaWQiOiI2MjExZjAyZDQ5MThjOWNjYjVlYWEzZDYiLCJpYXQiOjE2NDUzNDM1OTN9.XI5YJzf5f0l_vG-Qb5Mf86otkz_PYrU-21_K_jF1ZpU'
```

### cURL to like a post
```bash
curl --location --request POST 'http://localhost:3000/api/v1/posts/{postId}/like' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaHJzcmtpb3AzIiwiaWQiOiI2MjExMTMzNjIwMjRlNTIxZmM1ZDFjODgiLCJpYXQiOjE2NDUyODgwMTh9.5fUHw-LhKup4ls-_xcBMDKT0EA-hpBrmsdCUXnkHQn4'
```

### cURL to comment on a post
```bash
curl --location --request POST 'http://localhost:3000/api/v1/posts/{postId}/comment' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaHJzcmtpb3AzIiwiaWQiOiI2MjExMTMzNjIwMjRlNTIxZmM1ZDFjODgiLCJpYXQiOjE2NDUyODgwMTh9.5fUHw-LhKup4ls-_xcBMDKT0EA-hpBrmsdCUXnkHQn4' \
--header 'Content-Type: application/json' \
--data-raw '{
    "comment":"test comment 1"
}'
```

### cURL to get users' daily analytics
```bash
curl --location --request GET 'http://localhost:3000/api/v1/user/analytics' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmhhbnUgcHJhdGFwIiwiaWQiOiI2MjExZjAyZDQ5MThjOWNjYjVlYWEzZDYiLCJpYXQiOjE2NDUzNDM1OTN9.XI5YJzf5f0l_vG-Qb5Mf86otkz_PYrU-21_K_jF1ZpU'
```

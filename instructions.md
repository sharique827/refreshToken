### API Documentation
# setup

Add the keys in .env file as mentioned in .env.schema

### Table of Contents

# 1. User Endpoints

POST    auth/register
POST    auth/login

## User Endpoints

# POST auth/register
Register a new user.
Request Body:

Provide the necessary details of the post in the request body.
`email` (string, required): The email address of the user.
`password` (string, required): The password for the user.
`username` (string, required): The username for thr user
Response:
created user data with following status

201 Created: Returns an empty response body if the post is created successfully.
400 Bad Request: If the request body is missing or invalid.

# POST auth/login
Provide the necessary details of the post in the request body.
`email` (string, required): The email address of the user.
`password` (string, required): The password for the user.

Response:

200 OK: Returns the access token and userId in the response body.

# 2. Blog Endpoints

GET     blog/posts
GET     blog/posts/{id}
POST    blog/posts
PUT     blog/posts/{id}
DELETE  blog/posts/{id}

## Blog Endpoints

# GET blog/posts
Retrieve all blog posts.

`Parameters`:

`category (optional)`: Filter posts by category.
Response:

200 OK: Returns an array of post objects in the response body.
204 No Content: If no posts are found or the category filter doesn't match any posts.
# GET blog/posts/{id}
Retrieve a specific post by its ID.

`Parameters`:

`id`: The ID of the post to retrieve.
Response:

200 OK: Returns the post object in the response body.
404 Not Found: If the post with the given ID is not found.
# POST blog/posts
Create a new blog post.
Request Body:

Provide the necessary details of the post in the request body.
`blog`: blog to be posted
`category`: category related to blog
Response:

201 Created: Returns an empty response body if the post is created successfully.
400 Bad Request: If the request body is missing or invalid.
# PUT blog/posts/{id}
Update an existing post by its ID.

`Parameters`:

`id`: The ID of the post to update.
Request Body:

Provide the updated details of the post in the request body.
`blog`: blog to be posted
`category`: category related to blog
Response:

200 OK: Returns an empty response body if the post is updated successfully.
400 Bad Request: If the request body is missing or invalid.
404 Not Found: If the post with the given ID is not found.
# DELETE /posts/{id}
Delete a post by its ID.

`Parameters`:

`id`: The ID of the post to delete.
Response:

204 No Content: Returns an empty response body if the post is deleted successfully.
404 Not Found: If the post with the given ID is not found.

# A Task Manager System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
A simple task management system built in Node.js that allows the creation and modification of tasks by users registered on the platform.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Testing](#testing)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Hizaram/task-manager-system.git
```
2. Install dependencies:
```bash
npm install
```
## Usage

### Configuration
- Create a Mongodb database

- Configure the database connection in the `.env` file:
```env
MONGODB_URI=your_mongodb_uri
```

- Generate a secret key for JWT authentication and set its expiry time in the `.env` file:
```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN="time"
```

## ENDPOINTS
## AUTHENTICATION ENDPOINTS
### Signup (As a user):
- Method: POST
- URL: `http://localhost:3000/auth/signup`
- Body (raw JSON);
```json
{
  "username": "your_username",
  "email": "your_email",
  "password": "your_password"
}
```
### Login (To get JWToken):
- Method: POST
- URL: `http://localhost:3000/auth/login`
- Body (raw JSON);
```json
{
  "email": "your_registered_email",
  "password": "your_password"
}
```

## TASKS ENDPOINTS
### Create a Task (Protected)
- Method: POST
- URL: `http://localhost:3000/tasks`
- Headers:
  * `Content-Type: application/json`
  * `Authorization: Bearer {your_jwtoken}`
- Body (raw JSON):
```json
{
  "name": "",
  "description": ""
}
```
### Update Task Information (Protected)
- Method: PUT
- URL: `http://localhost:3000/tasks/{task_id}`
- Headers:
  * `Content-Type: application/json`
  * `Authorization: Bearer {your_jwtoken}`
- Body (raw JSON):
```json
{
 "name": "",
 "description": ""
}
```
### Fetch Tasks (Protected):
- Method: GET
- URL: `http://localhost:3000/tasks`
- Headers:
  * `Content-Type: application/json`
  * `Authorization: Bearer {your_jwtoken}`

### Fetch a Task (Protected):
- Method: GET
- URL: `http://localhost:3000/tasks/{task_id}`
- Headers:
  * `Content-Type: application/json`
  * `Authorization: Bearer {your_jwtoken}`

### Delete a Task (Protected):
- Method: DELETE
- URL: `http://localhost:3000/tasks`
- Headers:
  * `Content-Type: application/json`
  * `taskid: {task_id}`
  * `Authorization: Bearer {your_jwtoken}`

## USER ENDPOINTS
### Fetch Users (Protected):
- Method: GET
- URL: `http://localhost:3000/users`
- Headers:
  * `Content-Type: application/json`
  * `Authorization: Bearer {your_jwtoken}`

### Fetch a User (Protected):
- Method: GET
- URL: `http://localhost:3000/tasks/{user_id}`
- Headers:
  * `Content-Type: application/json`
  * `Authorization: Bearer {your_jwtoken}`

### Delete a User (Protected):
- Method: DELETE
- URL: `http://localhost:3000/users`
- Headers:
  * `Content-Type: application/json`
  * `taskid: {user_id}`
  * `Authorization: Bearer {your_jwtoken}`

## Authentication
This project uses JWT for authentication. Make sure to include the JWT token in the `Authorization` header for protected routes.

## Testing
Testing is done through Postman or cURL

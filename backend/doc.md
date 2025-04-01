# Boboo API Documentation

## Introduction
Welcome to the documentation for the Boboo API. This API provides endpoints for user authentication, managing projects and tasks. 

## Base URL
The base URL for all API endpoints is `http://127.0.0.1:8000/api`.

## Authentication
Authentication is required for certain endpoints using JWT Authentication.

### Basic Authentication
To authenticate requests, use JWT Authentication. Provide your Cookie files containing access and refresh tokens with each request.

## Error Handling (new)
The API uses standard HTTP status codes to indicate the success or failure of an API request. Additionally, error responses will include a JSON object with a message field providing more details about the error.

## Endpoints

### User authentication
The base URL for user authentication endpoints is `http://127.0.0.1:8000/api/users`.

#### Auth with Google
- **Method:** POST
- **URL:** `/google-login/`
- **Parameters:** JSON object of GoogleUser class.
- **Description:** Authorizes the user using Google.
- **Response:** 
  - Response with status code 200 **(new)**
  - Adds access and refresh tokens to Cookie files

#### Register not confirmed user
- **Method:** POST
- **URL:** `/send-email-confirmation-code/`
- **Description:** Creates a new user with not confirmed email, sends confirmation code to email.
- **Parameters:** JSON object of UserRegister class.
- **Response:**  **(new)**
  - Response with status code 200 or
  - HTTPException with status code 409

#### Confirm user's email
- **Method:** POST
- **URL:** `/confirm-email/`
- **Description:** Creates a new user with confirmed email.
- **Parameters:** JSON object of UserConfirmEmail class.
- **Response:** **(new)**
  - Response with status code 200 or
  - HTTPException with status code 400

#### Login user account
- **Method:** POST
- **URL:** `/login/`
- **Description:** Login user account.
- **Parameters:** JSON object of UserLogin class.
- **Response:**  **(new)**
  - Response with status code 200
  - Adds access and refresh tokens to Cookie files or 
  - HTTPException with status code 400

#### Logout user account
- **Method:** DELETE
- **URL:** `/logout/`
- **Description:** Logout user account.
- **Parameters:** Cookie files containing access and refresh tokens.
- **Response:**  **(new)**
  - Response with status code 200
  - Deletes access and refresh tokens from Cookie files

#### Update access and refresh tokens
- **Method:** POST
- **URL:** `/refresh/`
- **Description:** Updates access and refresh tokens.
- **Parameters:** Cookie files containing refresh token.
- **Response:** **(new)**
  - Response with status code 200
  - Sets new access and refresh tokens in Cookie files or
  - HTTPException with status code 401

#### Reset user account password (1)
- **Method:** POST
- **URL:** `/send-password-reset-code/`
- **Description:** Sends password reset code to user's email.
- **Parameters:**
	- `email: string` Email field with maximum length in 255 characters.
- **Response:** **(new)**
  - Response with status code 200 or
  - HTTPException with status code 400

#### Reset user account password (2)
- **Method:** POST
- **URL:** `/reset-password/`
- **Description:** Resets user account password.
- **Parameters:** JSON object of UserResetPassword class.
- **Response:** **(new)**
  - Response with status code 200 or
  - HTTPException with status code 400 or 404

#### Change user account password
- **Method:** POST
- **URL:** `/change-password/`
- **Description:** Changes user account password, logs out of user account.
- **Parameters:**
	- Cookie files containing access and refresh token.
	- JSON object of UserChangePassword class.
- **Response:** **(new)**
  - Response with status code 200 or
  - HTTPException with status code 400 or 401

### Projects (new)
The base URL for projects endpoints is `http://127.0.0.1:8000/api/projects`.

#### Get a list of projects
- **Method:** GET
- **URL:** `/get-projects-list/`
- **Description:** Provides a list of projects that the user is the creator of.
- **Parameters:** 
  - Cookie files containing access and refresh token.
- **Response:** 
  - List of JSON objects of Project class or
  - HTTPException with status code 401

#### Create project
- **Method**: POST
- **URL** `/create-project/`
- **Parameters**:
  - Cookie files containing access and refresh token.
  - `title: string` Project name field with max length in 50 characters.
- **Response:** 
  - `project_id: integer` or
  - HTTPException with status code 400 or 401

#### Edit project
- **Method**: PUT
- **URL** `/edit-project/`
- **Parameters**:
  - Cookie files containing access and refresh token.
  - JSON object of Project class.
- **Response:** 
  - Response with status code 200
  - HTTPException with status code 401 or 404

#### Delete project
- **Method**: POST
- **URL** `/delete-project/`
- **Parameters**:
  - Cookie files containing access and refresh token.
  - `project_id: integer` Unique project identifier.
- **Response:**
  - Response with status code 200
  - HTTPException with status code 401 or 404

## Data Models

### HTTPException (new)
A type of standardized Internet error.
- `details: string`

### Cookie files
- `access_token: string` Access token with an expiration time of 15 minutes.
- `refresh_token: string` Refresh token with an expiration time of 60 minutes.
  
### GoogleUser
- `username: string` Username field with length from 1 to 50 characters.
- `email: string` Email field with maximum lingth in 255 characters. 
- `photo: string` URL for getting a Google user's photo.

### UserRegister
- `username: string` Username field with length from 1 to 50 characters.
- `email: string` Email field with maximum lingth in 255 characters.
- `password: string` Password field with length from 8 to 60 characters.

### UserLogin
- `email: string` Email field with maximum length in 255 characters. 
- `password: string` Password field with length from 8 to 60 characters. 

### UserConfirmEmail
- `email: string` Email field with maximum length in 255 characters.
- `code: string` Unique confirmation code, sent to the user's email, with length in 7 characters.

### UserResetPassword
- `email: string` Email field with maximum length in 255 characters. 
- `code: string` Unique password reset code, sent to the user's email, with length in 7 characters. 
- `password: string` New user account password with length from 8 to 60 characters. 

### UserChangePassword
- `old_password: string` Old user account password with length from 8 to 60 characters. 
- `new_password: string` New user account password with length from 8 to 60 characters. 

### Project (new)
- `id: integer` Unique project identifier.
- `title: string` Project name field with max length in 50 characters.

## Conclusion
This concludes the documentation for the Boboo API. 
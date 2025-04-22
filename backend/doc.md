# Boboo API Documentation

## Introduction
Welcome to the documentation for the Boboo API. This API provides endpoints for user authentication, managing projects and tasks. 

## Base URL
The base URL for all API endpoints is `http://127.0.0.1:8000/api`.

## Authentication
Authentication is required for certain endpoints using JWT Authentication.

### Basic Authentication
To authenticate requests, use JWT Authentication. Provide your Cookie files containing access and refresh tokens with each request.

## Error Handling 
The API uses standard HTTP status codes to indicate the success or failure of an API request. Additionally, error responses will include a JSON object with a message field providing more details about the error.

## Endpoints

### User authentication
The base URL for user authentication endpoints is `http://127.0.0.1:8000/api/users`.

#### Auth with Google
- **Method:** POST
- **URL:** `/google-login/`
- **Description:** Authorizes the user using Google.
- **Parameters:** JSON object of GoogleUser class.
- **Response:** 
  - Response with status code 200 
  - Adds access and refresh tokens to Cookie files or
  - HTTPException with status code 401

#### Register not confirmed user
- **Method:** POST
- **URL:** `/send-email-confirmation-code/`
- **Description:** Creates a new user with not confirmed email, sends confirmation code to email.
- **Parameters:** JSON object of UserRegister class.
- **Response:**  
  - Response with status code 200 or
  - HTTPException with status code 409

#### Confirm user's email
- **Method:** POST
- **URL:** `/confirm-email/`
- **Description:** Creates a new user with confirmed email.
- **Parameters:** JSON object of UserConfirmEmail class.
- **Response:** 
  - Response with status code 200 or
  - HTTPException with status code 400 or 404

#### Login user account
- **Method:** POST
- **URL:** `/login/`
- **Description:** Login user account.
- **Parameters:** JSON object of UserLogin class.
- **Response:**  
  - Response with status code 200
  - Adds access and refresh tokens to Cookie files or 
  - HTTPException with status code 400

#### Logout user account
- **Method:** DELETE
- **URL:** `/logout/`
- **Description:** Logout user account.
- **Parameters:** Cookie files containing access and refresh tokens.
- **Response:**  
  - Response with status code 200
  - Deletes access and refresh tokens from Cookie files

#### Update access and refresh tokens
- **Method:** POST
- **URL:** `/refresh/`
- **Description:** Updates access and refresh tokens.
- **Parameters:** Cookie files containing refresh token.
- **Response:** 
  - Response with status code 200
  - Sets new access and refresh tokens in Cookie files or
  - HTTPException with status code 401

#### Reset user account password (1)
- **Method:** POST
- **URL:** `/send-password-reset-code/`
- **Description:** Sends password reset code to user's email.
- **Parameters:**
	- `email: string` Email field with maximum length in 255 characters.
- **Response:** 
  - Response with status code 200 or
  - HTTPException with status code 404

#### Reset user account password (2)
- **Method:** PATCH 
- **URL:** `/reset-password/`
- **Description:** Resets user account password.
- **Parameters:** JSON object of UserResetPassword class.
- **Response:** 
  - Response with status code 200 or
  - HTTPException with status code 400 or 404

#### Change user account password
- **Method:** PATCH 
- **URL:** `/change-password/`
- **Description:** Changes user account password, logs out of user account.
- **Parameters:**
	- Cookie files containing access and refresh token.
	- JSON object of UserChangePassword class.
- **Response:** 
  - Response with status code 200 or
  - HTTPException with status code 400 or 401

#### Get user information
- **Method:** GET
- **URL:** `/user-about/`
- **Parameters:**
	- Cookie files containing access and refresh token.
- **Response:**
  - JSON object of User class or
  - HTTPException with status code 401

#### Get user photo
- **Method:** GET
- **URL:** `photo` field of User class
- **Response:**
  - Binary data of the user's photo.

#### Delete user account
- **Method:** DELETE
- **URL:** `/delete-account/`
- **Parameters:**
  - Cookie files containing access and refresh tokens.
- **Response:**  
  - Response with status code 200
  - Deletes access and refresh tokens from Cookie files or
  - HTTPException with status code 401

### Projects 
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
  - HTTPException with status code 401 or 403 or 404

#### Delete project
- **Method**: DELETE
- **URL** `/delete-project/`
- **Parameters**:
  - Cookie files containing access and refresh token.
  - `project_id: integer` Unique project identifier.
- **Response:**
  - Response with status code 200
  - HTTPException with status code 401 or 403 or 404

### Tasks
The base URL for projects endpoints is `http://127.0.0.1:8000/api/tasks`.

#### Get a list of tasks for a project
- **Method:** GET
- **URL:** `/get-tasks-list/`
- **Parameters:** 
  - Cookie files containing access and refresh token.
  - `project_id: integer` Unique project identifier.
- **Response:** 
  - List of JSON objects of Task class or
  - HTTPException with status code 401 or 403 or 404

#### Create task
- **Method**: POST
- **URL** `/create-task/`
- **Parameters**:
  - Cookie files containing access and refresh token.
  - JSON object of TaskCreate class.
- **Response:** 
  - `task_id: integer` or
  - HTTPException with status code 401 or 403 or 404

#### Edit task
- **Method**: PUT
- **URL** `/edit-task/`
- **Parameters**:
  - Cookie files containing access and refresh token.
  - JSON object of TaskEdit class.
- **Response:**
  - Response with status code 200
  - HTTPException with status code 401 or 403 or 404

#### Delete task
- **Method**: DELETE
- **URL** `/delete-task/`
- **Parameters**:
  - Cookie files containing access and refresh token.
  - JSON object of TaskDelete class.
- **Response:**
  - Response with status code 200
  - HTTPException with status code 401 or 403 or 404

### Subtasks
The base URL for projects endpoints is `http://127.0.0.1:8000/api/subtasks`.

#### Create subtask
- **Method**: POST
- **URL** `/create-subtask/`
- **Parameters**:
  - Cookie files containing access and refresh token.
  - JSON object of SubtaskCreate class.
- **Response:** 
  - `subtask_id: integer` or
  - HTTPException with status code 401 or 403 or 404

#### Edit subtask
- **Method**: PUT
- **URL** `/edit-subtask/`
- **Parameters**:
  - Cookie files containing access and refresh token.
  - JSON object of SubtaskEdit class.
- **Response:**
  - Response with status code 200
  - HTTPException with status code 401 or 403 or 404

#### Delete subtask
- **Method**: DELETE
- **URL** `/delete-subtask/`
- **Parameters**:
  - Cookie files containing access and refresh token.
  - JSON object of SubtaskDelete class.
- **Response:**
  - Response with status code 200
  - HTTPException with status code 401 or 403 or 404

## Data Models

### HTTPException 
A type of standardized Internet error.
- `details: string`

### Cookie files
- `access_token: string` Access token with an expiration time of 15 minutes.
- `refresh_token: string` Refresh token with an expiration time of 60 minutes.
  
### GoogleUser
- `token: string` The user's ID token obtained from the Google OAuth response.

### User
- `username: string`
- `email: string`
- `photo: string`

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

### Project 
- `id: integer` Unique project identifier.
- `title: string` Project name field with max length in 50 characters.

### Task
- `id: integer` 
- `title: string` 
- `description: string` 
- `priority: string` 
- `deadline: date` 
- `status: string`
- `subtasks: List[Subtask]`

### TaskCreate
- `title: string` Task name field with max length in 50 characters.
- `description: string` Task description field without max length. **(Optional)**
- `priority: string` Task priority field. Can be (High | Middle | Low).
- `deadline: date` Task deadline field. Should be later than today and in the YYYY-MM-dd format. 
- `status: string` Task status field. Can be (Todo | In progress | Done).
- `project_id: integer` Project identifier that the task belongs to.
  
### TaskEdit
- `id: integer` Unique task identifier.
- `title: string` Task name field with max length in 50 characters.
- `description: string` Task description field without max length. **(Optional)**
- `priority: string` Task priority field. Can be (High | Middle | Low).
- `deadline: date` Task deadline field. Should be later than today and in the YYYY-MM-dd format. 
- `status: string` Task status field. Can be (Todo | In progress | Done).
- `project_id: integer` Project identifier that the task belongs to.

### TaskDelete
- `task_id: integer` Unique task identifier.
- `project_id: integer` Project identifier that the task belongs to.

### Subtask
- `id: integer`
- `title: string`
- `description: string`
- `completion: boolean`

### SubtaskCreate
- `title: string` Subtask name field with max length in 50 characters.
- `description: string` Subtask description field without max length. **(Optional)**
- `completion: boolean` Subtask completion status field.
- `project_id: integer` Project identifier that the subtask belongs to.
- `task_id: integer` Task identifier that the subtask belongs to.

### SubtaskEdit
- `id: integer` Unique subtask identifier.
- `title: string` Subtask name field with max length in 50 characters.
- `description: string` Subtask description field without max length. **(Optional)**
- `completion: boolean` Subtask completion status field.
- `project_id: integer` Project identifier that the subtask belongs to.
- `task_id: integer` Task identifier that the subtask belongs to.
  
### SubtaskDelete
- `id: integer` Unique subtask identifier.
- `task_id: integer` Task identifier that the subtask belongs to.
- `project_id: integer` Project identifier that the subtask belongs to.

## Conclusion
This concludes the documentation for the Boboo API. 
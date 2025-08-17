# Task Management API

## Description

The Task Management API is a RESTful API built using Node.js and Express. It provides endpoints for creating, reading, updating, and deleting tasks. Each task has a title, description, status, and due date, and the data is exchanged in JSON format.

## Installation

1. Clone the repository:
```
git clone https://github.com/your-username/task-management-api.git
```

2. Install dependencies:
```
cd task-management-api
npm install
```

3. Start the server:
```
npm start
```

The API will be running on `http://localhost:3000`.

## Endpoints

### Create a Task
**Endpoint:** `POST /tasks`
**Request Body:**
```json
{
  "title": "Finish project proposal",
  "description": "Write up the project proposal and send it to the client",
  "status": "To Do",
  "dueDate": "2023-05-15"
}
```
**Response:**
```json
{
  "id": "1",
  "title": "Finish project proposal",
  "description": "Write up the project proposal and send it to the client",
  "status": "To Do",
  "dueDate": "2023-05-15"
}
```

### Get All Tasks
**Endpoint:** `GET /tasks`
**Response:**
```json
[
  {
    "id": "1",
    "title": "Finish project proposal",
    "description": "Write up the project proposal and send it to the client",
    "status": "To Do",
    "dueDate": "2023-05-15"
  },
  {
    "id": "2",
    "title": "Implement task search",
    "description": "Add a search feature to the tasks page",
    "status": "In Progress",
    "dueDate": "2023-04-30"
  }
]
```

### Get a Task
**Endpoint:** `GET /tasks/{id}`
**Response:**
```json
{
  "id": "1",
  "title": "Finish project proposal",
  "description": "Write up the project proposal and send it to the client",
  "status": "To Do",
  "dueDate": "2023-05-15"
}
```

### Update a Task
**Endpoint:** `PUT /tasks/{id}`
**Request Body:**
```json
{
  "title": "Finish project proposal",
  "description": "Write up the project proposal and send it to the client",
  "status": "In Progress",
  "dueDate": "2023-05-15"
}
```
**Response:**
```json
{
  "id": "1",
  "title": "Finish project proposal",
  "description": "Write up the project proposal and send it to the client",
  "status": "In Progress",
  "dueDate": "2023-05-15"
}
```

### Delete a Task
**Endpoint:** `DELETE /tasks/{id}`
**Response:** No content

## User Guide

1. To create a new task, send a `POST` request to `/tasks` with the task details in the request body.
2. To view all tasks, send a `GET` request to `/tasks`.
3. To view a specific task, send a `GET` request to `/tasks/{id}`.
4. To update a task, send a `PUT` request to `/tasks/{id}` with the updated task details in the request body.
5. To delete a task, send a `DELETE` request to `/tasks/{id}`.

## API Documentation

For detailed API documentation, please refer to the [Postman collection](https://www.getpostman.com/collections/abc123def456).

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).
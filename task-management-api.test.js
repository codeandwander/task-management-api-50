const request = require('supertest');
const app = require('./app');
const Task = require('./models/Task');

describe('Task Management API', () => {
  beforeEach(async () => {
    await Task.deleteMany({});
  });

  describe('GET /tasks', () => {
    it('should return an empty array if no tasks exist', async () => {
      const response = await request(app).get('/tasks');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return an array of tasks', async () => {
      await Task.create([
        { title: 'Task 1', description: 'Description 1', status: 'open', dueDate: new Date() },
        { title: 'Task 2', description: 'Description 2', status: 'in progress', dueDate: new Date() },
      ]);

      const response = await request(app).get('/tasks');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('title', 'Task 1');
      expect(response.body[1]).toHaveProperty('title', 'Task 2');
    });
  });

  describe('GET /tasks/:id', () => {
    it('should return a task if it exists', async () => {
      const task = await Task.create({
        title: 'Task 1',
        description: 'Description 1',
        status: 'open',
        dueDate: new Date(),
      });

      const response = await request(app).get(`/tasks/${task.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Task 1');
    });

    it('should return a 404 error if the task does not exist', async () => {
      const response = await request(app).get('/tasks/123456789012');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Task not found');
    });
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Task 1',
        description: 'Description 1',
        status: 'open',
        dueDate: '2023-05-01',
      };

      const response = await request(app).post('/tasks').send(taskData);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Task 1');
      expect(response.body).toHaveProperty('description', 'Description 1');
      expect(response.body).toHaveProperty('status', 'open');
      expect(response.body).toHaveProperty('dueDate', '2023-05-01T00:00:00.000Z');
    });

    it('should return a 400 error if the request body is invalid', async () => {
      const taskData = {
        description: 'Description 1',
        status: 'open',
      };

      const response = await request(app).post('/tasks').send(taskData);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid task data');
    });
  });

  describe('PATCH /tasks/:id', () => {
    it('should update an existing task', async () => {
      const task = await Task.create({
        title: 'Task 1',
        description: 'Description 1',
        status: 'open',
        dueDate: new Date(),
      });

      const updatedTaskData = {
        title: 'Updated Task',
        description: 'Updated Description',
        status: 'in progress',
        dueDate: '2023-06-01',
      };

      const response
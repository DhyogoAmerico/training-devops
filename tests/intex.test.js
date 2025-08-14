import request from 'supertest';
import { app, server } from '../src/index.js';

afterAll(() => {
  server.close();
});

describe('GET /api/tasks', () => {
  it('should return all tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ]);
  });
});

describe('GET /api/tasks/:id', () => {
  it('should return a task by id', async () => {
    const response = await request(app).get('/api/tasks/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, title: 'Task 1', completed: false });
  });

  it('should return 404 for a non-existent task', async () => {
    const response = await request(app).get('/api/tasks/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Task not found');
  });
});
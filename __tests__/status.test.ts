import request from 'supertest';
import app from '../src/app';


describe('GET /status', () => {
  it('Should return 200 OK and the correct message', async () => {
    const response = await request(app).get('/status');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Service is running');
  });
});

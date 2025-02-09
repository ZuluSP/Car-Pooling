import request from 'supertest';
import app from '../src/app';

describe('PUT /cars', () => {
  it('Registry of the car list and return a 200', async () => {
    const response = await request(app)
      .put('/cars')
      .send([
        { id: 1, seats: 4 },
        { id: 2, seats: 6 }
      ])
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
  });

  it('Should return 400 Bad Request if format is incorrect', async () => {
    const response = await request(app)
      .put('/cars')
      .send({ id: 1 })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
  });
});

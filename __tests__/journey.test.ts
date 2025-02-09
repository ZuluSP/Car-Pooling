import request from 'supertest';
import app from '../src/app';
import { registerCars } from '../src/services/carService';
import { clearGroups } from '../src/services/groupService';

describe('POST /journey', () => {
  beforeEach(async () => {
    registerCars([]);
    clearGroups();

    await request(app).put('/cars').send([
      { id: 1, seats: 4 },
      { id: 2, seats: 5 }
    ]);
  });

  it('Should return 200 if a group is assigned to a car', async () => {
    const response = await request(app)
      .post('/journey')
      .send({ id: 1, people: 4 });

    expect(response.status).toBe(200);
  });

  it('Should return 202 if the group is waiting for a car', async () => {

    const response = await request(app)
      .post('/journey')
      .send({ id: 1, people: 6 });

      expect(response.status).toBe(202);
      expect(response.body.message).toBe('No car available with enough seats, group added to waiting list');
  });

  it('Should return 400 if the request format is invalid', async () => {
    const response = await request(app)
      .post('/journey')
      .send({ id: 'invalid', people: 'four' })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
  });
});

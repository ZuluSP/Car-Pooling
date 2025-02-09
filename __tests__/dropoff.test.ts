import request from 'supertest';
import app from '../src/app';
import { registerCars } from '../src/services/carService';
import { clearGroups } from '../src/services/groupService';

describe('POST /dropoff', () => {
  beforeEach(() => {
    registerCars([{ id: 1, seats: 6 }]);
    clearGroups();
  });

  it('Should remove a group from a car and free up seats', async () => {
    await request(app).put('/cars').send([
      { id: 1, seats: 4 }
    ]);
  
    await request(app).post('/journey').send({ id: 1, people: 4 });
  
    const response = await request(app)
      .post('/dropoff')
      .send('ID=1')
      .set('Content-Type', 'application/x-www-form-urlencoded');
  
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/^Group 1 removed from car 1 and seats freed/);
  });
  

  it('Should remove a waiting group from the queue', async () => {
    await request(app).post('/journey').send({ id: 1, people: 8 });

    const response = await request(app)
      .post('/dropoff')
      .send('ID=1')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Group 1 removed from waiting list');
  });

  it('Should return 404 if the group does not exist', async () => {
    const response = await request(app)
      .post('/dropoff')
      .send('ID=999')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Group 999 not found');
  });
});

import request from 'supertest';
import app from '../src/app';
import { registerCars } from '../src/services/carService';
import { clearGroups } from '../src/services/groupService';

describe('POST /locate', () => {
  beforeEach(() => {
    registerCars([
      { id: 1, seats: 4 },
      { id: 2, seats: 6 }
    ]);
    clearGroups();
  });

  it('Should return the car where the group is traveling', async () => {
    await request(app).post('/journey').send({ id: 1, people: 4 });

    const response = await request(app)
      .post('/locate')
      .send('ID=1')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, seats: 4 });
  });

  it('Should return 204 if the group is still waiting', async () => {
    await request(app).post('/journey').send({ id: 1, people: 6 });

    const response = await request(app)
      .post('/locate')
      .send('ID=1')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(204);
  });

  it('Should return 404 if the group does not exist', async () => {
    const response = await request(app)
      .post('/locate')
      .send('ID=999')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Group not found" });
  });
});

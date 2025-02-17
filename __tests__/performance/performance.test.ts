import { registerCars, getCars } from '../../src/services/carService';
import { registerJourney } from '../../src/services/journeyService';

describe('Performance Test', () => {
  it('Should handle 100,000 cars and groups efficiently', () => {
    const cars: { id: number; seats: number }[] = [];
    for (let i = 1; i <= 100000; i++) {
      cars.push({ id: i, seats: 4 });
    }

    registerCars(cars);
    expect(getCars().length).toBe(100000);

    const start = Date.now();
    for (let i = 1; i <= 100000; i++) {
      registerJourney({ id: i, people: 2 });
    }
    const end = Date.now();
    console.log(`Processed 100,000 journeys in ${end - start}ms`);
  });
});

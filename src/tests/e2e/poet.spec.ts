/**
 * Testing Poet's Component`
 */
import axios, { AxiosError } from 'axios';
import { ERROR_MSG, PoetType } from '../../interfaces/poet.interface';
// import assert from 'node:assert';
// import { test, describe } from 'node:test';
// ========== API Test ============
const apiUrl = 'http://localhost:3000/api';
const poetID = '639b5cf712eec0bb274cecd4';

describe('Testing /GET req to /poets', function () {
  // afterAll(async () => {});
  test('json response, contains poets[], with their names and time_period', async () => {
    const res = await axios.get(`${apiUrl}/poets`);

    expect(res.status).toEqual(200);
    expect(res.data[0].name).toBeDefined();
    expect(res.data[0].time_period).toBeDefined();
  });
});

describe('Testing /GET req to /poet/:id', function () {
  // afterAll(async () => {});
  test("Responds with json containing a poet's name and his literature", async () => {
    const res = await axios.get(`${apiUrl}/poet/${poetID}`);

    expect(res.status).toBe<number>(200);
    expect(res.headers['content-type']).toMatch(/json/);

    expect(res.data.details).toHaveProperty('name');
    expect(res.data.details).toHaveProperty('bio');
    expect(res.data.details).toHaveProperty('time_period');

    expect(res.data.authoredPoems).toBeDefined();
    expect(res.data.authoredPoems[0]).toHaveProperty('intro');

    expect(res.data.authoredChosenVerses).toBeDefined();
    expect(res.data.authoredChosenVerses[0]).toHaveProperty('poem');
    expect(res.data.authoredChosenVerses[0]).toHaveProperty('tags');
    expect(res.data.authoredChosenVerses[0]).toHaveProperty('verses');
    expect(res.data.authoredChosenVerses[0]).toHaveProperty('verses[0].first');
    expect(res.data.authoredChosenVerses[0]).toHaveProperty('verses[0].sec');
    expect(res.data.authoredChosenVerses[0]).toHaveProperty('reviewed');

    expect(res.data.authoredProses).toBeDefined();
    expect(res.data.authoredProses[0]).toHaveProperty('tags');
    expect(res.data.authoredProses[0]).toHaveProperty('qoute');
  });

  test('Handling non MongoID param', async () => {
    try {
      await axios.get(`${apiUrl}/poet/1`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toBe(400);
        expect(error.response?.data.message).toBe(ERROR_MSG.NOT_FOUND);
      }
    }
  });

  test('Handling non existing id', async () => {
    try {
      await axios.get(`${apiUrl}/poet/62b55cf712eec0bb274cecd4`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toBe(404);
        expect(error.response?.data.message).toBe(ERROR_MSG.NOT_FOUND);
      }
    }
  });
});

// describe('Testing /POST req to /poet', () => {
//   test('it saves newPoet to DB correctly', async () => {
//     const poet = {
//       name: 'poet',
//       time_period: 'time_period',
//       bio: 'bio',
//       reviewed: true,
//     };
//     const req = await axios.post(`${apiUrl}/poet/`, poet);

//     expect(req.status).toEqual(201);
//     expect(req.data).toHaveProperty('name', poet.name);
//     expect(req.data).toHaveProperty('time_period', poet.time_period);
//     expect(req.data).toHaveProperty('bio', poet.bio);
//     expect(req.data).toHaveProperty('reviewed', poet.reviewed);
//   });

//   test('Bad request data is not valid, and response with a status(400)', async () => {
//     try {
//       const poet = {
//         time_period: 'time_period',
//         bio: 'bio',
//         reviewed: true,
//       };
//       await axios.post(`${apiUrl}/poet/`, poet);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         expect(error.response?.data.status).toBe(400);
//         expect(error.response?.data.message).toBe(
//           'name should be letters, and max 50 letters length',
//         );
//       }
//     }
//   });
// });

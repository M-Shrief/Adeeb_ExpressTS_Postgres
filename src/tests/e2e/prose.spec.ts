import axios, { AxiosError } from 'axios';
import { ERROR_MSG } from '../../interfaces/prose.interface';

const apiUrl = 'http://localhost:3000/api';

describe('Testing /GET requests for /proses', () => {
  test("json response, containing prose[], with poets' names", async () => {
    const res = await axios.get(`${apiUrl}/proses`);

    expect(res.status).toEqual(200);
    expect(res.data[0]).toHaveProperty('poet.name');
    expect(res.data[0]).toHaveProperty('tags');
    expect(res.data[0]).toHaveProperty('qoute');
    expect(res.data[0]).toHaveProperty('reviewed');
  });
});

describe('Testing /GET requests for /proses/random?num=', () => {
  test("json response, containing only 3 prose, with poets' names", async () => {
    const res = await axios.get(`${apiUrl}/proses/random?num=3`);

    expect(res.status).toEqual(200);
    expect(res.data.length).toEqual(3);
    expect(res.data[0]).toHaveProperty('poet');
    expect(res.data[0]).toHaveProperty('tags');
    expect(res.data[0]).toHaveProperty('qoute');
    expect(res.data[0]).toHaveProperty('reviewed');
  });

  test("Doesn't accept types other than number, and throws and error with 400 status", async () => {
    try {
      await axios.get(`${apiUrl}/proses/random?num=a`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toEqual(400);
        expect(error.response?.data.message).toEqual(ERROR_MSG.NUM);
      }
    }
  });
});

describe('Testing /GET requests for /prose/:id', () => {
  test("json response, contains a prose with poets' name", async () => {
    const res = await axios.get(`${apiUrl}/prose/639b60c8b5e253099333b138`);

    expect(res.status).toEqual(200);
    expect(res.data).toHaveProperty('poet.name');
    expect(res.data).toHaveProperty('tags');
    expect(res.data).toHaveProperty('qoute');
    expect(res.data).toHaveProperty('reviewed');
  });

  test('Handling non MongoID param', async () => {
    try {
      await axios.get(`${apiUrl}/prose/1`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toBe(400);
        expect(error.response?.data.message).toBe(ERROR_MSG.NOT_FOUND);
      }
    }
  });

  test('Handling non existing id', async () => {
    try {
      await axios.get(`${apiUrl}/prose/62b55cf712eec0bb274cecd4`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toBe(404);
        expect(error.response?.data.message).toBe(ERROR_MSG.NOT_FOUND);
      }
    }
  });
});

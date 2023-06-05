import axios, { AxiosError } from 'axios';
import { ERROR_MSG } from '../../interfaces/poem.interface';

const apiUrl = 'http://localhost:3000/api';

describe('Testing /GET req to /poems', () => {
  test("json response, contains poems[], with their poets' name", async () => {
    const res = await axios.get(`${apiUrl}/poems`);
    expect(res.status).toEqual(200);

    expect(res.data[0]).toHaveProperty('intro');
    expect(res.data[0]).toHaveProperty('poet.name');
    expect(res.data[0]).toHaveProperty('verses[0].first');
    expect(res.data[0]).toHaveProperty('verses[0].sec');
    expect(res.data[0]).toHaveProperty('reviewed');
  });
});

describe('Testing /GET req to /poems_intros', () => {
  test("json response, contains poems[], with their poets' name", async () => {
    const res = await axios.get(`${apiUrl}/poems_intros`);
    expect(res.status).toEqual(200);

    expect(res.data[0]).toHaveProperty('intro');
    expect(res.data[0]).toHaveProperty('poet.name');
    expect(res.data[0]).not.toHaveProperty('verses[0].first');
    expect(res.data[0]).not.toHaveProperty('verses[0].sec');
    expect(res.data[0]).toHaveProperty('reviewed');
  });
});

describe('Testing /GET req to /poem/:id', () => {
  test("json response, contains a poem, with the poets' name", async () => {
    const res = await axios.get(
      `${apiUrl}/poem/3496aa52-6946-4b02-9428-5a57b7522219`,
    );
    expect(res.status).toEqual(200);

    expect(res.data).toHaveProperty('intro');
    expect(res.data).toHaveProperty('poet.name');
    expect(res.data).toHaveProperty('verses[0].first');
    expect(res.data).toHaveProperty('verses[0].sec');
    expect(res.data).toHaveProperty('reviewed');
  });

  test('Handling non UUID param', async () => {
    try {
      await axios.get(`${apiUrl}/poem/1`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toBe(400);
        expect(error.response?.data.message).toBe(ERROR_MSG.NOT_FOUND);
      }
    }
  });

  test('Handling non existing id', async () => {
    try {
      await axios.get(`${apiUrl}/poem/3496aa52-6946-4b02-9428-5a57b7522211`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toBe(404);
        expect(error.response?.data.message).toBe(ERROR_MSG.NOT_FOUND);
      }
    }
  });
});

import axios, { AxiosError } from 'axios';
import { ERROR_MSG } from '../../interfaces/chosenVerse.interface';

const apiUrl = 'http://localhost:3000/api';

describe('Testing /GET request to /chosenverses', () => {
  test("json response, containing chosenVerse[], with poets' names", async () => {
    const res = await axios.get(`${apiUrl}/chosenverses`);
    expect(res.status).toEqual(200);

    expect(res.data[0]).toHaveProperty('tags');
    expect(res.data[0]).toHaveProperty('verses[0].first');
    expect(res.data[0]).toHaveProperty('verses[0].sec');
    expect(res.data[0]).toHaveProperty('reviewed');
    expect(res.data[0]).toHaveProperty('poet.name');
    expect(res.data[0]).toHaveProperty('poem');
  });
});

describe('Testing /GET request to /chosenverses/random?num=3', () => {
  test("json response, containing chosenVerse[] only 3 items, with poets' names", async () => {
    const res = await axios.get(`${apiUrl}/chosenverses/random?num=3`);
    expect(res.status).toEqual(200);

    expect(res.data.length).toEqual(3);
    expect(res.data[0]).toHaveProperty('tags');
    expect(res.data[0]).toHaveProperty('verses[0].first');
    expect(res.data[0]).toHaveProperty('verses[0].sec');
    expect(res.data[0]).toHaveProperty('reviewed');
    expect(res.data[0]).toHaveProperty('poet');
    expect(res.data[0]).toHaveProperty('poem');
  });

  test("Doesn't accept types other than number, and throws and error with 400 status", async () => {
    try {
      await axios.get(`${apiUrl}/chosenverses/random?num=a`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toEqual(400);
        expect(error.response?.data.message).toEqual(ERROR_MSG.NUM);
      }
    }
  });
});

describe('Testing /GET req to /chosenvers/:id', () => {
  test("json response, contains a chosenVerse, with the poets' name", async () => {
    const res = await axios.get(
      `${apiUrl}/chosenverse/6371f27eac76f350635f7017`,
    );
    expect(res.status).toEqual(200);

    expect(res.data).toHaveProperty('tags');
    expect(res.data).toHaveProperty('verses[0].first');
    expect(res.data).toHaveProperty('verses[0].sec');
    expect(res.data).toHaveProperty('reviewed');
    expect(res.data).toHaveProperty('poet.name');
  });

  test('Handling non MongoID param', async () => {
    try {
      await axios.get(`${apiUrl}/chosenverse/1`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toBe(400);
        expect(error.response?.data.message).toBe(ERROR_MSG.NOT_FOUND);
      }
    }
  });

  test('Handling non existing id', async () => {
    try {
      await axios.get(`${apiUrl}/chosenverse/6371f27eac76f350635f7007`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toBe(404);
        expect(error.response?.data.message).toBe(ERROR_MSG.NOT_FOUND);
      }
    }
  });
});

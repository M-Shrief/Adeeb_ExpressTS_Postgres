import axios, { AxiosError } from 'axios';
import HttpStatusCode from '../../utils/httpStatusCode';
import { ERROR_MSG } from '../../interfaces/partner.interface';

const apiUrl = 'http://localhost:3000/api';

describe('Testing login, /POST to /partner/login', () => {
  test('it validates existing user correctly', async () => {
    axios.defaults.withCredentials = true;
    const res = await axios.post(`${apiUrl}/partner/login`, {
      phone: '01225446467',
      password: 'P@ssword1',
    });
    expect(res.status).toEqual(HttpStatusCode.ACCEPTED);
    expect(res.headers['authorization']).toBeTruthy();
    expect(res.data.success).toBe(true);
    expect(res.data).toHaveProperty('partner.name');
    expect(res.data).toHaveProperty('partner.phone');
    expect(res.data).toHaveProperty('partner.address');
    expect(res.data.accessToken).toBeTruthy();
  });

  test("Handle errors for invalid user's data correctly", async () => {
    try {
      await axios.post(`${apiUrl}/partner/login`, {
        phone: '01225446467',
        password: 'P@ssword',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toEqual(
          HttpStatusCode.NOT_ACCEPTABLE,
        );
        expect(error.response?.data.message).toEqual(ERROR_MSG.NOT_VALID);
      }
    }
  });
});

describe("Testing getting partner's info, /GET to partner/:id", () => {
  beforeEach(async () => {
    const res = await axios.post(`${apiUrl}/partner/login`, {
      phone: '01225446467',
      password: 'P@ssword1',
    });
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + res.data.accessToken;
  });

  test("/GET partner's info from /partner/:id", async () => {
    const res = await axios.get(`${apiUrl}/partner/644f7eb8689d25e876294c57`);

    expect(res.data).toHaveProperty('name');
    expect(res.data).toHaveProperty('address');
    expect(res.data).toHaveProperty('phone');
  });

  test('Handling non MongoID param', async () => {
    try {
      await axios.get(`${apiUrl}/partner/1`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toBe(400);
        expect(error.response?.data.message).toBe(ERROR_MSG.NOT_FOUND);
      }
    }
  });

  test('Handling non existing id', async () => {
    try {
      await axios.get(`${apiUrl}/partner/62b55cf712eec0bb274cecd4`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toBe(404);
        expect(error.response?.data.message).toBe(ERROR_MSG.NOT_FOUND);
      }
    }
  });
});

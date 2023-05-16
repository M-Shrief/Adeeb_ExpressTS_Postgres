import axios, { AxiosError } from 'axios';
import HttpStatusCode from '../../utils/httpStatusCode';
import { ERROR_MSG } from '../../interfaces/order.interface';
const apiUrl = 'http://localhost:3000/api';

describe('Testing /post request to /orders/guest', () => {
  test("Returns Guest's orders with status(200), after recieving his name and phone", async () => {
    const res = await axios.post(`${apiUrl}/orders/guest`, {
      name: 'Rai, Developer',
      phone: '3030303030',
    });

    expect(res.status).toEqual(HttpStatusCode.OK);

    expect(res.data[0]).toHaveProperty('name');
    expect(res.data[0]).toHaveProperty('phone');
    expect(res.data[0]).toHaveProperty('address');
    expect(res.data[0]).toHaveProperty('reviewed');
    expect(res.data[0]).toHaveProperty('completed');
    expect(res.data[0]).toHaveProperty('products');
  });

  test('Handling requests for non-existing orders', async () => {
    try {
      const res = await axios.post(`${apiUrl}/orders/guest`, {
        name: 'Rai, Developer',
        phone: '3030303',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toEqual(HttpStatusCode.NOT_FOUND);
        expect(error.response?.data.message).toEqual(ERROR_MSG.NOT_AVAILABLE);
      }
    }
  });
});

describe("Testing /GET requests  to /orders/:partner to get partner's info", () => {
  beforeEach(async () => {
    const res = await axios.post(`${apiUrl}/partner/login`, {
      phone: '01225446467',
      password: 'P@ssword1',
    });
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + res.data.accessToken;
  });

  test("after authorization, it gets partner's orders", async () => {
    const res = await axios.get(`${apiUrl}/orders/644f7eb8689d25e876294c57`);

    expect(res.status).toEqual(HttpStatusCode.OK);

    expect(res.data[0]).toHaveProperty('partner');
    expect(res.data[0]).toHaveProperty('name');
    expect(res.data[0]).toHaveProperty('phone');
    expect(res.data[0]).toHaveProperty('address');
    expect(res.data[0]).toHaveProperty('reviewed');
    expect(res.data[0]).toHaveProperty('completed');
    expect(res.data[0]).toHaveProperty('products');
  });

  test('Handling non MongoID param', async () => {
    try {
      await axios.get(`${apiUrl}/orders/1`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toBe(400);
        expect(error.response?.data.message).toBe(ERROR_MSG.PARTNER);
      }
    }
  });

  test('Handling non existing id', async () => {
    try {
      await axios.get(`${apiUrl}/orders/62b55cf712eec0bb274cecd4`);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.data.status).toBe(404);
        expect(error.response?.data.message).toBe(ERROR_MSG.NOT_AVAILABLE);
      }
    }
  });
});

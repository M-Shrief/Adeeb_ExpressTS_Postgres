import { describe, expect, it, vi, test, beforeAll } from 'vitest';
import { responseInfo } from './poet.controller';
import { ERROR_MSG, Poet } from './poet.entity';
import HttpStatusCode from '../../utils/httpStatusCode';

describe.concurrent("Testinf PoetController's responseInfo", async () => {
  describe('Testing index()', async () => {
    const service = [
      {
        id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
        name: 'عنترة بن شداد',
        time_period: 'جاهلي',
      },
      {
        id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
        name: 'عنترة بن شداد',
        time_period: 'جاهلي',
      },
    ] as Poet[];
    test('Success, return poets with status: ok', async () => {
      const { status, poets, errMsg } = responseInfo.index(service);
      expect(status).toEqual(HttpStatusCode.OK);
      expect(poets).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
      const { status, poets, errMsg } = responseInfo.index(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_AVAILABLE);
      expect(poets).toBeUndefined();
    });
  });

  describe('Testing indexOneWithLiterature()', async () => {
    const poetWithLiterature = {
      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      name: 'عنترة بن شداد',
      time_period: 'جاهلي',
      bio: 'عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة.',
      poems: [
        {
          id: '0343952d-58fc-4f56-b2b6-fc04731de5ce',
          intro: 'حَكِّم سُيوفَكَ في رِقابِ العُذَّلِ',
        },
        {
          id: 'f3ac040d-3402-41ee-9cdc-7c141558668d',
          intro: 'testing89',
        },
        {
          id: '13857487-5a74-424d-aab2-deb5aa79127d',
          intro: 'testing3',
        },
      ],
      chosenVerses: [
        {
          id: '116d9b44-2a7b-4739-9014-d19a7677dd72',
          tags: 'الفخر',
          verses: [
            {
              sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
              first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
            },
          ],
          poem: {
            id: '414808c1-1b70-4f52-896d-01b15b05acc3',
          },
        },
      ],
      proses: [
        {
          id: '5bda8eea-8356-472e-ba96-4fdf7283422c',
          tags: 'حكمة, حب, العلم',
          qoute:
            'اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..',
        },
      ],
    } as Poet;
    test('Success, return Poet with status: OK', async () => {
      const { status, poet, errMsg } =
        responseInfo.indexOneWithLiterature(poetWithLiterature);
      expect(status).toEqual(HttpStatusCode.OK);
      expect(poet).toStrictEqual(poetWithLiterature);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
      const { status, poet, errMsg } =
        responseInfo.indexOneWithLiterature(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_FOUND);
      expect(poet).toBeUndefined();
    });
  });

  describe('Testing post()', async () => {
    const service = {
      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      name: 'عنترة بن شداد',
      time_period: 'جاهلي',
    } as Poet;
    test('Success, saved abd return poet with status: ok', async () => {
      const { status, poet, errMsg } = responseInfo.post(service);
      expect(status).toEqual(HttpStatusCode.CREATED);
      expect(poet).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
      const { status, poet, errMsg } = responseInfo.post(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
      expect(poet).toBeUndefined();
    });
  });

  describe('Testing postMany()', async () => {
    const service = {
      newPoets: [
        {
          id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
          name: 'عنترة بن شداد',
          time_period: 'جاهلي',
        },
      ] as Poet[],
      inValidPoets: [
        {
          id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
          name: 'عنترة بن شداد',
        },
      ] as Poet[],
    };
    test('Success, saved abd return poet with status: ok', async () => {
      const { status, poets, errMsg } = responseInfo.postMany(service);
      expect(status).toEqual(HttpStatusCode.CREATED);
      expect(poets).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
      const { status, poets, errMsg } = responseInfo.postMany(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
      expect(poets).toBeUndefined();
    });
  });

  describe('Testing update()', async () => {
    test('Updates poet successfully', async () => {
      const { status, errMsg } = responseInfo.update(1);
      expect(status).toEqual(HttpStatusCode.ACCEPTED);
      expect(errMsg).toBeUndefined();
    });
    test('Error, Update is not Acceptable', async () => {
      const { status, errMsg } = responseInfo.update(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toEqual(ERROR_MSG.NOT_VALID);
    });
  });

  describe('Testing remove()', async () => {
    test('Removes poet successfully', async () => {
      const { status, errMsg } = responseInfo.remove(1);
      expect(status).toEqual(HttpStatusCode.ACCEPTED);
      expect(errMsg).toBeUndefined();
    });
    test('Error, Remove is not Acceptable', async () => {
      const { status, errMsg } = responseInfo.remove(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
    });
  });
});

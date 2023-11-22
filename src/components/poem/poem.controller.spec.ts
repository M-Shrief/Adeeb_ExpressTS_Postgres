import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Controller
import { responseInfo } from './poem.controller';
// Entity
import { ERROR_MSG, Poem } from './poem.entity';
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';

describe.concurrent("Testing PoemController's responseInfo", async () => {
  describe('Testing indexWithPoetName()', async () => {
    const service = [
      {
        id: 'f3ac040d-3402-41ee-9cdc-7c141558668d',
        intro: 'testing89',
        verses: [
          {
            sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
            first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
          },
          {
            sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
            first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
          },
        ],
        reviewed: true,
        poet: {
          id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
          name: 'عنترة بن شداد',
          time_period: 'جاهلي',
        },
      },
      {
        id: 'f3ac040d-3402-41ee-9cdc-7c141558668d',
        intro: 'testing89',
        verses: [
          {
            sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
            first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
          },
          {
            sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
            first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
          },
        ],
        reviewed: true,
        poet: {
          id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
          name: 'عنترة بن شداد',
          time_period: 'جاهلي',
        },
      },
    ] as Poem[];
    test('Success, return poems with status: ok', async () => {
      const { status, poems, errMsg } = responseInfo.indexWithPoetName(service);
      expect(status).toEqual(HttpStatusCode.OK);
      expect(poems).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
      const { status, poems, errMsg } = responseInfo.indexWithPoetName(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_AVAILABLE);
      expect(poems).toBeUndefined();
    });
  });

  describe('Testing indexIntrosWithPoetName()', async () => {
    const service = [
      {
        id: 'f3ac040d-3402-41ee-9cdc-7c141558668d',
        intro: 'testing89',
        reviewed: true,
        poet: {
          id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
          name: 'عنترة بن شداد',
        },
      },
      {
        id: 'f3ac040d-3402-41ee-9cdc-7c141558668d',
        intro: 'testing89',
        reviewed: true,
        poet: {
          id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
          name: 'عنترة بن شداد',
        },
      },
    ] as Poem[];
    test('Success, return poems with status: ok', async () => {
      const { status, poems, errMsg } =
        responseInfo.indexIntrosWithPoetName(service);
      expect(status).toEqual(HttpStatusCode.OK);
      expect(poems).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
      const { status, poems, errMsg } =
        responseInfo.indexIntrosWithPoetName(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_AVAILABLE);
      expect(poems).toBeUndefined();
    });
  });

  describe('Testing indexOneWithPoet()', async () => {
    const service = {
      id: 'f3ac040d-3402-41ee-9cdc-7c141558668d',
      intro: 'testing89',
      verses: [
        {
          sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
          first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
        },
        {
          sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
          first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
        },
      ],
      reviewed: true,
      poet: {
        id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
        name: 'عنترة بن شداد',
        time_period: 'جاهلي',
        bio: 'عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة.',
      },
    } as Poem;
    test('Success, return Poem with status OK', async () => {
      const { status, poem, errMsg } = responseInfo.indexOneWithPoet(service);
      expect(status).toEqual(HttpStatusCode.OK);
      expect(poem).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
      const { status, poem, errMsg } = responseInfo.indexOneWithPoet(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
      expect(poem).toBeUndefined();
    });
  });

  describe('Testing post()', async () => {
    const service = {
      id: 'f3ac040d-3402-41ee-9cdc-7c141558668d',
      intro: 'testing89',
      verses: [
        {
          sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
          first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
        },
        {
          sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
          first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
        },
      ],
      reviewed: true,
      poet: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
    } as unknown as Poem;
    test('Success, saved abd return poem with status: ok', async () => {
      const { status, poem, errMsg } = responseInfo.post(service);
      expect(status).toEqual(HttpStatusCode.CREATED);
      expect(poem).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });
    test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
      const { status, poem, errMsg } = responseInfo.post(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
      expect(poem).toBeUndefined();
    });
  });

  describe('Testing postMany()', async () => {
    const service = {
      newPoems: [
        {
          intro: 'testing89',
          verses: [
            {
              sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
              first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
            },
            {
              sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
              first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
            },
          ],
          reviewed: true,
          poet: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
        },
      ] as unknown as Poem[],
      inValidPoems: [
        {
          intro: 'testing89',
          verses: [
            {
              sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
              first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
            },
            {
              sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
              first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
            },
          ],
        },
      ] as unknown as Poem[],
    };
    test('Success, saved and return poem with status: ok', async () => {
      const { status, poems, errMsg } = responseInfo.postMany(service);
      expect(status).toEqual(HttpStatusCode.CREATED);
      expect(poems).toStrictEqual(service);
      expect(errMsg).toBeUndefined();
    });

    test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
      const { status, poems, errMsg } = responseInfo.postMany(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
      expect(poems).toBeUndefined();
    });
  });

  describe('Testing update()', async () => {
    test('Updates poem successfully', async () => {
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
    test('Updates poem successfully', async () => {
      const { status, errMsg } = responseInfo.remove(1);
      expect(status).toEqual(HttpStatusCode.ACCEPTED);
      expect(errMsg).toBeUndefined();
    });
    test('Error, Update is not Acceptable', async () => {
      const { status, errMsg } = responseInfo.remove(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
    });
  });
});

import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Service
import { PoemService } from './poem.service';
// Repository
import { PoemDB, PoemRedis } from './poem.repository';
// Types
import { Poem } from './poem.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

describe.concurrent('Testing PoemService', async () => {
  describe('Testing getAllWithPoetName()', async () => {
    const poems = [
      {
        id: 'f6f75cc6-d48a-44a5-a9e0-e54bb4e1590e',
        intro: 'حسرةٌ ولَّت, و أخرى أقبلت',
        verses: [
          {
            sec: 'كيفَ؟ مِن أينَ؟ .. متى؟ لم أعلمِ',
            first: 'حسرةٌ ولَّت, و أخرى أقبلت',
          },
          {
            sec: 'موجةٍ في بحر ليلٍ مظلمِ',
            first: 'موجةٌ سوداءُ تنقضُّ على',
          },
        ],
        reviewed: true,
        poet: {
          id: '6dafac12-bc71-48b6-877c-e052ec9b82b7',
          name: 'محمود شاكر',
          time_period: 'متأخر وحديث',
        },
      },
      {
        id: 'f6f75cc6-d48a-44a5-a9e0-e54bb4e1590e',
        intro: 'حسرةٌ ولَّت, و أخرى أقبلت',
        verses: [
          {
            sec: 'كيفَ؟ مِن أينَ؟ .. متى؟ لم أعلمِ',
            first: 'حسرةٌ ولَّت, و أخرى أقبلت',
          },
          {
            sec: 'موجةٍ في بحر ليلٍ مظلمِ',
            first: 'موجةٌ سوداءُ تنقضُّ على',
          },
        ],
        reviewed: true,
        poet: {
          id: '6dafac12-bc71-48b6-877c-e052ec9b82b7',
          name: 'محمود شاكر',
          time_period: 'متأخر وحديث',
        },
      },
      {
        id: 'f6f75cc6-d48a-44a5-a9e0-e54bb4e1590e',
        intro: 'حسرةٌ ولَّت, و أخرى أقبلت',
        verses: [
          {
            sec: 'كيفَ؟ مِن أينَ؟ .. متى؟ لم أعلمِ',
            first: 'حسرةٌ ولَّت, و أخرى أقبلت',
          },
          {
            sec: 'موجةٍ في بحر ليلٍ مظلمِ',
            first: 'موجةٌ سوداءُ تنقضُّ على',
          },
        ],
        reviewed: true,
        poet: {
          id: '6dafac12-bc71-48b6-877c-e052ec9b82b7',
          name: 'محمود شاكر',
          time_period: 'متأخر وحديث',
        },
      },
    ] as Poem[];
    test('Gets data successfully from database', async () => {
      vi.spyOn(PoemDB, 'getAllWithPoetName').mockResolvedValue(poems);
      const result = await PoemService.getAllWithPoetName();
      expect(result).toStrictEqual(poems);
    });
    test('Returns false if not data is avalaible', async () => {
      vi.spyOn(PoemDB, 'getAllWithPoetName').mockResolvedValue([]);
      const result = await PoemService.getAllWithPoetName();
      expect(result).toEqual(false);
    });
  });

  describe('Testing getAllWithPoetName()', async () => {
    const poems = [
      {
        id: 'f6f75cc6-d48a-44a5-a9e0-e54bb4e1590e',
        intro: 'حسرةٌ ولَّت, و أخرى أقبلت',
        reviewed: true,
        poet: {
          id: '6dafac12-bc71-48b6-877c-e052ec9b82b7',
          name: 'محمود شاكر',
        },
      },
      {
        id: 'f6f75cc6-d48a-44a5-a9e0-e54bb4e1590e',
        intro: 'حسرةٌ ولَّت, و أخرى أقبلت',
        reviewed: true,
        poet: {
          id: '6dafac12-bc71-48b6-877c-e052ec9b82b7',
          name: 'محمود شاكر',
        },
      },
      {
        id: 'f6f75cc6-d48a-44a5-a9e0-e54bb4e1590e',
        intro: 'حسرةٌ ولَّت, و أخرى أقبلت',
        reviewed: true,
        poet: {
          id: '6dafac12-bc71-48b6-877c-e052ec9b82b7',
          name: 'محمود شاكر',
        },
      },
    ] as Poem[];
    test('Gets data successfully from database', async () => {
      vi.spyOn(PoemDB, 'getAllIntrosWithPoetName').mockResolvedValue(poems);
      const result = await PoemService.getAllIntrosWithPoetName();
      expect(result).toStrictEqual(poems);
    });
    test('Returns false if not data is avalaible', async () => {
      vi.spyOn(PoemDB, 'getAllIntrosWithPoetName').mockResolvedValue([]);
      const result = await PoemService.getAllIntrosWithPoetName();
      expect(result).toEqual(false);
    });
  });

  describe('Testing getOneWithPoet()', async () => {
    const poem = {
      id: '414808c1-1b70-4f52-896d-01b15b05acc3',
      intro: 'السَيفُ أَصدَقُ أَنباءً مِنَ الكُتُبِ',
      verses: [
        {
          sec: 'في حَدِّهِ الحَدُّ بَينَ الجِدِّ وَاللَعِبِ',
          first: 'السَيفُ أَصدَقُ أَنباءً مِنَ الكُتُبِ',
        },
      ],
      reviewed: true,
      poet: {
        id: '4a320c04-280e-4009-97a3-bc10ebee0758',
        name: 'أبو تمام',
        time_period: 'عباسي',
        bio: 'حبيب بن أوس بن الحارث الطائي، أبو تمام. الشاعر، الأديب. أحد أمراء البيان. ولد في جاسم (من قرى حوران بسورية) ورحل إلى مصر، واستقدمه المعتصم إلى بغداد، في شعره قوة وجزالة. واختلف في التفضيل بينه وبين المتنبي',
      },
    } as Poem;
    test('Gets data successfully from Database', async () => {
      vi.spyOn(PoemRedis, 'get').mockResolvedValue(null);
      vi.spyOn(PoemRedis, 'set').mockResolvedValue('');
      vi.spyOn(PoemDB, 'getOneWithPoet').mockResolvedValue(poem);

      const result = await PoemService.getOneWithPoet('1');
      expect(result).toStrictEqual(poem);
    });
    test('Gets data successfully from Redis', async () => {
      vi.spyOn(PoemRedis, 'get').mockResolvedValue(JSON.stringify(poem));
      const result = await PoemService.getOneWithPoet('1');
      expect(result).toStrictEqual(poem);
    });
    it('Returns false if no data is not found', async () => {
      vi.spyOn(PoemRedis, 'get').mockResolvedValue(null);
      vi.spyOn(PoemDB, 'getOneWithPoet').mockResolvedValue(null);

      const result = await PoemService.getOneWithPoet(
        'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      );
      expect(result).toEqual(false);
    });
  });

  describe('Testing post()', async () => {
    let intro = 'testing2',
      poet = 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      verses = [
        {
          first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
          sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
        },
        {
          first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
          sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
        },
      ];
    const poem = { intro, poet, verses } as unknown as Poem;
    test('Post data successfully after validation', async () => {
      vi.spyOn(PoemDB, 'post').mockResolvedValue(poem);

      const result = await PoemService.post(poem);
      expect(result).toStrictEqual(poem);
    });
    test('Return false if data validation failed', async () => {
      vi.spyOn(PoemDB, 'post').mockResolvedValue(poem);

      const result1 = await PoemService.post({
        intro,
        poet,
      } as unknown as Poem);
      expect(result1).toEqual(false);
      const result2 = await PoemService.post({
        intro,
        verses,
      } as unknown as Poem);
      expect(result2).toEqual(false);
      const result3 = await PoemService.post({
        poet,
        verses,
      } as unknown as Poem);
      expect(result3).toEqual(false);
    });
  });

  describe('Testing postMany()', async () => {
    let intro = 'testing2',
      poet = 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      verses = [
        {
          first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
          sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
        },
        {
          first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
          sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
        },
      ];
    const poem1 = { intro, poet, verses } as unknown as Poem;
    const poem2 = { intro, poet, verses } as unknown as Poem;
    const poem3 = { intro, poet, verses } as unknown as Poem;
    const poem4 = { intro, poet } as unknown as Poem;
    const poem5 = { intro, verses } as unknown as Poem;
    const poem6 = { poet, verses } as unknown as Poem;
    test('Post valid data successfully after validation and return inValid ones', async () => {
      vi.spyOn(PoemDB, 'postMany').mockResolvedValue([poem1, poem2, poem3]);

      const result = await PoemService.postMany([
        poem1,
        poem2,
        poem3,
        poem4,
        poem5,
        poem6,
      ]);
      expect(result).toBeTruthy();
      if (result != false) {
        expect(result.newPoems).toStrictEqual([poem1, poem2, poem3]);
        expect(result.inValidPoems).toStrictEqual([poem4, poem5, poem6]);
      }
    });
  });

  describe('Testing update()', async () => {
    let intro = 'testing2',
      poet = 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      verses = [
        {
          first: 'فهوَ أمواجُ ظلامٍ .. لا تَرَى',
          sec: 'لا تُبَالي .. لا تَعِي .. لا تَحْتَمي',
        },
        {
          first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
          sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
        },
      ];
    test('Update poem data successfully after validation', async () => {
      vi.spyOn(PoemDB, 'update').mockResolvedValue({
        affected: 1,
      } as UpdateResult);

      const result1 = await PoemService.update('1', { intro } as Poem);
      expect(result1).toEqual(1);
      const result2 = await PoemService.update('1', {
        poet,
      } as unknown as Poem);
      expect(result2).toEqual(1);
      const result3 = await PoemService.update('1', { verses } as Poem);
      expect(result3).toEqual(1);
    });
    test('return false after invalid poemData', async () => {
      vi.spyOn(PoemDB, 'update').mockResolvedValue({
        affected: 1,
      } as UpdateResult);

      const result1 = await PoemService.update('1', { intro: 'sa' } as Poem);
      expect(result1).toEqual(false);
      const result2 = await PoemService.update('1', {
        poet: '214',
      } as unknown as Poem);
      expect(result2).toEqual(false);
      const result3 = await PoemService.update('1', {
        verses: [{ first: 'as', sec: 'a' }],
      } as Poem);
      expect(result3).toEqual(false);
    });
    test('return false after non-existing id', async () => {
      vi.spyOn(PoemDB, 'update').mockResolvedValue({
        affected: 0,
      } as UpdateResult);

      const result1 = await PoemService.update('1', { intro } as Poem);
      expect(result1).toEqual(false);
    });
  });

  describe('Testing remove()', async () => {
    test('Successfully deletes poem', async () => {
      vi.spyOn(PoemDB, 'remove').mockResolvedValue({
        affected: 1,
      } as DeleteResult);

      const result1 = await PoemService.remove('e7749f21-9cf9-4981-b7a8-2ce262f159f6');
      expect(result1).toEqual(1);
    });
    test('return false for non-existing id', async () => {
      vi.spyOn(PoemDB, 'remove').mockResolvedValue({
        affected: 0,
      } as DeleteResult);

      const result1 = await PoemService.remove('1');
      expect(result1).toEqual(false);
    });
  });
});

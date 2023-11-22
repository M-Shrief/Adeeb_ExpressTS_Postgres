import { describe, expect, vi, test } from 'vitest';
// Service
import { ChosenVerseService } from './chosenVerse.service';
// Repository
import { ChosenVerseDB } from './chosenVerse.repository';
// Types
import { ChosenVerse } from './chosenVerse.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

describe.concurrent('Tesing ChosenVerseService', async () => {
  describe('Testing getAllWithPoetName()', async () => {
    const chosenVerses = [
      {
        id: '10fd3a73-13b5-4819-9a32-09136f9476b8',
        tags: 'الفخر',
        verses: [
          {
            sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
            first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
          },
        ],
        reviewed: true,
        poet: {
          id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
          name: 'عنترة بن شداد',
        },
        poem: {
          id: '414808c1-1b70-4f52-896d-01b15b05acc3',
        },
      },
      {
        id: '10fd3a73-13b5-4819-9a32-09136f9476b8',
        tags: 'الفخر',
        verses: [
          {
            sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
            first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
          },
        ],
        reviewed: true,
        poet: {
          id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
          name: 'عنترة بن شداد',
        },
        poem: {
          id: '414808c1-1b70-4f52-896d-01b15b05acc3',
        },
      },
    ] as ChosenVerse[];

    test('Gets data successfully from database', async () => {
      vi.spyOn(ChosenVerseDB, 'getAllWithPoetName').mockResolvedValue(
        chosenVerses,
      );
      const result = await ChosenVerseService.getAllWithPoetName();
      expect(result).toStrictEqual(chosenVerses);
    });
    test('Returns false if not data is avalaible', async () => {
      vi.spyOn(ChosenVerseDB, 'getAllWithPoetName').mockResolvedValue([]);
      const result = await ChosenVerseService.getAllWithPoetName();
      expect(result).toEqual(false);
    });
  });

  describe('Testing getRandomWithPoetName()', async () => {
    const chosenVerses = [
      {
        id: '553d712c-6d0a-4ebb-aa83-435e83eeb780',
        verses: [
          {
            sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
            first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
          },
        ],
      },
      {
        id: 'a3662da6-bb16-477e-934e-63cbde88d5af',
        verses: [
          {
            sec: 'وَ لَيَالٍ نُورُهَا لم يُظْلِمِ',
            first: 'وَ لَيَالٍ أظْلَمَت أنوَارُهَا',
          },
        ],
      },
    ] as ChosenVerse[];

    test('Gets data successfully from database', async () => {
      vi.spyOn(ChosenVerseDB, 'getRandomWithPoetName').mockResolvedValue(
        chosenVerses,
      );
      const result = await ChosenVerseService.getRandomWithPoetName(2);
      expect(result).toStrictEqual(chosenVerses);
    });
    test('Returns false if not data is avalaible', async () => {
      vi.spyOn(ChosenVerseDB, 'getRandomWithPoetName').mockResolvedValue([]);
      const result = await ChosenVerseService.getRandomWithPoetName(2);
      expect(result).toEqual(false);
    });
  });

  describe('Testing getOneWithPoetName()', async () => {
    const chosenVerse = {
      id: '10fd3a73-13b5-4819-9a32-09136f9476b8',
      tags: 'الفخر',
      verses: [
        {
          sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
          first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
        },
      ],
      reviewed: true,
      poet: {
        id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
        name: 'عنترة بن شداد',
      },
      poem: {
        id: '414808c1-1b70-4f52-896d-01b15b05acc3',
      },
    } as ChosenVerse;
    test('Gets data successfully from Database', async () => {
      vi.spyOn(ChosenVerseDB, 'getOneWithPoetName').mockResolvedValue(
        chosenVerse,
      );
      const result = await ChosenVerseService.getOneWithPoetName(
        '10fd3a73-13b5-4819-9a32-09136f9476b8',
      );
      expect(result).toStrictEqual(chosenVerse);
    });
    test('Returns false if no data is not found', async () => {
      vi.spyOn(ChosenVerseDB, 'getOneWithPoetName').mockResolvedValue(null);
      const result = await ChosenVerseService.getOneWithPoetName(
        '10fd3a73-13b5-4819-9a32-09136f9476b8',
      );
      expect(result).toStrictEqual(false);
    });
  });

  describe('Testing post()', async () => {
    let tags = 'الفخر',
      verses = [
        {
          sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
          first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
        },
      ],
      poet = 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      poem = '414808c1-1b70-4f52-896d-01b15b05acc3';
    let chosenVerse = { tags, verses, poet, poem } as unknown as ChosenVerse;
    test('Post data successfully after validation', async () => {
      vi.spyOn(ChosenVerseDB, 'post').mockResolvedValue(chosenVerse);
      const result = await ChosenVerseService.post(chosenVerse);
      expect(result).toStrictEqual(chosenVerse);
    });
    test('Return false if data validation failed', async () => {
      vi.spyOn(ChosenVerseDB, 'post').mockResolvedValue(chosenVerse);

      const result1 = await ChosenVerseService.post({
        tags,
        verses,
        poet,
      } as unknown as ChosenVerse);
      expect(result1).toEqual(false);
      const result2 = await ChosenVerseService.post({
        tags,
        verses,
        poem,
      } as unknown as ChosenVerse);
      expect(result2).toEqual(false);
      const result3 = await ChosenVerseService.post({
        tags,
        poet,
        poem,
      } as unknown as ChosenVerse);
      expect(result3).toEqual(false);
      const result4 = await ChosenVerseService.post({
        verses,
        poet,
        poem,
      } as unknown as ChosenVerse);
      expect(result4).toEqual(false);
    });
  });

  describe('Testing postMany()', async () => {
    let tags = 'الفخر',
      verses = [
        {
          sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
          first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
        },
      ],
      poet = 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      poem = '414808c1-1b70-4f52-896d-01b15b05acc3';
    let chosenVerse1 = { tags, verses, poet, poem } as unknown as ChosenVerse;
    let chosenVerse2 = { tags, verses, poet, poem } as unknown as ChosenVerse;
    let chosenVerse3 = { tags, verses, poet, poem } as unknown as ChosenVerse;
    let chosenVerse4 = { tags, verses, poet, poem } as unknown as ChosenVerse;
    let chosenVerse5 = { tags, verses, poet } as unknown as ChosenVerse;
    let chosenVerse6 = { tags, verses, poem } as unknown as ChosenVerse;
    let chosenVerse7 = { tags, poet, poem } as unknown as ChosenVerse;
    let chosenVerse8 = { verses, poet, poem } as unknown as ChosenVerse;
    test('Post valid data successfully after validation and return inValid ones', async () => {
      vi.spyOn(ChosenVerseDB, 'postMany').mockResolvedValue([
        chosenVerse1,
        chosenVerse2,
        chosenVerse3,
        chosenVerse4,
      ]);

      const result = await ChosenVerseService.postMany([
        chosenVerse1,
        chosenVerse2,
        chosenVerse3,
        chosenVerse4,
        chosenVerse5,
        chosenVerse6,
        chosenVerse7,
        chosenVerse8,
      ]);
      expect(result).toBeTruthy();
      if (result != false) {
        expect(result.newChosenVerses).toStrictEqual([
          chosenVerse1,
          chosenVerse2,
          chosenVerse3,
          chosenVerse4,
        ]);
        expect(result.inValidChosenVerses).toStrictEqual([
          chosenVerse5,
          chosenVerse6,
          chosenVerse7,
          chosenVerse8,
        ]);
      }
    });
  });

  describe('Testing update()', async () => {
    let tags = 'الفخر',
      verses = [
        {
          sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
          first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
        },
      ];
    test('Update chosenVerse data successfully after validation', async () => {
      vi.spyOn(ChosenVerseDB, 'update').mockResolvedValue({
        affected: 1,
      } as UpdateResult);

      const result1 = await ChosenVerseService.update('1', {
        tags,
      } as ChosenVerse);
      expect(result1).toEqual(1);
      const result2 = await ChosenVerseService.update('1', {
        verses,
      } as ChosenVerse);
      expect(result2).toEqual(1);
    });
    test('return false after invalid chosenVerseData', async () => {
      vi.spyOn(ChosenVerseDB, 'update').mockResolvedValue({
        affected: 1,
      } as UpdateResult);
      const result1 = await ChosenVerseService.update('1', {
        tags: '22',
      } as ChosenVerse);
      expect(result1).toEqual(false);
      const result2 = await ChosenVerseService.update('1', {
        verses: [{ first: 'ss', sec: 'sds' }],
      } as ChosenVerse);
      expect(result2).toEqual(false);
    });
    test('return false after non-existing id', async () => {
      vi.spyOn(ChosenVerseDB, 'update').mockResolvedValue({
        affected: 0,
      } as UpdateResult);

      const result1 = await ChosenVerseService.update('1', {
        tags,
      } as ChosenVerse);
      expect(result1).toEqual(false);
    });
  });

  describe('Testing remove()', async () => {
    test('Successfully deletes poem', async () => {
      vi.spyOn(ChosenVerseDB, 'remove').mockResolvedValue({
        affected: 1,
      } as DeleteResult);

      const result1 = await ChosenVerseService.remove(
        'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      );
      expect(result1).toEqual(1);
    });
    test('return false for non-existing id', async () => {
      vi.spyOn(ChosenVerseDB, 'remove').mockResolvedValue({
        affected: 0,
      } as DeleteResult);

      const result1 = await ChosenVerseService.remove('1');
      expect(result1).toEqual(false);
    });
  });
});

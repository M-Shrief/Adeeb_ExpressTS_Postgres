import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Service
import { ProseService } from './prose.service';
// Repository
import { ProseDB } from './prose.repository';
// Types
import { Prose } from './prose.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

describe.concurrent('Testing ProseService', async () => {
  describe('Testing getAllWithPoetName()', async () => {
    const proses = [
      {
        id: 'f1516238-8691-423e-99b9-a6a8a71ac62b',
        tags: 'حكمة',
        qoute:
          'واعلم أن السفهاء في الدنيا كثير، فمن كان يغضب لكلّ سفاهةٍ من سفيه فإنّ شقاءه سيطول بغضبه.',
        reviewed: true,
        poet: {
          id: '6dafac12-bc71-48b6-877c-e052ec9b82b7',
          name: 'محمود شاكر',
        },
      },
      {
        id: '36d00c00-1cb2-4955-ad96-c87071020711',
        tags: 'حكمة',
        qoute:
          'ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب',
        reviewed: true,
        poet: {
          id: '6dafac12-bc71-48b6-877c-e052ec9b82b7',
          name: 'محمود شاكر',
        },
      },
    ] as Prose[];
    test('Gets data successfully from database', async () => {
      vi.spyOn(ProseDB, 'getAllWithPoetName').mockResolvedValue(proses);
      const result = await ProseService.getAllWithPoetName();
      expect(result).toStrictEqual(proses);
    });
    test('Returns false if not data is avalaible', async () => {
      vi.spyOn(ProseDB, 'getAllWithPoetName').mockResolvedValue([]);
      const result = await ProseService.getAllWithPoetName();
      expect(result).toStrictEqual(false);
    });
  });

  describe('Testing getRandomWithPoetName()', async () => {
    const proses = [
      {
        id: '8446ff12-da55-458d-b3cf-8226736f5c07',
        qoute:
          'يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.',
      },
      {
        id: '36d00c00-1cb2-4955-ad96-c87071020711',
        qoute:
          'ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب',
      },
    ] as Prose[];
    test('Gets data successfully from database', async () => {
      vi.spyOn(ProseDB, 'getRandomWithPoetName').mockResolvedValue(proses);
      const result = await ProseService.getRandomWithPoetName(2);
      expect(result).toStrictEqual(proses);
    });
    test('Returns false if not data is avalaible', async () => {
      vi.spyOn(ProseDB, 'getRandomWithPoetName').mockResolvedValue([]);
      const result = await ProseService.getRandomWithPoetName(2);
      expect(result).toStrictEqual(false);
    });
  });

  describe('Testing getOneWithPoetName()', async () => {
    const prose = {
      id: '8446ff12-da55-458d-b3cf-8226736f5c07',
      tags: 'حكمة, رثاء',
      qoute:
        'يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.',
      reviewed: true,
      poet: {
        id: '6dafac12-bc71-48b6-877c-e052ec9b82b7',
        name: 'محمود شاكر',
      },
    } as Prose;
    test('Gets data successfully from Database', async () => {
      vi.spyOn(ProseDB, 'getOneWithPoetName').mockResolvedValue(prose);
      const result = await ProseService.getOneWithPoetName(
        '8446ff12-da55-458d-b3cf-8226736f5c07',
      );
      expect(result).toStrictEqual(prose);
    });
    test('Returns false if data is not found', async () => {
      vi.spyOn(ProseDB, 'getOneWithPoetName').mockResolvedValue(null);
      const result = await ProseService.getOneWithPoetName('1');
      expect(result).toStrictEqual(false);
    });
  });

  describe('Testing post()', async () => {
    let tags = 'حكمة, رثاء',
      qoute =
        'يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.',
      reviewed = true,
      poet = '6dafac12-bc71-48b6-877c-e052ec9b82b7';
    const prose = { tags, qoute, reviewed, poet } as unknown as Prose;
    test('It posts data successfully after validation', async () => {
      vi.spyOn(ProseDB, 'post').mockResolvedValue(prose);
      const result = await ProseService.post(prose);
      expect(result).toStrictEqual(prose);
    });
    test('it returns false after inValid validation', async () => {
      vi.spyOn(ProseDB, 'post').mockResolvedValue(prose);

      const result1 = await ProseService.post({
        tags,
        qoute,
      } as unknown as Prose);
      expect(result1).toStrictEqual(false);
      const result2 = await ProseService.post({
        tags,
        poet,
      } as unknown as Prose);
      expect(result2).toStrictEqual(false);
      const result3 = await ProseService.post({
        qoute,
        poet,
      } as unknown as Prose);
      expect(result3).toStrictEqual(false);
    });
  });

  describe('Testing postMany()', async () => {
    let tags = 'حكمة, رثاء',
      qoute =
        'يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.',
      reviewed = true,
      poet = '6dafac12-bc71-48b6-877c-e052ec9b82b7';

    const prose1 = { tags, qoute, reviewed, poet } as unknown as Prose;
    const prose2 = { tags, qoute, reviewed, poet } as unknown as Prose;
    const prose3 = { tags, qoute, reviewed, poet } as unknown as Prose;
    const prose4 = { tags, qoute, reviewed } as unknown as Prose;
    const prose5 = { tags, reviewed, poet } as unknown as Prose;
    const prose6 = { qoute, reviewed, poet } as unknown as Prose;
    test('It posts data successfully after validation', async () => {
      vi.spyOn(ProseDB, 'postMany').mockResolvedValue([prose1, prose2, prose3]);
      const result = await ProseService.postMany([
        prose1,
        prose2,
        prose3,
        prose4,
        prose5,
        prose6,
      ]);
      expect(result).toBeTruthy();
      if (result != false) {
        expect(result.newProses).toStrictEqual([prose1, prose2, prose3]);
        expect(result.inValidProses).toStrictEqual([prose4, prose5, prose6]);
      }
    });
  });

  describe('Testing update()', async () => {
    let tags = 'حكمة, رثاء',
      qoute =
        'يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.',
      poet = '6dafac12-bc71-48b6-877c-e052ec9b82b7';
    test('Update poem data successfully after validation', async () => {
      vi.spyOn(ProseDB, 'update').mockResolvedValue({
        affected: 1,
      } as UpdateResult);

      const result1 = await ProseService.update('1', { tags } as Prose);
      expect(result1).toEqual(1);
      const result2 = await ProseService.update('1', {
        poet,
      } as unknown as Prose);
      expect(result2).toEqual(1);
      const result3 = await ProseService.update('1', { qoute } as Prose);
      expect(result3).toEqual(1);
    });
    test('return false after invalid poemData', async () => {
      vi.spyOn(ProseDB, 'update').mockResolvedValue({
        affected: 1,
      } as UpdateResult);

      const result1 = await ProseService.update('1', { tags: 'sa' } as Prose);
      expect(result1).toEqual(false);
      const result2 = await ProseService.update('1', {
        poet: '214',
      } as unknown as Prose);
      expect(result2).toEqual(false);
      const result3 = await ProseService.update('1', { qoute: 'sd' } as Prose);
      expect(result3).toEqual(false);
    });
    test('return false after non-existing id', async () => {
      vi.spyOn(ProseDB, 'update').mockResolvedValue({
        affected: 0,
      } as UpdateResult);

      const result1 = await ProseService.update('1', { qoute } as Prose);
      expect(result1).toEqual(false);
    });
  });

  describe('Testing remove()', async () => {
    test('Successfully deletes poem', async () => {
      vi.spyOn(ProseDB, 'remove').mockResolvedValue({
        affected: 1,
      } as DeleteResult);

      const result1 = await ProseService.remove('1');
      expect(result1).toEqual(1);
    });
    test('return false for non-existing id', async () => {
      vi.spyOn(ProseDB, 'remove').mockResolvedValue({
        affected: 0,
      } as DeleteResult);

      const result1 = await ProseService.remove('1');
      expect(result1).toEqual(false);
    });
  });
});

import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Controller
import { responseInfo } from './prose.controller';
// Entity
import { ERROR_MSG, Prose } from './prose.entity';
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';

describe.concurrent("Testing ProseController's responseInfo", async () => {
    describe("Testing indexWithPoetName()", async() => {
        const service = [
            {
                "id": "f1516238-8691-423e-99b9-a6a8a71ac62b",
                "tags": "حكمة",
                "qoute": "واعلم أن السفهاء في الدنيا كثير، فمن كان يغضب لكلّ سفاهةٍ من سفيه فإنّ شقاءه سيطول بغضبه.",
                "reviewed": true,
                "poet": {
                  "id": "6dafac12-bc71-48b6-877c-e052ec9b82b7",
                  "name": "محمود شاكر"
                }
            },
            {
                "id": "36d00c00-1cb2-4955-ad96-c87071020711",
                "tags": "حكمة",
                "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب",
                "reviewed": true,
                "poet": {
                  "id": "6dafac12-bc71-48b6-877c-e052ec9b82b7",
                  "name": "محمود شاكر"
                }
            },
        ] as Prose[];
        test('Success, return proses with status: ok', async () => {
            const { status, proses, errMsg } = responseInfo.indexWithPoetName(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(proses).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        })
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, proses, errMsg } = responseInfo.indexWithPoetName(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toEqual(ERROR_MSG.NOT_AVAILABLE);
            expect(proses).toBeUndefined();
        })
    })

    describe("Testing indexRandomWithPoetName()", async() => {
        const service = [
            {
              "id": "8446ff12-da55-458d-b3cf-8226736f5c07",
              "qoute": "يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم."
            },
            {
              "id": "36d00c00-1cb2-4955-ad96-c87071020711",
              "qoute": "ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
            }
        ] as Prose[];
        test('Success, return random proses with status: ok', async () => {
            const { status, proses, errMsg } = responseInfo.indexRandomWithPoetName(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(proses).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        })
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, proses, errMsg } = responseInfo.indexRandomWithPoetName(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toEqual(ERROR_MSG.NOT_AVAILABLE);
            expect(proses).toBeUndefined();
        })
    })

    describe("Testing indexOneWithPoetName()", async() => {
        const service = {
            "id": "8446ff12-da55-458d-b3cf-8226736f5c07",
            "tags": "حكمة, رثاء",
            "qoute": "يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.",
            "reviewed": true,
            "poet": {
              "id": "6dafac12-bc71-48b6-877c-e052ec9b82b7",
              "name": "محمود شاكر"
            }
        } as Prose;
        test('Success, return Prose with status OK', async () => {
            const { status, prose, errMsg } = responseInfo.indexOneWithPoetName(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(prose).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        })
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, prose, errMsg } = responseInfo.indexOneWithPoetName(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
            expect(prose).toBeUndefined();
        });
    })

    describe("Testing post()", async() => {
        const service = {
            "id": "8446ff12-da55-458d-b3cf-8226736f5c07",
            "tags": "حكمة, رثاء",
            "qoute": "يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.",
            "reviewed": true,
            "poet": {
              "id": "6dafac12-bc71-48b6-877c-e052ec9b82b7",
              "name": "محمود شاكر"
            }
        } as Prose;
        test('Success, saved abd return prose with status: ok', async () => {
            const { status, prose, errMsg } = responseInfo.post(service);
            expect(status).toEqual(HttpStatusCode.CREATED);
            expect(prose).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        });
        test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
            const { status, prose, errMsg } = responseInfo.post(false);
            expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
            expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
            expect(prose).toBeUndefined();
        });
    })

    describe("Testing postMany()", async() => {
        const service = {
            newProses: [
                {
                    "id": "8446ff12-da55-458d-b3cf-8226736f5c07",
                    "tags": "حكمة, رثاء",
                    "qoute": "يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.",
                    "reviewed": true,
                    "poet": {
                      "id": "6dafac12-bc71-48b6-877c-e052ec9b82b7",
                      "name": "محمود شاكر"
                    }
                },
                {
                    "id": "8446ff12-da55-458d-b3cf-8226736f5c07",
                    "tags": "حكمة, رثاء",
                    "qoute": "يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.",
                    "reviewed": true,
                    "poet": {
                      "id": "6dafac12-bc71-48b6-877c-e052ec9b82b7",
                      "name": "محمود شاكر"
                    }
                }
            ] as unknown as Prose[],
            inValidProses: [
                {
                    "id": "8446ff12-da55-458d-b3cf-8226736f5c07",
                    "tags": "حكمة, رثاء",
                    "qoute": "يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.",
                    "reviewed": true,
                    "poet": {
                      "id": "6dafac12-bc71-48b6-877c-e052ec9b82b7",
                      "name": "محمود شاكر"
                    }
                },
                {
                    "id": "8446ff12-da55-458d-b3cf-8226736f5c07",
                    "tags": "حكمة, رثاء",
                    "qoute": "يرحل الراحلون ليبعثوا في القلوب الذكرى، ويجددوا في الأفئدة بنيان الحسرة، ويورثوا المهج نيران الألم.",
                    "reviewed": true,
                    "poet": {
                      "id": "6dafac12-bc71-48b6-877c-e052ec9b82b7",
                      "name": "محمود شاكر"
                    }
                }
            ] as unknown as Prose[],
        }
        test('Success, saved and return poem with status: ok', async () => {
            const { status, proses, errMsg } = responseInfo.postMany(service);
            expect(status).toEqual(HttpStatusCode.CREATED);
            expect(proses).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        });
      
        test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
            const { status, proses, errMsg } = responseInfo.postMany(false);
            expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
            expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
            expect(proses).toBeUndefined();
        });
    })

    describe('Testing update()', async () => {
        test('Updates prose successfully', async () => {
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
        test('Removes prose successfully', async () => {
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
})

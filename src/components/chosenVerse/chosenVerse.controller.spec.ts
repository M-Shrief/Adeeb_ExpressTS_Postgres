import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Controller
import { responseInfo } from './chosenVerse.controller';
// Entity
import { ERROR_MSG, ChosenVerse } from './chosenVerse.entity';
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';

describe.concurrent("Testing ChosenVerseController's responseInfo", async () => {
    describe("Testing indexWithPoetName()", async() => {
        const service = [
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
        test('Success, return chosenVerses with status: ok', async () => {
            const { status, chosenVerses, errMsg } = responseInfo.indexWithPoetName(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(chosenVerses).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        })
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, chosenVerses, errMsg } = responseInfo.indexWithPoetName(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toEqual(ERROR_MSG.NOT_AVAILABLE);
            expect(chosenVerses).toBeUndefined();
        })
    })

    describe("Testing indexRandomWithPoetName()", async() => {
        const service = [
            {
              "id": "3589b04e-25a2-4a54-aa9b-35f4778027d5",
              "verses": [
                {
                  "sec": "بَل فَاِسقِني بِالعِزِّ كَأسَ الحَنظَلِ",
                  "first": "لا تَسقِني ماءَ الحَياةِ بِذِلَّةٍ"
                }
              ]
            },
            {
              "id": "bdd2adc0-6338-4b30-8507-ef4fdb4ca1bb",
              "verses": [
                {
                  "sec": "عَصَينا المَلكَ فيها أَن نَدينا",
                  "first": "وَأَيّامٍ لَنا غُرٍّ طِوالٍ"
                }
              ]
            }
          ] as ChosenVerse[];
        test('Success, return random chosenVerses with status: ok', async () => {
            const { status, chosenVerses, errMsg } = responseInfo.indexRandomWithPoetName(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(chosenVerses).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        })
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, chosenVerses, errMsg } = responseInfo.indexRandomWithPoetName(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toEqual(ERROR_MSG.NOT_AVAILABLE);
            expect(chosenVerses).toBeUndefined();
        })
    })

    describe("Testing indexOneWithPoetName()", async() => {
        const service = {
            "id": "3589b04e-25a2-4a54-aa9b-35f4778027d5",
            "tags": "الشجاعة,الحكمة",
            "verses": [
              {
                "sec": "بَل فَاِسقِني بِالعِزِّ كَأسَ الحَنظَلِ",
                "first": "لا تَسقِني ماءَ الحَياةِ بِذِلَّةٍ"
              }
            ],
            "reviewed": true,
            "poet": {
              "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
              "name": "عنترة بن شداد"
            },
            "poem": {
              "id": "0343952d-58fc-4f56-b2b6-fc04731de5ce"
            }
          } as ChosenVerse;
        test('Success, return ChosenVerse with status OK', async () => {
            const { status, chosenVerse, errMsg } = responseInfo.indexOneWithPoetName(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(chosenVerse).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        })
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, chosenVerse, errMsg } = responseInfo.indexOneWithPoetName(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
            expect(chosenVerse).toBeUndefined();
        });
    })

    describe("Testing post()", async() => {
        const service = {
            "id": "3589b04e-25a2-4a54-aa9b-35f4778027d5",
            "tags": "الشجاعة,الحكمة",
            "verses": [
              {
                "sec": "بَل فَاِسقِني بِالعِزِّ كَأسَ الحَنظَلِ",
                "first": "لا تَسقِني ماءَ الحَياةِ بِذِلَّةٍ"
              }
            ],
            "reviewed": true,
            "poet": {
              "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
              "name": "عنترة بن شداد"
            },
            "poem": {
              "id": "0343952d-58fc-4f56-b2b6-fc04731de5ce"
            }
          } as ChosenVerse;
        test('Success, saved abd return chosenVerse with status: ok', async () => {
            const { status, chosenVerse, errMsg } = responseInfo.post(service);
            expect(status).toEqual(HttpStatusCode.CREATED);
            expect(chosenVerse).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        });
        test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
            const { status, chosenVerse, errMsg } = responseInfo.post(false);
            expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
            expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
            expect(chosenVerse).toBeUndefined();
        });
    })

    describe("Testing postMany()", async() => {
        const service = {
            newChosenVerses: [
                {
                    "id": "3589b04e-25a2-4a54-aa9b-35f4778027d5",
                    "tags": "الشجاعة,الحكمة",
                    "verses": [
                      {
                        "sec": "بَل فَاِسقِني بِالعِزِّ كَأسَ الحَنظَلِ",
                        "first": "لا تَسقِني ماءَ الحَياةِ بِذِلَّةٍ"
                      }
                    ],
                    "reviewed": true,
                    "poet": {
                      "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                      "name": "عنترة بن شداد"
                    },
                    "poem": {
                      "id": "0343952d-58fc-4f56-b2b6-fc04731de5ce"
                    }
                },
                {
                    "id": "3589b04e-25a2-4a54-aa9b-35f4778027d5",
                    "tags": "الشجاعة,الحكمة",
                    "verses": [
                      {
                        "sec": "بَل فَاِسقِني بِالعِزِّ كَأسَ الحَنظَلِ",
                        "first": "لا تَسقِني ماءَ الحَياةِ بِذِلَّةٍ"
                      }
                    ],
                    "reviewed": true,
                    "poet": {
                      "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                      "name": "عنترة بن شداد"
                    },
                    "poem": {
                      "id": "0343952d-58fc-4f56-b2b6-fc04731de5ce"
                    }
                }
            ] as unknown as ChosenVerse[],
            inValidChosenVerses: [
                {
                    "id": "3589b04e-25a2-4a54-aa9b-35f4778027d5",
                    "tags": "الشجاعة,الحكمة",
                    "verses": [
                      {
                        "sec": "بَل فَاِسقِني بِالعِزِّ كَأسَ الحَنظَلِ",
                        "first": "لا تَسقِني ماءَ الحَياةِ بِذِلَّةٍ"
                      }
                    ],
                    "reviewed": true,
                    "poet": {
                      "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                      "name": "عنترة بن شداد"
                    },
                    "poem": {
                      "id": "0343952d-58fc-4f56-b2b6-fc04731de5ce"
                    }
                },
                {
                    "id": "3589b04e-25a2-4a54-aa9b-35f4778027d5",
                    "tags": "الشجاعة,الحكمة",
                    "verses": [
                      {
                        "sec": "بَل فَاِسقِني بِالعِزِّ كَأسَ الحَنظَلِ",
                        "first": "لا تَسقِني ماءَ الحَياةِ بِذِلَّةٍ"
                      }
                    ],
                    "reviewed": true,
                    "poet": {
                      "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                      "name": "عنترة بن شداد"
                    },
                    "poem": {
                      "id": "0343952d-58fc-4f56-b2b6-fc04731de5ce"
                    }
                }
            ] as unknown as ChosenVerse[],
        }
        test('Success, saved and return poem with status: ok', async () => {
            const { status, chosenVerses, errMsg } = responseInfo.postMany(service);
            expect(status).toEqual(HttpStatusCode.CREATED);
            expect(chosenVerses).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        });
      
        test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
            const { status, chosenVerses, errMsg } = responseInfo.postMany(false);
            expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
            expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
            expect(chosenVerses).toBeUndefined();
        });
    })

    describe('Testing update()', async () => {
        test('Updates chosenVerse successfully', async () => {
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
        test('Updates chosenVerse successfully', async () => {
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
})

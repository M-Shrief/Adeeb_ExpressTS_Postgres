import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Controller
import { responseInfo } from './order.controller';
// Entity
import { ERROR_MSG, Order } from './order.entity';
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';

describe.concurrent("Testing OrderController's responseInfo", async () => {
  describe('Testing indexGuestOrders & indexPartnerOrders responseInfo', async () => {
    const service1 = [
      {
        name: 'Guest Order',
        phone: '01235554580',
        address: '10th streat',
        products: [
          {
            print: {
              id: '3251fb4d-aab0-4639-b049-815745ee7531',
              verses: [
                {
                  first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
                  sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
                },
              ],
            },
            fontType: 'نسخ',
            fontColor: '#fff',
            backgroundColor: '#000',
          },
          {
            print: {
              id: '3251fb4d-aab0-4639-b049-815745ee7531',
              qoute:
                'ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب',
            },
            fontType: 'نسخ',
            fontColor: '#000',
            backgroundColor: 'silver',
          },
          {
            print: {
              id: '3251fb4d-aab0-4639-b049-815745ee7531',
              qoute:
                'فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم.',
            },
            fontType: 'نسخ',
            fontColor: '#f6b352',
            backgroundColor: '#000',
          },
          {
            print: {
              poem: '3251fb4d-aab0-4639-b049-815745ee7531',
              id: '3251fb4d-aab0-4639-b049-815745ee7531',
              verses: [
                {
                  first: 'طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها',
                  sec: 'صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ',
                },
              ],
            },
            fontType: 'نسخ',
            fontColor: '#fff',
            backgroundColor: '#2c3e50',
          },
        ],
        reviewed: false,
        completed: false,
      },
      {
        name: 'Guest Order',
        phone: '01235554580',
        address: '10th streat',
        products: [
          {
            print: {
              id: '3251fb4d-aab0-4639-b049-815745ee7531',
              verses: [
                {
                  first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
                  sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
                },
              ],
            },
            fontType: 'نسخ',
            fontColor: '#fff',
            backgroundColor: '#000',
          },
          {
            print: {
              id: '3251fb4d-aab0-4639-b049-815745ee7531',
              qoute:
                'ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب',
            },
            fontType: 'نسخ',
            fontColor: '#000',
            backgroundColor: 'silver',
          },
          {
            print: {
              id: '3251fb4d-aab0-4639-b049-815745ee7531',
              qoute:
                'فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم.',
            },
            fontType: 'نسخ',
            fontColor: '#f6b352',
            backgroundColor: '#000',
          },
          {
            print: {
              poem: '3251fb4d-aab0-4639-b049-815745ee7531',
              id: '3251fb4d-aab0-4639-b049-815745ee7531',
              verses: [
                {
                  first: 'طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها',
                  sec: 'صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ',
                },
              ],
            },
            fontType: 'نسخ',
            fontColor: '#fff',
            backgroundColor: '#2c3e50',
          },
        ],
        reviewed: false,
        completed: false,
      },
    ] as Order[];
    const service2 = [
      {
        partnerId: '3251fb4d-aab0-4639-b049-815745ee7531',
        name: 'The Den Man',
        phone: '01235554567',
        address: '10th streat Cairo',
        products: [
          {
            prints: [
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
                    sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
                  },
                ],
              },
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                qoute:
                  'ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب',
              },
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                qoute:
                  'فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم.',
              },
              {
                poem: '3251fb4d-aab0-4639-b049-815745ee7531',
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها',
                    sec: 'صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ',
                  },
                ],
              },
              {
                poem: '3251fb4d-aab0-4639-b049-815745ee7531',
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'تَجورُ بِذي اللُبانَةِ عَن هَواهُ',
                    sec: 'إِذا ما ذاقَها حَتّى يَلينا',
                  },
                ],
              },
            ],
            fontType: 'نسخ',
            fontColor: '#fff',
            backgroundColor: '#000',
          },
          {
            prints: [
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
                    sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
                    id: '639c7ebeb95190b2fdf15466',
                  },
                  {
                    first: 'شكتِ البِثَّ لِنجمٍ ساطعٍ',
                    sec: 'ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ',
                    id: '639c7ebeb95190b2fdf15467',
                  },
                ],
              },
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
                    sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
                  },
                ],
              },
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً',
                    sec: 'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ',
                  },
                  {
                    first: 'ما زادَ فَوق الزادِ خُلِّف ضائِعاً',
                    sec: 'في حادِثٍ أَو وارِث أَو عاري',
                  },
                ],
              },
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'ثَوب الرِياء يَشِفُّ عَن ما تَحتَهُ',
                    sec: 'فَإِذا التحفت بِهِ فَإِنَّكَ عاري',
                  },
                ],
              },
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'وَإِذا الجَبانُ نَهاكَ يَومَ كَريهَةٍ',
                    sec: 'خَوفاً عَلَيكَ مِنَ اِزدِحامِ الجَحفَلِ',
                  },
                  {
                    first: 'فَاِعصِ مَقالَتَهُ وَلا تَحفِل بِها',
                    sec: 'وَاِقدِم إِذا حَقَّ اللِقا في الأَوَّلِ',
                  },
                ],
              },
            ],
            fontType: 'نسخ',
            fontColor: '#f6b352',
            backgroundColor: '#000',
          },
        ],
        reviewed: false,
        completed: false,
      },
      {
        partnerId: '3251fb4d-aab0-4639-b049-815745ee7531',
        name: 'The Den Man',
        phone: '01235554567',
        address: '10th streat Cairo',
        products: [
          {
            prints: [
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
                    sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
                  },
                ],
              },
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                qoute:
                  'ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب',
              },
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                qoute:
                  'فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم.',
              },
              {
                poem: '3251fb4d-aab0-4639-b049-815745ee7531',
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها',
                    sec: 'صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ',
                  },
                ],
              },
              {
                poem: '3251fb4d-aab0-4639-b049-815745ee7531',
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'تَجورُ بِذي اللُبانَةِ عَن هَواهُ',
                    sec: 'إِذا ما ذاقَها حَتّى يَلينا',
                  },
                ],
              },
            ],
            fontType: 'نسخ',
            fontColor: '#fff',
            backgroundColor: '#000',
          },
          {
            prints: [
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
                    sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
                    id: '639c7ebeb95190b2fdf15466',
                  },
                  {
                    first: 'شكتِ البِثَّ لِنجمٍ ساطعٍ',
                    sec: 'ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ',
                    id: '639c7ebeb95190b2fdf15467',
                  },
                ],
              },
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
                    sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
                  },
                ],
              },
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً',
                    sec: 'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ',
                  },
                  {
                    first: 'ما زادَ فَوق الزادِ خُلِّف ضائِعاً',
                    sec: 'في حادِثٍ أَو وارِث أَو عاري',
                  },
                ],
              },
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'ثَوب الرِياء يَشِفُّ عَن ما تَحتَهُ',
                    sec: 'فَإِذا التحفت بِهِ فَإِنَّكَ عاري',
                  },
                ],
              },
              {
                id: '3251fb4d-aab0-4639-b049-815745ee7531',
                verses: [
                  {
                    first: 'وَإِذا الجَبانُ نَهاكَ يَومَ كَريهَةٍ',
                    sec: 'خَوفاً عَلَيكَ مِنَ اِزدِحامِ الجَحفَلِ',
                  },
                  {
                    first: 'فَاِعصِ مَقالَتَهُ وَلا تَحفِل بِها',
                    sec: 'وَاِقدِم إِذا حَقَّ اللِقا في الأَوَّلِ',
                  },
                ],
              },
            ],
            fontType: 'نسخ',
            fontColor: '#f6b352',
            backgroundColor: '#000',
          },
        ],
        reviewed: false,
        completed: false,
      },
    ] as Order[];
    test('Success, return guestOrders with status: ok', async () => {
      const result1 = responseInfo.indexOrders(service1);
      expect(result1.status).toEqual(HttpStatusCode.OK);
      expect(result1.orders).toStrictEqual(service1);
      expect(result1.errMsg).toBeUndefined();

      const result2 = responseInfo.indexOrders(service2);
      expect(result2.status).toEqual(HttpStatusCode.OK);
      expect(result2.orders).toStrictEqual(service2);
      expect(result2.errMsg).toBeUndefined();
    });
    test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
      const result1 = responseInfo.indexOrders(false);
      expect(result1.status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(result1.errMsg).toStrictEqual(ERROR_MSG.NOT_FOUND);
      expect(result1.orders).toBeUndefined();
    });
  });

  describe('Testing postGuest & postPartner responseInfo', async () => {
    let partnerId = '3251fb4d-aab0-4639-b049-815745ee7531',
      name = 'The Den Man',
      phone = '01235554567',
      address = '10th streat Cairo',
      products = [
        {
          prints: [
            {
              id: '3251fb4d-aab0-4639-b049-815745ee7531',
              verses: [
                {
                  first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
                  sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
                },
              ],
            },
            {
              id: '3251fb4d-aab0-4639-b049-815745ee7531',
              qoute:
                'ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب',
            },
          ],
          fontType: 'نسخ',
          fontColor: '#fff',
          backgroundColor: '#000',
        },
        {
          prints: [
            {
              id: '3251fb4d-aab0-4639-b049-815745ee7531',
              verses: [
                {
                  first: 'زهرةٌ حَنَّتْ, فباحت؛ فذوت',
                  sec: 'أذْبَلَتها نَفْحةٌ لم تُكْتَمِ',
                  id: '639c7ebeb95190b2fdf15466',
                },
                {
                  first: 'شكتِ البِثَّ لِنجمٍ ساطعٍ',
                  sec: 'ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ',
                  id: '639c7ebeb95190b2fdf15467',
                },
              ],
            },
            {
              id: '3251fb4d-aab0-4639-b049-815745ee7531',
              verses: [
                {
                  first: 'لا ذَنبَ لي كَم رمت كتم فَضائِلي',
                  sec: 'فَكَأَنَّما برقعت وَجه نَهاري',
                },
              ],
            },
          ],
          fontType: 'نسخ',
          fontColor: '#f6b352',
          backgroundColor: '#000',
        },
      ],
      guestOrder = { name, phone, address, products } as Order,
      partnerOrder = { partnerId, name, phone, address, products } as Order;

    test('Success, saved and return Order with status: CREATED', async () => {
      const result1 = responseInfo.postOrder(guestOrder);
      expect(result1.status).toEqual(HttpStatusCode.CREATED);
      expect(result1.order).toStrictEqual(guestOrder);
      expect(result1.errMsg).toBeUndefined();

      const result2 = responseInfo.postOrder(partnerOrder);
      expect(result2.status).toEqual(HttpStatusCode.CREATED);
      expect(result2.order).toStrictEqual(partnerOrder);
      expect(result2.errMsg).toBeUndefined();
    });

    test('Error, return errMsg: Not_VALID with status: Not_ACCEPTABLE', async () => {
      const { status, order, errMsg } = responseInfo.postOrder(false);
      expect(status).toEqual(HttpStatusCode.NOT_ACCEPTABLE);
      expect(errMsg).toStrictEqual(ERROR_MSG.NOT_VALID);
      expect(order).toBeUndefined();
    });
  });

  describe('Testing update()', async () => {
    test('Updates Order successfully', async () => {
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
    test('remove Order successfully', async () => {
      const { status, errMsg } = responseInfo.remove(1);
      expect(status).toEqual(HttpStatusCode.ACCEPTED);
      expect(errMsg).toBeUndefined();
    });
    test('Error, remove is not Acceptable', async () => {
      const { status, errMsg } = responseInfo.remove(false);
      expect(status).toEqual(HttpStatusCode.NOT_FOUND);
      expect(errMsg).toEqual(ERROR_MSG.NOT_FOUND);
    });
  });
});

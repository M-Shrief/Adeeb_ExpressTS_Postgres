import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Service
import { OrderService } from './order.service';
// Repository
import { OrderDB } from './order.repository';
// Types
import { Order } from './order.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

describe.concurrent('Testing PartnerService', async () => {
    describe("Testing getGuestOrders()", async() => {
        const guestOrders = [
            {
                "name":"Guest Order",
                "phone":"01235554580",
                "address":"10th streat",
                "products":[
                    {
                        "print":{
                            "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                        },
                        "fontType":"نسخ",
                        "fontColor":"#fff",
                        "backgroundColor":"#000"
                    },
                    {
                        "print":{
                            "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "qoute":"ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
                        },
                        "fontType":"نسخ",
                        "fontColor":"#000",
                        "backgroundColor":"silver"
                    },
                    {
                        "print":{
                            "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "qoute":"فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
                        },
                        "fontType":"نسخ",
                        "fontColor":"#f6b352",
                        "backgroundColor":"#000"
                    },
                    {
                        "print":{
                            "poem":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "verses":[{"first":"طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها","sec":"صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ"}]
                        },
                        "fontType":"نسخ",
                        "fontColor":"#fff",
                        "backgroundColor":"#2c3e50"
                    }
                ],
                "reviewed": false,
                "completed": false
            },
            {
                "name":"Guest Order",
                "phone":"01235554580",
                "address":"10th streat",
                "products":[
                    {
                        "print":{
                            "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                        },
                        "fontType":"نسخ",
                        "fontColor":"#fff",
                        "backgroundColor":"#000"
                    },
                    {
                        "print":{
                            "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "qoute":"ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
                        },
                        "fontType":"نسخ",
                        "fontColor":"#000",
                        "backgroundColor":"silver"
                    },
                    {
                        "print":{
                            "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "qoute":"فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
                        },
                        "fontType":"نسخ",
                        "fontColor":"#f6b352",
                        "backgroundColor":"#000"
                    },
                    {
                        "print":{
                            "poem":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "verses":[{"first":"طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها","sec":"صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ"}]
                        },
                        "fontType":"نسخ",
                        "fontColor":"#fff",
                        "backgroundColor":"#2c3e50"
                    }
                ],
                "reviewed": false,
                "completed": false
            }
        ] as Order[];
        test("Gets data successfully from database", async() => {
            vi.spyOn(OrderDB, "getGuestOrders").mockResolvedValue(guestOrders);
            const result = await OrderService.getGuestOrders("Guest Order","01235554580")
            expect(result).toStrictEqual(guestOrders)
        })
        test("Returns false if data in not fount", async() => {
            vi.spyOn(OrderDB, "getGuestOrders").mockResolvedValue([]);
            const result = await OrderService.getGuestOrders("Guest Order","01235554580")
            expect(result).toStrictEqual(false)
        })
    })

    describe("Testing getPartnerOrders()", async() => {
        const partnerOrders = [
            {
                "partnerId":"3251fb4d-aab0-4639-b049-815745ee7531",
                "name": "The Den Man",
                "phone": "01235554567",
                "address":"10th streat Cairo",
                "products":[
                    {
                        "prints":[
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                            },
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "qoute":"ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
                            },
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "qoute":"فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
                            },
                            {
                                "poem":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses": [
                                    {"first":"طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها","sec":"صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ"}
                                ]
                            },
                            {
                                "poem":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[{"first":"تَجورُ بِذي اللُبانَةِ عَن هَواهُ","sec":"إِذا ما ذاقَها حَتّى يَلينا"}]
                            }
                        ],
                        "fontType":"نسخ",
                        "fontColor":"#fff",
                        "backgroundColor":"#000"
                    },
                    {
                        "prints":[
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[
                                    {"first":"زهرةٌ حَنَّتْ, فباحت؛ فذوت","sec":"أذْبَلَتها نَفْحةٌ لم تُكْتَمِ","id":"639c7ebeb95190b2fdf15466"},
                                    {"first":"شكتِ البِثَّ لِنجمٍ ساطعٍ","sec":"ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ","id":"639c7ebeb95190b2fdf15467"}
                                ]
                            },
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                            },
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[
                                    {"first":"نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً","sec":"وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ"},
                                    {"first":"ما زادَ فَوق الزادِ خُلِّف ضائِعاً","sec":"في حادِثٍ أَو وارِث أَو عاري"}
                                ]
                            },
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[{"first":"ثَوب الرِياء يَشِفُّ عَن ما تَحتَهُ","sec":"فَإِذا التحفت بِهِ فَإِنَّكَ عاري"}]
                            },
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[
                                    {"first":"وَإِذا الجَبانُ نَهاكَ يَومَ كَريهَةٍ","sec":"خَوفاً عَلَيكَ مِنَ اِزدِحامِ الجَحفَلِ"},
                                    {"first":"فَاِعصِ مَقالَتَهُ وَلا تَحفِل بِها","sec":"وَاِقدِم إِذا حَقَّ اللِقا في الأَوَّلِ"}
                                ]
                            }
                        ],
                        "fontType":"نسخ",
                        "fontColor":"#f6b352",
                        "backgroundColor":"#000"
                    }
                ],
                "reviewed": false,
                "completed": false
            },
            {
                "partnerId":"3251fb4d-aab0-4639-b049-815745ee7531",
                "name": "The Den Man",
                "phone": "01235554567",
                "address":"10th streat Cairo",
                "products":[
                    {
                        "prints":[
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                            },
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "qoute":"ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
                            },
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "qoute":"فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
                            },
                            {
                                "poem":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses": [
                                    {"first":"طُبِعَــت عَلــى كـدرٍ وَأَنـتَ تُريـدُها","sec":"صـــَفواً مِــنَ الأَقــذاءِ وَالأَكــدارِ"}
                                ]
                            },
                            {
                                "poem":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[{"first":"تَجورُ بِذي اللُبانَةِ عَن هَواهُ","sec":"إِذا ما ذاقَها حَتّى يَلينا"}]
                            }
                        ],
                        "fontType":"نسخ",
                        "fontColor":"#fff",
                        "backgroundColor":"#000"
                    },
                    {
                        "prints":[
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[
                                    {"first":"زهرةٌ حَنَّتْ, فباحت؛ فذوت","sec":"أذْبَلَتها نَفْحةٌ لم تُكْتَمِ","id":"639c7ebeb95190b2fdf15466"},
                                    {"first":"شكتِ البِثَّ لِنجمٍ ساطعٍ","sec":"ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ","id":"639c7ebeb95190b2fdf15467"}
                                ]
                            },
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                            },
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[
                                    {"first":"نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً","sec":"وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ"},
                                    {"first":"ما زادَ فَوق الزادِ خُلِّف ضائِعاً","sec":"في حادِثٍ أَو وارِث أَو عاري"}
                                ]
                            },
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[{"first":"ثَوب الرِياء يَشِفُّ عَن ما تَحتَهُ","sec":"فَإِذا التحفت بِهِ فَإِنَّكَ عاري"}]
                            },
                            {
                                "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                                "verses":[
                                    {"first":"وَإِذا الجَبانُ نَهاكَ يَومَ كَريهَةٍ","sec":"خَوفاً عَلَيكَ مِنَ اِزدِحامِ الجَحفَلِ"},
                                    {"first":"فَاِعصِ مَقالَتَهُ وَلا تَحفِل بِها","sec":"وَاِقدِم إِذا حَقَّ اللِقا في الأَوَّلِ"}
                                ]
                            }
                        ],
                        "fontType":"نسخ",
                        "fontColor":"#f6b352",
                        "backgroundColor":"#000"
                    }
                ],
                "reviewed": false,
                "completed": false
            }
        ] as Order[];
        test("Gets data successfully from database", async() => {
            vi.spyOn(OrderDB, "getPartnerOrders").mockResolvedValue(partnerOrders);
            const result = await OrderService.getPartnerOrders("3251fb4d-aab0-4639-b049-815745ee7531")
            expect(result).toStrictEqual(partnerOrders)
        })
        test("Returns false if data in not fount", async() => {
            vi.spyOn(OrderDB, "getPartnerOrders").mockResolvedValue([]);
            const result = await OrderService.getPartnerOrders("3251fb4d-aab0-4639-b049-815745ee7531")
            expect(result).toStrictEqual(false)
        })
    })

    describe("Testing post()", async() => {
        let partnerId ="3251fb4d-aab0-4639-b049-815745ee7531",
            name =  "The Den Man",
            phone = "01235554567",
            address = "10th streat Cairo",
            products=[
                {
                    "prints":[
                        {
                            "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                        },
                        {
                            "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "qoute":"ويزيد الأمر بشاعةً: أن الذين هم هدفٌ للتدمير والتمزيق والنسف، لا يكادون يتوهمون أن ميدان الثقافة والأدب والفكر هو أخطر ميادين هذه الحرب"
                        },
                    ],
                    "fontType":"نسخ",
                    "fontColor":"#fff",
                    "backgroundColor":"#000"
                },
                {
                    "prints":[
                        {
                            "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "verses":[
                                {"first":"زهرةٌ حَنَّتْ, فباحت؛ فذوت","sec":"أذْبَلَتها نَفْحةٌ لم تُكْتَمِ","id":"639c7ebeb95190b2fdf15466"},
                                {"first":"شكتِ البِثَّ لِنجمٍ ساطعٍ","sec":"ثُمَّ ظَلَّتْ في شُعاعٍ مُلهِمِ","id":"639c7ebeb95190b2fdf15467"}
                            ]
                        },
                        {
                            "id":"3251fb4d-aab0-4639-b049-815745ee7531",
                            "verses":[{"first":"لا ذَنبَ لي كَم رمت كتم فَضائِلي","sec":"فَكَأَنَّما برقعت وَجه نَهاري"}]
                        },
                    ],
                    "fontType":"نسخ",
                    "fontColor":"#f6b352",
                    "backgroundColor":"#000"
                }
            ],
            guestOrder = {name, phone, address, products} as Order,
            partnerOrder = {partnerId, name, phone, address, products} as Order;
        test('Post guestOrder successfully after validation', async () => {
            vi.spyOn(OrderDB, 'post').mockResolvedValue(guestOrder);
            const result = await OrderService.post(guestOrder);
            expect(result).toStrictEqual(guestOrder)
        })
        test('Post partnerOrder successfully after validation', async () => {
            vi.spyOn(OrderDB, 'post').mockResolvedValue(partnerOrder);
            const result = await OrderService.post(partnerOrder);
            expect(result).toStrictEqual(partnerOrder)
        })
        test('Return false if data validation failed', async () => {
            vi.spyOn(OrderDB, 'post').mockResolvedValue(partnerOrder);
            
            const result1 = await OrderService.post({name} as Order);
            expect(result1).toStrictEqual(false);
            const result2 = await OrderService.post({products} as Order);
            expect(result2).toStrictEqual(false);
        })        
    })

    describe('Testing update()', async () => {
        let name =  "The Den Man",
        phone = "01235554567",
        address = "10th streat Cairo";
        test('Update poem data successfully after validation', async () => {
          vi.spyOn(OrderDB, 'update').mockResolvedValue({
            affected: 1,
          } as UpdateResult);
    
          const result1 = await OrderService.update('1', { name } as Order);
          expect(result1).toEqual(1);
          const result2 = await OrderService.update('1', {
            phone,
          } as unknown as Order);
          expect(result2).toEqual(1);
          const result3 = await OrderService.update('1', { address } as Order);
          expect(result3).toEqual(1);
        });
        test('return false after invalid poemData', async () => {
          vi.spyOn(OrderDB, 'update').mockResolvedValue({
            affected: 1,
          } as UpdateResult);
    
          const result1 = await OrderService.update('1', { name: 'sa' } as Order);
          expect(result1).toEqual(false);
          const result2 = await OrderService.update('1', {
            phone: '214',
          } as Order);
          expect(result2).toEqual(false);
          const result3 = await OrderService.update('1', {
            address: "2fs",
          } as Order);
          expect(result3).toEqual(false);
        });
        test('return false after non-existing id', async () => {
          vi.spyOn(OrderDB, 'update').mockResolvedValue({
            affected: 0,
          } as UpdateResult);
    
          const result1 = await OrderService.update('1', { name } as Order);
          expect(result1).toEqual(false);
        });
      });
    
      describe('Testing remove()', async () => {
        test('Successfully deletes poem', async () => {
          vi.spyOn(OrderDB, 'remove').mockResolvedValue({
            affected: 1,
          } as DeleteResult);
    
          const result1 = await OrderService.remove('e7749f21-9cf9-4981-b7a8-2ce262f159f6');
          expect(result1).toEqual(1);
        });
        test('return false for non-existing id', async () => {
          vi.spyOn(OrderDB, 'remove').mockResolvedValue({
            affected: 0,
          } as DeleteResult);
    
          const result1 = await OrderService.remove('1');
          expect(result1).toEqual(false);
        });
      });
})

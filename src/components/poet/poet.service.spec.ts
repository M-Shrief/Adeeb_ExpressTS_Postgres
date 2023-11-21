import { describe, expect, it, vi, test, beforeAll } from 'vitest'
// Component
import {PoetDB, PoetRedis} from './poet.repository'
import {PoetService} from './poet.service'
import { Poet } from './poet.entity'
import { AppDataSource } from '../../db'


describe.concurrent("Testing PoetSerivce", async() => {
  describe("Testing getOneWithLiterature()", async () => {
    const poetWithLiterature = {
        "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
        "name": "عنترة بن شداد",
        "time_period": "جاهلي",
        "bio": "عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة.",
        "poems": [
          {
            "id": "0343952d-58fc-4f56-b2b6-fc04731de5ce",
            "intro": "حَكِّم سُيوفَكَ في رِقابِ العُذَّلِ"
          },
          {
            "id": "f3ac040d-3402-41ee-9cdc-7c141558668d",
            "intro": "testing89"
          },
          {
            "id": "13857487-5a74-424d-aab2-deb5aa79127d",
            "intro": "testing3"
          }
        ],
        "chosenVerses": [
          {
            "id": "116d9b44-2a7b-4739-9014-d19a7677dd72",
            "tags": "الفخر",
            "verses": [
              {
                "sec": "فَكَأَنَّما برقعت وَجه نَهاري",
                "first": "لا ذَنبَ لي كَم رمت كتم فَضائِلي"
              }
            ],
            "poem": {
              "id": "414808c1-1b70-4f52-896d-01b15b05acc3"
            }
          },
        ],
        "proses": [
          {
            "id": "5bda8eea-8356-472e-ba96-4fdf7283422c",
            "tags": "حكمة, حب, العلم",
            "qoute": "اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا.."
          }
        ]
      } as Poet;
    it("Gets data successfully from Database", async() => {
      vi.spyOn(AppDataSource, "getRepository").getMockImplementation()
      vi.spyOn(PoetRedis, 'get').mockImplementation(async() => null)
      vi.spyOn(PoetDB, "getOneWithLiterature").mockImplementation(async () => poetWithLiterature)
  
      const result = await PoetService.getOneWithLiterature( "e7749f21-9cf9-4981-b7a8-2ce262f159f6")
      expect(result).toStrictEqual(poetWithLiterature)
    })
  
    it("Gets data successfully from Redis", async() => {
      vi.spyOn(AppDataSource, "getRepository").getMockImplementation()
      vi.spyOn(PoetRedis, 'get').mockImplementation(async() => JSON.stringify(poetWithLiterature))
      vi.spyOn(PoetDB, "getOneWithLiterature").mockImplementation(async () => null)
  
      const result = await PoetService.getOneWithLiterature( "e7749f21-9cf9-4981-b7a8-2ce262f159f6")
      expect(result).toStrictEqual(poetWithLiterature)
    })
  
    it("Returns false if no data is not found", async() => {
      vi.spyOn(AppDataSource, "getRepository").getMockImplementation()
      vi.spyOn(PoetRedis, 'get').mockImplementation(async() => null)
      vi.spyOn(PoetDB, "getOneWithLiterature").mockImplementation(async () => null)
  
      const result = await PoetService.getOneWithLiterature( "e7749f21-9cf9-4981-b7a8-2ce262f159f6")
      expect(result).toEqual(false)
    })
  
  })
})


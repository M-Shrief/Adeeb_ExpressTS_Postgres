import { describe, expect, it, vi, test, beforeAll } from 'vitest'
// Component
import {PoetDB, PoetRedis} from './poet.repository'
import {PoetService} from './poet.service'
import { Poet, TimePeriodType } from './poet.entity'
import { AppDataSource } from '../../db'
import { UpdateResult } from 'typeorm'


describe.concurrent("Testing PoetSerivce", async() => {
  describe("Testing getALL()", async () => {
    const poets = [
      {
        "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
        "name": "عنترة بن شداد",
        "time_period": "جاهلي",
      },
      {
      "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
      "name": "عنترة بن شداد",
      "time_period": "جاهلي",
      }
    ] as Poet[];
    test("Gets data successfully from Database", async() => {
      vi.spyOn(PoetDB, "getAll").mockResolvedValue(poets)

      const result = await PoetService.getAll()
      expect(result).toStrictEqual(poets)
    })
    test("Returns false if no data is not available", async() => {
      vi.spyOn(PoetDB, "getAll").mockResolvedValue([])

      const result = await PoetService.getAll()
      expect(result).toStrictEqual(false)
    })
  })

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
      vi.spyOn(PoetRedis, 'get').mockResolvedValue(null)
      vi.spyOn(PoetDB, "getOneWithLiterature").mockResolvedValue(poetWithLiterature)
  
      const result = await PoetService.getOneWithLiterature( "e7749f21-9cf9-4981-b7a8-2ce262f159f6")
      expect(result).toStrictEqual(poetWithLiterature)
    })
  
    it("Gets data successfully from Redis", async() => {
      vi.spyOn(PoetRedis, 'get').mockResolvedValue(JSON.stringify(poetWithLiterature))
      vi.spyOn(PoetDB, "getOneWithLiterature").mockResolvedValue(null)
  
      const result = await PoetService.getOneWithLiterature( "e7749f21-9cf9-4981-b7a8-2ce262f159f6")
      expect(result).toStrictEqual(poetWithLiterature)
    })
  
    it("Returns false if no data is not found", async() => {
      vi.spyOn(PoetRedis, 'get').mockResolvedValue(null)
      vi.spyOn(PoetDB, "getOneWithLiterature").mockResolvedValue(null)
  
      const result = await PoetService.getOneWithLiterature( "e7749f21-9cf9-4981-b7a8-2ce262f159f6")
      expect(result).toEqual(false)
    })
  
  })

  describe("Testing post()", async() => {
    let name = "عنترة بن شداد",
    time_period =  "جاهلي",
    bio= "عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة.";

    const poet = {name, time_period, bio} as Poet
    test("Post data successfully after validation", async() => {
      vi.spyOn(PoetDB, "post").mockResolvedValue(poet)

      const result = await PoetService.post(poet);
      expect(result).toStrictEqual(poet)
    })
    test("Return false if data validation failed", async() => {
      vi.spyOn(PoetDB, "post").mockResolvedValue(poet)

      const result1 = await PoetService.post({name, time_period} as Poet)
      expect(result1).toEqual(false)
      const result2 = await PoetService.post({name,bio} as Poet)
      expect(result2).toEqual(false)
      const result3 = await PoetService.post({time_period, bio} as Poet)
      expect(result3).toEqual(false)
    })
  })

  describe("Testing postMany()", async() => {
    let name = "عنترة بن شداد",
    time_period =  "جاهلي",
    bio= "عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة.";

    const poet1 = {name, time_period, bio} as Poet
    const poet2 = {name, time_period, bio} as Poet
    const poet3 = {name, time_period, bio} as Poet
    const poet4 = {name, time_period} as Poet
    const poet5 = {name, bio} as Poet
    const poet6 = {time_period, bio} as Poet
    test("Post valid data successfully after validation and return inValid ones", async() => {
      vi.spyOn(PoetDB, "postMany").mockResolvedValue([poet1, poet2, poet3])

      const result= await PoetService.postMany([poet1,poet2,poet3,poet4,poet5, poet6]);
      expect(result).toBeTruthy()
      if(result != false) {
        expect(result.newPoets).toStrictEqual([poet1, poet2, poet3])
        expect(result.notValidPoets).toStrictEqual([poet4, poet5, poet6])
      }
    })
  })

  describe("Testing update()", async() => {
    let name = "عنترة بن شداد",
    time_period =  "جاهلي",
    bio= "عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة.";

    test("Update poet data successfully after successful validation",async () => {
      vi.spyOn(PoetDB, "update").mockResolvedValue({affected: 1} as UpdateResult);      

      const result1 = await PoetService.update("1",{name} as Poet)
      expect(result1).toEqual(1)
      const result2 = await PoetService.update("1",{time_period} as Poet)
      expect(result2).toEqual(1)
      const result3 = await PoetService.update("1",{bio} as Poet)
      expect(result3).toEqual(1)
    })
    test("return false after invalid poetData",async () => {
      vi.spyOn(PoetDB, "update").mockResolvedValue({affected: 1} as UpdateResult);      

      const result1 = await PoetService.update("1",{name: "sa"} as Poet)
      expect(result1).toEqual(false)
      const result2 = await PoetService.update("1",{time_period: "عثماني " as TimePeriodType} as Poet)
      expect(result2).toEqual(false)
      const result3 = await PoetService.update("1",{bio: 'sds'} as Poet)
      expect(result3).toEqual(false)
    })
    test("return false after non-existing id",async () => {
      vi.spyOn(PoetDB, "update").mockResolvedValue({affected: 0} as UpdateResult);      

      const result1 = await PoetService.update("1",{name: "sa"} as Poet)
      expect(result1).toEqual(false)
    })
  })

  describe("Testing remove()", async() => {
    test("Successfully deletes poet", async() => {
      vi.spyOn(PoetDB, "remove").mockResolvedValue({affected: 1} as UpdateResult);      

      const result1 = await PoetService.remove("1")
      expect(result1).toEqual(1)
    })
    test("return false for non-existing id", async() => {
      vi.spyOn(PoetDB, "remove").mockResolvedValue({affected: 0} as UpdateResult);      

      const result1 = await PoetService.remove("1")
      expect(result1).toEqual(false)
    })
  })
})


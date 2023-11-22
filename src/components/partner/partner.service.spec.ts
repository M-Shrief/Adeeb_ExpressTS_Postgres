import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Service
import { PartnerService } from './partner.service';
// Repository
import { PartnerDB } from './partner.repository';
// Types
import { Partner } from './partner.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
// Utils
import { hashPassword } from '../../utils/auth';

describe.concurrent('Testing PartnerService', async () => {
    describe("Testing getInfo()", async() => {
        const partnerInfo = {
            "id": "3251fb4d-aab0-4639-b049-815745ee7531",
            "name": "E2E Test",
            "phone": "01235554567",
            "orders": [
                {
                    "id": "59688fc0-6399-4f06-b16d-3d45dded47e5"
                },
                {
                    "id": "b494cc74-2f23-48cf-9fe3-240de0f7588a"
                },
                {
                    "id": "65cab344-da18-487f-baff-125d6849563d"
                },
                {
                    "id": "89b84298-6a22-40a0-8813-2bf8e6c8616e"
                }
            ]
        } as unknown as Partner;
        test("Gets data successfully from database", async() => {
            vi.spyOn(PartnerDB, "getInfo").mockResolvedValue(partnerInfo);
            const result = await PartnerService.getInfo("3251fb4d-aab0-4639-b049-815745ee7531");
            expect(result).toStrictEqual(partnerInfo)
        })
        test("Returns false if data in not fount", async() => {
            vi.spyOn(PartnerDB, "getInfo").mockResolvedValue(null);
            const result = await PartnerService.getInfo("3251fb4d-aab0-4639-b049-815745ee7531");
            expect(result).toStrictEqual(false)
        })
    })

    describe("Testing signup()", async() => {
        let name = "E2E Test",
            phone = "01235554567",
            password = "P@ssword1",
            hashed = await hashPassword(password);
        test("SignUp successfully after validation and hashing password", async() => {
            vi.spyOn(PartnerDB, "signup").mockResolvedValue({name, phone, password: hashed} as Partner);
            const result = await PartnerService.signup({name, phone, password} as Partner)
            expect(result).toStrictEqual({name, phone, password: hashed} as Partner)
        })
        test("Returns false after inValid data", async() => {
            vi.spyOn(PartnerDB, "signup").mockResolvedValue({name, phone, password: hashed} as Partner);
            
            const result1 = await PartnerService.signup({name, phone} as Partner)
            expect(result1).toEqual(false)
            const result2 = await PartnerService.signup({name, password} as Partner)
            expect(result2).toEqual(false)
            const result3 = await PartnerService.signup({phone, password} as Partner)
            expect(result3).toEqual(false)
        })
    })

    describe("Testing login()", async() => {
        let phone = "01235554567",
            password = "P@ssword1",
            hashed = await hashPassword(password);
        test("SignUp successfully after validation and hashing password", async() => {
            vi.spyOn(PartnerDB, "login").mockResolvedValue({ phone, password: hashed} as Partner);
            const result = await PartnerService.login(phone, password)
            expect(result).toStrictEqual({phone, password: hashed} as Partner)
        })
        test("Returns false after for non-existing phone or inValid password", async() => {
            vi.spyOn(PartnerDB, "login").mockResolvedValue(null);
            const result = await PartnerService.login(phone, password)
            expect(result).toEqual(false)
        })
        test("Returns false after for non-existing phone or inValid password", async() => {
            // not equal the hashed password in DB
            vi.spyOn(PartnerDB, "login").mockResolvedValue({ phone, password} as Partner);
            const result = await PartnerService.login(phone, password)
            expect(result).toEqual(false)
        })
    })

    describe("Testing update()", async() => {
        let name = "E2E Test",
            phone = "01235554567",
            password = "P@ssword1";
        test("Updated Partner data successfully after validation and hashing password", async() => {
            vi.spyOn(PartnerDB, "update").mockResolvedValue({
                affected: 1,
              } as UpdateResult);
            const result1 = await PartnerService.update("1", {name} as Partner)
            expect(result1).toStrictEqual(1)
            const result2 = await PartnerService.update("1", {phone} as Partner)
            expect(result2).toStrictEqual(1)
            const result3 = await PartnerService.update("1", {password} as Partner)
            expect(result3).toStrictEqual(1)
        })
        test("return false if partner is not found", async() => {
            vi.spyOn(PartnerDB, "update").mockResolvedValue({
                affected: 0,
              } as UpdateResult);
            const result1 = await PartnerService.update("1", {name} as Partner)
            expect(result1).toEqual(false)
            const result2 = await PartnerService.update("1", {phone} as Partner)
            expect(result2).toEqual(false)
            const result3 = await PartnerService.update("1", {password} as Partner)
            expect(result3).toEqual(false)
        })
        test("Returns false after inValid data", async() => {
            vi.spyOn(PartnerDB, "update").mockResolvedValue({
                affected: 1,
              } as UpdateResult);
            
              const result1 = await PartnerService.update("1", {name: "sd"} as Partner)
              expect(result1).toEqual(false)
              const result2 = await PartnerService.update("1", {phone: "sd"} as Partner)
              expect(result2).toEqual(false)
              const result3 = await PartnerService.update("1", {password: "sd"} as Partner)
              expect(result3).toEqual(false)
        })
    })

    describe('Testing remove()', async () => {
        test('Successfully deletes poem', async () => {
          vi.spyOn(PartnerDB, 'remove').mockResolvedValue({
            affected: 1,
          } as DeleteResult);
    
          const result1 = await PartnerService.remove('e7749f21-9cf9-4981-b7a8-2ce262f159f6');
          expect(result1).toEqual(1);
        });
        test('return false for non-existing id', async () => {
          vi.spyOn(PartnerDB, 'remove').mockResolvedValue({
            affected: 0,
          } as DeleteResult);
    
          const result1 = await PartnerService.remove('1');
          expect(result1).toEqual(false);
        });
      });
})
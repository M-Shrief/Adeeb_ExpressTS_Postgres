import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Service
import { PartnerService } from './partner.service';
// Repository
import { PartnerDB } from './partner.repository';
// Types
import { Partner } from './partner.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

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
})
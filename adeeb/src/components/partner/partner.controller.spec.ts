import { describe, expect, it, vi, test, beforeAll } from 'vitest';
// Controller
import { responseInfo } from './partner.controller';
// Entity
import { ERROR_MSG, Partner } from './partner.entity';
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';

describe.concurrent("Testing PartnerController's responseInfo", async () => {
    describe("Testing indexInfo()", async() => {
        const service = {
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
        test("Success, return partner data successfully with status: OK", async() => {
            const { status, partner, errMsg } = responseInfo.indexInfo(service);
            expect(status).toEqual(HttpStatusCode.OK);
            expect(partner).toStrictEqual(service);
            expect(errMsg).toBeUndefined();
        });
        test('Error, return errMsg: NOT_FOUND with status: Not_Found', async () => {
            const { status, partner, errMsg } = responseInfo.indexInfo(false);
            expect(status).toEqual(HttpStatusCode.NOT_FOUND);
            expect(errMsg).toStrictEqual(ERROR_MSG.NOT_FOUND);
            expect(partner).toBeUndefined();
        });
    });
})
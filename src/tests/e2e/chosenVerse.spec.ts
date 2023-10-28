import {assert, util} from 'chai';
import {describe, it} from 'mocha'
// Utils
import {baseHttp} from '../axios';
import HttpStatusCode from '../../utils/httpStatusCode';
// Types
import { AxiosError } from 'axios';
import { ERROR_MSG, ChosenVerse } from '../../components/chosenVerse/chosenVerse.entity';

describe('GET /chosenverses', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get('chosenverses');
        
        assert.strictEqual(req.status, HttpStatusCode.OK);
        const chosenVerses: ChosenVerse[] = req.data;

        assert.isArray(chosenVerses);
        assert.isDefined(chosenVerses[0].id)
        assert.isDefined(chosenVerses[0].poet)
        assert.isDefined(chosenVerses[0].poem)
        assert.isArray(chosenVerses[0].verses);
        assert.isDefined(chosenVerses[0].tags)
        assert.isDefined(chosenVerses[0].reviewed)
    })
})

describe('GET /chosenverses/random', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get('chosenverses/random?num=3');
        
        assert.strictEqual(req.status, HttpStatusCode.OK);
        const chosenVerses: ChosenVerse[] = req.data;

        assert.isArray(chosenVerses);
        assert.equal(chosenVerses.length, 3);


        assert.isDefined(chosenVerses[0].id)
        assert.isArray(chosenVerses[0].verses);
    })

    it('gets 400 when query.num is not a number', async () => {
        try {
            await baseHttp.get('chosenverses/random?num=a');
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.NUM)    
                return;
            }
            throw error;
        }
    })
})

describe('GET /chosenverse/:id', () => {
    let chosenVerseId: string;
    before(async () => {
        const req = await baseHttp.get('chosenverses');
        chosenVerseId = req.data[0].id;
    })

    it('Responds with the right JSON body', async() => {
        const req = await baseHttp.get(`chosenverse/${chosenVerseId}`)

        assert.equal(req.status, HttpStatusCode.OK);
        assert.isDefined(req.data.id);
        assert.isDefined(req.data.poet);
        assert.isDefined(req.data.poem);
        assert.isArray(req.data.verses);
        assert.isDefined(req.data.tags);
        assert.isDefined(req.data.reviewed);
    })
    
    it('gets 404 with nonExisting UUID', async () => {
        try {
            const corruptedId = chosenVerseId.replace(chosenVerseId[5], 'a');
            await baseHttp.get(`chosenverse/${corruptedId}`);
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.NOT_FOUND);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND)    
                return;
            }
            throw error;
        }
    })

    it('gets 400 with wrong :id format', async () => {
        try {
            await baseHttp.get(`chosenverse/22`);
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND)    
                return;
            }
            throw error;
        }

    })
})

describe('POST /chosenverses', () => {
    const data = [
        {
            "poet": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
            "poem": "414808c1-1b70-4f52-896d-01b15b05acc3",
            "reviewed": true,
            "tags": "الفخر",
            "verses": [
            {
                "first": "لا ذَنبَ لي كَم رمت كتم فَضائِلي",
                "sec": "فَكَأَنَّما برقعت وَجه نَهاري"
            }
            ]
        },
        {
            "poet": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
            "poem": "414808c1-1b70-4f52-896d-01b15b05acc3",
            "reviewed": true,
            "tags": "الفخر",
            "verses": [
            {
                "first": "لا ذَنبَ لي كَم رمت كتم فَضائِلي",
                "sec": "فَكَأَنَّما برقعت وَجه نَهاري"
            }
            ]
        },
        {
            "poem": "414808c1-1b70-4f52-896d-01b15b05acc3",
            "reviewed": true,
            "tags": "الفخر",
            "verses": [
            {
                "first": "لا ذَنبَ لي كَم رمت كتم فَضائِلي",
                "sec": "فَكَأَنَّما برقعت وَجه نَهاري"
            }
            ]
        },
    ]
    const testChosenVersesIds: string[] = [];
    afterEach(() => {
        testChosenVersesIds.forEach(async (id) => {
            await baseHttp.delete(`poem/${id}`);
        })
    })
    it('it saves valid entries correctly, and returns valid & non-valid entries', async () => {

        try {
            
      
        const req = await baseHttp.post('/chosenverses', data);

        const chosenVersesIds = req.data.newChosenVerses.map((chosenVerse: ChosenVerse) => chosenVerse.id)
        testChosenVersesIds.push(...chosenVersesIds);

        assert.strictEqual(req.status, HttpStatusCode.CREATED)

        assert.isNotEmpty(req.data.newChosenVerses);
        assert.containsAllKeys(req.data.newChosenVerses[0], data[0]);

        assert.isNotEmpty(req.data.nonValidChosenVerses);
        assert.containsAllKeys(req.data.nonValidChosenVerses[0], data[2]);
    } catch (error) {
            if(error instanceof AxiosError) {
               throw error
            }
        }
    })
})

describe('POST /chosenverse', () => {
    it('it post valid data correctly', async() => {
        const data = {
            "poet": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
            "poem": "414808c1-1b70-4f52-896d-01b15b05acc3",
            "reviewed": true,
            "tags": "الفخر",
            "verses": [
            {
                "first": "لا ذَنبَ لي كَم رمت كتم فَضائِلي",
                "sec": "فَكَأَنَّما برقعت وَجه نَهاري"
            }
            ]
        };
        const req = await baseHttp.post('chosenverse', data)

        assert.equal(req.status, HttpStatusCode.CREATED)
        assert.containsAllKeys(req.data, data);

        after(() => { baseHttp.delete(`chosenverse/${req.data.id}`)})
    })

    it('returns the correct error message with invalid data', async () => {
        await baseHttp.post('/chosenverse', {
            // "poet": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
            "poem": "414808c1-1b70-4f52-896d-01b15b05acc3",
            "reviewed": true,
            "tags": "الفخر",
            "verses": [
            {
                "first": "لا ذَنبَ لي كَم رمت كتم فَضائِلي",
                "sec": "فَكَأَنَّما برقعت وَجه نَهاري"
            }
            ]
        }).catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.POET);
                return;
            }
            throw error;
        })        

        await baseHttp.post('/chosenverse', {
            "poet": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
            // "poem": "414808c1-1b70-4f52-896d-01b15b05acc3",
            "reviewed": true,
            "tags": "الفخر",
            "verses": [
            {
                "first": "لا ذَنبَ لي كَم رمت كتم فَضائِلي",
                "sec": "فَكَأَنَّما برقعت وَجه نَهاري"
            }
            ]
        }).catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.POEM);
                return;
            }
            throw error;
        })        
        await baseHttp.post('/chosenverse', {
            "poet": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
            "poem": "414808c1-1b70-4f52-896d-01b15b05acc3",
            // "tags": "الفخر",
            "verses": [
            {
                "first": "لا ذَنبَ لي كَم رمت كتم فَضائِلي",
                "sec": "فَكَأَنَّما برقعت وَجه نَهاري"
            }
            ]
        }).catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.TAGS);
                return;
            }
            throw error;
        })        
        await baseHttp.post('/chosenverse', {
            "poet": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
            "poem": "414808c1-1b70-4f52-896d-01b15b05acc3",
            "reviewed": true,
            "tags": "الفخر",
            // "verses": [
            // {
            //     "first": "لا ذَنبَ لي كَم رمت كتم فَضائِلي",
            //     "sec": "فَكَأَنَّما برقعت وَجه نَهاري"
            // }
            // ]
        }).catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.VERSES);
                return;
            }
            throw error;
        })        
    })
})

describe('PUT /chosenverse/:id', () => {
    let chosenVerseId: string;
    before(async () => {
        const data = {
            "poet": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
            "poem": "414808c1-1b70-4f52-896d-01b15b05acc3",
            "reviewed": true,
            "tags": "الفخر",
            "verses": [
            {
                "first": "لا ذَنبَ لي كَم رمت كتم فَضائِلي",
                "sec": "فَكَأَنَّما برقعت وَجه نَهاري"
            }
            ]
        };
        const req = await baseHttp.post('chosenverse', data)
        
        chosenVerseId = req.data.id;
    })

    it('updates chosenVerse data successfuly with valid data', async() => {
        const req = await baseHttp.put(`/chosenverse/${chosenVerseId}`, {tags: 'الحكمة,الفخر,الشجاعة'});
        assert.equal(req.status, HttpStatusCode.ACCEPTED);
    })

    it('returns the correct error message with invalid data', async () => {
        await baseHttp.put(`chosenverse/${chosenVerseId}`, {poet: 1221})
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.POET);
                return;
            }
            throw error;
        })

        await baseHttp.put(`chosenverse/${chosenVerseId}`, {poem: 1221})
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.POEM);
                return;
            }
            throw error;
        })

        await baseHttp.put(`chosenverse/${chosenVerseId}`, {tags: 1221})
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.TAGS);
                return;
            }
            throw error;
        })

        await baseHttp.put(`chosenverse/${chosenVerseId}`, {verses: {first: 'asassa', sec: 'asfsf'}})
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.VERSES);
                return;
            }
            throw error;
        })
    })
    it('gets 404 with nonExisting UUID', async () => {
        try {
            const corruptedId = chosenVerseId.replace(chosenVerseId[5], 'a');
            await baseHttp.put(`chosenverse/${corruptedId}`)
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.NOT_ACCEPTABLE);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_VALID)    
                return;
            }
            throw error;
        }
    })

    it('gets 400 with wrong :id format', async () => {
        try {
            await baseHttp.put(`chosenverse/22`);
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND)    
                return;
            }
            throw error;
        }

    })

    after(() => { baseHttp.delete(`chosenverse/${chosenVerseId}`)})
})

describe('DELETE /chosenverse/:id', () => {
    let chosenVerseId: string;
    before(async () => {
        const data = {
            "poet": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
            "poem": "414808c1-1b70-4f52-896d-01b15b05acc3",
            "reviewed": true,
            "tags": "الفخر",
            "verses": [
            {
                "first": "لا ذَنبَ لي كَم رمت كتم فَضائِلي",
                "sec": "فَكَأَنَّما برقعت وَجه نَهاري"
            }
            ]
        };
        const req = await baseHttp.post('chosenverse', data)
        
        chosenVerseId = req.data.id;
    })

    it('Delete poem/:id successfully', async () => {
        const req = await baseHttp.delete(`/chosenverse/${chosenVerseId}`);
        assert.equal(req.status, HttpStatusCode.ACCEPTED);
    })

    it('gets 404 with nonExisting UUID', async () => {
        try {
            const corruptedId = chosenVerseId.replace(chosenVerseId[5], 'a');
            await baseHttp.delete(`chosenverse/${corruptedId}`)
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.NOT_FOUND);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_AVAILABLE)    
                return;
            }
            throw error;
        }
    })

    it('gets 400 with wrong :id format', async () => {
        try {
            await baseHttp.delete(`chosenverse/22`);
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND)    
                return;
            }
            throw error;
        }

    })
})
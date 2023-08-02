import {assert} from 'chai';
import {describe, it} from 'mocha'
// Utils
import {baseHttp} from '../../utils/axios';
import HttpStatusCode from '../../utils/httpStatusCode';
// Types
import { AxiosError } from 'axios';
import { ERROR_MSG, Prose } from '../../components/prose/prose.entity';

describe('GET /proses', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get('proses');
        
        assert.strictEqual(req.status, HttpStatusCode.OK);
        const proses: Prose[] = req.data;

        assert.isArray(proses);
        assert.isDefined(proses[0].poet)
        assert.isDefined(proses[0].qoute)
        assert.isDefined(proses[0].tags)
        assert.isDefined(proses[0].reviewed);
    })
})

describe('GET /proses/random', async () => {
    it('Responds with the right JSON body', async () => {
        const req = await baseHttp.get('proses/random?num=3');
        
        assert.strictEqual(req.status, HttpStatusCode.OK);
        const proses: Prose[] = req.data;

        assert.isArray(proses);
        assert.equal(proses.length, 3);


        assert.isDefined(proses[0].id)
        assert.isString(proses[0].qoute);
    })

    it('gets 400 when query.num is not a number', async () => {
        try {
            await baseHttp.get('proses/random?num=a');
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

describe('GET /prose/:id', () => {
    let proseId: string;
    before(async () => {
        const req = await baseHttp.get('proses');
        proseId = req.data[0].id;
    })

    it('Responds with the right JSON body', async() => {
        const req = await baseHttp.get(`prose/${proseId}`)

        assert.equal(req.status, HttpStatusCode.OK);
        assert.isDefined(req.data.id);
        assert.isDefined(req.data.poet);
        assert.isDefined(req.data.qoute);
        assert.isDefined(req.data.tags);
        assert.isDefined(req.data.reviewed);
    })
    
    it('gets 404 with nonExisting UUID', async () => {
        try {
            const corruptedId = proseId.replace(proseId[5], 'a');
            await baseHttp.get(`prose/${corruptedId}`);
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
            await baseHttp.get(`prose/22`);
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

describe('POST /proses', () => {
    const data = [
        {
            "poet": "75ea7d81-2dfc-48b5-ab2d-f3f7b53f781f",
            "tags": "حكمة, حب, العلم",
            "qoute": "اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..",
            "reviewed": true
        },
        {
            "poet": "75ea7d81-2dfc-48b5-ab2d-f3f7b53f781f",
            "tags": "حكمة, حب, العلم",
            "qoute": "اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..",
            "reviewed": true
        },
        {
            "qoute": "اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..",
            "reviewed": true
        }
    ]
    const testProsesIds: string[] = [];
    afterEach(() => {
        testProsesIds.forEach(async (id) => {
            await baseHttp.delete(`prose/${id}`);
        })
    })
    it('it saves valid entries correctly, and returns valid & non-valid entries', async () => {
        const req = await baseHttp.post('/proses', data);

        const prosesIds = req.data.newProses.map((prose: Prose) => prose.id)
        testProsesIds.push(...prosesIds);

        assert.strictEqual(req.status, HttpStatusCode.CREATED)

        assert.isNotEmpty(req.data.newProses);
        assert.containsAllKeys(req.data.newProses[0], data[0]);

        assert.isNotEmpty(req.data.nonValidProses);
        assert.containsAllKeys(req.data.nonValidProses[0], data[2]);
    })
})

describe('POST /prose', () => {
    it('it post valid data correctly', async() => {
        const data = {
            "poet": "75ea7d81-2dfc-48b5-ab2d-f3f7b53f781f",
            "tags": "حكمة, حب, العلم",
            "qoute": "اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..",
            "reviewed": true
        };
        const req = await baseHttp.post('prose', data)

        assert.equal(req.status, HttpStatusCode.CREATED)
        assert.containsAllKeys(req.data, data);

        await baseHttp.delete(`prose/${req.data.id}`)
    })

    it('returns the correct error message with invalid data', async () => {
        await baseHttp.post('/prose', {
            // "poet": "75ea7d81-2dfc-48b5-ab2d-f3f7b53f781f",
            "tags": "حكمة, حب, العلم",
            "qoute": "اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..",
        }).catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.POET);
                return;
            }
            throw error;
        })        

        await baseHttp.post('/prose', {
            "poet": "75ea7d81-2dfc-48b5-ab2d-f3f7b53f781f",
            // "tags": "حكمة, حب, العلم",
            "qoute": "اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..",
        }).catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.TAGS);
                return;
            }
            throw error;
        })        

        await baseHttp.post('/prose', {
            "poet": "75ea7d81-2dfc-48b5-ab2d-f3f7b53f781f",
            "tags": "حكمة, حب, العلم",
            // "qoute": "اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..",
        }).catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.QOUTE);
                return;
            }
            throw error;
        })        
    })
})

describe('PUT /prose/:id', () => {
    let proseId: string;
    before(async () => {
        const data = {
            "poet": "75ea7d81-2dfc-48b5-ab2d-f3f7b53f781f",
            "tags": "حكمة, حب, العلم",
            "qoute": "Testing",
            "reviewed": true
        };
        const req = await baseHttp.post('prose', data)
        proseId = req.data.id;
    })

    it('updates prose data successfuly with valid data', async() => {
        const req = await baseHttp.put(`/prose/${proseId}`, {tags: 'الحكمة,الفخر,الشجاعة'});
        assert.equal(req.status, HttpStatusCode.ACCEPTED);
    })

    it('returns the correct error message with invalid data', async () => {
        await baseHttp.put(`prose/${proseId}`, {poet: 1221})
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.POET);
                return;
            }
            throw error;
        })

        await baseHttp.put(`prose/${proseId}`, {qoute: 1221})
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.QOUTE);
                return;
            }
            throw error;
        })

        await baseHttp.put(`prose/${proseId}`, {tags: 1221})
        .catch(error => {
            if(error instanceof AxiosError) {
                assert.equal(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.TAGS);
                return;
            }
            throw error;
        })
    })        

    it('gets 404 with nonExisting UUID', async () => {
        try {
            const corruptedId = proseId.replace(proseId[5], 'a');
            await baseHttp.put(`prose/${corruptedId}`)
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
            await baseHttp.put(`prose/22`);
        } catch(error) {
            if(error instanceof AxiosError) {
                assert.strictEqual(error.response!.status, HttpStatusCode.BAD_REQUEST);
                assert.equal(error.response!.data.message, ERROR_MSG.NOT_FOUND)    
                return;
            }
            throw error;
        }

    })

    after(() => { baseHttp.delete(`prose/${proseId}`)})
})

describe('DELETE /prose/:id', () => {
    let proseId: string;
    before(async () => {
        const data = {
            "poet": "75ea7d81-2dfc-48b5-ab2d-f3f7b53f781f",
            "tags": "حكمة, حب, العلم",
            "qoute": "اشتريتُ الكتاب، وكان خسارةً، ولكن أين المفرُّ؟ فكلّ مُحِبٍّ للقراءة مثلي يُوقعه حبُّه مرارًا وتكرارًا في الخسارة بعد الخسارة، ثمّ لا يتوبُ! هكذا كُتُب زماننا..",
            "reviewed": true
        };
        const req = await baseHttp.post('prose', data)
        
        proseId = req.data.id;
    })

    it('Delete prose/:id successfully', async () => {
        const req = await baseHttp.delete(`/prose/${proseId}`);
        assert.equal(req.status, HttpStatusCode.ACCEPTED);
    })

    it('gets 404 with nonExisting UUID', async () => {
        try {
            const corruptedId = proseId.replace(proseId[5], 'a');
            await baseHttp.delete(`prose/${corruptedId}`)
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
            await baseHttp.delete(`prose/22`);
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
import knex from 'knex';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexfile = require('../../knexfile.js');
// Config
import { NODE_ENV } from '../config';

export default knex(knexfile[NODE_ENV as string]);

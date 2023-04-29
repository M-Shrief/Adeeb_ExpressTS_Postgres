// Models
import Prose from '../models/prose.mode';
// Types
import ProseType from '../interfaces/prose.interface';
// Utils
import { logger } from '../utils/logger';

export default class ProseService {
  public async getAllWithPoetName(): Promise<ProseType[]> {
    return await Prose.find(
      {},
      { poet: 1, tags: 1, qoute: 1, reviewed: 1 }
    ).populate('poet', 'name');
  }
}

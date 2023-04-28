// Models
import Poem from '../models/poem.model';
// Types
import PoemType from '../interfaces/poem.interface';
// Utils
import { logger } from '../utils/logger';

export default class PoemService {
  private Poem = new Poem();

  public async getPoemsWithPoetName(): Promise<PoemType[]> {
    return await Poem.find(
      {},
      { intro: 1, poet: 1, verses: 1, reviewed: 1 }
    ).populate('poet', 'name');
  }
}

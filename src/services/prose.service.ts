// Models
import Prose from '../models/prose.mode';
// Types
import ProseType from '../interfaces/prose.interface';

export default class ProseService {
  public async getAllWithPoetName(): Promise<ProseType[]> {
    return await Prose.find(
      {},
      { poet: 1, tags: 1, qoute: 1, reviewed: 1 }
    ).populate('poet', 'name');
  }

  public async getRandom(num: number) {
    return await Prose.aggregate([{ $sample: { size: num } }]);
  }

  public async getOneWithPoetName(id: string) {
    return await Prose.findById(id, {
      poet: 1,
      tags: 1,
      qoute: 1,
      reviewed: 1,
    }).populate('poet', 'name');
  }
}

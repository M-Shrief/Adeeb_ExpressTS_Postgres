// Models
import Prose from '../models/prose.mode';
// Types
import ProseType from '../interfaces/prose.interface';
// Utils
import shuffle from '../utils/durstenfeldShuffle';
export default class ProseService {
  public async getAllWithPoetName(num?: number): Promise<ProseType[]> {
    let proses;
    if (num) {
      proses = await Prose.aggregate([
        { $sample: { size: num } },
        { $unset: ['_id', 'updatedAt', 'createdAt'] },
      ]);
    } else {
      proses = await Prose.find(
        {},
        { poet: 1, tags: 1, qoute: 1, reviewed: 1 }
      ).populate('poet', 'name');
      shuffle(proses);
    }
    return proses;
  }

  public async getOneWithPoetName(id: string) {
    return await Prose.findById(id, {
      poet: 1,
      tags: 1,
      qoute: 1,
      reviewed: 1,
    }).populate('poet', 'name');
  }

  public async post(proseData: ProseType) {
    const prose = new Prose({
      poet: proseData.poet,
      tags: proseData.tags,
      qoute: proseData.qoute,
      reviewed: proseData.reviewed,
    });

    return await prose.save();
  }

  public async update(id: string, proseData: ProseType) {
    const prose = await Prose.findById(id);

    return await prose?.updateOne({ $set: proseData });
  }

  public async remove(id: string) {
    return await Prose.findByIdAndRemove(id);
  }
}

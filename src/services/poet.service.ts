// Models
import Poet from '../models/poet.model';
// Types
import PoetType from '../interfaces/poet.interface';
// Utils
import { logger } from '../utils/logger';

export default class PoetService {
  public async getAll(): Promise<PoetType[]> {
    return await Poet.find({}, { name: 1, time_period: 1 });
  }

  public async post(peotData: PoetType) {
    const poet = new Poet({
      name: peotData.name,
      time_period: peotData.time_period,
      bio: peotData.bio,
      reviewed: peotData.reviewed,
    });

    try {
      return await poet.save();
    } catch (err) {
      return logger.error(err);
    }
  }

  public async update(id: string, poetData: PoetType) {
    const poet = await Poet.findById(id);

    if (poet) {
      return poet
        .updateOne({ $set: poetData })
        .catch((err) => logger.error(err));
    } else {
      logger.error(`Poet not found`);
    }
  }

  public async remove(id: string) {
    return await Poet.findByIdAndRemove(id);
  }
}

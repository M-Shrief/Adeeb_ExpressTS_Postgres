// Types
import { PoetType } from '../../interfaces/poet.interface';
// Models
import { Poet } from '../../utils/poet.model';
import { logger } from '../../utils/logger';
export class PoetService {
  public async getAll() {
    const poets = await Poet.findAll({
      attributes: ['id', 'name', 'time_period', 'bio', 'reviewed'],
      where: {
        reviewed: true,
      },
    });
    if (poets.length === 0) return false;
    return poets;
  }

  public async getOneWithLiterature(id: string) {
    // const [poet, authoredPoems, authoredProses, authoredChosenVerses] =
    //   await Promise.all([]);
    // if (!poet) return false;
    // return {
    //   details: poet,
    //   authoredPoems,
    //   authoredProses,
    //   authoredChosenVerses,
    // };
  }

  public async post(peotData: PoetType['details']) {
    const newPoet = await Poet.create({
      name: peotData.name,
      time_period: peotData.time_period,
      bio: peotData.bio,
      reviewed: peotData.reviewed,
    });
    if (!newPoet) {
      logger.error(newPoet);
      return false;
    }
    return newPoet;
  }

  public async update(id: string, poetData: PoetType['details']) {
    const poet = await Poet.update(
      { ...poetData },
      {
        where: { id },
      },
    );
    if (!poet) return false;
    // if (!newPoet) return false;
    return poet;
  }

  public async remove(id: string) {
    const poet = await Poet.destroy({ where: { id } });
    if (!poet) return false;
    return poet;
  }
}

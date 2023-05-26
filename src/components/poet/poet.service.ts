// Types
import { PoetType } from '../../interfaces/poet.interface';
// Database
import { AppDataSource } from '../../db';
// Entities
import { Poet } from './poet.entity';
export class PoetService {
  public async getAll() {
    const poets = await AppDataSource.getRepository(Poet).find();
    if (poets.length === 0) return false;
    return poets;
  }

  public async getOneWithLiterature(id: string) {
    // const [poet, authoredPoems, authoredProses, authoredChosenVerses] =
    //   await Promise.all([]);
    const poet = await AppDataSource.getRepository(Poet).findOneBy({ id });
    if (!poet) return false;
    return poet;
    // return {
    //   details: poet,
    //   authoredPoems,
    //   authoredProses,
    //   authoredChosenVerses,
    // };
  }

  public async post(peotData: PoetType['details']) {
    const poet = new Poet();
    poet.name = peotData.name;
    poet.time_period = peotData.time_period;
    poet.bio = peotData.bio;
    poet.reviewed = peotData.reviewed;

    const newPoet = await AppDataSource.getRepository(Poet).save(poet);

    if (!newPoet) return false;
    return newPoet;
  }

  public async update(id: string, poetData: Poet) {
    const poet = await AppDataSource.getRepository(Poet).findOneBy({ id });
    if (!poet) return false;
    AppDataSource.getRepository(Poet).merge(poet, poetData);
    const newPoet = await AppDataSource.getRepository(Poet).save(poet);
    if (!newPoet) return false;
    return newPoet;
  }

  public async remove(id: string) {
    const poet = await AppDataSource.getRepository(Poet).delete(id);
    if (!poet) return false;
    return poet;
  }
}

// Database
import { AppDataSource } from '../../db';
// Entities
import { Poet } from './poet.entity';
// Schema
import { createSchema, updateSchema } from './poet.schema';
export class PoetService {
  private poetRepository = AppDataSource.getRepository(Poet);

  public async getAll(): Promise<Poet[] | false> {
    const poets = await this.poetRepository.find({
      select: {
        id: true,
        name: true,
        time_period: true,
        bio: true,
        poems: {
          id: true,
          intro: true,
        },
      },
      relations: { poems: true },
      cache: true,
    });
    if (poets.length === 0) return false;
    return poets;
  }

  public async getOneWithLiterature(id: string): Promise<Poet | false> {
    const poet = await this.poetRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        time_period: true,
        bio: true,
        poems: {
          id: true,
          intro: true,
        },
        chosenVerses: {
          id: true,
          poem: { id: true },
          verses: true,
          tags: true,
        },
        proses: {
          id: true,
          qoute: true,
          tags: true,
        },
      },
      relations: { poems: true, chosenVerses: true, proses: true },
      cache: 1000 * 5,
    });
    if (!poet) return false;
    return poet;
  }

  public async post(poetData: Poet): Promise<Poet | false> {
    const isValid = await createSchema.isValid(poetData);
    if (!isValid) return false;

    const newPoet = await this.poetRepository.save(poetData);
    if (!newPoet) return false;
    return newPoet;
  }

  public async postMany(poetData: Poet[]): Promise<Poet[] | false> {
    const validPoets: Poet[] = poetData.filter(
      async (poetData) => await createSchema.isValid(poetData),
    );
    if (!validPoets.length) return false;

    const newPoets = await this.poetRepository.save([...validPoets]);
    if (!newPoets.length) return false;
    return newPoets;
  }

  public async update(id: string, poetData: Poet): Promise<number | false> {
    const isValid = await updateSchema.isValid(poetData);
    if (!isValid) return false;

    const newPoet = await this.poetRepository.update(id, poetData);
    if (!newPoet.affected) return false;
    return newPoet.affected;
  }

  public async remove(id: string): Promise<number | false> {
    const poet = await this.poetRepository.delete(id);
    if (!poet.affected) return false;
    return poet.affected;
  }
}

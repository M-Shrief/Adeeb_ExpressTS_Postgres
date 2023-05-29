import { AppDataSource } from '../../db';
// Types
import { ProseType } from '../../interfaces/prose.interface';
import { Prose } from './prose.entity';
// Utils
import { shuffle } from '../../utils/shuffle';
export class ProseService {
  public async getAllWithPoetName(): Promise<Prose[] | false> {
    const proses = await AppDataSource.getRepository(Prose).find({
      select: {
        id: true,
        poet: {
          name: true,
        },
        tags: true,
        qoute: true,
        reviewed: true,
      },
      relations: { poet: true },
      cache: true,
    });
    shuffle(proses);
    if (proses.length === 0) return false;
    return proses;
  }

  public async getRandomWithPoetName(num: number): Promise<Prose[] | false> {
    const proses = await AppDataSource.getRepository(Prose)
      .createQueryBuilder('proses')
      .orderBy('RANDOM()')
      .limit(num)
      .getMany();
    if (proses.length === 0) return false;
    return proses;
  }

  public async getOneWithPoetName(id: string): Promise<Prose | false> {
    const prose = await AppDataSource.getRepository(Prose).findOne({
      where: { id },
      select: {
        id: true,
        poet: {
          name: true,
        },
        tags: true,
        qoute: true,
        reviewed: true,
      },
      relations: { poet: true },
      cache: true,
    });
    if (!prose) return false;
    return prose;
  }

  public async post(proseData: Prose): Promise<Prose | false> {
    const prose = new Prose();
    prose.poet = proseData.poet;
    prose.tags = proseData.tags;
    prose.qoute = proseData.qoute;
    prose.reviewed = proseData.reviewed;

    const newProse = await AppDataSource.getRepository(Prose).save(prose);
    if (!newProse) return false;
    return newProse;
  }

  public async update(id: string, proseData: Prose): Promise<Prose | false> {
    const prose = await AppDataSource.getRepository(Prose).findOneBy({ id });
    if (!prose) return false;
    AppDataSource.getRepository(Prose).merge(prose, proseData);
    const newProse = await AppDataSource.getRepository(Prose).save(prose);
    if (!newProse) return false;
    return newProse;
  }

  public async remove(id: string): Promise<number | false> {
    const prose = await AppDataSource.getRepository(Prose).delete(id);
    if (!prose.affected) return false;
    return prose.affected;
  }
}

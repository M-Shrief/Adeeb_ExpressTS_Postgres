import { AppDataSource } from '../../db';
// Entities
import { Prose } from './prose.entity';
// Utils
import { shuffle } from '../../utils/shuffle';
import { filterAsync } from '../../utils/asyncFilterAndMap';
// Schema
import { createSchema, updateSchema } from './prose.schema';
export class ProseService {
  private proseRepository = AppDataSource.getRepository(Prose);
  public async getAllWithPoetName(): Promise<Prose[] | false> {
    const proses = await this.proseRepository.find({
      select: {
        id: true,
        poet: {
          id: true,
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
    const proses = await this.proseRepository
      .createQueryBuilder('prose')
      .select(['prose.id', 'prose.qoute'])
      .orderBy('RANDOM()')
      .limit(num)
      .getMany();
    if (proses.length === 0) return false;
    return proses;
  }

  public async getOneWithPoetName(id: string): Promise<Prose | false> {
    const prose = await this.proseRepository.findOne({
      where: { id },
      select: {
        id: true,
        poet: {
          id: true,
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
    const isValid = await createSchema.isValid(proseData);
    if (!isValid) return false;

    const newProse = await this.proseRepository.save(proseData);
    if (!newProse) return false;
    return newProse;
  }

  public async postMany(
    ProsesData: Prose[],
  ): Promise<{newProses: Prose[], nonValidProses: Prose[]} | false> {
    let validProses: Prose[] = [];
  let nonValidProses: Prose[] = [];
    let isValid = async (ProseData: any) => await createSchema.isValid(ProseData)
    let isNotValid = async (ProseData: any) => await createSchema.isValid(ProseData) === false

    validProses =  await filterAsync(ProsesData, isValid)
    nonValidProses =  await filterAsync(ProsesData, isNotValid)


    const newProses = await this.proseRepository.save(
      validProses
    );
    if (!newProses) return false;

    const result = {newProses, nonValidProses}
    return result;
  }

  public async update(id: string, proseData: Prose): Promise<number | false> {
    const isValid = await updateSchema.isValid(proseData);
    if (!isValid) return false;
    const newProse = await this.proseRepository.update(id, proseData);
    if (!newProse.affected) return false;
    return newProse.affected;
  }

  public async remove(id: string): Promise<number | false> {
    const prose = await this.proseRepository.delete(id);
    if (!prose.affected) return false;
    return prose.affected;
  }
}

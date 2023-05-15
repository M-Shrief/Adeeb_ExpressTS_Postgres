// Models
import { Poem } from './poem.model';
// Types
import { PoemType } from '../../interfaces/poem.interface';
export class PoemService {
  public async getAllWithPoetName(): Promise<PoemType[] | false> {
    const poems = await Poem.find(
      {},
      { intro: 1, poet: 1, verses: 1, reviewed: 1 },
    ).populate('poet', 'name');

    if (poems.length === 0) return false;
    return poems;
  }

  public async getAllIntrosWithPoetName(): Promise<PoemType[] | false> {
    const poems = await Poem.find(
      {},
      { intro: 1, poet: 1, reviewed: 1 },
    ).populate('poet', 'name');
    if (poems.length === 0) return false;
    return poems;
  }

  public async getOneWithPoet(id: string): Promise<PoemType | false> {
    const poem = await Poem.findById(id, {
      intro: 1,
      poet: 1,
      verses: 1,
      reviewed: 1,
    }).populate('poet', ['name', 'bio', 'time_period']);

    if (!poem) return false;
    return poem;
  }

  public async post(poemData: PoemType): Promise<PoemType | false> {
    const poem = new Poem({
      intro: poemData.intro,
      poet: poemData.poet,
      verses: poemData.verses,
      reviewed: poemData.reviewed,
    });
    const newPoem = await poem.save();
    if (!newPoem) return false;
    return newPoem;
  }

  public async update(
    id: string,
    poemData: PoemType,
  ): Promise<PoemType | false> {
    const poem = await Poem.findById(id);
    if (!poem) return false;
    const newPoem = await poem.updateOne({ $set: poemData });
    if (!newPoem) return false;
    return newPoem;
  }

  public async remove(id: string): Promise<PoemType | false> {
    const poem = await Poem.findByIdAndRemove(id);
    if (!poem) return false;
    return poem;
  }
}

// Types
import { PoemType } from '../../interfaces/poem.interface';
export class PoemService {
  public async getAllWithPoetName() {
    // if (poems.length === 0) return false;
    // return poems;
  }

  public async getAllIntrosWithPoetName() {
    // if (poems.length === 0) return false;
    // return poems;
  }

  public async getOneWithPoet(id: string) {
    // if (!poem) return false;
    // return poem;
  }

  public async post(poemData: PoemType) {
    // const poem = new Poem({
    //   intro: poemData.intro,
    //   poet: poemData.poet,
    //   verses: poemData.verses,
    //   reviewed: poemData.reviewed,
    // });
    // if (!newPoem) return false;
    // return newPoem;
  }

  public async update(id: string, poemData: PoemType) {
    // if (!poem) return false;
    // if (!newPoem) return false;
    // return newPoem;
  }

  public async remove(id: string) {
    // if (!poem) return false;
    // return poem;
  }
}

// Types
import { PoetType } from '../../interfaces/poet.interface';
export class PoetService {
  public async getAll() {
    // if (poets.length === 0) return false;
    // return poets;
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
    // const poet = new Poet({
    //   name: peotData.name,
    //   time_period: peotData.time_period,
    //   bio: peotData.bio,
    //   reviewed: peotData.reviewed,
    // });
    // if (!newPoet) return false;
    // return newPoet;
  }

  public async update(id: string, poetData: PoetType['details']) {
    // if (!poet) return false;
    // if (!newPoet) return false;
    // return newPoet;
  }

  public async remove(id: string) {
    // if (!poet) return false;
    // return poet;
  }
}

// Models
import Poet from '../models/poet.model';
// Types
import PoetType from '../interfaces/poet.interface';

export default class PoetService {
  private Poet = new Poet();

  public async getPoets(): Promise<PoetType[]> {
    return await Poet.find({}, { name: 1, time_period: 1 });
  }

  public async create(peomData: PoetType) {}
}

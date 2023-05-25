import {
  Sequelize,
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  NotEmpty,
  IsIn,
  IsUUID,
  PrimaryKey,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
// Types
import { PoetType, ERROR_MSG } from '../../interfaces/poet.interface';

type PoetCreationAttributes = Optional<PoetType['details'], 'id'>;

@Table
export class Poet extends Model<PoetType['details'] | PoetCreationAttributes> {
  @PrimaryKey
  @IsUUID(4)
  @Default(Sequelize.literal('uuid_generate_v1()'))
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @NotEmpty({ msg: ERROR_MSG.NAME })
  @Column(DataType.STRING(50))
  name!: string;

  @IsIn({
    args: [
      ['جاهلي', 'أموي', 'عباسي', 'أندلسي', 'عثماني ومملوكي', 'متأخر وحديث'],
    ],
    msg: 'Time Period must be in the real time line',
  })
  @Default('أموي')
  @Column(
    DataType.ENUM(
      'جاهلي',
      'أموي',
      'عباسي',
      'أندلسي',
      'عثماني ومملوكي',
      'متأخر وحديث',
    ),
  )
  time_period!: string;

  @Column(DataType.STRING(300))
  bio!: string;

  @Default(true)
  @Column(DataType.BOOLEAN())
  reviewed!: string;
}

export default Poet;

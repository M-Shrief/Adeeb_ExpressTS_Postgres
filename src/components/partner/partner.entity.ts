import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'varchar', length: 50 })
  phone!: string;

  @Column({ type: 'varchar', array: true, nullable: false })
  addresses!: string[];

  @Column({ type: 'varchar', length: 100 })
  password!: string;
}

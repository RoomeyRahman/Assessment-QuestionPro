import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities';
import { Designation } from 'src/common/constant';

@Entity({ name: 'positions' })
export class Position extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Designation,
    unique: true
  })
  name: string;
}


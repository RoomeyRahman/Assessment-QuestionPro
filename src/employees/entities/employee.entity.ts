import { Entity, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { BaseEntity } from '../../common/entities';

@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
	@Column({ type: 'varchar', length: 200 })
  name: string;
}


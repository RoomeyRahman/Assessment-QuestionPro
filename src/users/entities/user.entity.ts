import { Entity, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { BaseEntity } from '../../common/entities';

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@Column({ unique: true, type: 'varchar', length: 50 })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Column({ type: 'varchar', length: 300 })
	@IsNotEmpty()
	password: string;
}

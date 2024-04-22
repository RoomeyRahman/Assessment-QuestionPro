import {
	IsString,
	IsNumber,
	MaxLength,
	MinLength,
	IsNotEmpty,
	IsEmail,
	Matches,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements Readonly<UserDto> {
	@ApiProperty()
	@IsNumber()
	id: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(18)
	@MinLength(5)
	@Matches(/^[^\s]+(\s+[^\s]+)*$/)
	password: string;

	@ApiProperty()
	isActive: boolean;

	@ApiProperty()
	isDeleted: boolean;

	@ApiProperty()
	isVerified: boolean;

	@ApiProperty()
	createAt: number;

	@ApiProperty()
	createdBy: string;

	@ApiProperty()
	updatedAt: number;

	@ApiProperty()
	updatedBy: string;

	public static from(dto: Partial<UserDto>) {
		const it = new UserDto();
		it.id = dto.id;
		it.email = dto.email;
		it.password = dto.password;
		it.isActive = dto.isActive;
		it.isDeleted = dto.isDeleted;
		it.isVerified = dto.isVerified;
		return it;
	}

	public static fromEntity(entity: User) {
		return this.from({
			id: entity.id,
			email: entity.email,
			isActive: entity.isActive,
			isDeleted: entity.isDeleted,
		});
	}
}

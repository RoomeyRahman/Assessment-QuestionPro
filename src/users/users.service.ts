import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IUser } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UserDto } from './dto';

@Injectable()
export class UsersService {
  /**
   * Constructor
   * @param {Repository<User>} repository
   */
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) { }

  /**
   * Create a profile with RegisterPayload fields
   * @param {CreateUserDto} data user payload
   * @returns {Promise<IUser>} created user data
   */
  public async create(data: CreateUserDto): Promise<IUser> {
    try {
      const userDto = new UserDto();
      userDto.email = data.email.toLowerCase();
      userDto.password = bcrypt.hashSync(data.password, 8);

      const user = await this.repository.save(userDto);

      return UserDto.fromEntity(user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}

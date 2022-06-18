import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async update(updateUserDto: UpdateUserDto, currentUser: User) {
    return await User.save(Object.assign(currentUser, updateUserDto));
  }

  async updateSimply(user: User) {
    return await User.update(user.id, user);
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await User.findOne(id, {
      relations: ['editionUser', 'tomeUser'],
    });
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}

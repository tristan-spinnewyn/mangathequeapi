import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    createUserDto.active = true;
    createUserDto.isAdmin = false;
    if (await this.usersService.findByEmail(createUserDto.email)) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
    return res
      .status(HttpStatus.OK)
      .json([await this.usersService.create(createUserDto)]);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }
}

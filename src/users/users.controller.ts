import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from './user.decorator';

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

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @User('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    updateUserDto.active = true;
    updateUserDto.isAdmin = false;
    const current = await this.usersService.findById(userId);
    if (!(await current?.validatePassword(updateUserDto.currentPassword))) {
      throw new UnauthorizedException();
    }
    delete updateUserDto.currentPassword;
    if (!updateUserDto.changePassword) {
      delete current.password;
    }
    if (
      current.email !== updateUserDto.email &&
      (await this.usersService.findByEmail(updateUserDto.email))
    ) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
    await this.usersService.update(updateUserDto, current);
    return res.status(HttpStatus.OK).send();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/active')
  async activateDesactivate(
    @Param() params,
    @Res() res: Response,
    @User('userId') userId: number,
  ) {
    const user = await this.usersService.findById(params.id);
    const admin = await this.usersService.findById(userId);
    if (!admin.isAdmin) {
      throw new UnauthorizedException();
    }
    user.active = !user.active;
    delete user.password;

    await this.usersService.updateSimply(user);
    return res.status(HttpStatus.OK).send();
  }
}

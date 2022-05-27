import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { EditeursService } from './editeurs.service';
import { CreateEditeurDto } from './dto/create-editeur.dto';
import { User } from '../users/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { use } from 'passport';

@Controller('editeurs')
export class EditeursController {
  constructor(
    private readonly editeursServices: EditeursService,
    private readonly usersServices: UsersService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCreationEditeurs: CreateEditeurDto,
    @Res() res: Response,
    @User('userId') userId: number,
  ) {
    const user = await this.usersServices.findById(userId);
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    return res
      .status(HttpStatus.OK)
      .json([await this.editeursServices.create(createCreationEditeurs)]);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() createCreationEditeurs: CreateEditeurDto,
    @Res() res: Response,
    @User('userId') userId: number,
    @Param() params,
  ) {
    const user = await this.usersServices.findById(userId);
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    const current = await this.editeursServices.findById(params.id);
    await this.editeursServices.update(createCreationEditeurs, current);
    return res.status(HttpStatus.OK).send();
  }

  @Get()
  async getAll() {
    return await this.editeursServices.findAll();
  }

  @Get(':id')
  async getById(@Param() params) {
    return await this.editeursServices.findById(params.id);
  }
}

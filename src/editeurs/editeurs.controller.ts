import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
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
    current.nameEditeur = createCreationEditeurs.nameEditeur;
    await this.editeursServices.update(params.id, current);
    return res.status(HttpStatus.OK).send();
  }

  @Get()
  async getAll(@Query() query) {
    if (query.name) {
      return await this.editeursServices.findByName(query.name);
    }
    return await this.editeursServices.findAll();
  }

  @Get(':id')
  async getById(@Res() res: Response, @Param() params) {
    const editeur = await this.editeursServices.findById(params.id);
    if (editeur == null) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    return res.status(HttpStatus.OK).json([editeur]).send();
  }
}

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
import { AuteursService } from './auteurs.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAuteurDto } from './dto/create-auteur.dto';
import { User } from '../users/user.decorator';
import { Response } from 'express';

@Controller('auteurs')
export class AuteursController {
  constructor(
    private readonly auteursService: AuteursService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createAuteursDto: CreateAuteurDto,
    @Res() res: Response,
    @User('userId') userId: number,
  ) {
    const user = await this.usersService.findById(userId);
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    return res
      .status(HttpStatus.OK)
      .json([await this.auteursService.create(createAuteursDto)]);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() editAuteurDto: CreateAuteurDto,
    @Res() res: Response,
    @User('userId') userId: number,
    @Param() params,
  ) {
    const user = await this.usersService.findById(userId);
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }

    const current = await this.auteursService.findById(params.id);
    await this.auteursService.update(editAuteurDto, current);
    return res.status(HttpStatus.OK).send();
  }

  @Get()
  async getAll() {
    return await this.auteursService.findAll();
  }

  @Get(':id')
  async getById(@Res() res: Response, @Param() params) {
    const auteur = await this.auteursService.findById(params.id);
    if (auteur == null) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    return res.status(HttpStatus.OK).json([auteur]).send();
  }
}

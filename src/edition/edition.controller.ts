import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { EditionService } from './edition.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EditionDto } from './dto/edition.dto';
import { Response } from 'express';
import { User } from '../users/user.decorator';
import { Edition_userDto } from './dto/edition_user.dto';

@Controller('edition')
export class EditionController {
  constructor(
    private readonly editionServices: EditionService,
    private readonly usersServices: UsersService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createEdition: EditionDto,
    @Res() res: Response,
    @User('userId') userId: number,
  ) {
    const user = await this.usersServices.findById(userId);
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    await this.editionServices.createOrUpdate(createEdition, null);
    return res.status(HttpStatus.OK).send();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() createEdition: EditionDto,
    @Res() res: Response,
    @User('userId') userId: number,
    @Param() params,
  ) {
    const user = await this.usersServices.findById(userId);
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    await this.editionServices.createOrUpdate(createEdition, params.id);
    return res.status(HttpStatus.OK).send();
  }

  @Get()
  async getAll() {
    return await this.editionServices.findAll();
  }

  @Get(':id')
  async getById(@Param() params, @Res() res: Response) {
    const edition = await this.editionServices.findById(params.id);
    if (edition == null) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    return res.status(HttpStatus.OK).json([edition]);
  }

  @Post(':id/add')
  @UseGuards(JwtAuthGuard)
  async addEditionUser(
    @Body() addEditionUserDto: Edition_userDto,
    @Res() res: Response,
    @User('userId') userId: number,
    @Param() params,
  ) {
    await this.editionServices.addOrCreateEditionUser(
      params.id,
      userId,
      addEditionUserDto,
    );
    return res.status(HttpStatus.OK).send();
  }

  @Delete(':id/delete')
  @UseGuards(JwtAuthGuard)
  async delEditionUser(
    @Res() res: Response,
    @User('userId') userId: number,
    @Param() params,
  ) {
    await this.editionServices.delEditionUser(params.id, userId);
    return res.status(HttpStatus.OK).send();
  }

  @Get(':id/getNote')
  @UseGuards(JwtAuthGuard)
  async findEditionUser(
    @Res() res: Response,
    @User('userId') userId: number,
    @Param() params,
  ) {
    const data = await this.editionServices.findEditionUserById(
      userId,
      params.id,
    );
    return res.status(HttpStatus.OK).json([data]);
  }
}

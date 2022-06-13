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
import { AvisService } from './avis.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AvisDto } from './dto/avis.dto';
import { Response } from 'express';
import { User } from '../users/user.decorator';

@Controller('avis')
export class AvisController {
  constructor(
    private readonly avisService: AvisService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() avisDto: AvisDto,
    @Res() res: Response,
    @User('userId') userId: number,
  ) {
    avisDto.userId = userId;
    await this.avisService.createOrUpdate(avisDto, null);
    return res.status(HttpStatus.OK).send;
  }

  @Put(':id/signale')
  @UseGuards(JwtAuthGuard)
  async signale(@Param() params, @Res() res: Response) {
    await this.avisService.signalee(params.id);
    return res.status(HttpStatus.OK).send;
  }

  @Get('/signalee')
  @UseGuards(JwtAuthGuard)
  async getSignale(@User('userId') userId: number) {
    const user = await this.userService.findById(userId);
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    return await this.avisService.findSignalee();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delAvis(
    @User('userId') userId: number,
    @Param() params,
    @Res() res: Response,
  ) {
    const user = await this.userService.findById(userId);
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    await this.avisService.deleteComment(params.id);
    return res.status(HttpStatus.OK).send;
  }
}

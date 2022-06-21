import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { EditionController } from './edition.controller';
import { EditionService } from './edition.service';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edition } from './edition.entity';
import { Edition_user } from './edition_user.entity';
import { Series } from '../series/series.entity';
import { Editeurs } from '../editeurs/editeurs.entity';
import { User } from '../users/user.entity';

@Module({
  controllers: [EditionController],
  providers: [EditionService],
  exports: [EditionService],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Edition, Edition_user, Series, Editeurs, User]),
  ],
})
export class EditionModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'edition', method: RequestMethod.POST },
        { path: 'edition/:id', method: RequestMethod.PUT },
        { path: 'edition/:id/add', method: RequestMethod.POST },
        { path: 'edition/:id/delete', method: RequestMethod.DELETE },
      );
  }
}

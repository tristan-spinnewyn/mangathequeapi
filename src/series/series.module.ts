import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series } from './series.entity';
import { UsersModule } from '../users/users.module';
import { Auteurs } from '../auteurs/auteurs.entity';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService],
  exports: [SeriesService],
  imports: [TypeOrmModule.forFeature([Series, Auteurs]), UsersModule],
})
export class SeriesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'series', method: RequestMethod.POST },
        { path: 'series/:id', method: RequestMethod.PUT },
      );
  }
}

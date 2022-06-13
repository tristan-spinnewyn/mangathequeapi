import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { AuteursModule } from 'src/auteurs/auteurs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series } from './series.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService],
  exports: [SeriesService],
  imports: [
    forwardRef(() => AuteursModule),
    TypeOrmModule.forFeature([Series]),
    UsersModule,
  ],
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

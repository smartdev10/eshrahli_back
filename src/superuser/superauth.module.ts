import {Module} from '@nestjs/common';
import { SuperAuthController } from './superauth.controller';
import { SuperAuthService } from './superauth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperUser } from 'src/entities/superuser.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SuperUser])],
  controllers: [SuperAuthController],
  providers: [SuperAuthService],
})
export class SuperAuthModule {}

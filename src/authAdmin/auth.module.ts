import {Module} from '@nestjs/common';
import { AuthAdminController } from './auth.controller';
import { AuthAdminService } from './authadmin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from 'src/entities/adminuser.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  controllers: [AuthAdminController],
  providers: [AuthAdminService],
})
export class AuthAdminModule {}

import {Module} from '@nestjs/common';
import { AuthAdminController } from './auth.controller';
import { AuthAdminService } from './authadmin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from 'src/entities/adminuser.entity';
import { UserAdminController } from './users.controller';
import { TwilioService } from 'src/twilio/twilio.service';
import { TWILIO_CONFIG_TOKEN } from 'src/twilio/constants';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  controllers: [AuthAdminController , UserAdminController],
  providers: [AuthAdminService , TwilioService ,{
    provide: TWILIO_CONFIG_TOKEN,
    useValue: TwilioService,
}],
})
export class AuthAdminModule {}

import { Module, DynamicModule, Global } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioConfig } from './interface/twilio.config';
import { TWILIO_CONFIG_TOKEN } from './constants';

@Module({})
export class TwilioModule {
  static register(options: TwilioConfig): DynamicModule {
    return {
      module: TwilioModule,
      providers: [
        {
          provide: TWILIO_CONFIG_TOKEN,
          useValue: options,
        },
        TwilioService,
      ],
      exports: [TwilioService],
    };
  }
}
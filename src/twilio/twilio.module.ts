import { Module, DynamicModule } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioConfig, TWILIO_CONFIG_TOKEN } from './interface/twilio.config';

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
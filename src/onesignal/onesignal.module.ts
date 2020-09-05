import { Module, DynamicModule } from '@nestjs/common';
import { OneSignalService } from './onesignal.service';
import { IOneSignalModuleOptions, ONESIGNAL_MODULE_OPTIONS } from './interface/onesignal.config';

@Module({})
export class OneSignalModule {
  static register(options: IOneSignalModuleOptions): DynamicModule {
    return {
      module: OneSignalModule,
      providers: [
        {
          provide: ONESIGNAL_MODULE_OPTIONS,
          useValue: options,
        },
        OneSignalService,
      ],
      exports: [OneSignalService],
    };
  }
}
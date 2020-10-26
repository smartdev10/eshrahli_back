import { Module, DynamicModule } from '@nestjs/common';
import { TeacherOneSignalService } from './teacherSignal.service';
import { StudentOneSignalService } from './studentSignal.service';
import { IOneSignalModuleOptions, ONESIGNAL_MODULE_OPTIONS,STUDENT_ONSIGNAL } from './interface/onesignal.config';

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
        TeacherOneSignalService,
      ],
      exports: [TeacherOneSignalService],
    };
  }
  static registerStudent(options: IOneSignalModuleOptions): DynamicModule {
    return {
      module: OneSignalModule,
      providers: [
        {
          provide:STUDENT_ONSIGNAL,
          useValue: options,
        },
        StudentOneSignalService,
      ],
      exports: [StudentOneSignalService],
    };
  }
}
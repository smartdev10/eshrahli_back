import {IsDefined , IsString , IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import { Teacher } from "src/entities/teachers.entity";
import { Student } from "src/entities/students.entity";
import { SRequest } from "src/entities/requests.entity";

export class StudentNotificationDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly student: Student;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly message: string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly request?: SRequest;
}


export class NotificationDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly teacher: Teacher;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly message: string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly request?: SRequest;
}

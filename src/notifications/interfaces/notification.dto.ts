import {IsDefined , IsString , IsNotEmpty, IsNumber} from "class-validator";
import { Teacher } from "src/entities/teachers.entity";
import { Student } from "src/entities/students.entity";
import { SRequest } from "src/entities/requests.entity";


export class NotificationDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly teacher: Teacher;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly student: Student;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly message: string;


    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly request: SRequest;
}

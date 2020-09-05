import {IsDefined , IsString , IsNotEmpty, IsEmail} from "class-validator";
import { Student } from "src/entities/students.entity";
import { Teacher } from "src/entities/teachers.entity";


export class MessageDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;


    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly message: string;

    @IsDefined()
    @IsNotEmpty()
    readonly sender: Student | Teacher;

}

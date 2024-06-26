import {IsDefined , IsString , IsNotEmpty, IsNumber, IsArray, IsEnum, IsOptional} from "class-validator";
import { Nationality } from "src/entities/nationalities.entity";
import { City } from "src/entities/cities.entity";
import { Level } from "src/entities/levels.entity";
import { Subject } from "src/entities/subjects.entity";



enum Gender {
    male = 'male',
    female = 'female',
}

export class searchTeacher {
    readonly gender? : Gender | string
    readonly subjects? :Subject
    readonly levels?:Level
    readonly city?:City
}




export class TeacherDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;
}

export class UpdateTeacherPushId {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly push_id: string;
  
}

export class CreateTeacherDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly nationality: Nationality;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly city : City;

    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    readonly levels : Level[];

    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    readonly subjects : Subject[];

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    readonly other_subjects : Subject[];

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly bankname : string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly bankiban : string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly gender: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly qualification: string;
}


export class LoginTeacherDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;
  
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}

export class ForgotPassTeacherDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;
  
}

export class CheckTeacherDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;
  
}

export class CreatePassTeacherDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}

export class ChangePaswordTeacherDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly currentPassword: string;
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}


export class UpdateTeacherDto {
    

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly id: number;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsDefined()
    @IsString()
    password: string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly nationality: Nationality;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly city : City;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    readonly levels : Level[];


    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    readonly subjects : Subject[];

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    readonly other_subjects : Subject[];

    @IsOptional()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly bankname : string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly bankiban : string;
  
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly gender: string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly qualification: string;
}


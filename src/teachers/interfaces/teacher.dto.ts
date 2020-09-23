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

    @IsOptional()
    @IsEnum(Gender)
    @IsString()
    readonly gender :Gender

    @IsOptional()
    @IsNumber()
    subject :Subject

    @IsOptional()
    @IsNumber()
    level :Level

    @IsOptional()
    @IsNumber()
    city :City
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


export class CreatePassTeacherDto {

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;
    
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

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsDefined()
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
    readonly mobile: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly gender: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly qualification: string;
}


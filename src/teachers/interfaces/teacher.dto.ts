import {IsDefined , IsString , IsNotEmpty, IsNumber, IsArray} from "class-validator";
import { Nationality } from "src/entities/nationalities.entity";
import { City } from "src/entities/cities.entity";
import { Level } from "src/entities/levels.entity";
import { Subject } from "src/entities/subjects.entity";


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


export class CreatePassTeacherDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
  
}



export class UpdateTeacherDto {


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
    readonly materials : Subject[];

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


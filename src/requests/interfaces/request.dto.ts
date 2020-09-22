import { IsDefined , IsString , IsNotEmpty, IsLongitude, IsLatitude, IsNumber, IsDateString , IsEnum, IsOptional } from "class-validator";
import { Level } from "src/entities/levels.entity";
import { Student } from "src/entities/students.entity";
import { Subject } from "src/entities/subjects.entity";
import { Teacher } from "src/entities/teachers.entity";


enum Gender {
    male = 'male',
    female = 'female',
}

export class RequestDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsLatitude()
    readonly latitude: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsLongitude()
    readonly longitude: string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsDateString()
    readonly sessionDate: Date;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly teacher: Teacher;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly student: Student;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly subject: Subject;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly level: Level;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly details: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsEnum(Gender)
    readonly student_gender : Gender;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsEnum(Gender)
    readonly teacher_gender : Gender;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly search_type : string;


    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly other : string;


    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly nstudents : number;

}


export interface searchTeacher {
    gender : Gender
    subject :Subject
    level :Level
}



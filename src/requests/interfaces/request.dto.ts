import { IsDefined , IsString , IsNotEmpty, IsLongitude, IsLatitude, IsNumber, IsDate, IsEnum, IsOptional } from "class-validator";
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
    @IsNumber()
    @IsLatitude()
    readonly lalititude: number;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @IsLongitude()
    readonly longitude: number;

    @IsDefined()
    @IsNotEmpty()
    @IsDate()
    readonly date: Date;

    @IsDefined()
    @IsNotEmpty()
    readonly time: Date;

    @IsOptional()
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
    readonly student_gender : string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsEnum(Gender)
    readonly teacher_gender : string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly search_type : string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly other : string;


    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly nstudents : number;

}

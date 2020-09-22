import { IsDefined , IsString , IsNotEmpty, IsLongitude, IsLatitude, IsNumber, IsDate, IsEnum } from "class-validator";
import { Student } from "src/entities/students.entity";
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
    readonly lalititude: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsLongitude()
    readonly longitude: string;

    @IsDefined()
    @IsNotEmpty()
    @IsDate()
    readonly date: Date;

    @IsDefined()
    @IsNotEmpty()
    readonly time: Date;

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

}

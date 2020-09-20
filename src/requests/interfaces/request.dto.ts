import { IsDefined , IsString , IsNotEmpty, IsLongitude, IsLatitude, IsNumber, IsDate } from "class-validator";
import { Student } from "src/entities/students.entity";
import { Teacher } from "src/entities/teachers.entity";


export class RequestDto {


    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly amount: number;

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

}

import { IsDefined , IsString , IsNotEmpty, IsLongitude, IsLatitude, IsNumber, IsDateString , IsEnum, IsOptional } from "class-validator";
import { City } from "src/entities/cities.entity";
import { Coupon } from "src/entities/coupons.entity";
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
    readonly city: City;

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


export class RetryDto {

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

}

export class UpdateRequestDto {

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly teacher: Teacher;


    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly status : string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsDateString()
    readonly cancellationDate : Date;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly canceledBy : Student | Teacher;
}

export class CheckOutRequestDto {

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly teacher: Teacher;


    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly status : string;


    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly amount : number;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly discount_amount : number;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly coupon : Coupon;


    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly total : number;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly payementReference : string;


    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly paymentMethod : string;
}



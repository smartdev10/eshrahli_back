import { IsDefined , IsString , IsNotEmpty, IsLongitude, IsLatitude, IsNumber, IsDateString , IsEnum, IsOptional, IsBoolean } from "class-validator";
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

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly level: Level;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly details: string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly lesson_duration: string;

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

export class ReCallDto {

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly city: City

    @IsDefined()
    @IsNotEmpty()
    @IsDateString()
    readonly sessionDate: Date

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsLatitude()
    readonly latitude: string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsLongitude()
    readonly longitude: string

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly details: string

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly lesson_duration: string;

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
    @IsDateString()
    readonly lesson_start_time : Date;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsDateString()
    readonly lesson_end_time : Date;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    readonly paid : boolean;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    public is_remote : boolean;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public zoomLink : string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public zoomPass : string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly lesson_duration: string;

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
    readonly total : number;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly tax : number;

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
    @IsString()
    readonly paymentReference : string;


    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly paymentMethod : string;
}


export class FinishRequestDto {

    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    readonly paid : boolean;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly status : string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly paymentReference : string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly paymentMethod : string;
}



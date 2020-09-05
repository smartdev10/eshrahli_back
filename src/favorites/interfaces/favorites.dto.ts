import {IsDefined , IsString , IsNotEmpty} from "class-validator";
import { Teacher } from "src/entities/teachers.entity";
import { Student } from "src/entities/students.entity";


export class FavoriteDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly teacher: Teacher;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly student: Student;
}

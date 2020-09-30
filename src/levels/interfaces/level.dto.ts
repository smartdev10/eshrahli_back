import {IsDefined , IsString , IsNotEmpty , IsArray} from "class-validator";
import { Subject } from "src/entities/subjects.entity";


export class LevelDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    subjects: Subject[];



}

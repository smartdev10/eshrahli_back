import {IsDefined , IsString , IsNotEmpty , IsNumber} from "class-validator";
import { Teacher } from "src/entities/teachers.entity";
import { SRequest } from "src/entities/requests.entity";


export class BidsDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly teacher: Teacher;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly request: SRequest;


    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
}

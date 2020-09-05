import {IsDefined , IsString , IsNotEmpty} from "class-validator";


export class SubjectDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}

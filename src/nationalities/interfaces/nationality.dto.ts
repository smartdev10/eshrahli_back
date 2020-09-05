import {IsDefined , IsString , IsNotEmpty} from "class-validator";


export class NationaltyDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}

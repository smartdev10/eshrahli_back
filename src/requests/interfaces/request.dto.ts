import {IsDefined , IsString , IsNotEmpty} from "class-validator";


export class RequestDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly amount: number;
}

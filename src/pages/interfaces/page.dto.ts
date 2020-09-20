import {IsDefined , IsString , IsNotEmpty} from "class-validator";


export class PageDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    readonly slug: string;
  
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly content: string;
}

import {IsDefined , IsString , IsNotEmpty} from "class-validator";


export class CouponDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly code: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly discount: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly start: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly end: string;
}

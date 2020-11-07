import {IsDefined , IsString , IsNotEmpty, IsOptional, IsNumber} from "class-validator";


export class SettingDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly stringValue: string;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    readonly numberValue: number;

}

import {IsDefined , IsString , IsNotEmpty} from "class-validator";


export class CityDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

}

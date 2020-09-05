import {IsDefined , IsString , IsNotEmpty} from "class-validator";


export class LevelDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

}

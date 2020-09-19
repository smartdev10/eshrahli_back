import { Length , IsNotEmpty , IsDefined, IsString } from "class-validator";

export class SuperUserDto {


    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public name: string;
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public username: string;
  
    @IsDefined()
    @IsNotEmpty()
    @Length(9)
    public password: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public mobile: string;
  
}
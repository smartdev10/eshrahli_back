import { Length , IsNotEmpty , IsDefined, IsString } from "class-validator";

export class AdminUserDto {
    
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
  
    public  role: string;
}
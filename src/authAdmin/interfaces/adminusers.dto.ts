import { Length , IsNotEmpty , IsDefined, IsString } from "class-validator";

export class AdminUserDto {

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
  
    public  role: string;
}

export class UpdateAdminUserDto {
    

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public username: string;
  
    @IsDefined()
    public password: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public mobile: string;
  
    public  role: string;
}


export class AdminUserForgot {
   
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public mobile: string;
  
}

export class AdminUserReset {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public mobile: string;
   
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;
  
}
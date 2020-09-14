import {IsDefined , IsString , IsNotEmpty, IsNumber} from "class-validator";


export class StudentDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;
}

export class ForgotPaswordStudentDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;
  
}


export class LoginStudentDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;
  
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}


export class CreatePaswordStudentDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}

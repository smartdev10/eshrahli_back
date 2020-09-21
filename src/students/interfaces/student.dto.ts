import {IsDefined , IsString , IsNotEmpty} from "class-validator";


export class StudentDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}

export class UpdateStudentDto {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;

    @IsDefined()
    @IsString()
    password: string;
}

export class CheckStudentDto {
      
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

export class UpdateStudentPushId {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly push_id: string;
  
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

export class ChangePaswordStudentDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly mobile: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly currentPassword: string;
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}


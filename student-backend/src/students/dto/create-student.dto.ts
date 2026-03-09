import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentDto {

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;

}
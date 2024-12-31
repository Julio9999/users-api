import { IsString, MinLength } from "class-validator";

export class LoginDto {

    @IsString({message: 'Email es obligatorio'})
    @MinLength(1)
    email: string;

    @IsString({message: 'La contraseña es obligatoria'})
    @MinLength(1)
    password: string;
}
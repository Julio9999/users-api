import { IsString } from "class-validator";

export class LoginDto {

    @IsString({message: 'Email es obligatorio'})
    email: string;

    @IsString({message: 'La contraseña es obligatoria'})
    password: string;
}
import { Body, Controller, Post, Req, Res } from '@nestjs/common';

import { Response, Request } from 'express';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(
        @Body()loginDto: LoginDto,
        @Res() res: Response
    ){
        const {email, password} = loginDto;

        const user = await this.authService.validateUser(email, password);        

        const { access_token } = await this.authService.login(user);

        res.cookie('access_token', access_token, {
            secure: true,
            maxAge: 60*60*1000,
            httpOnly: true
        });

        res.json({message: "Sesión iniciada correctamente"})
    }


    @Post('logout')
    logout(
        @Req() req: Request,
        @Res() res: Response
    ){

        const access_token = req.cookies['access_token'] as string;
        if(!access_token) return res.status(401).json({message: "Credenciales inválidas"})

        res.clearCookie('access_token')

        return res.json({message: "Sesión cerrada correctamente"})
    }

}

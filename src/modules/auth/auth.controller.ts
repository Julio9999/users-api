import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';

import { Response, Request } from 'express';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './interfaces/user-payload';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ){}

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
            maxAge: 10 * 60 * 1000,
            httpOnly: true
        });

        res.json({message: "Sesión iniciada correctamente", sessionDuration: 10*60*100})
    }


    @Post('logout')
    logout(
        @Res() res: Response
    ){
        res.clearCookie('access_token')

        return res.json({message: "Sesión cerrada correctamente"})
    }


    @Get('checkSession')
    checkSession(
        @Req() req: Request,
        @Res() res: Response
    ){

        const token = req.cookies['access_token'] as string;

        const decodedToken = this.jwtService.verify(token, {secret:'my-secret'}) as UserPayload;

        const currentTime = Math.floor(Date.now() / 1000); 

        const timeRemainingSeconds = decodedToken.exp - currentTime; 

        const timeRemainingMilliseconds = timeRemainingSeconds * 1000;

        const name = decodedToken.name;

        return res.json({name, timeRemainingMilliseconds, isValid: true, exp: decodedToken.exp});  
    }
}

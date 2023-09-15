import { LoginResponse } from './interfaces/login-response';
import { AuthGuard } from './guards/auth.guard';
import { LoginDto } from './dto/login.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';


import { CreateUserDto, RegisterDto, UpdateAuthDto } from './dto';
import { User } from './entities/user.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }


  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }


  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }


  //Autorización de perfiles
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: Request) {
    // const user = req['user']
    // return user;

    return this.authService.findAll();
  }

  //Checkea que exista el token para asegurarnos que exista el usuario
  @UseGuards(AuthGuard)
  @Get('/check-token')
  checkToken(@Request() req: Request): LoginResponse {

    const user = req['user'] as User;

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id })
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}

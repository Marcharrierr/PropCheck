import { LoginResponse } from './interfaces/login-response';
import { JwtPayload } from './interfaces/jwt-payload';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcryptjs from "bcryptjs";

import { JwtService } from '@nestjs/jwt';

import { CreateUserDto, LoginDto, RegisterDto, UpdateAuthDto } from './dto';

import { User } from './entities/user.entity';




@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService) { }



  //Creación de usuario y manejo de excepciones
  async create(createUserDto: CreateUserDto): Promise<User> {

    try {

      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData

      });
      await newUser.save();
      const { password: _, ...user } = newUser.toJSON();
      return user;

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} Ya existe! `)
      }
      throw new InternalServerErrorException('Algo terrible pasó!!')
    }

  }




  //Logear usuario
  async login(loginDto: LoginDto): Promise<LoginResponse> {

    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    //Si el usuario no es igual, no ingresa
    if (!user) {
      throw new UnauthorizedException('Usuario no válido - Email error')
    }
    //Si la pass no es igual, no ingresa
    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Usuario no válido - Password error')
    }

    //Almacena resto de datos de usuario en variable
    const { password: _, ...rest } = user.toJSON()


    return {
      //spread de usuario
      user: rest,
      token: this.getJwtToken({ id: user.id }),

    }
  }




  //Registro usuario
  async register(registerDto: RegisterDto): Promise<LoginResponse> {

    const user = await this.create(registerDto)

    return {
      //spread de usuario
      user: user,
      token: this.getJwtToken({ id: user._id })

    }

  }



  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserId(id: string) {
    const user = await this.userModel.findById(id);
    const { password, ...rest } = user.toJSON();
    return rest;
  }




  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload)
    return token;

  }



}

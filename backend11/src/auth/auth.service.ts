import { BadGatewayException, BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './auth.dto';
import { hash } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { faker, tr } from '@faker-js/faker'
import { emitWarning } from 'process';
import { verify } from 'crypto';
import { userInfo } from 'os';
import bcrypt from 'bcrypt';
import { UserDto } from 'src/user/user.dto';
@Injectable()
export class AuthService {
    jwtService: any;

    async login (dto: AuthDto){
        const user = await this.validateUser(dto)
        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }
    
    async getNewTokens (refreshToken:string) {
        const result = await this.jwt.verifyAsync(refreshToken)
        if (!result) throw new UnauthorizedException('Invalid refresh token')

        const user = await this.prisma.user.findUnique({where:{
            id: result.id
        }})

        const tokens = await this.issueTokens(user.id)
        return {
            user: this.returnUserFields(user),
            ...tokens
        }

        
    }

    constructor(private prisma: PrismaService, private jwt:JwtService ){}
    async register(dto:AuthDto) {
        const oldUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (oldUser) throw new BadRequestException('User already exists')
        
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: faker.name.firstName(),
                avatarPath: faker.image.avatar(),
                phone: faker.phone.number('+7 (###) ### ## ##'),
                password: await hash(dto.password)

            }
        })

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }
    private async issueTokens(userId: number) {
        const data = {id:userId}

        const accessToken = this.jwt.sign(data,{
            expiresIn: '1h',
        })

        const refreshToken = this.jwt.sign(data,{
            expiresIn: '7d',
        })
        return {accessToken,refreshToken}
    }
    private returnUserFields(user:User){
        return{
            id: user.id,
            email: user.email,
        }
    }
    
    private async validateUser(dto:AuthDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        const hashedPassword = user.password;
        const enteredPassword = dto.password;
    
        const isValid = await bcrypt.compare(enteredPassword, hashedPassword);
    
        if (!isValid) {
            throw new UnauthorizedException('Invalid password');
        }
    
        return user;
    }}
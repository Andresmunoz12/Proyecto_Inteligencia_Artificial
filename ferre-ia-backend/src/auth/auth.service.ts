import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async login(email: string, pass: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user?.password !== pass) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const { password, ...result } = user;
        return result;
    }

    // Método para crear un usuario de prueba si no existe
    async onModuleInit() {
        const admin = await this.userRepository.findOne({ where: { email: 'admin@ferreia.com' } });
        if (!admin) {
            const newUser = this.userRepository.create({
                email: 'admin@ferreia.com',
                password: 'admin',
                username: 'Administrador'
            });
            await this.userRepository.save(newUser);
            console.log('Usuario de prueba creado: admin@ferreia.com / admin');
        }
    }
}

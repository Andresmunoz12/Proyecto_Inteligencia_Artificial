import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <--- 1. Importación necesaria
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    // 2. Configuración global de variables de entorno (.env)
    // Debe ir de primero en el array de imports
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '423064',
      database: 'ferreteria_db',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    ProductsModule,
    AiModule,
  ],
})
export class AppModule {}

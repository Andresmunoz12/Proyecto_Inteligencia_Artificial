import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '423064', // La que pusiste al instalar
      database: 'ferreteria_bd', // El nombre exacto que pusiste en pgAdmin
      autoLoadEntities: true,
      synchronize: true, // Esto creará las tablas automáticamente mientras desarrollamos
    }),
    ProductsModule,
  ],
})
export class AppModule {}

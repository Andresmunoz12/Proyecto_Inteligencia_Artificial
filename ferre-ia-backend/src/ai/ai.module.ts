import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ProductsModule } from '../products/products.module'; // <--- Paso 1: Importar el módulo de productos

@Module({
  providers: [AiService],
  imports: [ProductsModule], // <--- Paso 2: Agregar ProductsModule aquí
  exports: [AiService],
  controllers: [AiController], // Importante para que el Chatbot funcione
})
export class AiModule { }

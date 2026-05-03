import { Injectable, OnModuleInit } from '@nestjs/common';
import Groq from 'groq-sdk';
import { ProductsService } from '../products/products.service'; // 1. Importa tu servicio de productos

const SYSTEM_INSTRUCTION = `Eres un asistente virtual inteligente de una ferretería. 
Tu nombre es FerreBot. Tu objetivo es ayudar a los clientes con información sobre productos de ferretería, 
herramientas, materiales de construcción, precios, disponibilidad y recomendaciones técnicas.
Responde siempre en español, de forma amigable, clara y profesional.
SOLO recomienda productos que se encuentren en el INVENTARIO REAL que se te proporciona.`;

@Injectable()
export class AiService implements OnModuleInit {
  private groq: Groq;

  // 2. Inyecta el ProductsService en el constructor
  constructor(private readonly productsService: ProductsService) { }

  onModuleInit() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('❌ GROQ_API_KEY no está definida en el archivo .env');
      return;
    }
    this.groq = new Groq({ apiKey });
    console.log('✅ IA de Groq (llama-3.3-70b-versatile) lista con acceso a inventario');
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      if (!this.groq) {
        return 'La IA no está inicializada.';
      }

      // 3. Obtén los productos reales de tu base de datos PostgreSQL
      const dbProducts = await this.productsService.findAll();

      // 4. Convierte los productos en un texto que la IA pueda entender como "Contexto"
      const inventoryContext = dbProducts.map(p =>
        `- Producto: ${p.name}, Marca: ${p.brand}, Precio: $${p.price}, Stock: ${p.stock}, Descripción: ${p.ai_description}`
      ).join('\n');

      const completion = await this.groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { role: 'system', content: `INVENTARIO ACTUAL EN BASE DE DATOS:\n${inventoryContext}` },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      });

      return completion.choices[0]?.message?.content ?? 'Sin respuesta';
    } catch (error: any) {
      console.error('--- ERROR DE IA ---');
      return `Error al conectar con la IA: ${error?.message ?? 'Error desconocido'}`;
    }
  }
}
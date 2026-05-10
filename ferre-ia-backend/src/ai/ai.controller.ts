import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) { }

  @Post('chat')
  async chat(@Body('question') question: string) {
    if (!question || question.trim() === '') {
      throw new BadRequestException('La pregunta no puede estar vacía.');
    }
    return {
      answer: await this.aiService.generateResponse(question.trim()),
    };
  }

  @Post('vision/analyze')
  async analyze(@Body('image') image: string) {
    if (!image) {
      throw new BadRequestException('Se requiere una imagen en formato base64.');
    }
    // Si el base64 trae el prefijo "data:image/jpeg;base64,", lo removemos
    const base64Data = image.includes(',') ? image.split(',')[1] : image;
    return await this.aiService.analyzeImage(base64Data);
  }
}

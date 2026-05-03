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
}

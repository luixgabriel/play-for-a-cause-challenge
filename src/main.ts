import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const config = new DocumentBuilder()
  .setTitle('Chat API')
  .setDescription('Api feita para o teste técnico da play for a cause')
  .setVersion('0.0.1')
  .build();

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup('api-docs', app, document);
  await app.listen(3001);
}
bootstrap();

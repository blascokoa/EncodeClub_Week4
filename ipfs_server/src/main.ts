import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Project week 4')
    .setVersion('1.0.0')
    .setDescription(
      'Backend for the project of the week 4 from EncodeClub Bootcamp',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  const port = process.env.PORT || 5000;
  await app.listen(port);
}
bootstrap();

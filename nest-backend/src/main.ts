import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  //Controla la información a agregar en backend
  //debe ser específica a lo que se solicita
  //Sino, no la validará
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );


  // Cambiar puerto por puerto que entrega
  // el servicio en la nube
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

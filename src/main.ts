import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './common/services/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task Manager')
    .setVersion('1.0')
    .build();

  app.use('/api/docs', basicAuth(configService.getBasicAuthOptions()));
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      requestInterceptor: (req) => {
        req.credentials = 'include';

        return req;
      },
    },
  });

  await app.listen(configService.getAppPort());
}

bootstrap();

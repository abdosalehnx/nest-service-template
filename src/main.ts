import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import 'reflect-metadata';

async function bootstrap() {
  /*
   * adds a new method to the Date prototype called toISODate()
   * returns the date in ISO format (YYYY-MM-DD).
   */
  if (!Date.prototype['toISODate']) {
    Date.prototype['toISODate'] = function () {
      return this.getFullYear() + '-' + ('0' + (this.getMonth() + 1)).slice(-2) + '-' + ('0' + this.getDate()).slice(-2);
    };
  }

  const port = process.env.PORT || 3003;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest Prisma Service Template Title [Change me]')
    .setDescription('Nest Prisma Service Template Description [Change me]')
    .setVersion('1.0')
    .setContact('NorthExcel', 'https://www.north-excel.com', 'abd.saleh@north-excel.com')
    .addServer('http://localhost:' + port + '/')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.getHttpAdapter().get('/spec-json', (_, res) => res.json(document));

  app.use(helmet());

  app.enableCors({ origin: process.env.CORS_ORIGIN, credentials: true });

  await app.listen(port);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalInterceptors(new TimeOutInterceptor)
  await app.listen(process.env.PORT);
  logger.log(`Application listening on port ${process.env.PORT}`);
}
bootstrap();

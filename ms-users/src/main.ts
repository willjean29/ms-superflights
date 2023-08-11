import { Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMq } from './common/enum/rabbitmq.enum';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URL],
      queue: RabbitMq.UsersQueue
    }
  });
  const logger = new Logger('MicroserviceUsers');
  await app.listen();
  logger.log(`Microservices users is listening `);
}
bootstrap();

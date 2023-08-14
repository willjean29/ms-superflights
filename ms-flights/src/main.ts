import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMq } from './common/enum/rabbitmq.enum';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URL],
      queue: RabbitMq.FlightsQueue
    }
  });
  const logger = new Logger('MicroservicePassengers');
  await app.listen();
  logger.log(`Microservices flights is listening `);
}
bootstrap();

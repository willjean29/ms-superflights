import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import mongoose from 'mongoose';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const id = value.id ? value.id : value;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new RpcException(new BadRequestException('id must be a valid MongoDB ObjectId.'));
    }
    return value;
  }
}
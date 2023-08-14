import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Collections } from 'src/common/models/collections';
import { IPassenger } from '../common/interfaces/passenger.interface';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PassengersService {
  constructor(
    @InjectModel(Collections.Passenger)
    private readonly passengersModel: Model<IPassenger>
  ) { };

  async create(createPassengerDto: CreatePassengerDto): Promise<IPassenger> {
    const passenger = new this.passengersModel(createPassengerDto);
    await passenger.save();
    return passenger;
  }

  async findAll() {
    const passengers = await this.passengersModel.find();
    return passengers;
  }

  async findOne(id: string) {
    const passenger = await this.passengersModel.findOne({ _id: id });
    if (!passenger) {
      throw new RpcException(new NotFoundException(`Passenger with ${id} not found`));
    }
    return passenger;
  }

  async update(id: string, updatePassengerDto: UpdatePassengerDto) {
    await this.findOne(id)
    const newPassenger = await this.passengersModel.findByIdAndUpdate(id, updatePassengerDto, { new: true });
    return newPassenger;

  }

  async remove(id: string) {
    const passenger = await this.findOne(id);
    await this.passengersModel.deleteOne({ _id: id });
    return passenger;
  }
}
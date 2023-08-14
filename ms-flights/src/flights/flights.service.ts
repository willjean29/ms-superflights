import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Collections } from '../common/models/collections';
import { Model } from 'mongoose';
import { IFlight } from '../common/interfaces/flight.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(Collections.Flights)
    private readonly flightModel: Model<IFlight>
  ) { }
  private logger = new Logger('FlightsService');
  async create(createFlightDto: CreateFlightDto): Promise<IFlight> {
    try {
      const flight = new this.flightModel(createFlightDto);
      await flight.save();
      return flight;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(): Promise<IFlight[]> {
    const flights = await this.flightModel.find().populate(Collections.Passenger);
    return flights;
  }

  async findOne(id: string): Promise<IFlight> {
    const flight = await this.flightModel.findOne({ _id: id }).populate(Collections.Passenger);
    if (!flight) {
      throw new RpcException(new NotFoundException(`Flight with ${id} not found`));
    }
    return flight;
  }

  async update(id: string, updateFlightDto: UpdateFlightDto): Promise<IFlight> {
    await this.findOne(id);
    try {
      const newFLight = await this.flightModel.findByIdAndUpdate(id, updateFlightDto, { new: true });
      return newFLight;
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string): Promise<IFlight> {
    const flight = await this.findOne(id)
    await this.flightModel.deleteOne({ _id: id });
    return flight
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    await this.findOne(flightId)
    const flight = await this.flightModel.findByIdAndUpdate(flightId, {
      $addToSet: {
        passengers: passengerId
      }
    }, { new: true }).populate(Collections.Passenger);
    return flight;
  }

  private handleException(error: any) {
    this.logger.error(error);
    if (error.code === 11000) {
      const duplicateKeys = Object.keys(error.keyValue);
      const msg = `${duplicateKeys} are already in use, please try again`;
      throw new RpcException(new BadRequestException(msg));
    }
    throw new RpcException(error);
  }
}

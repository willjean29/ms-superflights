export enum RabbitMq {
  PassengersQueue = 'passengers'
}

export enum PassengersMsg {
  CreatePassenger = "CREATE_PASSENGER",
  FindAll = "FIND_PASSENGERS",
  FindOne = "FIND_PASSENGER",
  Update = "UPDATE_PASSENGER",
  Delete = "DELETE_PASSENGER"
}

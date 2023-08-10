export enum RabbitMq {
  UsersQueue = 'users',
  PassengersQueue = 'passengers',
}

export enum UsersMsg {
  CreateUser = "CREATE_USER",
  FindAll = "FIND_USERS",
  FindOne = "FIND_USER",
  Update = "UPDATE_USER",
  Delete = "DELETE_USER",
  ValidUser = "VALID_USER"
}

export enum PassengersMsg {
  CreatePassenger = "CREATE_PASSENGER",
  FindAll = "FIND_PASSENGERS",
  FindOne = "FIND_PASSENGER",
  Update = "UPDATE_PASSENGER",
  Delete = "DELETE_PASSENGER"
}
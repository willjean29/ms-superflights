export enum RabbitMq {
  UsersQueue = 'users',
  PassengersQueue = 'passengers',
  FlightsQueue = 'flights',
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

export enum FlightsMsg {
  CreateFlight = "CREATE_FLIGHT",
  FindAll = "FIND_FLIGHTS",
  FindOne = "FIND_FLIGHT",
  Update = "UPDATE_FLIGHT",
  Delete = "DELETE_FLIGHT",
  AddPassenger = "ADD_PASSENGER",
}
export enum RabbitMq {
  FlightsQueue = 'flights',
}

export enum FlightsMsg {
  CreateFlight = "CREATE_FLIGHT",
  FindAll = "FIND_FLIGHTS",
  FindOne = "FIND_FLIGHT",
  Update = "UPDATE_FLIGHT",
  Delete = "DELETE_FLIGHT",
  AddPassenger = "ADD_PASSENGER",
}
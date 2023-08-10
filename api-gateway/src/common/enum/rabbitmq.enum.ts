export enum RabbitMq {
  UsersQueue = 'users'
}

export enum UsersMsg {
  CreateUser = "CREATE_USER",
  FindAll = "FIND_USERS",
  FindOne = "FIND_USER",
  Update = "UPDATE_USER",
  Delete = "DELETE_USER",
  ValidUser = "VALID_USER"
}
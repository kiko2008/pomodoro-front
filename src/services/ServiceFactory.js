import UsersService from "./UsersService"
import TasksService from "./TasksService"

const repositories = {
    users: UsersService,
    tasks: TasksService   
}

export const ServiceFactory = {
    get: name => repositories[name]
}
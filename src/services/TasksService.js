import ApiService from "./ApiService"

const RESOURCE = '/tasks/'

export default {    
    createTask(userId, description) {
        const body = {
            "user": userId,
            "description": description,
            "pub_date": new Date(),
            "number_pomodoro_used": 0,
            "end_task": false
        }
       
        return ApiService.post(RESOURCE, body)               
    },

    geListTask(idUsuario, endTask) {
        let query = `${RESOURCE}?userid=${idUsuario}&end_task=${endTask}`       
        return ApiService.get(query)
    },
    
    updateTask(task) {
        let query = `${RESOURCE}${task.taskId}\\`
        return ApiService.patch(query, task.body)
    },
}
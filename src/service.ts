export type Task = {
    id: string;
    message: string;
    status: boolean;
}


export class TodoService {
    
    static newTask(taskList: Task[], task: Task){
        taskList.push(task);
    }

    static updateTask(taskList: Task[],updatedTask: string, task: Task){
        const index = taskList.indexOf(task);
        taskList[index].message = updatedTask;
    }

    static changeTaskStatus(taskList: Task[], task: Task){
        const index = taskList.indexOf(task);
        taskList[index].status = !task.status;
    }

    static removeTask(taskList: Task[], task: Task){
        const index = taskList.indexOf(task);
        taskList.splice(index, 1);
    }


}

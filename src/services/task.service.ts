import type { ListItemType } from "../components";

export class TaskService {
  private static instance: TaskService;
  private tasks: ListItemType[] = [];

  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }

    return TaskService.instance;
  }

  public getTasks() {
    return [...this.tasks];
  }

  public addTask(task: ListItemType) {
    this.tasks.push(task);
    return this.tasks;
  }

  public deleteTasks(listTask: ListItemType[]) {
    this.tasks = this.tasks.filter(
      (task) => !listTask.some((t) => t.id === task.id),
    );
    return this.tasks;
  }

  public undoTask() {
    this.tasks = this.tasks.slice(0, -1);
    return this.tasks;
  }
}

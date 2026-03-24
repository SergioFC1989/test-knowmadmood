import type { ListItemType } from "../components";

export class TaskService {
  private static instance: TaskService;
  private tasks: ListItemType[] = [];
  private lastTaskAdded: ListItemType | null = null;

  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }

    return TaskService.instance;
  }

  public getTasks() {
    return [...this.tasks];
  }

  public getLastTaskAdded() {
    return this.lastTaskAdded;
  }

  public addTask(task: ListItemType) {
    this.tasks.push(task);
    this.lastTaskAdded = task;
    return this.tasks;
  }

  public deleteTasks(listTask: ListItemType[]) {
    this.tasks = this.tasks.filter(
      (task) => !listTask.some((t) => t.id === task.id),
    );
    this.lastTaskAdded = null;
    return this.tasks;
  }

  public undoTask() {
    if (this.lastTaskAdded) {
      this.tasks = this.tasks.filter(
        (task) => task.id !== this.lastTaskAdded?.id,
      );
      this.lastTaskAdded = null;
    }
    return this.tasks;
  }
}

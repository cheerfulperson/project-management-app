export interface CreateTaskDto {
  title: string;
  order: number;
  description: string;
  priority: number;
  userId: string | { [key: string]: undefined };
}

export interface UpdateTaskDto extends CreateTaskDto {
  boardId: string;
  columnId: string;
}

export interface Task extends UpdateTaskDto {
  id: string;
}

export interface TaskFormData {
  title: string;
  description: string;
}

export interface TaskParams {
  taskFrom: Task;
  taskTo: Task;
}

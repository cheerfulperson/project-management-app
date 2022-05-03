import { Task } from './task.model';

export interface CreateColumnDto {
  title: string;
  order: number;
}

export interface UpdateColumnDto extends CreateColumnDto {}

export interface Column extends CreateColumnDto {
  id: string;
  tasks?: Task[];
}

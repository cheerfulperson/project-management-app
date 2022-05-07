import { Column } from './column.models';

export interface CreateBoardDto {
  title: string;
}

export interface UpdateBoardDto extends CreateBoardDto {}

export interface Board extends CreateBoardDto {
  id: string;
  columns?: Column[];
}

import { Column } from './column.models';

export interface CreateBoardDto {
  title: string;
}

export interface UpdateBoardDto extends CreateBoardDto {}

export interface Board extends CreateBoardDto {
  id: string;
  columns?: Column[];
}

export interface GetAllBoardsResponseModel {
  id: string;
  title: string;
}

export interface CreateBoardResponseModel {
  title: string;
  id: string;
}

export interface UpdateBoardResponseModel extends CreateBoardResponseModel {}

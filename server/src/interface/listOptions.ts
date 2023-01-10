export const NoPaginationOptions = {
  page: 0,
  limit: 0,
};

export interface PaginationOptions {
  page: number;
  limit: number;
}

export enum SortDirection {
  DESC = 'desc',
  ASC = 'asc',
}

export interface SortOptions {
  sortBy?: string;
  sortDir?: SortDirection.ASC | SortDirection.DESC;
}

export interface ListOptions extends PaginationOptions, SortOptions {}

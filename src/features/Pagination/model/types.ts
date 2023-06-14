export interface IPagination {
  pageCount: number;
  onPageChange: (page: number) => void;
  page: number;
}

export interface ISelectedItem {
  selected: number;
}

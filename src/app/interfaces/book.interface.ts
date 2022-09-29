export interface IBook {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  publishDate: string;
}

export interface IBookFull extends IBook {
  excerpt: string;
}
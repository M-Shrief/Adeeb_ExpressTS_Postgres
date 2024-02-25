// General and reused types

export interface  Verse{
  first: string;
  sec: string;
}
export interface Print {
  id?: string;
  poem?: string;
  verse?: Verse[];
  qoute?: string;
}
export interface Product {
  print: Print;
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}
export interface ProductGroup {
  prints: Print[];
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}

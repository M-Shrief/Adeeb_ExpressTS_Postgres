// General and reused types
export interface VerseType {
  first: string;
  sec: string;
}

export interface Print {
  id?: string;
  poem?: string;
  verse?: VerseType[];
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

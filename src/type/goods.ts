export interface ListInt {
  id: number
  introduce:string
  title:string
  userId:number
}


export interface SearchFormInt {
  title: string;
  introduce: string;
  page: number;
  count: number;
  pageSize: number;
}

export class GoodsData {
  goodsList:ListInt[]=[];
  searchForm: SearchFormInt={
    title: "",
    introduce: "",
    page: 1,
    count: 0,
    pageSize: 10,
  };
}
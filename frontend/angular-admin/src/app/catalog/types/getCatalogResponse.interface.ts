// export interface getCatalogResponseInterface {
//     data: Data
//   }
  
  export interface getCatalogResponseInterface {
    pageIndex: number
    pageSize: number
    count: number
    data: Product[]
  }
  
  export interface Product {
    id: string
    name: string
    summary: string
    description: string
    imageFile: string
    image: string
    price: number
    brands: Brands
    types: Types
  }
  
  export interface Brands {
    name: string
    id: string
  }
  
  export interface Types {
    name: string
    id: string
  }
  
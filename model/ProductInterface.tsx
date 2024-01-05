interface Product {
  product: any;
  brand: string;
  image: string;
  name: string;
  rate: number;
  ingredients: string;
  nutritionalInformation: {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
  };
}

export default Product;

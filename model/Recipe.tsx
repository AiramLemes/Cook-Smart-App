import { Timestamp } from "firebase/firestore";

interface Recipe {
  userId: string;
  title: string,
  mainImage: string,
  assessment: number,
  id: string,
  images: string[],
  ingredients: string[],
  steps: string[],
  lang: string,
  preparation: string,
  cooking: string,
  rest: string,
  servings: number,
  difficulty: number,
  category: string,
  timestamp: any
}
  
export default Recipe;
interface Recipe {
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
  serving: number,
  difficulty: number
}
  
export default Recipe;
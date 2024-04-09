import OpenAI from 'openai';
import Recipe from '../model/Recipe';

const openai = new OpenAI({
  apiKey: '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', 
});

async function generateRecipe(ingredients: string[]) {
  try {
    console.log('Generating the recipe..., wait a minute');
    const userMessage = `generate a recipe with these ingredients: ${ingredients.join(', ')}
    interface Recipe {
      userId: string;
      title: string,
      mainImage: https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/ai%2Fchat%20gpt%20image.webp?alt=media&token=1020e5ee-2c08-4e99-a0df-9524eb6810bd,
      id: string,
      images: string[],
      ingredients: Ingredient[],
      steps: string[],
      lang: string,
      preparation: RecipeTime,
      cooking: RecipeTime,
      rest: RecipeTime,
      servings: number,
      difficulty: number,
      category: string,
      timestamp: any,
      numberOfRatings: number;
      totalRating: number;
      assessment: number,
    }`;

    const ingredientInterface = `interface Ingredient {
      name: string;
      unit: string (kg, gr, ml, l)
      amount: number;
      englishVersion: string;
    }`;

    const recipeTimesInterface = `interface RecipeTime {
      amount: number,
      unit: string, (minutes, hours, days)
      index: number (1, 2, 3)
    }`;


    const modelMessage = `ingredients have this interface: ${ingredientInterface} and preparation, cooking, rest have this: ${recipeTimesInterface},
     GIVE ALL -THE RESPONSE IN THIS ENGLISH, send it to use Json.parse() and send only the information required without additional comments`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'user', content: userMessage },
        { role: 'assistant', content: modelMessage },
      ],
      model: 'gpt-3.5-turbo-1106',
    });


    const recipeResponse = chatCompletion.choices[0]?.message?.content;
    console.log(recipeResponse)

    if (recipeResponse) {
      const recipe: Recipe = JSON.parse(recipeResponse);
      recipe.userId = 'chat-gpt'
      const requiredFields = ['userId', 'title', 'mainImage', 'images', 'ingredients', 'steps', 'lang', 'preparation', 'cooking', 'rest', 'servings', 'difficulty', 'category'];
      const isValidRecipe = requiredFields.every(field => field in recipe);

      if (isValidRecipe) {
        recipe.userId = 'chat-gpt';
        console.log(recipe);
        return recipe;
      } else {
        console.log('The model response does not contain all the required fields.');
        return null;
      }
    } else {
      console.log('No model prescription response was obtained.');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener la respuesta del modelo:', error.message);
    return null
  }
}


export { generateRecipe };

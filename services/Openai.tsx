import OpenAI from 'openai';
import Recipe from '../model/Recipe';
import { Strings } from '../constants/Strings';

const openai = new OpenAI({
  apiKey: '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', // Esto es opcional si ya tienes configurada la clave en tu entorno
});

async function generateRecipe(ingredients: string[]) {
  try {
    console.log('Generating the recipe..., wait a minute');
    const lang = Strings.locale;
    const userMessage = `generate a recipe with these ingredients: ${ingredients.join(', ')}
      interface Recipe {
        userId: 'chat-gpt';
        title: string;
        mainImage: 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/ai%2Fchat%20gpt%20image.webp?alt=media&token=1020e5ee-2c08-4e99-a0df-9524eb6810bd';
        id: string;
        images: ['https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/ai%2Fchat%20gpt%20image.webp?alt=media&token=1020e5ee-2c08-4e99-a0df-9524eb6810bd'];
        ingredients: Ingredient[];
        steps: string[];
        lang: 'en-GB';
        preparation: string;
        cooking: string;
        rest: string;
        servings: number;
        difficulty: number; // between 1 (easy), 2 (normal), 3 (difficult)
        category: string;
        timestamp: 0;
        likes: 0;
        likedUsersId: [];
        numberOfRatings: 0;
        totalRating: 0;
        assessment: 0;
        }`;

    const ingredientInterface = `interface Ingredient {
      name: string;
      unit: string;
      amount: number | string;
      englishVersion: string;
    }`;

    const modelMessage = `ingredients have this interface: ${ingredientInterface} GIVE ALL -THE RESPONSE IN THIS ENGLISH, send it to use Json.parse() and send only the information required without additional comments`;

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
        const requiredFields = ['userId', 'title', 'mainImage', 'id', 'images', 'ingredients', 'steps', 'lang', 'preparation', 'cooking', 'rest', 'servings', 'difficulty', 'category'];
      const isValidRecipe = requiredFields.every(field => field in recipe);

      if (isValidRecipe) {
        recipe.userId = 'chat-gpt';
        console.log(recipe);
        return recipe;
      } else {
        console.log('La respuesta del modelo no contiene todos los campos necesarios.');
      }
    } else {
      console.log('No se obtuvo una respuesta de receta del modelo.');
    }
  } catch (error) {
    console.error('Error al obtener la respuesta del modelo:', error.message);
  }
}

export { generateRecipe };
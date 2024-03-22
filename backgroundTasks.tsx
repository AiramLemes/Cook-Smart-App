import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { sendNotificationWithType } from './utils/NotificationsHandler';
import { getPantry } from './repository/FirebasePantry';

export const PANTRY_CHECK_TASK = 'pantryCheckTask';

TaskManager.defineTask(PANTRY_CHECK_TASK, async ({ data, error }) => {
  const now = Date.now();
  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

  if (error) {
    console.error(error);
    return
  }

  if (data) {

    const pantry = await getPantry();
    
    const lowStockIngredients = pantry.products.filter(ingredient => ingredient.amount < 20);
    
    if (lowStockIngredients.length > 0) {
      const ingredientsNames = lowStockIngredients.map(ingredient => ingredient.name).join(', ');
      sendNotificationWithType('pantry', ingredientsNames);
    }
    
    return BackgroundFetch.BackgroundFetchResult.NewData;
  }
});


const configureBackgroundFetch = async () => {
  await BackgroundFetch.registerTaskAsync(PANTRY_CHECK_TASK, {
    minimumInterval: 3 * 60 * 60, // 3 hours
    stopOnTerminate: true, 
    startOnBoot: true, 
  });
};

configureBackgroundFetch();

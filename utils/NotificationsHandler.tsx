import * as Notifications from 'expo-notifications';

const sendNotificationWithType = (type: string, text? : string) => {
  let notificationConfig = {};

  switch (type) {

    case 'pantry':
      notificationConfig = {
        content: {
          title: 'CookSmart',
          body: `¡Quedan pocas unidades de ${text} en tu despensa! ¡Asegúrate de reponerlo pronto!`,
        },
        trigger: null,
      };
      break;

    default:
      notificationConfig = {
        content: {
          title: 'CookSmart',
          body: 'Texto predefinido para otros tipos de notificaciones',
        },
        trigger: null,
      };
  }

  Notifications.scheduleNotificationAsync(notificationConfig);
};

  
  
 export {sendNotificationWithType} 
  
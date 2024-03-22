import Toast from 'react-native-root-toast';
import Colors from '../constants/Colors';


class ToastUtil {
  static showToast(message: string, duration: any) {
    Toast.show(message, {
        duration: duration,  // Duración corta por defecto
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        textColor: Colors.textPrimary,
        containerStyle: {marginBottom: 35},
        backgroundColor: Colors.toasts
    });
  }
}

export default ToastUtil;

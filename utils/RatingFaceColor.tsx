import React from 'react';
import { View } from 'react-native';
import { Iconify } from 'react-native-iconify';

const FaceColor = ({ rate, size }) => {
  
  const getHexColor = (value: number) => {
    if (value <= 49) {
      const red = 255 - (value * 5);
      return `#${red.toString(16)}0000`;
    } else {
      if (value === 49) {
        return '#FF0000';
      }
      const green = (value - 50) * 5;
      return `#00${green.toString(16)}00`;
    }
  };

  const getFaceIcons = (rate: number, size: number) => {
    const ratingInt = parseInt(rate.toString());
    const hexColor = getHexColor(ratingInt);

    let iconComponents = null;

    if (ratingInt <= 34) {
      iconComponents = (
        <Iconify icon="clarity:sad-face-solid" size={size} color={hexColor} />
      );
    } else if (ratingInt > 34 && ratingInt <= 66) {
      iconComponents = (
        <Iconify icon="icon-park-solid:neutral-face" size={size} color={hexColor} />
      );
    } else {
      iconComponents = (
        <Iconify icon="fa-solid:smile" size={size} color={hexColor} />
      );
    }

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {iconComponents}
      </View>
    );
  };

  return getFaceIcons(rate, size);
};

export default FaceColor;

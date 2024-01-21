import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Iconify } from 'react-native-iconify';
import Colors from '../constants/Colors';

const IngredientItem = (props: { name: string, size: number }) => {
  const { name, size} = props;
  const [ingredientName, amount] = name.split(',');

  return (
    <View style={styles.ingredientContainer}>
      <View style={styles.ingredientIcon}>
        {getIngredientIcon(ingredientName, size)}
      </View>
      <Text style={styles.ingredientName}>{ingredientName}</Text>
      <Text style={styles.ingredientAmount}>{amount}</Text>
    </View>
  );
};

const spicesAnOthers = [
  'cumin', 'coriander', 'turmeric', 'paprika', 'cinnamon', 'ginger',
  'garlicpowder', 'onionpowder', 'blackpepper', 'oregano', 'thyme',
  'rosemary', 'basil', 'parsley', 'cilantro', 'dill', 'cayenne',
  'mustard', 'nutmeg', 'pumpkinspice', 'vanilla', 'saffron',
  'cloves', 'cardamom', 'fennel', 'caraway', 'allspice', 'bayleaf',
  'chilipowder', 'currypowder', 'whitepepper', 'turmeric', 'smokedpaprika',
  'sumac', 'tarragon', 'sage', 'juniper', 'anise', 'marjoram',
  'fenugreek', 'poppyseed', 'sesameseed', 'lavender', 'wasabi', 'sichuanpepper',
  'chervil', 'lovage', 'savory', 'thaispice', 'garammasala', 'celeryseed', 'quinoa', 'yeast'
];

const cheeseTypes = [
  'cheese',
  'cheddar',
  'mozzarella',
  'parmesan',
  'gouda',
  'brie',
  'roquefort',
  'feta',
  'camembert',
  'gorgonzola',
  'manchego',
  'ricotta',
  'provolone',
  'swiss',
  'blue cheese',
  'cream cheese',
  'havarti',
  'colby jack',
  'asiago',
  'fontina',
  'pepper jack',
  'goat cheese',
  'smoked cheddar',
  'goat cheese',
  'sheep cheese',
  'blue cheese',
  'fresh cheese',
  'aged cheese',
  'semi-cured cheese',
  'aged cheese'
];


const getIngredientIcon = (ingredientName: string, size: number) => {

  if (spicesAnOthers.includes(ingredientName.toLowerCase())) {
    return <Iconify icon="icon-park-outline:hold-seeds" style={styles.icon} size={size} color="black" />;
  }

  if (cheeseTypes.includes(ingredientName.toLowerCase())) {
    return <Iconify icon="noto:cheese-wedge" style={styles.icon} size={size} color="black" />;
  }
  // Mapea el nombre del ingrediente a un componente específico
  switch (ingredientName.toLowerCase()) {
    case 'milk':
      return <Iconify icon="lucide:milk" style={styles.icon} size={size} color="white" />;
    case 'chicken':
      return <Iconify icon="mdi:chicken-leg-outline" style={styles.icon} size={size} color="black" />;
    case 'beef': 
      return <Iconify icon="fluent-emoji-flat:cut-of-meat" style={styles.icon} size={size} color="black" />;
    case 'pork': //
      return <Iconify icon="fluent-emoji-flat:cut-of-meat" style={styles.icon} size={size} color="black" />;
    case 'rice':
      return <Iconify icon="noto:cooked-rice" style={styles.icon} size={size} color="black" />;
    case 'pasta': //
      return <Iconify icon="mdi:pasta" style={styles.icon} size={size} color="#EB781F" />;
    case 'lettuce':
      return <Iconify icon="noto:leafy-green" style={styles.icon} size={size} color="black" />;
    case 'cucumber':
      return <Iconify icon="noto:cucumber" style={styles.icon} size={size} color="black" />;
    case 'onion':
      return <Iconify icon="noto:onion" style={styles.icon} size={size} color="black" />;
    case 'garlic':
      return <Iconify icon="noto:garlic" style={styles.icon} size={size} color="black" />;
    case 'potato':
      return <Iconify icon="noto:potato" style={styles.icon} size={size} color="black" />;
    case 'sweetpotato':
      return <Iconify icon="noto:roasted-sweet-potato" style={styles.icon} size={size} color="black" />;
    case 'spinach': //
      return <Iconify icon="twemoji:leafy-green" style={styles.icon} size={size} color="black" />;
    case 'cauliflower': // NA
      return <Iconify icon="mdi:flower-poppy" style={styles.icon} size={size} color="white" />;
    case 'asparagus':
      return <Iconify icon="game-icons:asparagus" style={styles.icon} size={size} color="green" />;
    case 'peas':
      return <Iconify icon="game-icons:peas" style={styles.icon} size={size} color="green" />;
    case 'corn':
      return <Iconify icon="noto:ear-of-corn" style={styles.icon} size={size} color="black" />;
    case 'strawberry':
      return <Iconify icon="noto:strawberry" style={styles.icon} size={size} color="black" />;
    case 'orange':
      return <Iconify icon="lucide:citrus" style={styles.icon} size={size} color="orange" />;
    case 'lemon':
      return <Iconify icon="lucide:citrus" style={styles.icon} size={size} color="yellow" />;
    case 'lime':
      return <Iconify icon="lucide:citrus" style={styles.icon} size={size} color="green" />;
    case 'blueberry':
      return <Iconify icon="noto:blueberries" style={styles.icon} size={size} color="black" />;
    case 'raspberry':
      return <Iconify icon="logos:raspberry-pi" style={styles.icon} size={size} color="black" />;
    case 'cherry':
      return <Iconify icon="lucide:cherry" style={styles.icon} size={size} color="red" />;
    case 'watermelon':
      return <Iconify icon="noto:watermelon" style={styles.icon} size={size} color="black" />;
    case 'melon':
      return <Iconify icon="streamline-emojis:melon-1" style={styles.icon} size={size} color="black" />;
    case 'kiwi':
      return <Iconify icon="noto:kiwi-fruit" style={styles.icon} size={size} color="black" />;
    case 'pineapple':
      return <Iconify icon="emojione:pineapple" style={styles.icon} size={size} color="black" />;
    case 'mango':
      return <Iconify icon="noto:mango" style={styles.icon} size={size} color="black" />;
    case 'avocado':
      return <Iconify icon="noto:avocado" style={styles.icon} size={size} color="black" />;
    case 'olive':
      return <Iconify icon="fluent-emoji:olive" style={styles.icon} size={size} color="black" />;
    case 'almond':
      return <Iconify icon="game-icons:almond" style={styles.icon} size={size} color="brown" />;
    case 'peanut':
      return <Iconify icon="noto:peanuts" style={styles.icon} size={size} color="black" />;
    // case 'walnut': // NA
    //   return <Iconify icon="mdi:walnut" style={styles.icon} size={size} color="black" />;
    // case 'cashew': // NA
    //   return <Iconify icon="mdi:cashew" style={styles.icon} size={size} color="black" />;
    // case 'pistachio': // NA
    //   return <Iconify icon="mdi:pistachio" style={styles.icon} size={size} color="black" />;
    case 'salmon':
      return <Iconify icon="game-icons:salmon" style={styles.icon} size={size} color="#f24e1e" />;
    case 'tuna': // 
      return <Iconify icon="ion:fish" style={styles.icon} size={size} color="#7C3E50" />;
    case 'shrimp':
      return <Iconify icon="noto-v1:shrimp" style={styles.icon} size={size} color="black" />;
    case 'crab':
      return <Iconify icon="noto:crab" style={styles.icon} size={size} color="black" />;
    case 'lobster':
      return <Iconify icon="noto:lobster" style={styles.icon} size={size} color="black" />;
    case 'oyster':
      return <Iconify icon="twemoji:oyster" style={styles.icon} size={size} color="black" />;
    case 'clam':
      return <Iconify icon="cryptocurrency:clam" style={styles.icon} size={size} color="white" />;
    case 'scallops':
      return <Iconify icon="game-icons:scallop" style={styles.icon} size={size} color="black" />;
    case 'octopus':
      return <Iconify icon="noto:octopus" style={styles.icon} size={size} color="black" />;
    case 'squid':
      return <Iconify icon="noto:squid" style={styles.icon} size={size} color="black" />;
    case 'turkey':
      return <Iconify icon="noto:turkey" style={styles.icon} size={size} color="black" />;
    case 'duck':
      return <Iconify icon="noto:duck" style={styles.icon} size={size} color="black" />;
    case 'lamb':
      return <Iconify icon="fluent-emoji-flat:cut-of-meat" style={styles.icon} size={size} color="black" />;
    case 'rabbit':
      return <Iconify icon="fluent:animal-rabbit-24-regular" style={styles.icon} size={size} color="white" />;
    case 'snail':
      return <Iconify icon="noto:snail" style={styles.icon} size={size} color="black" />;
    case 'tofu':
      return <Iconify icon="ion:cube-sharp" style={styles.icon} size={size} color="#E9E3CF" />;
    case 'soymilk':
      return <Iconify icon="lucide:milk" style={styles.icon} size={size} color="white" />;
    case 'salt':
      return <Iconify icon="noto:salt" style={styles.icon} size={size} color="black" />;
    case 'sugar':
      return <Iconify icon="mdi:spoon-sugar" style={styles.icon} size={size} color="black" />;
    case 'pepper':
      return <Iconify icon="noto:bell-pepper" style={styles.icon} size={size} color="black" />;
    case 'oil':
      return <Iconify icon="mdi:bottle-wine-outline" style={styles.icon} size={size} color="black" />;
    case 'wine':
      return <Iconify icon="mdi:bottle-wine-outline" style={styles.icon} size={size} color="black" />;
    case 'vinegar':
      return <Iconify icon="mdi:bottle-wine-outline" style={styles.icon} size={size} color="black" />;   
    case 'tomato':
      return <Iconify icon="noto:tomato" style={styles.icon} size={size} color="black" />;
    case 'egg':
      return <Iconify icon="noto:egg" style={styles.icon} size={size} color="black" />;
    case 'flour':
      return <Iconify icon="game-icons:flour" style={styles.icon} size={size} color="white" />;
    case 'yogurt':
      return <Iconify icon="uil:glass" style={styles.icon} size={size} color="black" />;
    case 'coffee':
      return <Iconify icon="game-icons:coffee-beans" style={styles.icon} size={size} color="brown" />;
    case 'water':
      return <Iconify icon="lets-icons:water" style={styles.icon} size={size} color="blue" />;
    case 'beans':
      return <Iconify icon="noto:beans" style={styles.icon} size={size} color="black" />;
      //////////////////////
    case 'carrot':
      return <Iconify icon="noto:carrot" style={styles.icon} size={size} color="orange" />;
    case 'broccoli':
      return <Iconify icon="noto:broccoli" style={styles.icon} size={size} color="green" />;
    case 'greenbean':
      return <Iconify icon="game-icons:jelly-beans" style={styles.icon} size={size} color="green" />;
    case 'eggplant':
      return <Iconify icon="noto:eggplant" style={styles.icon} size={size} color="purple" />;
    case 'mushroom':
      return <Iconify icon="noto:brown-mushroom" style={styles.icon} size={size} color="brown" />;
    case 'pepperoni':
      return <Iconify icon="mdi:sausage" style={styles.icon} size={size} color="red" />;
    case 'sausage':
      return <Iconify icon="mdi:sausage" style={styles.icon} size={size} color="#9F564A" />;
    case 'bacon':
      return <Iconify icon="noto:bacon" style={styles.icon} size={size} color="brown" />;
    // case 'ham':
    //   return <Iconify icon="noto:meat-on-bone" style={styles.icon} size={size} color="pink" />;
    case 'mayo':
      return <Iconify icon="openmoji:jar" style={styles.icon} size={size} color="white" />;
    case 'mustard':
      return <Iconify icon="openmoji:jar" style={styles.icon} size={size} color="yellow" />;
    case 'ketchup':
      return <Iconify icon="game-icons:ketchup" style={styles.icon} size={size} color="red" />;
    case 'pickles':
      return <Iconify icon="file-icons:pickle" style={styles.icon} size={size} color="green" />;
    case 'soysauce':
      return <Iconify icon="mdi:soy-sauce" style={styles.icon} size={size} color="black" />;
    case 'honey':
      return <Iconify icon="noto:honey-pot" style={styles.icon} size={size} color="black" />;
    case 'jalapeno':
      return <Iconify icon="emojione-v1:hot-pepper" style={styles.icon} size={size} color="green" />;
    case 'salsa':
      return <Iconify icon="openmoji:jar" style={styles.icon} size={size} color="red" />;
    case 'guacamole':
      return <Iconify icon="openmoji:jar" style={styles.icon} size={size} color="green" />;
    case 'sourcream':
      return <Iconify icon="openmoji:jar" style={styles.icon} size={size} color="white" />;
    case 'banana':
      return <Iconify icon="noto:banana" style={styles.icon} size={size} color="white" />;
    // case 'tortilla':
    //   return <Iconify icon="noto:burrito" style={styles.icon} size={size} color="white" />;
    case 'bread': 
      return <Iconify icon="emojione:bread" style={styles.icon} size={size} color="white" />;
    case 'black olives':
      return <Iconify icon="fluent-emoji-high-contrast:olive" style={styles.icon} size={size} color="black" />;
    case 'tomato soup':
      return <Iconify icon="openmoji:jar" style={styles.icon} size={size} color="red" />;
    default:
      // En caso de que el nombre del ingrediente no coincida con ninguno conocido
      return <Iconify icon="mdi:help-circle-outline" style={styles.icon} size={size} color="black" />;
  }
};

const styles = StyleSheet.create({
  ingredientContainer: {
    width: '98%',
    height: 36,
    backgroundColor: '#FBF8F8',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },

  ingredientIcon: {
    width: '13 %',
    height: '100%',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },

  ingredientName: {
    textAlignVertical: 'center',
    fontSize: 15,
    marginLeft: 10,
  },

  ingredientAmount: {
    textAlignVertical: 'center',
    fontSize: 15,
    position: 'absolute',
    right: 25,
    top: '20%'
  },

  icon:{
    alignSelf: 'center', 
    marginVertical: 2 
  }
});

export default IngredientItem;

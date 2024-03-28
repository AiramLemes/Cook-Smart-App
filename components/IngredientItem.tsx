import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import Colors from '../constants/Colors';
import Ingredient from '../model/Ingredient';
import { updatePantryIngredient } from '../repository/FirebasePantry';

const IngredientItem = (props: {
  onRemove?: any; ingredient: Ingredient, size: number, pantryIngredient?: boolean, index? : number, shoppingList?: boolean 
}) => {
  const {size, index} = props;
  const pantryIngredient: boolean =  props.pantryIngredient === undefined ? false : true;
  const [ingredient, setIngredient] = useState<Ingredient>(props.ingredient);


  const handleAmountChange = (op: string) => {

    let amount = ingredient.amount;

    if (typeof(amount) === 'number') {
      if (op === 'plus') {
        amount++;
        updatePantryIngredient(amount, index!);
        ingredient.amount = amount;
        setIngredient({...ingredient, amount: amount});
      }
      else {
        amount - 1 < 0 ? amount = 0 : amount--;
        ingredient.amount = amount;
        updatePantryIngredient(amount, index!);
        setIngredient({...ingredient, amount: amount});
      }
    }
  };


  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return !pantryIngredient ? (
    <View>
      <View style={styles.ingredientContainer}>
        <View style={styles.ingredientIcon}>
          {getIngredientIcon(ingredient!!.englishVersion, size)}
        </View>
        
        <Text style={styles.ingredientName}>{capitalizeFirstLetter(ingredient!!.name)}</Text>

        <Text style={styles.ingredientAmount}>{ingredient!!.amount + ' ' + ingredient.unit}</Text>
      </View>
    </View>
  ) : (
    <View>
      <View style={{...styles.ingredientContainer, justifyContent: 'space-between'}}>
        <View style={styles.ingredientIcon}>
          {getIngredientIcon(ingredient!!.englishVersion, size)}
        </View>
        <Text style={styles.ingredientName}>{ingredient!!.name}</Text>
        {!props.shoppingList && (
        <>
          <View style={styles.counter}>
            <TouchableOpacity onLongPress={() => {handleAmountChange('plus')}} onPress={() => {handleAmountChange('plus')}}>
              <Iconify icon="ic:baseline-plus" size={25} color={Colors.black} />
            </TouchableOpacity>

            <Text style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 17}}>{ingredient!!.amount}</Text>

            <TouchableOpacity  onLongPress={() => {handleAmountChange('minus')}} onPress={() => {handleAmountChange('minus')}}>
              <Iconify icon="ic:baseline-minus" size={25} color={Colors.black} />
            </TouchableOpacity>
          </View>
          <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>{ingredient!!.unit}</Text>
          </>
        )}


        <TouchableOpacity onPress={() => {props.onRemove()}}>
          <Iconify icon="mdi:delete-outline" style={styles.icon} size={30} color="black" />
        </TouchableOpacity>
      </View>
      
      
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
  'cheese', 'cheddar', 'mozzarella', 'parmesan', 'gouda','brie','roquefort','feta','camembert',
  'gorgonzola','manchego','ricotta','provolone','swiss','blue cheese','cream cheese','havarti',
  'colby jack','asiago','fontina','pepper jack','goat cheese','smoked cheddar','goat cheese',
  'sheep cheese','blue cheese','fresh cheese','aged cheese','semi-cured cheese','aged cheese'
];




const getIngredientIcon = (ingredientName: string, size: number) => {
  try {
    if (!ingredientName) {
      return <Iconify icon="mdi:help-circle-outline" style={styles.icon} size={size} color="black" />;
    }
    const lowerCaseIngredient = ingredientName.toLowerCase();

    if (spicesAnOthers.some(spice => lowerCaseIngredient.includes(spice))) {
      return <Iconify icon="icon-park-outline:hold-seeds" style={styles.icon} size={size} color="black" />;
    }

    if (cheeseTypes.some(cheese => lowerCaseIngredient.includes(cheese))) {
      return <Iconify icon="noto:cheese-wedge" style={styles.icon} size={size} color="black" />;
    }

    switch (true) {
      case lowerCaseIngredient.includes('tomato'):
        return <Iconify icon="noto:tomato" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('oil'):
        return <Iconify icon="mdi:bottle-wine-outline" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('milk'):
        return <Iconify icon="lucide:milk" style={styles.icon} size={size} color="white" />;
      case lowerCaseIngredient.includes('chicken'):
        return <Iconify icon="mdi:chicken-leg-outline" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('beef'):
        return <Iconify icon="fluent-emoji-flat:cut-of-meat" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('pork'):
        return <Iconify icon="fluent-emoji-flat:cut-of-meat" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('rice'):
        return <Iconify icon="noto:cooked-rice" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('pastas'):
        return <Iconify icon="mdi:pasta" style={styles.icon} size={size} color="#EB781F" />;
      case lowerCaseIngredient.includes('lettuce'):
        return <Iconify icon="noto:leafy-green" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('cucumber'):
        return <Iconify icon="noto:cucumber" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('onion'):
        return <Iconify icon="noto:onion" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('garlic'):
        return <Iconify icon="noto:garlic" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('potato'):
        return <Iconify icon="noto:potato" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('sweetpotato'):
        return <Iconify icon="noto:roasted-sweet-potato" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('spinach'):
        return <Iconify icon="twemoji:leafy-green" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('cauliflower'):
        return <Iconify icon="mdi:flower-poppy" style={styles.icon} size={size} color="white" />;
      case lowerCaseIngredient.includes('asparagus'):
        return <Iconify icon="game-icons:asparagus" style={styles.icon} size={size} color="green" />;
      case lowerCaseIngredient.includes('peas'):
        return <Iconify icon="game-icons:peas" style={styles.icon} size={size} color="green" />;
      case lowerCaseIngredient.includes('corn'):
        return <Iconify icon="noto:ear-of-corn" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('strawberry'):
        return <Iconify icon="noto:strawberry" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('oranges'):
        return <Iconify icon="lucide:citrus" style={styles.icon} size={size} color="orange" />;
      case lowerCaseIngredient.includes('baking powder'):
        return <Iconify icon="game-icons:powder" style={styles.icon} size={size} color="white" />;
      case lowerCaseIngredient.includes('lemon'):
        return <Iconify icon="lucide:citrus" style={styles.icon} size={size} color="yellow" />;
      case lowerCaseIngredient.includes('lime'):
        return <Iconify icon="lucide:citrus" style={styles.icon} size={size} color="green" />;
      case lowerCaseIngredient.includes('blueberry'):
        return <Iconify icon="noto:blueberries" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('raspberry'):
        return <Iconify icon="logos:raspberry-pi" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('cherry'):
        return <Iconify icon="lucide:cherry" style={styles.icon} size={size} color="red" />;
      case lowerCaseIngredient.includes('watermelon'):
        return <Iconify icon="noto:watermelon" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('melon'):
        return <Iconify icon="streamline-emojis:melon-1" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('kiwi'):
        return <Iconify icon="noto:kiwi-fruit" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('pineapple'):
        return <Iconify icon="emojione:pineapple" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('mango'):
        return <Iconify icon="noto:mango" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('avocado'):
        return <Iconify icon="noto:avocado" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('olive'):
        return <Iconify icon="fluent-emoji:olive" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('almond'):
        return <Iconify icon="game-icons:almond" style={styles.icon} size={size} color="brown" />;
      case lowerCaseIngredient.includes('peanut'):
        return <Iconify icon="noto:peanuts" style={styles.icon} size={size} color="black" />;
      // case lowerCaseIngredient.includes('walnut'):
      //   return <Iconify icon="mdi:walnut" style={styles.icon} size={size} color="black" />;
      // case lowerCaseIngredient.includes('cashew'):
      //   return <Iconify icon="mdi:cashew" style={styles.icon} size={size} color="black" />;
      // case lowerCaseIngredient.includes('pistachio'):
      //   return <Iconify icon="mdi:pistachio" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('salmon'):
        return <Iconify icon="game-icons:salmon" style={styles.icon} size={size} color="#f24e1e" />;
      case lowerCaseIngredient.includes('tuna'):
        return <Iconify icon="ion:fish" style={styles.icon} size={size} color="#7C3E50" />;
      case lowerCaseIngredient.includes('shrimp'):
        return <Iconify icon="noto-v1:shrimp" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('crab'):
        return <Iconify icon="noto:crab" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('lobster'):
        return <Iconify icon="noto:lobster" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('oyster'):
        return <Iconify icon="twemoji:oyster" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('clam'):
        return <Iconify icon="cryptocurrency:clam" style={styles.icon} size={size} color="white" />;
      case lowerCaseIngredient.includes('scallops'):
        return <Iconify icon="game-icons:scallop" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('octopus'):
        return <Iconify icon="noto:octopus" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('squid'):
        return <Iconify icon="noto:squid" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('turkey'):
        return <Iconify icon="noto:turkey" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('duck'):
        return <Iconify icon="noto:duck" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('lamb'):
        return <Iconify icon="fluent-emoji-flat:cut-of-meat" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('rabbit'):
        return <Iconify icon="fluent:animal-rabbit-24-regular" style={styles.icon} size={size} color="white" />;
      case lowerCaseIngredient.includes('snail'):
        return <Iconify icon="noto:snail" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('tofu'):
        return <Iconify icon="ion:cube-sharp" style={styles.icon} size={size} color="#E9E3CF" />;
      case lowerCaseIngredient.includes('soymilk'):
        return <Iconify icon="lucide:milk" style={styles.icon} size={size} color="white" />;
      case lowerCaseIngredient.includes('salt'):
        return <Iconify icon="noto:salt" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('sugar'):
        return <Iconify icon="mdi:spoon-sugar" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('pepper'):
        return <Iconify icon="noto:bell-pepper" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('wine'):
        return <Iconify icon="mdi:bottle-wine-outline" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('vinegar'):
        return <Iconify icon="mdi:bottle-wine-outline" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('egg'):
        return <Iconify icon="noto:egg" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('flour'):
        return <Iconify icon="game-icons:flour" style={styles.icon} size={size} color="white" />;
      case lowerCaseIngredient.includes('yogurt'):
        return <Iconify icon="uil:glass" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('coffee'):
        return <Iconify icon="game-icons:coffee-beans" style={styles.icon} size={size} color="brown" />;
      case lowerCaseIngredient.includes('water'):
        return <Iconify icon="lets-icons:water" style={styles.icon} size={size} color="blue" />;
      case lowerCaseIngredient.includes('beans'):
        return <Iconify icon="noto:beans" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('butter'):
        return <Iconify icon="fluent-emoji-flat:butter" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('carrot'):
        return <Iconify icon="noto:carrot" style={styles.icon} size={size} color="orange" />;
      case lowerCaseIngredient.includes('broccoli'):
        return <Iconify icon="noto:broccoli" style={styles.icon} size={size} color="green" />;
      case lowerCaseIngredient.includes('greenbean'):
        return <Iconify icon="game-icons:jelly-beans" style={styles.icon} size={size} color="green" />;
      case lowerCaseIngredient.includes('eggplant'):
        return <Iconify icon="noto:eggplant" style={styles.icon} size={size} color="purple" />;
      case lowerCaseIngredient.includes('mushroom'):
        return <Iconify icon="noto:brown-mushroom" style={styles.icon} size={size} color="brown" />;
      case lowerCaseIngredient.includes('pepperoni'):
        return <Iconify icon="mdi:sausage" style={styles.icon} size={size} color="red" />;
      case lowerCaseIngredient.includes('sausage'):
        return <Iconify icon="mdi:sausage" style={styles.icon} size={size} color="#9F564A" />;
      case lowerCaseIngredient.includes('bacon'):
        return <Iconify icon="noto:bacon" style={styles.icon} size={size} color="brown" />;
      // case lowerCaseIngredient.includes('ham'):
      //   return <Iconify icon="noto:meat-on-bone" style={styles.icon} size={size} color="pink" />;
      case lowerCaseIngredient.includes('mayo'):
        return <Iconify icon="openmoji:jar" style={styles.icon} size={size} color="white" />;
      case lowerCaseIngredient.includes('mustard'):
        return <Iconify icon="openmoji:jar" style={styles.icon} size={size} color="yellow" />;
      case lowerCaseIngredient.includes('ketchup'):
        return <Iconify icon="game-icons:ketchup" style={styles.icon} size={size} color="red" />;
      case lowerCaseIngredient.includes('pickles'):
        return <Iconify icon="file-icons:pickle" style={styles.icon} size={size} color="green" />;
      case lowerCaseIngredient.includes('soysauce'):
        return <Iconify icon="mdi:soy-sauce" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('honey'):
        return <Iconify icon="noto:honey-pot" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('jalapeno'):
        return <Iconify icon="emojione-v1:hot-pepper" style={styles.icon} size={size} color="green" />;
      case lowerCaseIngredient.includes('salsa'):
        return <Iconify icon="openmoji:jar" style={styles.icon} size={size} color="red" />;
      case lowerCaseIngredient.includes('guacamole'):
        return <Iconify icon="openmoji:jar" style={styles.icon} size={size} color="green" />;
      case lowerCaseIngredient.includes('sourcream'):
        return <Iconify icon="openmoji:jar" style={styles.icon} size={size} color="white" />;
      case lowerCaseIngredient.includes('banana'):
        return <Iconify icon="noto:banana" style={styles.icon} size={size} color="white" />;
      // case 'tortilla':
      //   return <Iconify icon="noto:burrito" style={styles.icon} size={size} color="white" />;
      case lowerCaseIngredient.includes('bread'): 
        return <Iconify icon="emojione:bread" style={styles.icon} size={size} color="white" />;
      case lowerCaseIngredient.includes('black olives'):
        return <Iconify icon="fluent-emoji-high-contrast:olive" style={styles.icon} size={size} color="black" />;
      case lowerCaseIngredient.includes('tomato soup'):
        return <Iconify icon="openmoji:jar" style={styles.icon} size={size} color="red" />;
      default:
        // En caso de que el nombre del ingrediente no coincida con ninguno conocido
        return <Iconify icon="mdi:help-circle-outline" style={styles.icon} size={size} color="black" />;
    } 
  } catch (e) {
    console.error(e)
  }
};

const styles = StyleSheet.create({
  ingredientContainer: {
    width: '98%',
    height: 36,
    backgroundColor: Colors.lightGray,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  
  ingredientIcon: {
    width: '13%',
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
    right: 15,
    top: '20%'
  },

  icon:{
    alignSelf: 'center', 
    marginVertical: 2 
  },

  counter: {
    flexDirection: 'row',
    alignContent: 'space-around',
    alignSelf: 'center',
  },
});

export default IngredientItem;

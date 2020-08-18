import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import { MEALS } from '../Data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../Components/HeaderButton';
const MealDetailsScreen = props => {
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />

      <View style={styles.details}>
        <Text>{selectedMeal.duration}m</Text>
        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
      </View>

      <Text style={styles.title}>Ingredients</Text>
      <View style={styles.list}>
        {selectedMeal.ingredients.map((ing, index) => (
          <Text key={ing}>
            {index + 1}) {ing}
          </Text>
        ))}
      </View>
      <Text style={styles.title}>steps</Text>
      <View style={styles.list}>
        {selectedMeal.steps.map((step, index) => (
          <Text key={step}>
            {index + 1}) {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = navigationdata => {
  const mealId = navigationdata.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Fav'
          iconName='ios-star'
          onPress={() => {
            console.log('marked as Fav');
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  list: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default MealDetailsScreen;

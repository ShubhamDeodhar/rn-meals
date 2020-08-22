import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavourite } from '../store/actions/meals';
import CustomHeaderButton from '../Components/HeaderButton';

const MealDetailsScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals);
  const favMeals = useSelector(state => state.meals.favouriteMeals);

  const mealId = props.navigation.getParam('mealId');
  const isFav = favMeals.findIndex(meal => meal.id === mealId);
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();
  const toggleFav = useCallback(() => {
    dispatch(toggleFavourite(selectedMeal.id));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFav });
  }, [toggleFav, isFav]);

  useEffect(() => {
    props.navigation.setParams({ FavIcon: isFav });
  }, [isFav]);

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
  const mealTitle = navigationdata.navigation.getParam('mealTitle');
  const toggleFav = navigationdata.navigation.getParam('toggleFav');
  const isFav = navigationdata.navigation.getParam('FavIcon');
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Fav'
          iconName={isFav >= 0 ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFav}
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

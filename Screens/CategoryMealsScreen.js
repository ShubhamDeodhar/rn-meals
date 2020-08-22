import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import MealList from '../Components/MealList';
import { CATEGORIES } from '../Data/dummy-data';
import Colors from '../Constants/Colors';
const CategoryMealsScreen = props => {
  const catId = props.navigation.getParam('categoryId');
  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          color: Colors.primary,
        }}
      >
        <Text
          style={{ fontFamily: 'open-sans-bold', fontSize: 16 }}
          numberOfLines={1}
        >
          No meals found, maybe check your filters?!
        </Text>
      </View>
    );
  }
  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;

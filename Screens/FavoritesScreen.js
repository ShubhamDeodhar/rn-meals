import React from 'react';
import MealList from '../Components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import HeaderButton from '../Components/HeaderButton';
import { View, Text } from 'react-native';
import Colors from '../Constants/Colors';
const FavoritesScreen = props => {
  const FavMeals = useSelector(state => state.meals.favouriteMeals);

  if (FavMeals.length === 0 || !FavMeals) {
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
          No favourite meals found. Start adding some
        </Text>
      </View>
    );
  }

  return <MealList listData={FavMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default FavoritesScreen;

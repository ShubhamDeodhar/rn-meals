import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import Colors from '../Constants/Colors';
import HeaderButton from '../Components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';
const RenderFilters = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primary }}
        thumbColor={Platform.OS === 'android' ? '#ccc' : ''}
        value={props.value}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = props => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVeg, setIsVeg] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      vegan: isVegan,
      vegeterian: isVeg,
      lactoseFree: isLactoseFree,
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVeg, isVegan, dispatch]);
  useEffect(() => {
    props.navigation.setParams({ save: saveFilters });
  }, [saveFilters]);
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters/Restrictions</Text>

      <RenderFilters
        label='Gluten Free'
        value={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)}
      />
      <RenderFilters
        label='Vegan'
        value={isVegan}
        onChange={newValue => setIsVegan(newValue)}
      />
      <RenderFilters
        label='Lactose Free '
        value={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)}
      />
      <RenderFilters
        label='Vegetarian'
        value={isVeg}
        onChange={newValue => setIsVeg(newValue)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    margin: 20,
    fontSize: 22,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
});

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filters',
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName='ios-save'
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    ),
  };
};
export default FiltersScreen;

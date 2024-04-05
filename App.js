import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TodoDetailsScreen from './screens/TodoDetailsScreen';
import TodoListScreen from './screens/TodoListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TodoList">
        <Stack.Screen name="TodoList" component={TodoListScreen} />
        <Stack.Screen name="TodoDetails" component={TodoDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

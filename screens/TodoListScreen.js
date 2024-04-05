import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

export default function TodoListScreen({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todos');
      const storedTodos = jsonValue != null ? JSON.parse(jsonValue) : [];
      setTodos(storedTodos);
    } catch (e) {
      console.error('Failed to load todos from storage:', e);
    }
  };

  const handleDeleteTodo = async (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
    } catch (e) {
      console.error('Failed to delete todo:', e);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Details"
                onPress={() => navigation.navigate('TodoDetails', { id: item.id })}
                color="#5CAB7D"
              />
              <Button
                title="Delete"
                onPress={() => handleDeleteTodo(item.id)}
                color="#E45B69"
              />
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#5CAB7D', '#E45B69']}
          />
        }
      />
      <Button
        title="Add Todo"
        onPress={() => navigation.navigate('TodoDetails', { id: null })}
        color="#397EC9"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  todoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

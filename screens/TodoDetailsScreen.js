import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TodoDetailsScreen({ route, navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const todoId = route.params?.id;
  const isEditMode = todoId !== null && todoId !== undefined;

  useEffect(() => {
    if (isEditMode) {
      loadTodoDetails();
    }
  }, []);

  const loadTodoDetails = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todos');
      const storedTodos = jsonValue != null ? JSON.parse(jsonValue) : [];
      const todo = storedTodos.find(item => item.id === todoId);
      if (todo) {
        setTitle(todo.title);
        setDate(new Date(todo.date));
        setTime(todo.time || '');
      }
    } catch (e) {
      console.error('Failed to load todo details from storage:', e);
    }
  };

  const handleSaveTodo = async () => {
    const todoToAdd = { id: new Date().getTime(), title, date, time };
    try {
      let updatedTodos = [];
      const jsonValue = await AsyncStorage.getItem('todos');
      if (jsonValue !== null) {
        const storedTodos = JSON.parse(jsonValue);
        if (isEditMode) {
          updatedTodos = storedTodos.map(todo =>
            todo.id === todoId ? { ...todo, title, date, time } : todo
          );
        } else {
          updatedTodos = [...storedTodos, todoToAdd];
        }
      } else {
        updatedTodos = [todoToAdd];
      }
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      navigation.goBack();
    } catch (e) {
      console.error('Failed to save todo:', e);
    }
  };

  const handleSetTiming = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        is24Hour: true,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        const formattedTime = `${hour}:${minute}`;
        setTime(formattedTime);
      }
    } catch (e) {
      console.error('Failed to open TimePicker:', e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        placeholder="Enter todo title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isEditMode ? '#FFD700' : '#4CAF50' }]}
        onPress={handleSetTiming}
      >
        <Text style={styles.buttonText}>Set Timing</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isEditMode ? '#FFD700' : '#4CAF50' }]}
        onPress={handleSaveTodo}
      >
        <Text style={styles.buttonText}>{isEditMode ? 'Update Todo' : 'Add Todo'}</Text>
      </TouchableOpacity>
      <Text>Date: <Text>{date.toDateString()}</Text></Text>
      <Text>Time: <Text>{time}</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

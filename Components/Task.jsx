/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Task = ({ task }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const toggleTaskStatus = () => {
    setIsCompleted(!isCompleted);
  };


  return (
    <View style={styles.taskItem}>
      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={toggleTaskStatus}>
          {isCompleted ? (
            <View style={styles.checkboxChecked} />
          ) : (
            <View style={styles.checkboxUnchecked} />
          )}
        </TouchableOpacity>

        <Text style={[styles.taskTitle, isCompleted ? styles.completedTask : null]}>
          {task.title}
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: 10,
    marginBottom: 16,
  },
  checkboxChecked: {
    width: 24,
    height: 24,
    backgroundColor: 'green',
    marginRight: 8,
  },
  checkboxUnchecked: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  taskTitle: {
    fontSize: 18,
  },
});

export default Task;

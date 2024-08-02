/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,Image,Modal,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { backarrow } from '../Icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Notifications from 'react-native-push-notification';

const ToDoListScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalVisible, setTaskModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [reminderDate, setReminderDate] = useState(null);
  const navigation = useNavigation();


  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        navigation.navigate('Home Screen');
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    };

    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <TouchableOpacity onPress={saveTasks} style={{ marginLeft: 15 }}>
          <Image source={backarrow} style={{ width: 35, height: 35 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, tasks]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const existingTasks = await AsyncStorage.getItem('tasks');
        if (existingTasks) {
          setTasks(JSON.parse(existingTasks));
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    loadTasks();
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      const updatedTasks = tasks.filter((task) => task !== selectedTask);
      setTasks(updatedTasks);
      setTaskModalVisible(false);
    }
  };

  const handleSetReminder = () => {
    if (selectedTask) {
      setDatePickerVisible(true);
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDatePicker = (date) => {
    if (selectedTask) {
      const updatedTasks = [...tasks];
      const taskIndex = updatedTasks.findIndex((task) => task === selectedTask);
      updatedTasks[taskIndex].reminder = date;
      setTasks(updatedTasks);
      setReminderDate(date);
      setDatePickerVisible(false);

      Notifications.postLocalNotification({
        title: 'Task Reminder',
        body: `You will be reminded to "${selectedTask.title}" at ${date.toLocaleTimeString()}.`,
        extra: date,
      });
    }
  };

  const handleTaskPress = (task) => {
    setSelectedTask(task);
    setTaskModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.taskList}>
        {tasks.map((task, index) => (
            <TouchableOpacity
            key={index}
            onPress={() => handleTaskPress(task)}
          >
           <View style={styles.taskItem}>
           <View style={styles.taskContainer}>
              <TouchableOpacity
                onPress={() => toggleTaskStatus(index)}
                style={styles.checkbox}
              >
                <Text style={styles.checkboxText}>
                  {task.completed ? '☑️' : '□'}
                </Text>
              </TouchableOpacity>
              <TextInput
                style={[
                  styles.taskInput,
                  task.completed ? styles.completedTask : null,
                ]}
                value={task.title}
                onChangeText={(text) => {
                  const updatedTasks = [...tasks];
                  updatedTasks[index].title = text;
                  setTasks(updatedTasks);
                }}
                 editable={false}
              />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.addTaskContainer}>
        <Text style={styles.circle}>□</Text>
        <TextInput
          style={styles.addTaskInput}
          placeholder="Add a new task..."
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          onSubmitEditing={addTask}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isTaskModalVisible}
        onRequestClose={() => setTaskModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress = {() => handleDeleteTask(selectedTask)}>
              <Text style={styles.modalText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => handleSetReminder(selectedTask)}>
              <Text style={styles.modalText}>Set Reminder</Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirmDatePicker}
              onCancel={hideDatePicker}
            />
            <TouchableOpacity
              onPress={() => setTaskModalVisible(false)}
            >
              <Text style={styles.modalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  taskList: {
    flex: 1,
  },
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
    paddingHorizontal: 7,
    padding: 2,
    marginBottom: 12,
  },
  checkbox: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 26,
  },
  taskInput: {
    fontSize: 18,
    flex: 1,
    color: 'black',
  },
  completedTask: {
    //textDecorationLine: 'line-through',
    color: 'gray',
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  circle: {
    fontSize: 25,
    marginRight: 8,
  },
  addTaskInput: {
    height: 40,
    flex: 1,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    padding: 10,
    fontSize: 18,
  },
});
export default ToDoListScreen;

/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backarrow, menu } from '../Icons';

const UpdateNoteScreen = ({route, navigation}) => {
  const { title: initialTitle, description: initialDescription } = route.params;
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    return currentDateTime.toLocaleString();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveChanges = async () => {
    try {
      const existingNotes = await AsyncStorage.getItem('notes');
      const parsedNotes = JSON.parse(existingNotes) || [];
      const updatedNotes = parsedNotes.map((note) =>
        note.title === initialTitle ? { ...note, title, description, date: getCurrentDateTime() } : note
      );
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));

      navigation.goBack();

    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Confirm',
              'Do you want to save the changes?',
              [
                {
                  text: 'Cancel',
                 // onPress: navigation.goBack(),
                },
                {
                  text: 'Save',
                  onPress: saveChanges,
                },
              ],
              { cancelable: true }
            );
          }}
          style={{ marginLeft: 10 }}
        >
          <Image
            source={backarrow}
            style={{ width: 35, height: 35}}
          />
        </TouchableOpacity>
      ),
    });

    navigation.setOptions({
    // eslint-disable-next-line react/no-unstable-nested-components
    headerRight: () => (
      <TouchableOpacity
        onPress={() => setMenuVisible(!isMenuVisible)}
        style={{ marginRight: 10 }}
      >
        <Image
          source={menu}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    ),
  });
}, [navigation, isMenuVisible, saveChanges]);


const DeleteNote = async () => {
  try {
    const existingNotes = await AsyncStorage.getItem('notes');
    const parsedNotes = JSON.parse(existingNotes) || [];
    const updatedNotes = parsedNotes.filter((note) => note.title !== initialTitle);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    navigation.goBack();
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleStyle}
        placeholder="Enter Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.descriptionStyle}
        placeholder="Enter Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline={true}
      />
      <Text style={styles.dateText}>{getCurrentDateTime()}</Text>

      {isMenuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              DeleteNote();
            }}
          >
            <Text style={styles.menuItemText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {

            }}
          >
            <Text style={styles.menuItemText}>Archeive</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  titleStyle: {
    fontSize: 20,
    padding: 40,
  },
  descriptionStyle: {
    fontSize: 20,
    alignItems: 'center',
    //marginLeft: 80,
  },
  dateText: {
    fontSize: 16,
    color: 'gray',
    padding: 30,
  },
  menuContainer: {
    position: 'absolute',
    top: 20,
    right: 25,
    backgroundColor: '#90ee90',
    borderRadius: 10,
    elevation: 15,
    padding: 15,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default UpdateNoteScreen;

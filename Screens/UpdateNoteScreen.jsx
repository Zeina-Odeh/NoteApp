/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backarrow } from '../Icons';

const UpdateNoteScreen = ({route, navigation}) => {
  const { title: initialTitle, description: initialDescription } = route.params;
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

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
            style={{ width: 35, height: 35 }}
          />
        </TouchableOpacity>
      ),
    });

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
  },
  dateText: {
    fontSize: 16,
    color: 'gray',
    padding: 30,
  },
});

export default UpdateNoteScreen;

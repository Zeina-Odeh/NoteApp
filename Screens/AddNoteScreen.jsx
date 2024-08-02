/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { tick, backarrow } from '../Icons';

const AddNoteScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const getCurrentDateTime = () => {
    const currentDateTime = new Date().toLocaleString();
    return currentDateTime;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveNote = async () => {
    try {
      const existingNotes = await AsyncStorage.getItem('notes');
      const parsedNotes = JSON.parse(existingNotes) || [];
      const newNote = { title, description, date: getCurrentDateTime() };
      parsedNotes.push(newNote);
      await AsyncStorage.setItem('notes', JSON.stringify(parsedNotes));

      navigation.goBack();

    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  useEffect(() => {
  navigation.setOptions({
    // eslint-disable-next-line react/no-unstable-nested-components
    headerRight: () => (
      <TouchableOpacity
        onPress={saveNote}
        style={{marginRight: 20}}
      >
        <Image
          source={tick}
          style={{width: 35, height: 35}}
        />
      </TouchableOpacity>
    ),
  });

  navigation.setOptions({
    // eslint-disable-next-line react/no-unstable-nested-components
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Home Screen')}
        style={{ marginLeft: 20 }}
      >
        <Image
          source={backarrow}
          style={{ width: 35, height: 35 }}
        />
      </TouchableOpacity>
    ),
  });
  },[navigation, saveNote]);

  return (
    <View style= {styles.containor}>
      <TextInput
        style= {styles.titleStyle}
        placeholder="Enter Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style= {styles.descriptionStyle}
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
        containor: {
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
    },

    dateText: {
      fontSize: 16,
      marginTop: 30,
      color: 'gray',
    },
});

export default AddNoteScreen;

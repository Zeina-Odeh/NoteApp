/* eslint-disable prettier/prettier */
import React, {useState,useEffect} from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sort, categorie } from '../Icons';

const HomeScreen = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const isFocused = useIsFocused();

  const menu = () => {
    setMenuVisible(!isMenuVisible);
  };

    const fetchNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
          const parsedNotes = JSON.parse(storedNotes);
          setNotes(parsedNotes);
          console.log('Notes fetched:', parsedNotes);

        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
  };

    useEffect(() => {
      if (isFocused) {
        fetchNotes();
      }
    }, [isFocused]);

  navigation.setOptions({
    // eslint-disable-next-line react/no-unstable-nested-components
    headerLeft: () => (
      <TouchableOpacity
        style={{marginLeft: 10}}
      >
        <Image
          source={categorie}
          style={{width: 35, height: 35}}
        />
      </TouchableOpacity>
    ),
  });

  navigation.setOptions({
    // eslint-disable-next-line react/no-unstable-nested-components
    headerRight: () => (
      <TouchableOpacity
        style={{marginRight: 20}}
      >
        <Image
          source={sort}
          style={{width: 35, height: 35}}
        />
      </TouchableOpacity>
    ),
  });

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search Notes"
        />

      <View style={styles.flatListContainer}>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <TouchableOpacity
             onPress={() => navigation.navigate('Update Note',
             {
             title: item.title,
             description: item.description,
             date: item.date,
             })
            }
            style={styles.noteItem}
          >
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={menu}
      >
      <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

     {isMenuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              menu();
              navigation.navigate('Add Note');
            }}
          >
            <Text style={styles.menuItemText}>Note</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              menu();
            }}
          >
            <Text style={styles.menuItemText}>Reminder</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              menu();
            }}
          >
            <Text style={styles.menuItemText}>ToDo List</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
 };

const styles = {
  container: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  searchBox: {
    marginTop: 60,
    padding: 10,
    borderColor: '#2e8b57',
    borderWidth: 1.5,
    borderRadius: 15,
    fontSize: 18,
    backgroundColor: '#fffaf3',
  },
  flatListContainer: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteItem: {
    marginTop: 15,
    padding: 25,
    borderColor: '#228b22',
    borderWidth: 1.5,
    borderRadius: 10,
    position: 'relative',
    width: '45%',
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: '#fffaf3',
  },
  titleText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: 'black',
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 25,
    backgroundColor: '#90ee90',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 25,
    color: 'black',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 85,
    right: 25,
    backgroundColor: '#90ee90',
    borderRadius: 10,
    elevation: 15,
    padding: 15,
  },
  menuItem: {
    padding: 15,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
   },
};

export default HomeScreen;

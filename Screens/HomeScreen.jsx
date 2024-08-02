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
  const [sortedNotes, setSortedNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isSortVisible, setSortVisible] = useState(false);
  const isFocused = useIsFocused();

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleSortMenu = () => {
    setSortVisible(!isSortVisible);
  };


  // const sortNotes = (order) => {
  //   const sorted = sortedNotes.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  //   setSortOrder(order);
  //   console.log("testinggg", order);
  //   setSortedNotes(sorted);
  //   console.log("helloWorldd", sorted);
  // };

  const sortNotes = (order, notesToSort) => {
    const sortedCopy = [...notesToSort].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setSortOrder(order);
    setSortedNotes(sortedCopy);
  };

  useEffect(() => {

    const fetchNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
          const parsedNotes = JSON.parse(storedNotes);
          setNotes(parsedNotes);
          sortNotes(sortOrder, parsedNotes);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    if (isFocused) {
      fetchNotes();
    }
  }, [isFocused, sortOrder]);


useEffect(() => {
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
          onPress={toggleSortMenu}
          style={{ marginRight: 10 }}>
        <Image 
          source={sort}
          style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
    ),
  });
}, [isSortVisible, navigation, toggleSortMenu]);


const renderItem = ({ item }) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('Update Note', {
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
);

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search Notes"
        />

        <View style={styles.flatListContainer}>
        <FlatList
           data={isSortVisible ? sortedNotes : notes}
           renderItem={renderItem}
           numColumns={2}
        />
         </View>


      <TouchableOpacity
        style={styles.addButton}
        onPress={toggleMenu}
      >
      <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

     {isMenuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('Add Note');
            }}
          >
            <Text style={styles.menuItemText}>Note</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
            }}
          >
            <Text style={styles.menuItemText}>Reminder</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('ToDo List');
            }}
          >
            <Text style={styles.menuItemText}>ToDo List</Text>
          </TouchableOpacity>
        </View>
      )}

      {isSortVisible && (
        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={styles.sortItem}
            onPress={() => {
              sortNotes('asc', notes);
              toggleSortMenu();
            }}
          >
            <Text style={styles.sortItemText}>Ascending</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortItem}
            onPress={() => {
              sortNotes('desc', notes);
              toggleSortMenu();
            }}
          >
            <Text style={styles.sortItemText}>Descending</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
   },
   sortContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#90ee90',
    borderRadius: 10,
    elevation: 15,
    padding: 15,
   },
   sortItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sortItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
};

export default HomeScreen;

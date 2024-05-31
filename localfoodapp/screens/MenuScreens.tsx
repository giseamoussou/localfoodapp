import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { StackNavigationParams } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type MenuScreensProps = NativeStackScreenProps<StackNavigationParams, 'menu'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MenuScreens = (props: MenuScreensProps) => {
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const categories = ['Fast Food', 'Sauces', 'Dessert', 'Boissons'];
  const menuItems = [
    {
      id: '1',
      name: 'Cheese Burger',
      price: 199,
      discount: 19,
      category: 'Fast Food',
      isTrending: false,
      isChefPick: false,
      isTopSelling: true,
      image: require('../assets/images/pizza/pizza2.jpg'),
    },
    {
      id: '1',
      name: 'Cheese Burger',
      price: 199,
      discount: 19,
      category: 'Fast Food',
      isTrending: false,
      isChefPick: false,
      isTopSelling: true,
      image: require('../assets/images/African/Okra.jpeg'),
    },
    {
      id: '1',
      name: 'Sauce',
      price: 199,
      discount: 19,
      category: 'Sauces',
      isTrending: false,
      isChefPick: false,
      isTopSelling: true,
      image: require('../assets/images/African/Orak.jpeg'),
    },
    {
      id: '1',
      name: 'Sauce Crin-crin',
      price: 199,
      discount: 19,
      category: 'Sauces',
      isTrending: false,
      isChefPick: false,
      isTopSelling: true,
      image: require('../assets/images/African/Yumceetee.jpeg'),
    },
    {
      id: '2',
      name: 'Sauce Gombo',
      price: 299,
      discount: 14,
      category: 'Sauces',
      isTrending: false,
      isChefPick: true,
      isTopSelling: false,
      image: require('../assets/images/African/Okra.jpeg'),
    },
    {
      id: '3',
      name: 'Sauce Adidon',
      price: 399,
      discount: 14,
      category: 'Sauces',
      isTrending: true,
      isChefPick: false,
      isTopSelling: false,
      image: require('../assets/images/African/adidon.jpg'),
    },
    {
      id: '4',
      name: 'Bissap ',
      price: 399,
      discount: 14,
      category: 'Sauces',
      isTrending: true,
      isChefPick: false,
      isTopSelling: false,
      image: require('../assets/images/Boisssons/jus.jpg')
    },
  ];

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View style={{ height: windowHeight }}>
      <View style={{ backgroundColor: '#eee', height: 'auto', width: windowWidth, paddingVertical: 25 }}>
        <View style={{ borderColor: 'blue' }}>
          <Icon name="chevron-back" size={22} color="blue" />
        </View>
        <Text style={{ color: "black", textAlign: 'center', fontSize: 20 }}>Menu</Text>
      </View>

      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="search" size={22} color="blue" style={{ marginEnd: 15 }} />
          <TextInput style={styles.searchInput} placeholderTextColor="lightgray" placeholder="Search in menu" />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 15 }}>
          <MaterialComIcon color="gold" name="star-circle" size={35} style={{ marginBottom: 6 }} />
          <Text style={styles.categoryTitle}> Select Category </Text>
        </View>

        <ScrollView horizontal style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              activeOpacity={0.80}
              key={category}
              style={[
                styles.categoryButton,
                category === selectedCategory && styles.selectedCategoryButton,
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={styles.categoryButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList style={{ marginBottom:-72}}
          data={menuItems.filter((item) => item.category === selectedCategory)}
          renderItem={({ item }) => (
            <View style={styles.menuItemContainer}>
              <Image source={item.image} style={styles.menuItemImage} />
              <View style={styles.menuItemDetails}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>{item.price / 1} Fcfa</Text>
                {item.discount > 0 && (
                  <Text style={styles.menuItemDiscount}>{item.discount}% OFF</Text>
                )}
                <View style={styles.menuItemTagsContainer}>
                  {item.category && (
                    <Text style={styles.menuItemTag}>{item.category}</Text>
                  )}
                  {item.isTopSelling && (
                    <Text style={styles.menuItemTag}>TOP SELLING</Text>
                  )}
                  {item.isChefPick && (
                    <Text style={styles.menuItemTag}>CHEF PICK</Text>
                  )}
                  {item.isTrending && (
                    <Text style={styles.menuItemTag}>TRENDING</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>Add cart</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    color: 'black',
    flex: 1,
    height: 40,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    marginTop: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  categoryContainer: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0.5,
    marginBottom: -10,
    display: 'flex',
    maxHeight: 60,
    paddingHorizontal: 10,
    paddingVertical: 10

  },
  categoryButton: {
    backgroundColor: '#a855f7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: 'gray',
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  menuItemDetails: {
    flex: 1,
  },
  menuItemName: {
    color: "black",
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  menuItemDiscount: {
    fontSize: 12,
    color: '#2ecc71',
    marginBottom: 4,
  },
  menuItemTagsContainer: {
    flexDirection: 'row',
  },
  menuItemTag: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  addToCartButton: {
    backgroundColor: '#ff9f1a',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MenuScreens;
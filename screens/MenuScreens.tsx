import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { StackNavigationParams } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';



type MenuScreensProps = NativeStackScreenProps<StackNavigationParams, 'menu'>

const windowWidth = Dimensions.get('window').width

const MenuScreens = (props: MenuScreensProps) => {
  
    const categories = ['Fast Food', 'BreakFast', 'Dessert'];
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
        image: '',
      },
      {
        id: '2',
        name: 'Pepper Pizza',
        price: 299,
        discount: 14,
        category: 'Fast Food',
        isTrending: false,
        isChefPick: true,
        isTopSelling: false,
        image: '',
      },
      {
        id: '3',
        name: 'Pepper and Cheese Pizza',
        price: 399,
        discount: 14,
        category: 'Fast Food',
        isTrending: true,
        isChefPick: false,
        isTopSelling: false,
        image: 'sourec',
      },
    ];

  
  

  return (
    
    <ScrollView>
      <View style={{ backgroundColor: '#eee', height: 'auto', width: windowWidth, paddingVertical: 25 }} >
        <View style={{borderColor:"blue"}}>
            <Icon name="chevron-back" size={22}  color={"blue"}/ >
        </View>
        <Text style={{ color:"black", fontSize: 40, flex:1, textAlign:'center'}}>Menu</Text>
      </View>
      <View style={styles.container}>
        <Icon name="search" size={22}  color={"blue"}/ >
        <TextInput style={styles.searchInput} placeholder="Search in menu" />
        <Text style={styles.categoryTitle}>Select Category</Text>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity key={category} style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={menuItems}
          renderItem={({ item }) => (
            <View style={styles.menuItemContainer}>
              <Image source={{ uri: item.image }} style={styles.menuItemImage} />
              <View style={styles.menuItemDetails}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>${item.price / 100}</Text>
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
                <Text style={styles.addToCartButtonText}>Add to cart</Text>
                </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
    
  )
}

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
    backgroundColor: "#ff5353",
    color:'black',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#a855f7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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

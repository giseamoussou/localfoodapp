import React, { useContext } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationParams } from '../App';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { localFoodAppContext } from '../contexts/Context';


type HomeScreenProps = NativeStackScreenProps<StackNavigationParams, 'home'>

const HomeScreen = (props: HomeScreenProps) => {


  const { appContext, setAppContext } = useContext(localFoodAppContext)


  function goToLogin() {
    props.navigation.navigate('login')
  }



  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {/* Location and Profile */}
          {
            appContext.isSignedIn == true ?
              (
                <View style={styles.header}>
                  <View style={styles.location}>
                    <Image source={require('../assets/images/loca.png')} style={styles.icon} />
                    <Text style={styles.locationText}>Porto-Novo</Text>
                  </View>
                  <TouchableOpacity>
                    <Image source={require('../assets/images/prof.png')} style={styles.profile} />
                  </TouchableOpacity>
                </View>
              )
              :
              (
                <>
                </>
              )

          }

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Icon name="search" size={22} color="blue" style={{ marginEnd: 15 }} />
            <TextInput style={styles.searchInput} placeholderTextColor="lightgray" placeholder="Type a dish or cuisine" />
          </View>

          {/* Discount Banner */}
          <View style={styles.discountBanner}>
            <Text style={styles.discountText}>Jusqu'à 20% de réduction</Text>
            <Text style={styles.discountSubtext}>SUR VOTRE PREMIÈRE COMMANDE</Text>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>Commander maintenant</Text>
            </TouchableOpacity>
          </View>

          {/* Popular Categories */}
          <View style={styles.categories}>
            <MaterialComIcon color="gold" name="star-circle" size={25} style={{ marginTop: 1 }} />
            <Text style={styles.categoryTitle}>Catégories Populaires </Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryRow}>
            <TouchableOpacity style={styles.categoryItem}>
              <Image source={require('../assets/images/African/Okra.jpeg')} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Gombo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Image source={require('../assets/images/African/akpa.jpeg')} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Monyo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Image source={require('../assets/images/African/gnonmli.jpg')} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Haricot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Image source={require('../assets/images/African/porc.jpeg')} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Viande de Porc</Text>
            </TouchableOpacity>
          </View>

          {/* Today's Special */}
          <View style={styles.categories}>
            <MaterialComIcon color="gold" name="star-circle" size={25} style={{ marginTop: 1 }} />
            <Text style={styles.categoryTitle}>Spécialité d'aujourd'hui</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.specialRow}>
            <TouchableOpacity style={styles.specialItem}>
              <Image source={require('../assets/images/frittes/fries3.jpg')} style={styles.specialImage} />
              <View style={styles.heartIcon}>
                <Image source={require('../assets/images/fried_potatoes.png')} style={styles.icon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.specialItem}>
              <Image source={require('../assets/images/ice_cream.png')} style={styles.specialImage} />
            </TouchableOpacity>
          </View>

        </View>


      </ScrollView>
      {
        !appContext.isSignedIn ?
          (
            <View style={{ paddingVertical: 16, paddingHorizontal: 30, backgroundColor: "transparent" }}>
              <TouchableOpacity onPress={goToLogin} activeOpacity={0.85} style={styles.primary}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }} >Se connecter</Text>
              </TouchableOpacity>
            </View>
          ) :
          (
            <>
            </>
          )
      }
    </>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  locationText: {
    color: "black",
    marginLeft: 8,
    fontWeight: 'bold',
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
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

  primary: {
    backgroundColor: 'tomato',
    width: 'auto',
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "green"
  },


  searchText: {

    marginLeft: 8,
    flex: 1,
  },
  discountBanner: {
    padding: 16,
    backgroundColor: '#FF6699',
    margin: 16,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  discountSubtext: {
    color: 'green',
  },
  orderButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  orderButtonText: {
    color: "darkgray",
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: 'bold',
    left: -25
  },
  seeAllButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#FF6699',
  },
  seeAllButtonText: {
    color: '#FFFFFF',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryItem: {
    width: '48%',
    marginBottom: 8,
  },
  categoryImage: {
    width: '100%',
    height: 150,
    borderRadius: 15,
  },
  categoryText: {
    color: "black",
    textAlign: 'center',
    marginTop: 8,
  },
  specialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  specialItem: {
    width: '48%',
    marginBottom: 8,
  },
  specialImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 50,
  },
});

export default HomeScreen;
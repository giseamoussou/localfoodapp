import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationParams } from "../App";
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { supabase } from '../services/supabase-client';
import { Database } from '../services/supabase';


type ProductDetailsProps = NativeStackScreenProps<StackNavigationParams, 'productDetail'>

function ProductDetailsScreen(props: ProductDetailsProps) {

  const [quantity, setQuantity] = useState(1);
  const [frenchFries, setFrenchFries] = useState(false);
  const [burger, setBurger] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [currentPlat, setCurrentPlat] = useState<Database['public']['Tables']['plat']['Row'] | null>(null)

  useEffect(() => {

    fetchPlatDetails();

  }, [props.route.params.id,])


  async function fetchPlatDetails() {

    console.log("Plat id is " + props.route.params.id)

    try {

      const { data, error } = await supabase.from('plat').select('*').eq('id', props.route.params.id)

      if (data) {
        setCurrentPlat(data[0])
        console.log(JSON.stringify(data[0]));
      }

      if (error || !data) {
        props.navigation.goBack();
      }

    } catch (error) {

      Alert.alert("Erreur", "Une erreur s'est produite, Vérifiez votre connexion")
    }
  }

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calculateTotal = () => {
    let total = 299 * quantity;
    if (frenchFries) {
      total += 99;
    }
    if (burger) {
      total += 199;
    }
    return total;
  };
  const handleReadMore = () => {
    setShowMore(!showMore);
  };


  return (
    <View style={{ display: 'flex', flex: 1 }}>

      <View style={{ backgroundColor: 'white', elevation: 2, height: 45, paddingHorizontal: 15, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, marginBottom: 10 }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignContent: 'center' }}>
          <Icon name="chevron-back-circle-outline" size={25} color="black" />
          <Text style={{ fontSize: 16, marginStart: 10 }}>Retour</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>

          <View style={styles.platImageContainer}>
            <Image source={require('../assets/images/African/banane.jpeg')} style={styles.platImage} />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.bestsellerText}>BESTSELLER</Text>
            <Text style={styles.pizzaName}>Bannane</Text>
            <Text style={styles.pizzaDescription}>
              Un met absolument exellent pour un repas de l'après-midi... {' '}
              {showMore ? (
                <Text>
                  read less{' '}
                  <Text
                    style={{ color: 'blue', textDecorationLine: 'underline' }}
                    onPress={() => handleReadMore()}
                  >
                    read more
                  </Text>
                </Text>
              ) : (
                <Text>
                  read more{' '}
                  <Text
                    style={{ color: 'blue', textDecorationLine: 'underline' }}
                    onPress={() => handleReadMore()}
                  >
                    read less
                  </Text>
                </Text>
              )}




            </Text>
            <View style={{ borderColor: 'lightgray', width: '100%', borderWidth: 0.5, backgroundColor: 'red', marginBottom: 10 }}></View>
            <View style={styles.ratingContainer}>
              <MaterialComIcon color="#ff5353" name="star-outline" size={35} style={{ marginBottom: 6 }} />
              <Text style={styles.rating}>5.0(34)</Text>
              <Text style={styles.ratingLabel}>Plat principal</Text>
              <View style={styles.chefPickContainer}>
                <Text style={styles.chefPickText}></Text>
              </View>
            </View>
            <View style={{ borderColor: 'lightgray', width: '100%', borderWidth: 0.5, backgroundColor: 'red', marginBottom: 10 }}></View>
            <View style={styles.addOnsContainer}>
              <Text style={styles.addOnsTitle}>Ajouter</Text>
              <View style={styles.addOnItemContainer}>
                <Text style={styles.addOnItemText}>Jus de bissap</Text>
                <TouchableOpacity
                  style={styles.addOnCheckboxContainer}
                  onPress={() => setFrenchFries(!frenchFries)}
                >
                  <View
                    style={[
                      styles.addOnCheckbox,
                      frenchFries && styles.addOnCheckboxChecked,
                    ]}
                  />
                </TouchableOpacity>
                <Text style={styles.addOnItemPrice}>500Fcfa</Text>
              </View>
              <View style={styles.addOnItemContainer}>
                <Text style={styles.addOnItemText}>Riz au gras   </Text>
                <TouchableOpacity
                  style={styles.addOnCheckboxContainer}
                  onPress={() => setBurger(!burger)}
                >
                  <View
                    style={[
                      styles.addOnCheckbox,
                      burger && styles.addOnCheckboxChecked,
                    ]}
                  />
                </TouchableOpacity>
                <Text style={styles.addOnItemPrice}>500 Fcfa</Text>
              </View>
            </View>
            <View style={{ borderColor: 'lightgray', width: '100%', borderWidth: 0.5, backgroundColor: 'red', marginBottom: 30 }}></View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecreaseQuantity}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncreaseQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>
                  <Icon name="bag-handle-outline" style={styles.bagIcon} />
                  Add Card
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  platImageContainer: {
    alignItems: 'center',
    backgroundColor: "#fee",
    paddingVertical: 0,
    paddingHorizontal: 2,
    borderRadius: 10,
    elevation: 3
  },
  platImage: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: 200,
    borderRadius: 10
  },
  detailsContainer: {
    padding: 16,
  },
  bestsellerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    padding: 4,
    borderRadius: 4,
  },
  pizzaName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff5353',
    marginTop: 8,
  },
  pizzaDescription: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingLabel: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
  },
  chefPickContainer: {
    top: -3,
    right: -90,
    marginTop: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#fef',
    height: 32,
  },
  chefPickText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'green',
  },
  addOnsContainer: {
    marginTop: 16,
    marginBottom: 30
  },
  addOnsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  addOnItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  addOnItemText: {
    fontSize: 14,
    color: '#000',
  },
  addOnCheckboxContainer: {
    padding: 8,
    marginLeft: 8,
    marginRight: 8,
    right: -160,
    marginStart: 30,

  },
  addOnCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,

  },
  addOnCheckboxChecked: {
    backgroundColor: '#000',
  },
  addOnItemPrice: {
    position: 'relative',
    fontSize: 14,
    color: '#000',
    right: -160,

  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  quantityButton: {
    width: 36,
    height: 36,
    backgroundColor: '#ff6347',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
    marginRight: 8,
  },
  addToCartButton: {
    backgroundColor: '#ff6347',
    padding: 6,
    top: -6,
    borderRadius: 8,
    marginTop: 2,
    right: -100,

  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  bagIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

export default ProductDetailsScreen;

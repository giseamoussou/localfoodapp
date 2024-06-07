import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image source={require('../assets/images/pizza.png')} style={styles.cartIcon} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>Red Dress</Text>
          <Text style={styles.itemCategory}>Women</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={[styles.quantityButton, styles.quantityButtonMinus]}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>1</Text>
          <TouchableOpacity style={[styles.quantityButton, styles.quantityButtonPlus]}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.itemPrice}>$15</Text>
        <TouchableOpacity style={styles.deleteButton}>
          <Image source={require('../assets/images/supp.png')} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.totalsContainer}>
        <Text style={styles.totalText}>Totals</Text>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Sub Total</Text>
          <Text style={styles.totalValue}>$30.00</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Shipping</Text>
          <Text style={styles.totalValue}>$0</Text>
        </View>
      </View>

      <View style={styles.voucherContainer}>
        <View style={styles.voucherInputContainer}>
          <Text style={styles.voucherInputLabel}>Enter Voucher Code</Text>
        </View>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>APPLY</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cartIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: '#ff5722', // Couleur orange de l'icône
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Couleur de texte foncé
  },
  itemCategory: {
    fontSize: 14,
    color: '#888', // Couleur de texte grise
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  quantityButtonMinus: {
    backgroundColor: '#f2f2f2', // Couleur grise pour le bouton "-"
  },
  quantityButtonPlus: {
    backgroundColor: '#ff5722', // Couleur orange pour le bouton "+"
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Couleur de texte blanche pour le bouton "+"
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
    color: '#333', // Couleur de texte foncé
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Couleur de texte foncé
  },
  deleteButton: {
    marginLeft: 8,
    padding: 4,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#ff5722', // Couleur orange de l'icône de suppression
  },
  totalsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Couleur de la ligne de séparation
  },
  totalsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333', // Couleur de texte foncé
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 16,
    color: '#888', // Couleur de texte grise
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Couleur de texte foncé
  },
  voucherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  voucherInputContainer: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc', // Couleur de la bordure grise
    borderRadius: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  voucherInputLabel: {
    fontSize: 16,
    color: '#888', // Couleur de texte grise
  },
  applyButton: {
    backgroundColor: '#f2f2f2', // Couleur de fond grise
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333', // Couleur de texte foncé
  },
  checkoutButton: {
    backgroundColor: '#ff5722', // Couleur de fond orange
    paddingVertical: 16,
    borderRadius: 4,
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff', // Couleur de texte blanche
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CheckoutScreen;
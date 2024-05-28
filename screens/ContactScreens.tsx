import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationParams } from "../App";




type ContactScreensProps = NativeStackScreenProps<StackNavigationParams, 'contact'>

const ContactUsScreen = (props: ContactScreensProps) => {
  return (
    <View style={styles.container}>
        <View>
            <TouchableOpacity >
                <Icon name="angle-left" size={20} color="#800080" />
            </TouchableOpacity>
            <Text style={styles.title}>Contact Us</Text>
        </View>
      
      <Image
        source={require('../assets/images/contacts.png')} // Replace with your image path
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Icon name="map-marker" size={20} color="#FF8C00" />
          <Text style={styles.infoText}>Connaught Place, Delhi, 110001</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="clock-o" size={20} color="#FF8C00" />
          <Text style={styles.infoText}>08-00 to 22-00,  days of week</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="phone" size={20} color="#FF8C00" />
          <Text style={styles.infoText}>1800-420-8400</Text>
        </View>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialIcon}>
          <Icon name="twitter" size={20} color="#1DA1F2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Icon name="facebook" size={20} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Icon name="instagram" size={20} color="#C13584" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor:"#eee",
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    color: "black",
    textAlign:'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10
    
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 90,
    marginTop: 120,
    alignItems: 'center',

  },
  infoContainer: {
    alignItems: 'flex-start',
    marginBottom: 90,
    marginTop: 20
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    color: "black",
    marginLeft: 10,
    fontSize: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialIcon: {
    padding: 10,
  },
});

export default ContactUsScreen;
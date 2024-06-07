import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TransactionHistory = () => {
  const transactions = [
    {
      date: '14/11/2023',
      items: [
        { from: 'User3 example', to: 'EXAMPLE USER', amount: 19, balance: 1059, time: '12:18:04' },
        { from: 'User3 example', to: 'EXAMPLE USER', amount: 15, balance: 1040, time: '12:15:57' },
        { from: 'User3 example', to: 'EXAMPLE USER', amount: 25, balance: 1025, time: '12:13:07' },
      ],
    },
    {
      date: '10/11/2023',
      items: [
        { from: 'User3 example', to: 'User3 example', amount: 10, balance: 1060, time: '12:31:33' },
        { from: 'User3 example', to: 'User3 example', amount: 50, balance: 1050, time: '12:31:33' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.balance}>Solde: 1801 Fcfa</Text>
        <Text style={styles.transferButton}>TRANSFÉRER</Text> */}
        <Text style={styles.transferButton}>Liste de vos commandes</Text>
      </View>
      <ScrollView>
        {transactions.map((group, index) => (
          <View key={index}>
            <Text style={styles.dateHeader}>{group.date}</Text>
            {group.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.transaction}>
                <Text>De: {item.from}</Text>
                <Text>A: {item.to}</Text>
                <Text>Date: {group.date}</Text>
                <Text>Heure: {item.time}</Text>
                <Text style={styles.amount}>{item.amount} F</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  balance: {
    fontWeight: 'bold',
    color: "black"
  },
  transferButton: {
    color: 'tomato',
    fontWeight:'bold',
    left: 70,
    fontSize: 20
  
  },
  dateHeader: {
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f0f0f0',
    color:"black"
  },
  transaction: {
    color:"black",
    backgroundColor: "white",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    
  },
  amount: {
    fontWeight: 'bold',
    flexDirection:'row'
    
    },
});

export default TransactionHistory;
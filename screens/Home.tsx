import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Plat } from '../models/LocalFoodAppModels'
import { FlatList } from 'react-native'

function Home() {

  const [listePlats, setListePlats] = useState<Array<Plat> | null>(null)

  return (

    <View>
      <Text>Home</Text>

      <FlatList data={listePlats} renderItem={({ item, index }) => <Text>{item.nom}</Text> }/>

    </View>
  )
}
export default Home

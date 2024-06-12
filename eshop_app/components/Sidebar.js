import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import '../css/homepage.js';

const Sidebar = () => {
  const navigation = useNavigation();

  return (
    <View className="sidebar">
      <View className="sidebar__inner">
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Computer')}>
            <Icon name="laptop" size={20} color="#000" />
            <Text>Computer & Laptop</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Keyboard')}>
            <Icon name="keyboard-o" size={20} color="#000" />
            <Text>Keyboards</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Mouse')}>
            <Icon name="mouse-pointer" size={20} color="#000" />
            <Text>Mouses</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Sidebar;

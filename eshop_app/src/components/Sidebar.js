import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLaptop, faKeyboard, faMouse } from '@fortawesome/free-solid-svg-icons'; // Import icons as needed

const Sidebar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.sidebar}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ComputerPage')}>
                    <FontAwesomeIcon icon={faLaptop} style={styles.icon} />
                    <Text style={styles.sidebarItem}>Computer & Laptop</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('KeyboardPage')}>
                    <FontAwesomeIcon icon={faKeyboard} style={styles.icon} />
                    <Text style={styles.sidebarItem}>Keyboards</Text>
                </TouchableOpacity>
            </View>

            {/* Mouses */}
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MousePage')}>
                    <FontAwesomeIcon icon={faMouse} style={styles.icon} />
                    <Text style={styles.sidebarItem}>Mouses</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        backgroundColor: '#629ad3',
        paddingVertical: 10,
        position: 'absolute',
        top: 50,
        left: 20,
        bottom: 180,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    icon: {
        color: '#fff',
        marginRight: 10,
    },
    sidebarItem: {
        fontSize: 16,
        color: '#fff',
    },
});

export default Sidebar;

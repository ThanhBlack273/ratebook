import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Menu, MenuOptions, MenuTrigger, MenuOption} from 'react-native-popup-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {IMenuOption} from './Comment';

interface CustomMenuProps {
    menuOptions: IMenuOption[];
}

const CustomMenu = ({menuOptions}: CustomMenuProps) => {
    return (
        <Menu>
            <MenuTrigger>
                <MaterialIcons name="more-vert" color="#1E90FF" size={20} />
            </MenuTrigger>
            <MenuOptions>
                <FlatList
                    data={menuOptions}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) => (
                        <MenuOption
                            onSelect={item.onPress}
                            customStyles={{
                                optionWrapper: styles.menuOption,
                                optionText: styles.optionText,
                            }}>
                            <Text>{item.icon}</Text>
                            <Text style={styles.text}>{item.name}</Text>
                        </MenuOption>
                    )}
                />
            </MenuOptions>
        </Menu>
    );
};

const styles = StyleSheet.create({
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 40,
    },
    optionText: {
        color: 'red',
    },
    text: {
        color: 'black',
        marginLeft: 10,
    },
});

export default CustomMenu;

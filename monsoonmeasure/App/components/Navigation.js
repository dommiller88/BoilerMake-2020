import React from 'react';
import { View, Image } from "react-native";
import {Text} from "react-native-elements";

export default class Navigation extends React.Component {
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                padding: 5,
                backgroundColor: global.theme.colors.primary,
            }}>
                <Image style={{width: 50, height: 50}} source={require('../../assets/icon.png')}/>
                <Text style={{alignSelf: 'center', color: 'white', fontWeight: '500', fontSize: 22}}>  Monsoon Measure</Text>
            </View>
        );
    }
};

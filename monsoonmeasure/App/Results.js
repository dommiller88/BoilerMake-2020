import React from "react";
import {View} from "react-native";
import {Text} from "react-native-elements";

export default class Results extends React.Component {
    constructor() {
        super()

        this.state = {
            waterCollected: null
        }
    }

    componentDidMount() {
        const surfaceArea = this.props.navigation.getParam('surfaceArea');

        this.state.waterCollected = surfaceArea * 0.623 * 39
        this.setState(this.state)
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%', alignSelf: 'center'}}>
                <Text style={{fontSize: 30, textAlign: 'center'}}>{"You could save " + Math.round(this.state.waterCollected) + " gallons!"}</Text>
            </View>
        )
    }
}

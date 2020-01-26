import React from 'react';
import {Dimensions, View} from 'react-native'
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {Button, Icon} from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

let {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
let LATITUDE = 0;
let LONGITUDE = 0;
let LATITUDE_DELTA = 1000;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerShown: false,
        };
    };

    componentDidMount() {
        this._getLocation();
    }

    _getLocation = async () => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);

        if (status != 'granted') {
            console.log("permissions not granted");
        }

        const userLocation = await Location.getCurrentPositionAsync();

        LATITUDE = userLocation.coords.latitude;
        LONGITUDE = userLocation.coords.longitude;

        LATITUDE_DELTA = 0.012;
        LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

        let region = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };

        this.map.animateToRegion(region, 1000);
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <MapView ref={map => {
                    this.map = map
                }} style={{flex: 1, alignSelf: 'stretch'}} showsUserLocation={true}
                         provider={PROVIDER_GOOGLE}
                         region={{
                             latitude: LATITUDE,
                             longitude: LONGITUDE,
                             latitudeDelta: LATITUDE_DELTA,
                             longitudeDelta: LONGITUDE_DELTA,
                         }}
                />
                <Icon
                    containerStyle={{position: "absolute", bottom: 20, right: 20}}
                    onPress={this._getLocation}
                    reverse
                    name='md-locate'
                    type='ionicon'
                    color='#1D7DB9'
                />
            </View>
        )
    }
}

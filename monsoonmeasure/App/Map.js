import React from 'react';
import {Dimensions, View} from 'react-native'
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

let {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
let LATITUDE = 0;
let LONGITUDE = 0;
let LATITUDE_DELTA = 1000;
let LONGITUDE_DELTA = LATITUDE_DELTA;

export default class Map extends React.Component {
    componentDidMount() {
        this._getLocation();
    }

    _getLocation = async () => {
        console.log("test");
        const {status} = await Permissions.askAsync(Permissions.LOCATION);

        if (status != 'granted') {
            console.log("permissions not granted");
        }

        const userLocation = await Location.getCurrentPositionAsync();

        LATITUDE = userLocation.coords.latitude;
        LONGITUDE = userLocation.coords.longitude;

        LATITUDE_DELTA = 0.03;
        LONGITUDE_DELTA = 0.03;

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
            <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <MapView ref={map => {this.map = map}} style={{flex: 1, alignSelf: 'stretch'}} showsUserLocation={true}
                         region={{
                             latitude: LATITUDE,
                             longitude: LONGITUDE,
                             latitudeDelta: LATITUDE_DELTA,
                             longitudeDelta: LONGITUDE_DELTA,
                         }}
                />
            </View>
        )
    }
}

import React from 'react';
import {Dimensions, View} from 'react-native'
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {Button, Icon, Overlay, Text} from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {mapStyle} from "../mapStyle";
import axios from 'axios'

let {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
let LATITUDE = 0;
let LONGITUDE = 0;
let LATITUDE_DELTA = 1000;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerShown: true,
        };
    };

    constructor() {
        super();

        this.state = {
            isVisible: false,
            markerLatitude: 0,
            markerLongitude: 0,
            location: "Loading..."
        }
    }


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
        this.state.markerLatitude = LATITUDE;
        this.state.markerLongitude = LONGITUDE;

        this.setState(this.state);
    };

    _getLocationName = async () => {
        this.getCoordinateData(this.state.markerLatitude, this.state.markerLongitude).then(data => {
            const locationName = data[0].display_name.split(',')[0]
            this.state.location = locationName;
            this.setState(this.state);
            return locationName;
        })
    }

    async getCoordinateData(latitude, longitude) {
        const URL = "http://nominatim.openstreetmap.org/search/" + latitude + "," + longitude + "?format=json&polygon_geojson=1";
        return axios.get(URL).then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MapView ref={map => {
                    this.map = map
                }}
                         customMapStyle={mapStyle} style={{flex: 1, alignSelf: 'stretch'}} showsUserLocation={true}
                         provider={PROVIDER_GOOGLE}
                         initialRegion={{
                             latitude: LATITUDE,
                             longitude: LONGITUDE,
                             latitudeDelta: LATITUDE_DELTA,
                             longitudeDelta: LONGITUDE_DELTA,
                         }}
                         onPress={(event) => {
                             this.state.markerLatitude = event.nativeEvent.coordinate.latitude;
                             this.state.markerLongitude = event.nativeEvent.coordinate.longitude;
                             this.setState(this.state);
                         }}
                >
                    <MapView.Marker ref={marker => {
                        this.marker = marker
                    }} pinColor="blue" coordinate={{
                        latitude: this.state.markerLatitude,
                        longitude: this.state.markerLongitude
                    }}/>
                </MapView>
                <Icon
                    containerStyle={{position: "absolute", bottom: 90, right: 20}}
                    onPress={() => {
                        this.state.isVisible = true;
                        this.setState(this.state);
                        this._getLocationName();
                    }}
                    reverse
                    name='check'
                    type='font-awesome'
                    color='#1D7DB9'
                />
                <Icon
                    containerStyle={{position: "absolute", bottom: 20, right: 20}}
                    onPress={this._getLocation}
                    reverse
                    name='md-locate'
                    type='ionicon'
                    color='#1D7DB9'
                />
                <Overlay isVisible={this.state.isVisible} height="auto">
                    <View style={{marginTop: 7}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>You've selected:</Text>
                        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{this.state.location}</Text>
                    </View>
                    <View style={{marginTop: 37, height: 110, justifyContent: 'space-evenly'}}>
                        <Button iconRight icon={<Icon name="check" type="font-awesome" color='white'/>}
                                buttonStyle={{backgroundColor: '#40a173'}} title="Yes, that's correct! "
                                />
                        <Button icon={<Icon name="arrow-left" type="font-awesome" color='white'/>}
                                buttonStyle={{backgroundColor: '#f44336'}} title=" No, take me back"
                                onPress={() => {
                                    this.state.isVisible = false;
                                    this.state.location = "Loading..."
                                    this.setState(this.state);
                                }}/>
                    </View>
                </Overlay>
            </View>
        )
    }
}

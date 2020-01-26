import React from 'react';
import {StatusBar, Platform, View} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {StackViewStyleInterpolator} from 'react-navigation-stack'
import Map from "./App/Map";
import Navigation from "./App/components/Navigation";
import Results from "./App/Results"

global.theme = {
    colors: {
        primary: '#1D7DB9',
    },
    Slider: {
        // maximumTrackTintColor: '#6C757D',
        minimumTrackTintColor: '#1D7DB9',
        thumbStyle: {
            backgroundColor: '#1D7DB9',
            width: 25,
            height: 25,
            borderRadius: 25 / 2,
        },
        thumbTouchSize: {
            width: 50,
            height: 50,
        },
        trackStyle: {
            height: 10,
            borderRadius: 10 / 2
        }
    },
    Card: {
        containerStyle: {
            borderRadius: 3
        }
    }
};

//Also see the android status bar in app.json
const ColoredStatusBar = ({backgroundColor, ...props}) => (
    <View style={[{height: 0}, {backgroundColor}]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class App extends React.Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1}} forceInset={{top: 'never', bottom: 'never'}}>
                <ThemeProvider theme={global.theme}>
                    <ColoredStatusBar backgroundColor={global.theme.colors.primary} barStyle='light-content'/>
                    <AppContainer/>
                </ThemeProvider>
            </SafeAreaView>
        );
    }
}

const AppNavigator = createStackNavigator(
    {
        Map: Map,
        Results: Results
    },
    {
        initialRouteName: 'Map',
        headerLayoutPreset: 'center',
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal
        }),
        defaultNavigationOptions: {
            title: "Monsoon Measure",
            headerTitle: <Navigation/>,
            headerBackTitle: "",
            // headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#1D7DB9',
                height: 140,
            },
            headerTitleStyle: {
                color: 'white',
                fontWeight: '500',
                flex: 1,
                textAlign: 'center',
            },
            headerText: {
                alignSelf: 'center',
            },
            headerTintColor: '#ffffff'
        },
    },
);

const AppContainer = createAppContainer(AppNavigator);

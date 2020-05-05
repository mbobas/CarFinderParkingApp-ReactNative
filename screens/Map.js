import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const { height, width} = Dimensions.get('screen');

const parkings = [
    {
        id: 1,
        title: 'Parking 1',
        price: 5,
        rating: 4.2,
        spots: 20,
        free: 10,
    },
    {
        id: 2,
        title: 'Parking 2',
        price: 10,
        rating: 4.9,
        spots: 50,
        free: 10,
    },
    {
        id: 3,
        title: 'Parking 3',
        price: 5,
        rating: 4.2,
        spots: 20,
        free: 10,
    },
    {
        id: 4,
        title: 'Parking 3',
        price: 5,
        rating: 4.2,
        spots: 20,
        free: 10,
    },
]

export default class Map extends Component { 
    renderHeader () {
        return (
            <View style={styles.header}>
                <Text>Header</Text>
            </View>
        )
    }

    renderParking(item) {
        return (
            <View key={`parking-${item.id}`} style={styles.parking}>
                <Text>{item.title}</Text>
            </View>
        )
    }
    rendeerParkings() {
        return (
            <ScrollView
                scrollEnabled={true}  
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                centerContent
                //contentInset={{top: 0, left: 24, bottom: 0, right: 12}}
                style={styles.parkings}
                
                >  
                {parkings.map(parking => this.renderParking(parking))}
            </ScrollView> 
        )
    }
    // style or contentContainerStyle in ScrollView

    render(){
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <MapView
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                
                style={styles.map}
                />
                {this.rendeerParkings()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff',
        
    },
    header: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 4,
        // width: 100,
        // height: 100, 
    },
    parkings: {
        // flex: 1,
        position: 'absolute',
        right: 0,    
        left: 0,
        bottom: 24,
        // backgroundColor: 'transparent',
    },
    parking: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 12,
        marginHorizontal: 12,
        width: width - (24 * 2),
    }
});
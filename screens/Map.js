import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Picker, FlatList, TouchableWithoutFeedback } from 'react-native';
import MapView from 'react-native-maps';
import {Ionicons } from '@expo/vector-icons';

const { Marker } = MapView;
const { height, width} = Dimensions.get('screen');
const parkings = [
    {
        id: 1,
        title: 'Parking 1',
        price: 5,
        rating: 4.2,
        spots: 20,
        free: 10,
        coordinate: {
            latitude: 53.014946,
            longitude: 18.562816,
        }

    },
    {
        id: 2,
        title: 'Parking 2',
        price: 10,
        rating: 4.9,
        spots: 50,
        free: 10,
        coordinate: {
            latitude: 53.018011,
            longitude: 18.572011,
        }

    },
    {
        id: 3,
        title: 'Parking 3',
        price: 5,
        rating: 4.2,
        spots: 20,
        free: 10,
        coordinate: {
            latitude: 53.012615,
            longitude: 18.562312,
        }

    },
    {
        id: 4,
        title: 'Parking 3',
        price: 5,
        rating: 4.2,
        spots: 20,
        free: 10,
        coordinate: {
            latitude: 53.013057,
            longitude: 18.566126,
        }

    },
]

export default class Map extends Component { 
    state = {
        hours: {},
        active: 1,
    }

    componentDidMount() {
        const hours ={};
        parkings.map(parking => {hours[parking.id] = 1 });
        this.setState({ hours })
    }

    renderHeader () {
        return (
            <View style={styles.header}>
                <Text>Header</Text>
            </View>
        )
    }

    renderParking(item) {
        const { hours } = this.state;

        return (
            <TouchableWithoutFeedback key={`parking-${item.id}`} onPress={() => this.setState({ active: item.id})}>
                <View style={styles.parking}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{fontSize: 18}}>x {item.spots} {item.title}</Text>
                        <View style={{width: 100, borderRadius: 6, borderColor: 'grey', borderWidth: 0.5, padding: 4}}>
                            <Text style={{fontSize: 18}}>05:00 hrs</Text>
                        </View>
                    </View>
                    <View style={{flex: 1.5, flexDirection: 'row'}}>

                        <View style={{flex: 0.75, justifyContent: 'center', marginHorizontal: 24}}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center'}}>                   
                                    <Ionicons name='ios-pricetag' size={15} color="#7D818A"  />
                                    <Text> ${item.price}</Text>
                                </View>                            
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center'}}>
                                    <Ionicons name='ios-star' size={15} color="#7D818A" />
                                    <Text> {item.rating}</Text>
                                </View>
                                </View>
                    
                        <TouchableOpacity style={styles.buy}>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text style={{fontSize: 25, color: 'white'}}>${item.price * 2}</Text>
                                    <Text style={{color: 'white'}}>${item.price * 2}x{hours[item.id]} hrs</Text>
                                </View>
                                <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 25, color: 'white'}}> ></Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
        )
    }

    rendeerParkings() {
        return (
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled={true}  
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                onScroll={props => console.log('onScroll', props)}
                style={styles.parkings}
                data={parkings}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => this.renderParking(item)} 
            />
            // <ScrollView
            //     horizontal
            //     pagingEnabled
            //     scrollEnabled={true}  
            //     showsHorizontalScrollIndicator={false}
            //     scrollEventThrottle={16}
            //     snapToAlignment="center"
            //     onScroll={props => console.log('onScroll', props)}
            //     style={styles.parkings}
                
            //     >  
            //     {parkings.map(parking => this.renderParking(parking))}
            // </ScrollView> 
        )
    }
    // style or contentContainerStyle in ScrollView

    render(){
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <MapView
                    initialRegion={{
                    latitude: 53.013057,
                    longitude: 18.566126,
                    latitudeDelta: 0.0192,
                    longitudeDelta: 0.0191,
                    }}
                
                style={styles.map}
                >
                    {parkings.map(parking => (
                        <Marker 
                            key={`marker-${parking.id}`}
                            coordinate={parking.coordinate}
                        >
                            <View style={[styles.marker, this.state.active === parking.id ? styles.active : null ]}>
                                <Text style={{ color: '#840815', fontWeight: 'bold'}}> $ {parking.price} </Text>
                                <Text> ({parking.free}/{parking.spots})</Text>
                            </View>
                        
                        </Marker>
                ))}
                </MapView>
                
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
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 12,
        marginHorizontal: 24,
        width: width - (24 * 2),
    },
    buy: {
        flex: 2,
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#d24960',
        borderRadius: 6,
    },
    marker: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    },
    active : {
        borderColor: '#840815',
        borderWidth: 1,
    }
});
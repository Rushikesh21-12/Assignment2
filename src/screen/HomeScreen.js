import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen({navigation}){
    return(
        <View style = {styles.container}>

            <Text style = {styles.header}>Home Screen</Text>

            <View style = {styles.buttonView}>
                <TouchableOpacity
                    title = 'List With ScrollView' 
                    onPress = {() => navigation.navigate('ListWithScrollView')}
                    style = {styles.button}
                >
                    <Text style = {styles.textStyle}>List With ScrollView</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    title = 'List With FlatList' 
                    onPress = {() => navigation.navigate('ListWithFlatList')}
                    style = {styles.button}
                >
                    <Text style = {styles.textStyle}>List With FlatList</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2b2a',
        alignItems: 'center'
    },

    header: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        alignItems: 'center',
        top: 70
    },

    buttonView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        marginVertical: 10,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        width: 250,
        alignItems: 'center'
    },

    textStyle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})
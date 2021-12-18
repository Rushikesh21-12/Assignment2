import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import data from '../../asstes/ListData/data';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const ICON_SIZE = 30
const ICON_COLOR = 'yellow'

const OneItem = ({object, navigation}) => {
    return(
        <TouchableOpacity onPress = {() => navigation.navigate('Form')}>
            <View style = {styles.itemList} key = {object.name}>
                <Text style = {styles.text}>{object.name}</Text>
                <Icon name = {object.icon} color = {ICON_COLOR} size = {ICON_SIZE}/>
            </View>
        </TouchableOpacity>
    )
}

export default function ListWithScrollView({navigation}){
    
    const items = data

    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Scroll View</Text>
            <ScrollView>
            {
                items.map((object) => {return <OneItem object = {object} navigation = {navigation}/>})
            }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#1f1e1e',
        flex: 1
    },

    title: {
        color: 'white', 
        marginVertical: 20, 
        fontSize: 16
    },

    itemList: {
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 2,
        borderColor: 'yellow',
        padding: 15,
        justifyContent: 'space-between'
    },

    text: {
        color: 'yellow',
        fontSize: 25,
    }
})
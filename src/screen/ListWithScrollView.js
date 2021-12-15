import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";

import data from "../../asstes/ListData/data";
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const ICON_SIZE = 30
const ICON_COLOR = 'yellow'

const DisplayIcon = (props) => {
    return <Icon name = {props.icon} color = {ICON_COLOR} size = {ICON_SIZE}/>
}

export default function ListWithScrollView({navigation}){
    
    const items = data

    return(
        <View style = {styles.container}>
            <Text style = {{color: 'white', marginVertical: 20, fontSize: 16}}>Scroll View</Text>
            <ScrollView>
            {
                items.map((object) => {
                return (
                    <TouchableOpacity onPress = {() => navigation.navigate('Form')}>
                        <View style = {styles.itemList} key = {object.name}>
                            <Text style = {styles.text}>{object.name}</Text>
                            <DisplayIcon icon = {object.icon}/>
                        </View>
                    </TouchableOpacity>
                )
                })
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

    itemList: {
        flex: 1,
        flexDirection: "row",
        borderTopWidth: 2,
        borderColor: 'yellow',
        padding: 15,
        justifyContent: "space-between"
    },

    text: {
        color: 'yellow',
        fontSize: 25,
    }
})
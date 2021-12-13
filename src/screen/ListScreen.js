import React from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";

import data from "../../asstes/ListData/data";

import Icon from 'react-native-vector-icons/SimpleLineIcons';

const ICON_SIZE = 30
const ICON_COLOR = 'yellow'

const ReturnIcon = (props) =>{
    return <Icon name={props.icon} color={ICON_COLOR} size={ICON_SIZE}/>
}
export default function ListScreen({navigation}){

    return(
        <View style = {styles.container}>
            <Icon name="social-facebook"/>
            <FlatList
                data = {data}
                renderItem = {({item}) => {
                    return(
                        <TouchableOpacity onPress = {() => navigation.navigate('Form')}>
                            <View style = {styles.itemlist}>
                                <Text style = {styles.text}>{item.name}</Text>
                                <ReturnIcon icon={item.icon}/>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />

            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black',
        flex: 1
    },

    itemlist: {
        flex: 1,
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: 'yellow',
        padding: 15,
        justifyContent: "space-between"
    },

    text: {
        color: 'yellow',
        fontSize: 25,
    }
})
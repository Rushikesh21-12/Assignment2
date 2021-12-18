import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const TEXT_SIZE = 16

export default function FormInput(props){

    return (
        <View style = {styles.container}>

            <Text style = {styles.labelStyle}>{props.label}</Text>

            <TextInput {...props} style = {styles.input} />
            
            {props.errorName ? <Text style = {styles.errorStyle}>{props.errorName}</Text> : null}

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },

    input: {
        flex: 1,
        fontSize: TEXT_SIZE,
        backgroundColor: '#b0b0b0',
        borderRadius: 5,
        paddingLeft : 10,
        borderColor: 'grey',
        borderWidth: 2
    },

    labelStyle: {
        fontWeight: 'bold', 
        fontSize: 16,
        color: 'black'
    },

    errorStyle: {
        color: 'red'
    }

});

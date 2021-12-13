import React, {useState} from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";

import { RadioButton, Checkbox } from 'react-native-paper';
import { blue100 } from "react-native-paper/lib/typescript/styles/colors";

const TEXT_SIZE = 16

export default function FormScreen(){

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [gender, setGender] = useState('');

    const [javaChecked, setJavaChecked] = useState(false);
    const [pythonChecked, setPythonChecked] = useState(false);
    const [jsChecked, setJsChecked] = useState(false);
    const [kotlinChecked, setKotlinChecked] = useState(false);

    const [selectedLanguages, setSelectedLanguages] = useState([])
    
    const [time, setTime] = useState('Click here to select time')

    const onCheckBoxClick = (language, checked) => {
        if(!checked){
            setSelectedLanguages(prevArray => [...prevArray, language])
        }else{
            setSelectedLanguages((prevArray) => {return prevArray.filter(currentLanguage => currentLanguage !== language)})
        }
      }

    return(
        <ScrollView style = {styles.container}>
            <View style = {styles.nameView}>
                <TextInput
                    style = {styles.textinput}
                    onChangeText = {value => setFirstName(value)}
                    placeholder = 'Enter First Name'
                />

                <TextInput
                    style = {styles.textinput}
                    onChangeText = {value => setLastName(value)}
                    placeholder = 'Enter Last Name'
                />
            </View>

            <View style = {styles.genderView}>

                <Text style = {styles.textStyle}>Select Gender : </Text>

                <RadioButton.Group 
                    value={gender}
                    onValueChange = {gender => setGender(gender)} 
                >
                    <View style = {{ flexDirection: "row", marginHorizontal: 16}}>
                        <RadioButton.Item label = "Male" value="Male" />
                        
                        <RadioButton.Item label = "Female" value="Female" />
                    </View>

                </RadioButton.Group>

            </View>

            <View style = {styles.checkBoxView}>
                <Text style = {styles.textStyle}>Select preffered language : </Text>

                <Checkbox.Item
                    label = 'JAVA'
                    status = {javaChecked ? 'checked' : 'unchecked'}
                    onPress = {() => {
                        setJavaChecked(!javaChecked)
                        onCheckBoxClick('JAVA', javaChecked)                       
                    }}
                />

                <Checkbox.Item
                    label = 'Python'
                    status = {pythonChecked ? 'checked' : 'unchecked'}
                    onPress = {() => {
                        setPythonChecked(!pythonChecked)
                        onCheckBoxClick('Python', pythonChecked)
                    }}
                />

                <Checkbox.Item
                    label = 'Java Script'
                    status = {jsChecked ? 'checked' : 'unchecked'}
                    onPress = {() => {
                        setJsChecked(!jsChecked)
                        onCheckBoxClick('JavaScript', jsChecked)
                    }}
                />

                <Checkbox.Item
                    label = 'Kotlin'
                    status = {kotlinChecked ? 'checked' : 'unchecked'}
                    onPress = {() => {
                        setKotlinChecked(!kotlinChecked)
                        onCheckBoxClick('Kotlin', kotlinChecked)
                    }}
                />

            </View>

            <View style = {styles.dropDownView}>

            </View>

            <View style = {styles.timePickerView}>
                <Text style = {styles.textStyle}>Select Time : </Text>
                <TouchableOpacity onPress = {() => console.warn('on press set time')}>
                    <Text style = {{color: 'blue', fontWeight: undefined, fontSize: 16}}>{time}</Text>
                </TouchableOpacity>
                    
            </View>


            {/*<Text>First Name : {firstName}</Text>
            <Text>Last Name : {lastName}</Text>
                
            <Text>Preffered language : {selectedLanguages.join(', ')}</Text>*/}
            <Text>Gemder : {gender}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
    },

    nameView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10
    },

    textStyle: {
        fontSize: TEXT_SIZE,
        fontWeight: "bold"
    },

    textinput: {
        flex: 1,
        borderBottomWidth: 1,
        marginHorizontal: 30,
        fontSize: TEXT_SIZE
    },

    genderView: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 30,
        alignItems: "center"
    },

    checkBoxView: {
        marginHorizontal: 30
    },

    dropDownView: {
        marginHorizontal:30
    },

    timePickerView: {
        marginHorizontal: 30,
        flexDirection: "row",
        alignItems: "center"
    }
})
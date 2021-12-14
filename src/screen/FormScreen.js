import React, {useRef, useState} from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image, Button } from "react-native";

import { RadioButton, Checkbox } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Actionsheet, NativeBaseProvider, useDisclose, Box, Center } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';

const TEXT_SIZE = 16

export default function FormScreen(){

    const [image, setImage] = useState('https://reactjs.org/logo-og.png')

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [gender, setGender] = useState('');

    const [javaChecked, setJavaChecked] = useState(false);
    const [pythonChecked, setPythonChecked] = useState(false);
    const [jsChecked, setJsChecked] = useState(false);
    const [kotlinChecked, setKotlinChecked] = useState(false);

    const [selectedLanguages, setSelectedLanguages] = useState([])

    const [cast, setCast] = useState('General')
    
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [time, setTime] = useState('Click here to select time')

    const { isOpen, onOpen, onClose } = useDisclose();

    const [isLoading, setIsLoading] = useState(false);

    const onCheckBoxClick = (language, checked) => {
        if(!checked){
            setSelectedLanguages(prevArray => [...prevArray, language])
        }else{
            setSelectedLanguages((prevArray) => {return prevArray.filter(currentLanguage => currentLanguage !== language)})
        }
    }

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || date;
            setDate(currentDate);
            setShow(Platform.OS === "ios")
    
            setTime(currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds())
    };

    const takePhotoFromCamera = () => {
        {onClose()}
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImage(image.path)
            
        });          
    }

    const choosePhotoFromGallery = () => {
        {onClose()}
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImage(image.path)
        });
        
    }

    const emailValidation = (email) => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email || regex.test(email) === false){
            return false
        }
        return true
    }

    const passwordValidation = (password, confirmPassword) => {
        if (password.length == 0 || confirmPassword.length == 0) {
            alert('Password and Confirm password is required')
            return false
        } else if (password.length < 8 ||  password.length > 20) {
            alert('Password should be min 8 char and max 20 char')
            return false
        } else if (password !==  confirmPassword) {
            alert('Passwoad and confirm password should be same')
            return false
        }
    }

    const onSubmit = () => {
        if(firstName == ''){
            alert('Please fill first name')
            return
        } else if(lastName == ''){
            alert('Please fill last name')
            return
        } else if(emailValidation(email) == false){
            alert('Please Enter valid email')
            return
        } else if(passwordValidation(password, confirmPassword) == false){
            return
        } else if(gender == ''){
            alert('Please select gender')
            return
        } else if(time == 'Click here to select time'){
            alert('Please select time')
            return
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert('Successfully Submitted')
        }, 5000);        
    }

    return(
        <ScrollView style = {styles.container}>
            <Spinner visible = {isLoading} textContent={'Loading...'}/>
            
            <NativeBaseProvider>
                <View style = {styles.topView}>
                    <Text style = {styles.topText}>Welcome!</Text>
                </View>

                <View style = {styles.imagePickerView}>  
                    <TouchableOpacity onPress = {onOpen}>
                        <Image
                            source = {{uri : image}}
                            style = {{ width: 80, height: 80}}
                        />
                    </TouchableOpacity>
                    
                    <Actionsheet isOpen = {isOpen} onClose = {onClose}>

                        <Actionsheet.Content>
                        <Box>
                            <Text>Select a photo</Text>
                        </Box>
                            <Actionsheet.Item onPress = {takePhotoFromCamera}>Take Photo</Actionsheet.Item>
                            <Actionsheet.Item onPress = {choosePhotoFromGallery}>Choose from gallery</Actionsheet.Item>
                            <Actionsheet.Item onPress = {onClose}>Cancel</Actionsheet.Item>
                        </Actionsheet.Content>

                    </Actionsheet>
                            
                    <Text style = {styles.textTitle}>Profile</Text>   
                    
                </View>

                <View style = {styles.textInputView}>
                    <View style = {styles.nameView}>
                        <TextInput
                            style = {{...styles.textInput, ...styles.firstNameTextInput}}
                            onChangeText = {value => setFirstName(value)}
                            placeholder = 'Enter First Name'
                        />

                        <TextInput
                            style = {{...styles.textInput, ...styles.lastNameTextInput}}
                            onChangeText = {value => setLastName(value)}
                            placeholder = 'Enter Last Name'
                        />
                    </View>
                    
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {value => setEmail(value)}
                        placeholder = 'Enter Email'
                    />

                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {value => setPassword(value)}
                        placeholder = 'Enter Password'
                        secureTextEntry = {true}
                    />

                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {value => setConfirmPassword(value)}
                        placeholder = 'Confirm password'
                        secureTextEntry = {true}
                    />
                </View>

                <View style = {styles.genderView}>

                    <Text style = {styles.textTitle}>Select Gender : </Text>

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
                    <Text style = {styles.textTitle}>Select preffered language : </Text>

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
                    <Text style = {styles.textTitle}>Select Cast : </Text>
                    <View style = {styles.pickerView}>
                        <Picker
                            selectedValue={cast}
                            onValueChange={(itemValue, itemIndex) => setCast(itemValue)}
                            style = {styles.picker}
                            prompt = 'Options'
                        >
                            <Picker.Item label = 'General' value = 'General'/>
                            <Picker.Item label = 'SEBC' value = 'SEBC'/>
                            <Picker.Item label = 'SC' value = 'SC'/>
                            <Picker.Item label = 'ST' value = 'ST'/>
                            <Picker.Item label = 'PWD' value = 'PWD'/>
                        </Picker>
                    </View>
                    
                </View>

                <View style = {styles.timePickerView}>
                    <Text style = {styles.textTitle}>Select Time : </Text>

                    <TouchableOpacity onPress = {() => setShow(true)}>
                        <Text style = {{color: 'blue', fontWeight: undefined, fontSize: 16}}>{time}</Text>
                        {show && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeTime}
                            />
                        )}
                    </TouchableOpacity>
                        
                </View>

                <View style = {styles.buttonView}>
                    <Button
                        title = 'Submit'
                        onPress = {onSubmit}
                    />
                </View>

                {/*<Text>Email : {email}</Text>
                <Text>Password: {password}</Text>
                <Text>First Name : {firstName}</Text>
                <Text>Last Name : {lastName}</Text>
                <Text>Gemder : {gender}</Text>
                <Text>Preffered language : {selectedLanguages.join(', ')}</Text>
                <Text>Cast : {cast}</Text>*/}
            
            </NativeBaseProvider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
    },

    topView: {
        backgroundColor: '#009387',
        height: 200,
        flexDirection: "row",
    },

    topText: {
        color: 'white',
        fontSize: 30,
        marginLeft: 20,
        alignSelf: "flex-end",
        bottom: 50,
        fontWeight: "bold"
    },

    nameView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    firstNameTextInput: {
        marginRight: 5
    },

    lastNameTextInput: {
        marginLeft: 5
    },

    textStyle: {
        fontSize: TEXT_SIZE,
        fontWeight: "bold"
    },

    textTitle: {
        fontSize: TEXT_SIZE,
        fontWeight: "bold",
        color: '#222930'
    },

    textInputView: {
        marginHorizontal: 30,
    },

    textInput: {
        flex: 1,
        fontSize: TEXT_SIZE,
        marginVertical: 10,
        backgroundColor: '#b0b0b0',
        borderRadius: 10,
        paddingLeft : 10
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
        marginHorizontal:30,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center"
    },

    timePickerView: {
        marginHorizontal: 30,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center"
    },

    pickerView: {
        width: 150,
        borderRadius: 10,
        backgroundColor: '#959596',
        marginLeft: 20
    },

    imagePickerView: {
        marginHorizontal: 30,
        marginVertical: 10,
        marginTop: 30,
        alignItems: "center",
        
    },

    buttonView: {
        marginVertical: 20,
        marginHorizontal: 30
    }
})
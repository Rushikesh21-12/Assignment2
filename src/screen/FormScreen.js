import React, {useState} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Button, Alert } from 'react-native';

import FormInput from '../component/FormInput';

import { RadioButton, Checkbox } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Actionsheet, NativeBaseProvider, useDisclose, Box } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';

const TEXT_SIZE = 16

const isValidEmail = (value) => {
    const regex = /^(([^<>()[\]\.,;:\s@\']+(\.[^<>()[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/i;
    return regex.test(value)
}

export default function FormScreen({navigation}){

    const [image, setImage] = useState('https://reactjs.org/logo-og.png')

    const [userInfo, setuserInfo] = useState({
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
        gender: undefined
    })

    const {firstName, lastName, email, password, confirmPassword, gender} = userInfo
    // const [gender, setGender] = useState('');
    const [cast, setCast] = useState('General')
    const [time, setTime] = useState('Click here to select time')
    const [javaChecked, setJavaChecked] = useState(false);
    const [pythonChecked, setPythonChecked] = useState(false);
    const [jsChecked, setJsChecked] = useState(false);
    const [kotlinChecked, setKotlinChecked] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState([])

    const [firstNameError, setFirstNameError] = useState(undefined)
    const [lastNameError, setLastNameError] = useState(undefined)
    const [emailError, setEmailError] = useState(undefined)
    const [passwordError, setPasswordError] = useState(undefined)
    const [confirmPasswordError, setConfirmPasswordError] = useState(undefined)
    const [genderError, setGenderError] = useState(undefined)
    const [timeError, setTimeError] = useState(undefined)
    const [valid, setValid] = useState(false)
    
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    
    const { isOpen, onOpen, onClose } = useDisclose();

    const [isLoading, setIsLoading] = useState(false);

    const onChangeTextInput = (value, fieldName, setError) => {
        setuserInfo({...userInfo, [fieldName]: value})
        switch(fieldName){
            case 'firstName':
                if(value == ''){setError('Required Feild')} else{setError('')}
                break

            case 'lastName':
                if(value == ''){setError('Required Field')} else{setError('')}
                break

            case 'email':
                if(value == '') {
                    setError('Required field')
                }else { 
                    if (!isValidEmail(value)){
                        setError('Invalid email')
                    }else {
                            setError('')
                    }
                }
                break

            case 'password':
                if(value == ''){
                    setError('Required Field')
                } else{
                    if(value.length < 4){
                        setError('Password must be more than 4 chars')
                    } else{
                        setError('')
                    }
                }
                break
            
            case 'confirmPassword':
                if(value == ''){
                    setError('Required Field')
                } else{
                    if(value !== password){
                        setError('Must be same as Password')
                    } else{
                        setError('')
                    }
                }
                break

            case 'gender':
                if(value == ''){
                    setError('Please Selece gender!')
                }else {
                    setError('')
                }
                break

            default:
                setError('')
                break
            
        }
        
    }

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
            setShow(Platform.OS === 'ios')
    
            setTime(currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds())

            if (time == 'Click here to select time'){
                setTimeError('Please select time !')
            }else{
                setTimeError('')
            }           
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

    const isValidForm = () => {
        
        if(firstName == undefined){
            setFirstNameError('Required Field')
        }  

        if(lastName == undefined){
            setLastNameError('Required Field')
        }  

        if(email == undefined){
            setEmailError('Required Field')
        }  

        if(password == undefined){
            setPasswordError('Required Field')
        }  

        if(confirmPassword == undefined){
            setConfirmPasswordError('Required Field')
        }  

        if(gender == undefined){
            setGenderError('Please select gender')
        } 
        
        if(time == 'Click here to select time'){
            setTimeError('Please select time !')
        }
        
        return
    }

    const submitForm = () => {
        isValidForm()
        if(firstNameError == '' && lastNameError == '' && emailError == '' && passwordError == '' 
            && confirmPasswordError == '' && genderError == '' && timeError == '' ){
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                Alert.alert(
                    'Form',
                    'Successfully Submitted',
                    [
                        { text: 'OK', onPress: () => navigation.goBack() }
                    ]
                );
            }, 5000);
        }
    }

    return(
        <ScrollView style = {{flex: 1}}>
            <Spinner visible = {isLoading} textContent = {'Loading...'}/>

            <View style = {styles.topView}>
                <Text style = {styles.topText}>Welcome!</Text>
            </View>
            
            <NativeBaseProvider>
            <View style = {styles.container}>
                
                <View style = {styles.imagePickerView}>  
                    <TouchableOpacity onPress = {onOpen}>
                        <Image source = {{uri : image}} style = {{ width: 80, height: 80}}/>
                    </TouchableOpacity>
                    
                    <Actionsheet isOpen = {isOpen} onClose = {onClose}>
                        <Actionsheet.Content>
                        <Box><Text>Select a photo</Text></Box>
                            <Actionsheet.Item onPress = {takePhotoFromCamera}>Take Photo</Actionsheet.Item>
                            <Actionsheet.Item onPress = {choosePhotoFromGallery}>Choose from gallery</Actionsheet.Item>
                            <Actionsheet.Item onPress = {onClose}>Cancel</Actionsheet.Item>
                        </Actionsheet.Content>
                    </Actionsheet>
                            
                    <Text style = {styles.textTitle}>Profile</Text>   
                    
                </View>

                <View style = {styles.nameView}>
                    <View style = {{flex: 1, marginRight: 10}}>
                        <FormInput
                            label = {'First Name'}
                            onChangeText = {value => onChangeTextInput(value, 'firstName', setFirstNameError)}
                            placeholder = 'Enter First Name'
                            errorName = {firstNameError}
                        />
                    </View>
                    <View style = {{flex: 1, marginLeft: 10}}>
                        <FormInput
                            label = {'Last Name'}
                            onChangeText = {value => onChangeTextInput(value, 'lastName', setLastNameError)}
                            placeholder = 'Enter Last Name'
                            errorName = {lastNameError}
                        />
                    </View>
                </View>
                
                <FormInput
                    label = {'Email ID'}
                    onChangeText = {value => onChangeTextInput(value, 'email', setEmailError)}
                    placeholder = 'example123@gmai;.com'
                    autoCapitalize = 'none'
                    errorName = {emailError}
                />

                <FormInput
                    label = {'Password'}
                    onChangeText = {value => onChangeTextInput(value, 'password', setPasswordError)}
                    placeholder = 'Enter Password'
                    secureTextEntry = {true}
                    autoCapitalize = 'none'
                    errorName = {passwordError}
                />

                <FormInput
                    label = {'Confirm Password'}
                    onChangeText = {value => onChangeTextInput(value, 'confirmPassword', setConfirmPasswordError)}
                    placeholder = 'Confirm password'
                    secureTextEntry = {true}
                    autoCapitalize = 'none'
                    errorName = {confirmPasswordError}
                />
               
                <View style = {styles.genderViewContainer}>
                    <View style = {styles.genderView}>

                        <Text style = {styles.textTitle}>Select Gender : </Text>

                        <RadioButton.Group value = {gender} onValueChange = {gender => onChangeTextInput(gender, 'gender', setGenderError)}>
                            <View style = {{ flexDirection: 'row', marginHorizontal: 16}}>
                                <RadioButton.Item label = 'Male' value = 'Male' />
                                <RadioButton.Item label = 'Female' value = 'Female' />
                            </View>
                        </RadioButton.Group>

                    </View>

                    {genderError ? <Text style = {styles.errorStyle}>{genderError}</Text> : null}
                </View>
                
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

                <View style = {styles.timePickerViewContainer}>
                    <View style = {styles.timePickerView}>
                    
                        <Text style = {styles.textTitle}>Select Time : </Text>

                        <TouchableOpacity onPress = {() => setShow(true)}>
                            <Text style = {{color: 'blue', fontWeight: undefined, fontSize: 16}}>{time}</Text>
                            {show && (
                                <DateTimePicker
                                testID = 'dateTimePicker'
                                value = {date}
                                mode = {'time'}
                                is24Hour = {true}
                                display = 'default'
                                onChange = {onChangeTime}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    {timeError ? <Text style = {styles.errorStyle}>{timeError}</Text> : null}
                </View>

                <View style = {styles.buttonView}>
                    <Button
                        title = 'Submit'
                        onPress = {submitForm}
                        />
                </View>
                
                {/*
                <Text>FE : {firstNameError}, LE: {lastNameError}, EE : {emailError}, PE: {passwordError}, CPE : {confirmPasswordError}, GE: {genderError}, TE : {timeError}</Text>
                <Text>Email : {email}</Text>
                <Text>Password: {password}</Text>
                <Text>First Name : {firstName}</Text>
                <Text>Last Name : {lastName}</Text>
                <Text>Gemder : {gender}</Text>
                <Text>Preffered language : {selectedLanguages.join(', ')}</Text>
                <Text>Cast : {cast}</Text>*/}
            </View>
            </NativeBaseProvider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,   
        marginHorizontal: 30 
    },

    topView: {
        backgroundColor: '#009387',
        height: 200,
        flexDirection: 'row',
    },

    errorStyle: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center'
    },

    topText: {
        color: 'white',
        fontSize: 30,
        marginLeft: 20,
        alignSelf: 'flex-end',
        bottom: 50,
        fontWeight: 'bold'
    },

    nameView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    firstNameTextInput: {
        marginRight: 5
    },

    lastNameTextInput: {
        marginLeft: 5
    },

    textStyle: {
        fontSize: TEXT_SIZE,
        fontWeight: 'bold'
    },

    textTitle: {
        fontSize: TEXT_SIZE,
        fontWeight: 'bold',
        color: '#222930'
    },

    textInput: {
        flex: 1,
        fontSize: TEXT_SIZE,
        marginVertical: 10,
        backgroundColor: '#b0b0b0',
        borderRadius: 10,
        paddingLeft : 10
    },

    genderViewContainer: {
        marginVertical: 10,
    },

    genderView: {
        flexDirection: 'row',
        height: 20,
        alignItems: 'center',
    },

    dropDownView: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    timePickerViewContainer:{
        marginVertical: 10,
    },

    timePickerView: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    pickerView: {
        width: 150,
        borderRadius: 10,
        backgroundColor: '#b0b0b0',
        marginLeft: 20,
        borderWidth: 2,
        borderColor: 'grey'
    },

    imagePickerView: {
        marginVertical: 20,
        marginTop: 30,
        alignItems: 'center',
        
    },

    buttonView: {
        marginVertical: 20,
    },

    errorStyle: {
        fontWeight: 'bold',
        color: 'red',
    }
})
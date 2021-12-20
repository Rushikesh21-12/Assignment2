import React, {useState} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Button, Modal, TextInput, Pressable } from 'react-native';

import FormInput from '../component/FormInput';

import { RadioButton, Checkbox } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Actionsheet, NativeBaseProvider, useDisclose, Box } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { CallingCodePicker } from '@digieggs/rn-country-code-picker';

const TEXT_SIZE = 16

const isValidEmail = (value) => {
    const regex = /^(([^<>()[\]\.,;:\s@\']+(\.[^<>()[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/i;
    return regex.test(value)
}

const isValidMobile = (value) => {
    const regexMobile = /^[7-9]{1}[0-9]{9}$/
    return regexMobile.test(value)
}

const isValidPassword = (value) => {
    if(value.match(/[a-z]/g) && value.match(/[A-Z]/g) && value.match(/[0-9]/g) 
        && value.match(/[^a-zA-Z\d]/g) && value.length >= 8)
            return true
    else return false
}

export default function FormScreen({navigation}){

    const [image, setImage] = useState('https://i.postimg.cc/TYNx4qkz/default-profile.png')
    const { isOpen, onOpen, onClose } = useDisclose();

    const [userInfo, setuserInfo] = useState({
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
        mobile: undefined,
        gender: undefined
    })

    const {firstName, lastName, email, password, confirmPassword, mobile, gender} = userInfo
    const [countryCode, setCountryCode] = useState(undefined)

    const [cast, setCast] = useState('General')

    const [time, setTime] = useState('Click here to select time')
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)

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
    const [mobileError, setMobileError] = useState(undefined)
    const [genderError, setGenderError] = useState(undefined)
    const [timeError, setTimeError] = useState(undefined)

    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const onUserDataChange = (value, fieldName, setError) => {
        setuserInfo({...userInfo, [fieldName]: value})
        switch(fieldName){
            case 'firstName':
                value == '' ? setError('Required Feild !') : setError('')
                break

            case 'lastName':
                value == '' ? setError('Required Field !') : setError('')
                break

            case 'email':
                if(value == '') 
                    setError('Required field !')
                else 
                    !isValidEmail(value) ? setError('Invalid email !') : setError('')  
                break

            case 'password':
                if(value == '') 
                    setError('Required Field !')
                else
                    isValidPassword(value) ? setError('') : setError('Password does not match with criteria !') 
                break
            
            case 'confirmPassword':
                if(value == '') 
                    setError('Required Field !')
                else
                    value !== password ? setError('Must be same as Password !') : setError('')
                break

            case 'mobile':
                if(value == '') 
                    setError('Required Field !')
                 else
                    !isValidMobile(value) ? setError('Invalid Mobile No.') : setError('') 
                break

            case 'gender':
                value == '' ? setError('Please Selece gender !') : setError('')
                break

            default:
                setError('')
                break 
        } 
    }

    const onCheckBoxClick = (language, checked, setLanguageChecked) => {
        setLanguageChecked(!checked)
        if(!checked) 
            setSelectedLanguages(prevArray => [...prevArray, language])
        else
            setSelectedLanguages((prevArray) => {return prevArray.filter(currentLanguage => currentLanguage !== language)})
    }

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || date;
            setDate(currentDate);
            setShow(Platform.OS === 'ios')
            
            setTime(currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds())

            setTimeError('')
    };

    const takePhotoFromCamera = () => {
        {onClose()}
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
        }).then(image => {
            setImage(image.path)  
        });          
    }

    const choosePhotoFromGallery = () => {
        {onClose()}
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            setImage(image.path)
        });
        
    }

    const submitForm = () => {

        firstName == undefined ? setFirstNameError('Required Field !') : null
        lastName == undefined ? setLastNameError('Required Field !') : null
        email == undefined ? setEmailError('Required Field !') : null
        password == undefined ? setPasswordError('Required Field !') : null
        confirmPassword == undefined ? setConfirmPasswordError('Required Field !') : null
        mobile == undefined ? setMobileError('Required Field !') : null
        gender == undefined ? setGenderError('Please select gender !') : null
        time == 'Click here to select time' ? setTimeError('Please select time !') : null

        if(firstNameError == '' && lastNameError == '' && emailError == '' && passwordError == '' 
            && confirmPasswordError == '' && genderError == '' && timeError == '' ){
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setModalVisible(true)
            }, 5000);
        }
    }

    const onModalButtonPress = () => {
        setModalVisible(!modalVisible)
        navigation.goBack()
    }

    return(
        <ScrollView style = {styles.scrollContainer}>
            <Spinner visible = {isLoading} textContent = {'Loading...'}/>
            <Modal
                animationType = "slide"
                transparent = {true}
                visible = {modalVisible}
            >
                <View style = {styles.modalContainer}>
                    <View style = {styles.modalView}>
                        
                        <View style = {styles.modalTextView}>
                            <Text style = {styles.modalText}>Successfully Submitted!</Text>
                        </View>

                        <TouchableOpacity
                            style = {styles.modalButton}
                            onPress = {() => onModalButtonPress()}
                        >
                        <Text style = {styles.textStyle}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style = {styles.topView}>
                <Text style = {styles.topText}>Welcome!</Text>
            </View>
            
            <NativeBaseProvider>
                <View style = {styles.container}>
                    
                    <View style = {styles.imagePickerView}>  
                        <TouchableOpacity onPress = {onOpen}>
                            <Image source = {{uri : image}} style = {styles.profile}/>
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
                        <View style = {styles.firstNameTextInput}>
                            <FormInput
                                label = {'First Name'}
                                onChangeText = {value => onUserDataChange(value, 'firstName', setFirstNameError)}
                                placeholder = 'Enter First Name'
                                errorName = {firstNameError}
                            />
                        </View>
                        <View style = {styles.lastNameTextInput}>
                            <FormInput
                                label = {'Last Name'}
                                onChangeText = {value => onUserDataChange(value, 'lastName', setLastNameError)}
                                placeholder = 'Enter Last Name'
                                errorName = {lastNameError}
                            />
                        </View>
                    </View>
                    
                    <FormInput
                        label = {'Email ID'}
                        onChangeText = {value => onUserDataChange(value, 'email', setEmailError)}
                        placeholder = 'example123@gmai.com'
                        keyboardType = 'email-address'
                        autoCapitalize = 'none'
                        errorName = {emailError}
                    />

                    <View style = {styles.mvStyle}>
                        <Text style = {styles.textTitle}>Mobile No.</Text>
                        <View style = {styles.mobileView}>

                            <CallingCodePicker 
                                initialCountryCode = 'IN'
                                onValueChange = {text => setCountryCode(text)} 
                                style = {styles.countryCodePicker} 
                            />

                            <View style = {styles.mobileInput}>
                                <TextInput
                                    onChangeText = {value => onUserDataChange(value, 'mobile', setMobileError)}
                                    placeholder = 'Ex : 987654321'
                                    keyboardType = 'numeric'
                                    maxLength = {10}
                                />
                            </View>
                            
                        </View>
                        {mobileError ? <Text style = {styles.errorStyle}>{mobileError}</Text> : null}
                    </View>
                    

                    <FormInput
                        label = {'Password'}
                        onChangeText = {value => onUserDataChange(value, 'password', setPasswordError)}
                        placeholder = 'Enter Password'
                        secureTextEntry = {true}
                        autoCapitalize = 'none'
                        errorName = {passwordError}
                    />
                    <Text style = {styles.passwordNote}>Note : Password must contain al teast 1 Uppercase, Lowercase, Number, Special Char. and more than 8 chars</Text>
                    
                    <FormInput
                        label = {'Confirm Password'}
                        onChangeText = {value => onUserDataChange(value, 'confirmPassword', setConfirmPasswordError)}
                        placeholder = 'Confirm password'
                        secureTextEntry = {true}
                        autoCapitalize = 'none'
                        errorName = {confirmPasswordError}
                    />
                
                    <View style = {styles.mvStyle}>
                        <View style = {styles.genderView}>

                            <Text style = {styles.textTitle}>Select Gender : </Text>

                            <RadioButton.Group 
                                value = {gender} 
                                onValueChange = {gender => onUserDataChange(gender, 'gender', setGenderError)}
                            >
                                <View style = {styles.radioButtons}>
                                    <RadioButton.Item label = 'Male' value = 'Male' />
                                    <RadioButton.Item label = 'Female' value = 'Female' />
                                </View>
                            </RadioButton.Group>

                        </View>

                        {genderError ? <Text style = {styles.errorStyle}>{genderError}</Text> : null}
                    </View>
                    
                    <Text style = {[styles.textTitle, styles.mvStyle]}>Select preffered language : </Text>

                    <Checkbox.Item
                        label = 'JAVA'
                        status = {javaChecked ? 'checked' : 'unchecked'}
                        onPress = {() => { onCheckBoxClick('JAVA', javaChecked, setJavaChecked) }}
                    />

                    <Checkbox.Item
                        label = 'Python'
                        status = {pythonChecked ? 'checked' : 'unchecked'}
                        onPress = {() => { onCheckBoxClick('Python', pythonChecked, setPythonChecked) }}
                    />

                    <Checkbox.Item
                        label = 'Java Script'
                        status = {jsChecked ? 'checked' : 'unchecked'}
                        onPress = {() => { onCheckBoxClick('JavaScript', jsChecked, setJsChecked) }}
                    />

                    <Checkbox.Item
                        label = 'Kotlin'
                        status = {kotlinChecked ? 'checked' : 'unchecked'}
                        onPress = {() => { onCheckBoxClick('Kotlin', kotlinChecked, setKotlinChecked) }}
                    />
                    
                    <View style = {{...styles.dropDownView, ...styles.mvStyle}}>

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

                    <View style = {styles.mvStyle}>

                        <View style = {styles.timePickerView}>
                        
                            <Text style = {styles.textTitle}>Select Time : </Text>

                            <TouchableOpacity onPress = {() => setShow(true)}>
                                <Text style = {styles.timeText}>{time}</Text>
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

                    <View style = {styles.mvStyle}>
                        <Button
                            title = 'Submit'
                            onPress = {submitForm}
                            />
                    </View>
                    
                    {/*
                    <Text>FE : {firstNameError}, LE: {lastNameError}, EE : {emailError}, PE: {passwordError}, CPE : {confirmPasswordError}, GE: {genderError}, TE : {timeError}</Text>
                    <Text>Email : {email}</Text>
                    <Text>Password: {password}</Text>
                    <Text>Mobile : {countryCode} {mobile}</Text>
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

    scrollContainer:{
        flex: 1
    },

    container: {
        marginHorizontal: 30,
        marginBottom: 10
    },

    mvStyle: {
        marginVertical: 10
    },

    topView: {
        backgroundColor: '#009387',
        height: 200,
        flexDirection: 'row',
    },

    topText: {
        color: 'white',
        fontSize: 30,
        marginLeft: 20,
        alignSelf: 'flex-end',
        bottom: 50,
        fontWeight: 'bold'
    },

    profile: {
        width: 100, 
        height: 100, 
        resizeMode: 'stretch'
    },

    nameView: {
        flexDirection: 'row'
    },

    firstNameTextInput: {
        flex: 1, 
        marginRight: 10
    },

    lastNameTextInput: {
        flex: 1, 
        marginLeft: 10
    },

    passwordNote: {
        textAlign: 'justify',
        color: 'green'
    },

    textTitle: {
        fontSize: TEXT_SIZE,
        fontWeight: 'bold',
        color: 'black'
    },

    genderView: {
        flexDirection: 'row',
        height: 20,
        alignItems: 'center',
    },

    radioButtons:{ 
        flexDirection: 'row', 
        marginHorizontal: 16
    },

    mobileView:{
        flexDirection: 'row',
        backgroundColor: '#b0b0b0',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'grey'
    },

    countryCodePicker: {
        alignSelf: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 5,
    },

    dropDownView: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    timePickerView: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    timeText:{
        color: 'blue', 
        fontSize: 16
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
        alignItems: 'center',    
    },

    errorStyle: {
        color: 'red',
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    modalTextView:{
        marginVertical: '10%'
    },

    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        elevation: 5
    },

    modalButton: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: 250,
        backgroundColor: "#2196F3",
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

    modalText: {
        textAlign: "center"
    }
})
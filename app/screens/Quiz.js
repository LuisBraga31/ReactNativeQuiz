import React, { useState } from 'react'

import { COLORS, SIZES } from '../constants';
import data from '../data/quizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Quiz = () => {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionDisabled, setIsOptionDisabled] = useState(false);
    const [score, setScore] = useState(0);

    const validateAnswer = (selectOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectOption);
        setCorrectOption(correct_option);
        setIsOptionDisabled(true);
        if(selectOption === correct_option) {
            setScore(score+1);
        }

    }

    const renderQuestion = () => {
        return (
            <View>
                <View style={styles.containerQuestionCounter}>
                    <Text style={styles.textCounter}> {currentQuestionIndex+1}</Text>
                    <Text style={styles.textCounterLenght}> / {allQuestions.length} </Text>
                </View>

                <Text style={styles.textQuestion}>{allQuestions[currentQuestionIndex]?.question}</Text>

            </View>
        )
    }

    const renderOptions = () => {
        return (
            <View>
                {allQuestions[currentQuestionIndex]?.options.map(option => (
                    <TouchableOpacity key={option} onPress={()=> validateAnswer(option)} disabled={isOptionDisabled}
                    style={[styles.option, {
                        borderColor: 
                            option==correctOption ? COLORS.success : 
                            option==currentOptionSelected ? COLORS.error :
                            COLORS.secondary+'20',
                        backgroundColor:
                            option==correctOption ? COLORS.success+'20' : 
                            option==currentOptionSelected ? COLORS.error+'20' :
                            COLORS.secondary+'20',
                         }]} 
                    >
                        
                        <Text style={styles.optionText}>{option}</Text>
                        { 
                            option == correctOption ? (
                                <View style={[styles.optionIcon, {backgroundColor: COLORS.success}]}>
                                    <MaterialCommunityIcons name="check" style={styles.optionIconItem}/>
                                </View> 
                            ) : option == currentOptionSelected ? (
                                <View style={[styles.optionIcon, {backgroundColor: COLORS.error}]}>
                                    <MaterialCommunityIcons name="close" style={styles.optionIconItem}/>
                                </View> 
                            ) : null
                        }

                    </TouchableOpacity>
                ))}


            </View>
        )
    }


    return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary}/>
      <View style={styles.container}>
        
        {renderQuestion()}

        {renderOptions()}

        <Image source={require('../assets/img/DottedBG.png')} style={styles.backImg} resizeMode={'contain'}/>
      </View>

    </SafeAreaView>
  )
}

export default Quiz

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingVertical: 40,
        paddingHorizontal: 16, 
        backgroundColor: COLORS.background, 
        position: 'relative'
    },
    backImg: {
        width: SIZES.width,
        height: 130,
        zIndex: -1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.5
    },
    containerQuestionCounter: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    textCounter: {
        color: COLORS.white,
        opacity: 0.6,
        fontSize: 20,
        marginRight: 2
    },
    textCounterLenght: {
        color: COLORS.white,
        opacity: 0.6,
        fontSize: 18
    },
    textQuestion: {
        color: COLORS.white,
        fontSize: 30,
    },
    option: {
        borderWidth: 3,
        height: 60,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    optionText: {
        color: COLORS.white,
        fontSize: 20,
    },
    optionIcon: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionIconItem: {
        color: COLORS.white,
        fontSize: 20,
    }
})
import React, { useState } from 'react'

import { COLORS, SIZES } from '../constants';
import data from '../data/quizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Quiz = () => {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionDisabled, setIsOptionDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);

    const validateAnswer = (selectOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectOption);
        setCorrectOption(correct_option);
        setIsOptionDisabled(true);
        if(selectOption === correct_option) {
            setScore(score+1);
        }
        setShowNextButton(true);

    }

    const handleNext = () => {
        if(currentQuestionIndex === allQuestions.length-1) {
            setShowScoreModal(true); 
        } else {
            setCurrentQuestionIndex(currentQuestionIndex+1)
            setCurrentOptionSelected(null)
            setCorrectOption(null)
            setIsOptionDisabled(false)
            setShowNextButton(false)
        }
    }

    const restartQuiz = () => {
        setShowScoreModal(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionDisabled(false);
        setShowNextButton(false);
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

    const renderNextButton = () => {
        if(showNextButton) {
            return (
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}> Next </Text>
                </TouchableOpacity>
            )
        }
    }


    return (
        <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary}/>
        <View style={styles.container}>
            
            {renderQuestion()}

            {renderOptions()}

            {renderNextButton()}
            
            <Modal animationType="slide" transparent={true} visible={showScoreModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                           
                        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                            { score> (allQuestions.length/2) ? 'Congratulations!' : 'Oops!' }
                        </Text>

                        <View style={styles.modalScore}>
                            <Text style={{fontSize: 30, color: score> (allQuestions.length/2) ? COLORS.success : COLORS.error}}> 
                                {score}
                            </Text>

                            <Text style={{fontSize: 20, color: COLORS.black}}>
                                / { allQuestions.length }
                            </Text>
                        </View>
                        
                        <TouchableOpacity onPress={restartQuiz} style={styles.restartButton}>
                            <Text style={styles.restartButtonText}> Retry Quiz </Text>
                        </TouchableOpacity>

                       </View>

                   </View>
               </Modal>

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
    },
    nextButton: {
        marginTop: 20,
        width: '100%',
        backgroundColor: COLORS.accent,
        padding: 20,
        borderRadius: 5
    },
    nextButtonText: {
        fontSize: 20,
        color: COLORS.white,
        textAlign: 'center',
    },

    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: COLORS.white,
        width: '90%',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center'
    },
    modalScore: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 20
    },
    restartButton: {
        backgroundColor: COLORS.accent,
        padding: 20, 
        width: '100%', 
        borderRadius: 20
    },
    restartButtonText: {
        textAlign: 'center', 
        color: COLORS.white, 
        fontSize: 20
    }
})
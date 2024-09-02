import React, { useState } from 'react'

import { COLORS, SIZES } from '../constants';
import data from '../data/quizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

const Quiz = () => {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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



    return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary}/>
      <View style={styles.container}>
        
        {renderQuestion()}
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
    }
})
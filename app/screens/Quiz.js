import React from 'react'

import { COLORS, SIZES } from '../constants';
import data from '../data/quizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

const Quiz = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary}/>
      <View style={styles.container}>
        
        
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
    }
})
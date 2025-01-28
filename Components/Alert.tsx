import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { app_colors, font } from '@/assets/styles/colors'
import CustomButton from './CustomButton'
import { AlertProps } from '@/Context/types'


export default function Alert({ icon, type, message, buttons} : AlertProps) {
  return (
    <View style={ styling.container }>
        <View style={ styling.title_strip }>
            <MaterialCommunityIcons name={ icon ? icon : "bell" } size={ 22 } color={ app_colors.tetiary }/>
            <Text style={ styling.type }> { type }</Text>
        </View>
        <Text style={ styling.message }>{ message }</Text>
        <FlatList
            data={ buttons }
            renderItem={ ({ item }) => <CustomButton text={ item.text } handleClick={ item.onClick } />}
            horizontal
            showsHorizontalScrollIndicator={ false }
            contentContainerStyle={{
                width: "80%",
                justifyContent: buttons.length === 1? "center" : "space-between",
                alignItems: "center",
                marginHorizontal: "auto"
            }}
        />
    </View>
  )
}

const styling = StyleSheet.create(
    {
        container:
        {
            width: "75%",
            height: 200,
            borderRadius: 10,
            backgroundColor: app_colors.black,
            marginHorizontal: "auto",
            marginVertical: "auto",
        },

        title_strip:
        {
            width: "95%",
            height: 50,
            flexDirection: "row",
            marginHorizontal: "auto",
            marginTop: 5,
            color: app_colors.tetiary
        },

        type:
        {
            fontFamily: font.family,
            fontSize: 18,
            color: app_colors.tetiary
        },

        message:
        {
            flexGrow: 1,
            textAlign: "center",
            textAlignVertical: "center",
            color: app_colors.tetiary
        },
    }
)
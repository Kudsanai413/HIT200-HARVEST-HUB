import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { app_colors } from '@/assets/styles/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styling as global } from '@/assets/styles/global';

export default function Search() {
	return (
		<>
			<View style={ styles.textbox }>
				<MaterialCommunityIcons name="search-web" size={ 24 } color={ app_colors.fade }/>
				<TextInput
					placeholder='What Are Looking For Today'
					placeholderTextColor="gray"
					value={ "search" }
					// onChangeText={ (text) => setSearch(text) }
					style={[ global.invisibleTextBox]}

				/>
			</View>
		</>
  )
}

const styles = StyleSheet.create(
    {
        textbox:
        {
            width: "85%",
            height: 50,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            borderRadius: 8,
            borderWidth: 1.5,
            borderColor: app_colors.fade,
            backgroundColor: app_colors.tetiary,
            marginHorizontal: "auto",
            marginVertical: 5,


        },
	}
);
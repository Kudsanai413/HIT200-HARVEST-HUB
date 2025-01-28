import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { EvilIcons, FontAwesome6 } from "@expo/vector-icons"
import { useRouter } from 'expo-router';
import useGetLoginContext from '@/Context/LoginContext';

type props = {
  setVisible: React.Dispatch<React.SetStateAction<boolean | "login" | "sign-up">>
}
export default function Login({ setVisible } : props) {
    const { state : user, dispatch } = useGetLoginContext();
	const navigator = useRouter();
  return (
    <View style={ styling.body }>
      <Text
        style={ styling.header }
      >
        Login
      </Text>
		<View style={ [styling.input, { marginTop: 65 }] }>
			<FontAwesome6 name='user' color='#067c00' size={ 20 } style={{ marginLeft: 8 }}/>
			<TextInput
				placeholder='Username'
				value={ user.user_id }
				onChangeText={ (text) => dispatch({ type: "user-id", payload: text}) }
				style={ styling.hide }
			/>
		</View>
		<View style={ styling.input }>
			<EvilIcons name='lock' size={30} color="#067c00"/>
			<TextInput
				placeholder='Password'
				value={ user.password }
				onChangeText={ (text) => dispatch({ type: "password", payload: text }) }
				style={ styling.hide }
			/>
		</View>
		<Pressable onPress={ () =>
		{
       		// dispatch({ type: "login", payload: true });
			navigator.push("/(farmer)/Home");
			setVisible(false)
		}}
		style={ styling.button }>
			<Text style={{ color: "white" }}>Login</Text>
		</Pressable>
    </View>
  )
}

export const styling = StyleSheet.create({
    body:
    {
        height: "75%",
        width: "100%",
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        alignItems: "center"
    },

    hide: {
        outlineColor: "transparent",
        width: "60%",
        height: 30,
        textAlign: "left",
        marginLeft: 15,
        borderWidth: 0,
        outline: "none",
    },

    input:
    {
        width: "60%",
        height: 40,
        borderRadius: 10,
        borderColor: "#067c00",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 20,
    },

    button :
    {
        width: 90,
        height: 40,
        borderRadius: 8,
        backgroundColor: "#067c00",
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        color: "white"
    },
    header:
    {
        width: "100%",
        textAlign: "center",
        fontFamily: "DengXian",
        fontSize: 30,
        fontWeight: "bold",
        color: "#067c00",
        marginTop: 15,
    },
})




import { View, Text, Image, Modal, Alert, StyleSheet, Pressable } from 'react-native';
import React, { useReducer } from 'react';
import { useEffect, useState } from "react";
import useGetUserContext from '@/Context/UserContext';
import { ActionType, ProduceType } from '@/Context/types';
import { base_url } from '@/assets/reusable/api';
import useGetFileContext from '@/Context/FileContext';
import { styling as global } from '@/assets/styles/global';
import { app_colors, font } from '@/assets/styles/colors';
import CustomButton from '@/Components/CustomButton';
import Select from '@/Components/Select';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImageBackgroundComponent from '@/Components/ImageBackgroundComponent';
import CustomTextBox from '@/Components/CustomTextbox';

const initReducerState =
{
	visible: false,
	produce: "",
	price: "",
	unit: "",
	stock: "Yes",
};

const reducerActions = ( state : typeof initReducerState, action : ActionType) : typeof initReducerState =>
	{
		switch(action.type)
		{
			case "visibility":
				return { ...state, visible: action.payload };

			case "produce":
				return { ...state, produce: action.payload };

			case "price":
				return { ...state, price: action.payload };

			case "stock":
				return {...state, stock: action.payload};

			default:
				Alert.alert("Unnrecognnizezd Action");
				return state
		}
	}


export default function ProductListings() {
	const { state } = useGetUserContext();
	const { getImage } = useGetFileContext();
	const [modal2Visible, setModalVisible] = useState<boolean>(false);
	const [ produce, setProduce] = useState<ProduceType[]>();
	const  [ error, setError] = useState<string>("Fetching Your Produce, Please Wait ...");
	const [crops, setCrops] = useState<string[]>([]);
	const [items, dispatch] = useReducer(reducerActions, initReducerState);

	useEffect(() =>
		{
			if ( state.user )
			{
				fetch(`${ base_url}/produce?farmerID=${ state.user.userID }`)
					.then( response =>
						{
							if ( !response.ok ) throw new Error("Failed To Fetch: Your Produce");

							return response.json();
						}).then( (my_produce : typeof produce) =>
							{
								setProduce(my_produce);
							}).catch(error => setError(error.message))

			state.user.Additional_crops ? setCrops([state.user.main_crop, ...state.user.Additional_crops]) : setCrops([state.user.main_crop]);
			}
		}
	, [])

  return (
		<>
			<View style={ styling.body }>
				<Image source={ require("@/assets/images/user.jpg")} style={{ width: 150, height: 150, borderRadius: 150}}/>
				<View style={ styling.line }/>
				<MaterialCommunityIcons name="store-alert" color={app_colors.tetiary} size={ 75 }/>
				<Text style={{ color: app_colors.tetiary, marginBottom: 200 }}>It Appears You Don't Have Items in Produce Store</Text>

				<CustomButton
					icon='plus' text=''
					button_type='circle'
					handleClick={ () => dispatch({type:"visibility", payload : true })}
					style={ styling.button }
				/>

				<Modal visible={ items.visible } transparent style={global.modal}>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<Select options={["Tomatoes", "Carrots"]} size={300} master={'Crops To Add'} dispatch={ dispatch } modal={ setModalVisible } action='produce'/>
					</View>
				</Modal>
			</View>

			<Modal transparent visible={ modal2Visible } onLayout={ () => dispatch({ type: "visibility", payload: false })} animationType='slide'>
				<View style={ styling.modal }>
					<ImageBackgroundComponent
					img={ getImage(items.produce) }
					>
						<View style={{
							...global.body,
							backgroundColor: "rgba(0, 0, 0, 0.5)",
							backdropFilter: "blur(5px)",
							width: "100%",
							position: "relative",

						}}>
							<Text style={ styling.modal_title }> Add My { items.produce } To Store</Text>
							<CustomTextBox title='price/$' contents={ items.price } typing={ dispatch } action="price"  width="80%" />
							<CustomTextBox title='Units for Price' contents={ items.unit } typing={ dispatch } action="unit"  width="80%" />
							<CustomTextBox title='In-Stock' contents={ items.stock } typing={ dispatch } action="stock"  width="80%" />
							<CustomButton text='send' icon='upload' style={ styling.button_margin }/>
						</View>
					</ImageBackgroundComponent>
				</View>
			</Modal>
		</>
  )
}

const styling = StyleSheet.create(
	{
		body:
		{
			flex: 1,
			alignItems: "center",
			paddingTop: 20,
			position: "relative",
		},

		line:
		{
			height: 1,
			width: "90%",
			backgroundColor: app_colors.primary,
			marginVertical: 25,
		},

		button:
		{
			position: "absolute",
			right: 15,
			bottom: 45,
		},

		modal:
		{
			width: "100%",
			height: "70%",
			backgroundColor: "red",
			position: "fixed",
			bottom: 0,
			borderTopRightRadius: 50,
			borderTopLeftRadius: 50,
			marginHorizontal: "auto"
		},

		modal_title:
		{
			fontFamily: font.family,
			fontSize: font.size + 4,
			color: app_colors.white,
			marginVertical: 20,
		},
		button_margin:
		{
			position: "absolute",
			bottom: 80,
		}


	}
);
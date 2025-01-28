import { View, Text, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styling as global } from '@/assets/styles/global'
import useGetFileContext from '@/Context/FileContext'
import CustomButton from '../CustomButton'
import { base_url } from '@/assets/reusable/api'
import { UserType } from '@/Context/types'
type props = {
    farmer : string | any,
    crop: string,
	type: string,
}




export default function ProduceCard({ crop, farmer, type } : props) {
	const loaded = useRef<boolean>(false);
	const [farmer_name, setFarmerName] = useState<string>("Admin");
	useEffect(() =>
	{
		if ( !loaded.current )
		{
			fetch(`${ base_url }/${type}?userID=${farmer}`)
				.then( response =>
					{
						if (!response.ok) throw new Error(`${farmer}`);

						return response.json();
					}).then( (data : UserType[]) =>
						{
							if (data.length !== 1) throw new Error("Could Fetch Unique Farmer");
							return data[0];
						}).then( (farmer : UserType) =>
							{
								setFarmerName(farmer.Name)
							}).catch( error => { return setFarmerName(error.message) });
		}
	})
    const { getImage } = useGetFileContext();
	return (
		<View style={ global.produce_card }>
			<Image source={ require("@/assets/images/person-2.jpg")} style={ global.profile_image }/>
			<Text style={ global.card_text }>{ farmer_name }</Text>
			<Image source={ getImage(crop)} style={ global.card_image } />
			<CustomButton icon='eye' text='View'/>
		</View>
  )
}
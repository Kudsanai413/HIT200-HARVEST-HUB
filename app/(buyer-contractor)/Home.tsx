import { View, Text, Image, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import useGetUserContext from '@/Context/UserContext';
import useGetFileContext from '@/Context/FileContext';
import useGetProduceContext from '@/Context/ProductContext';
import { ProduceType, UserType } from '@/Context/types';
import ProduceCard from '@/Components/Buyer/ProduceCard';
import { base_url } from '@/assets/reusable/api';
import ProduceCardSkeleton from '@/Components/Skeletons/ProduceCardSkeleton';
import { styling } from '@/assets/styles/global';


export default function Home() {
    const { state } = useGetUserContext();
	const { state: prod_state } = useGetProduceContext();

	const getThirdProduce = () : ProduceType[] =>
	{
		const things = prod_state.produces.length;
		const produces: ProduceType[] = []
		for ( let i = 0; i < Math.floor(things / 3) ; i++)
		{
			produces.push(prod_state.produces[i]);
		}
		return produces
	}

	return (
	<>
		<View>
			<Image source={ require("@/assets/images/farmer.jpg") } style={{ width: "98%", height: 250, marginHorizontal: "auto" }}/>
			<Text style={ styling.title }>You May Be Intreseted To Know</Text>
			{
				prod_state.produces && prod_state.produces.length ?
					<FlatList
						keyExtractor={ ( item : ProduceType ) => item.produceID}
						data={ getThirdProduce() }
						renderItem={ ({ item }) => <ProduceCard crop={ item.produceType } farmer={ item.farmerID } type='farmers'/> }
						horizontal
						showsHorizontalScrollIndicator={ false }
					/>
					:
					<>
						<ScrollView horizontal showsHorizontalScrollIndicator={ false }>
							<ProduceCardSkeleton/>
							<ProduceCardSkeleton/>
							<ProduceCardSkeleton/>
						</ScrollView>
					</>
			}
		</View>
	</>
  )
}
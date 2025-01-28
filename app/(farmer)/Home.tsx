import { View, Text, StyleSheet, FlatList, ScrollView, Image, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useGetUserContext from '@/Context/UserContext'
import { styling as global } from '@/assets/styles/global';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { app_colors } from '@/assets/styles/colors';
import { UserType, AlertProps } from '@/Context/types';
import { base_url } from '@/assets/reusable/api';
import ProduceCard from '@/Components/Buyer/ProduceCard';
import ProduceCardSkeleton from '@/Components/Skeletons/ProduceCardSkeleton';
import Alert from '@/Components/Alert';

const initState =
{
    contracts: 3,
    notifications: 15,
    deliveries: 25,
    pending: 0
}

export default function Home() {
    const { state : user_state } = useGetUserContext();
    const [PotentialBuyers, setPotentialBuyers] = useState<UserType[]>([]);
    const [state, setState] = useState<typeof initState>(initState);
    const [alert, setAlert] = useState<AlertProps>({
        type: "",
        message: "",
        buttons:  []
    });
    const [modalVisible,  setModalVisible] = useState<false | "alert">(false);
    const loaded = useRef<boolean>(false);
    useEffect(() =>
    {
        function getData() : void
        {
            fetch(`${ base_url }/buyers-contractors?main_crop=Tomatoes`).then( response =>
                {
                    if (!response.ok) throw new Error("Unable To Fetch Buyers With The Same Maain Crop");

                    return response.json();
                }).then( (data : UserType[]) =>
                    {
                        setPotentialBuyers(data);
                    }).catch( error => {
                        setAlert({
                            type: "Data Retrieval",
                            message: error.message,
                            buttons: [
                                {
                                    text: "OK",
                                    onClick: () => setModalVisible(false)
                                }
                            ]
                        });
                        setModalVisible("alert");
                    });

            loaded.current = true;

        }
        if (!loaded.current && user_state.user) getData();
        else if (!loaded.current)
        {
            fetch(`${ base_url }/farmers?userID=${ user_state.user_id }`)
                .then( response =>
                    {
                        if (!response.ok) throw new Error(`Failed To Get: ${ user_state.user_id }`);
                        return response.json();
                    }).then( (data : UserType[]) =>
                        {
                           ;
                        } )
        }
    });
    return (
        <>
            <View style={ [global.header ]}>
                <MaterialCommunityIcons name="menu" size={35} color={ app_colors.secondary }/>
                <Image source={ require("@/assets/images/user.jpg")} style={{ width: 50, height: 50, borderRadius: 50, marginVertical: "auto" }}/>
            </View>
            <ScrollView
                contentContainerStyle={{
                    backgroundColor: "rgb(24, 26, 24)"
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={ styles.tiles_container }>
                    <View style={ styles.tile }>
                        <MaterialCommunityIcons name="bell-ring" color={ app_colors.tetiary } size={ 33 }/>
                        <Text style={ styles.num_bubble }>{ state.deliveries }</Text>
                        <Text> Notifications</Text>
                    </View>
                    <View style={ styles.tile }>
                        <MaterialCommunityIcons name="truck-delivery" color={ app_colors.tetiary } size={ 33 }/>
                        <Text style={ styles.num_bubble }>{ state.deliveries }</Text>
                        <Text> Deliveries</Text>
                    </View>
                    <View style={ styles.tile }>
                        <MaterialCommunityIcons name="handshake" color={ app_colors.tetiary } size={ 33 }/>
                        <Text style={ styles.num_bubble }>{ 39 }</Text>
                        <Text> Contracts</Text>
                    </View>
                    <View style={ styles.tile }>
                        <MaterialCommunityIcons name="truck-delivery" color={ app_colors.tetiary } size={ 33 }/>
                        <Text style={ styles.num_bubble }>{ state.deliveries }</Text>
                        <Text> Deliveries</Text>
                    </View>
                </View>
                <Text style={ global.title }> Potential Buyers</Text>
                {
                    PotentialBuyers.length ?
                        <FlatList
                            keyExtractor={ ( item : UserType ) => item.userID}
                            data={ PotentialBuyers }
                            renderItem={ ({ item }) => <ProduceCard crop={ item.main_crop } farmer={ item.userID } type='buyers-contractors'/> }
                            horizontal
                            showsHorizontalScrollIndicator={ false }
                        />
                        :
                        <>
                            <ScrollView horizontal showsHorizontalScrollIndicator={ false }>
                                <Text>{PotentialBuyers.length}</Text>
                                <ProduceCardSkeleton/>
                                <ProduceCardSkeleton/>
                                <ProduceCardSkeleton/>
                            </ScrollView>
                        </>
                }

            </ScrollView>
            <Modal visible={!modalVisible ? false : true } transparent >
                <Alert type={ alert.type } message={ alert.message} buttons={ alert.buttons }/>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create(
    {
        tiles_container:
        {
            width: "95%",
            height: 300,
            flexDirection: "row",
            flexWrap: "wrap",
            margin: "auto",            marginTop: 20
        },

        tile :
        {
            width: "45%",
            height: "45%",
            margin: "auto",
            backgroundColor: app_colors.secondary,
            borderRadius: 20,
            position: "relative",
            justifyContent: "center",
            alignItems: "center"
        },

        num_bubble:
        {
            width: 25,
            height: 25,
            borderRadius: 25,
            position: "absolute",
            backgroundColor: "red",
            right: -8,
            top: -8,
            textAlign: "center",
            textAlignVertical: "center"
        }
    }
);
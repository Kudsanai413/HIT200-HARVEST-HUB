import { View, Text, TextInput, StyleSheet, Appearance, Pressable, FlatList } from 'react-native'
import React, { useReducer, useState } from 'react'
import { app_colors, font } from '@/assets/styles/colors';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { styling as global } from '@/assets/styles/global';
import { ActionType } from '@/Context/types';

const filter_options : string[] = ["Tomatoes", "Carrots", "Onions", "cabbage", "Chitungwiza", "vacant", "produce", "farmers"]

const Filter_Opt = ( text : string, selected : string[], dispatch : React.Dispatch<ActionType> ) : React.JSX.Element =>
{
    const filter = StyleSheet.create(
        {
            tablet:
            {
                alignItems: "center",
                paddingHorizontal: 5,
                maxWidth: 100,
                height: 30,
                borderRadius: 30,
                backgroundColor: selected.includes(text) ? app_colors.tetiary : app_colors.skeleton,
                boxShadow: selected.includes(text) ? `0 0 5px ${ app_colors.tetiary }` : "0",
                marginHorizontal: 15,
                marginVertical: 7.5,
                justifyContent : "center"
            },

            text:
            {
                fontFamily: font.family,
                color: selected ? app_colors.black : Appearance.getColorScheme() === "dark" ? app_colors.white : app_colors.black,
                textAlignVertical: "center"
            },

            fill:
            {
                alignSelf: "stretch",
                height: "100%",
            }
        }
    )
    return(
        <View style={ filter.tablet }>
            <Pressable
                onPress={
                    () => {
                        if (selected.includes(text))
                        {
                            dispatch({ type: "ignite", payload: selected.filter(item => item !== text )})
                        }

                        else dispatch({ type: "ignite", payload: [...selected, text]})
                    }
                }
            >
                <Text> { text.toLowerCase() }</Text>
            </Pressable>
        </View>
    );
}

const initState = { selected: [] };

const reducer = (state : typeof initState, action : ActionType) : typeof initState | any =>
{
    switch(action.type)
    {
        case "ignite":
            return { ...state, selected:  action.payload  }

        default:
            alert("Unrecognized Action")
    }
}


export default function Search() {
    const [state, dispatch] = useReducer(reducer, initState);
    const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
	return (
		<>
            <View style={ styles.header }>
                <MaterialCommunityIcons name="numeric-9-plus-circle" color={ app_colors.primary } size={35}/>
                <Text style={ styles.headerTitle }>Search</Text>
                <MaterialCommunityIcons name="filter-plus" color={ app_colors.tetiary } size={ 33}/>
            </View>
			<View style={ styles.textbox }>
				<MaterialIcons name="search" size={ 28 }/>
				<TextInput
					placeholder='What Are Looking For Today'
					placeholderTextColor="black"
					value=""
					// onChangeText={ (text) => setSearch(text) }
					style={[ global.invisibleTextBox]}
                    onFocus={ () => setFiltersVisible(true) }


				/>
			</View>
            <View style={styles.filters }>
                <Pressable
                    onPress={ () => {
                        filtersVisible ?
                            setFiltersVisible(false)
                                : setFiltersVisible(true)
                    }}

                    style={styles.close}
                >
                    <Ionicons name={ filtersVisible ? "close" : "chevron-down-outline"} size={ 25}/>
                </Pressable>
                <Text style={ styles.filter_text }>Filters</Text>
                <View style={{ ...styles.filters, display: filtersVisible ? "flex" : "none", width: "100%", marginTop: 10 }}>
                    <FlatList
                        data={ filter_options }
                        keyExtractor={ (item) => item}
                        renderItem={ ({item}) => Filter_Opt(item, state.selected, dispatch)}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: "wrap",
                            justifyContent: "flex-start",
                            height:135,
                            alignItems: "center",
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
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

        header:
        {
            alignSelf: "stretch",
            flexDirection: "row",
            justifyContent: "space-between",
            height: 50,
            alignItems: "center",
            paddingHorizontal: 7
        },

        headerTitle:
        {
            fontFamily: font.family,
            fontSize: 22,
            color: Appearance.getColorScheme() === "light" ? app_colors.black : app_colors.white,
            fontWeight: 500
        },

        filters:
        {
            width: "80%",
            maxHeight: 200,
            marginHorizontal: "auto",
            position: "relative",
        },

        close:
        {
            position: "absolute",
            right: 0,
            top: 0,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center"
        },

        filter_text:
        {
            fontFamily: font.family,
            fontSize: 18,
            fontWeight: 300,
            color: Appearance.getColorScheme() === "dark" ? app_colors.white : app_colors.black
        }

	}
);
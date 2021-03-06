import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useContext, useEffect } from 'react';
import { Context } from '../context/FeedListContext'

const IndexScreen = ({ navigation }) => {
    const { state, deleteFeed, restoreState, deleteAll } = useContext(Context);

    useEffect(() => { restoreState }, []);

    return (
        <>
            <TouchableOpacity onPress={ deleteAll }>
                <Text style={styles.apaga}> ||||| === |  APAGAR TUDO | === |||||</Text>                
            </TouchableOpacity>
            
            <FlatList
                data={state}
                keyExtractor={(rssfeed) => rssfeed.urlFeed}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.urlFeed })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title}</Text>
                                <TouchableOpacity onPress={() => { deleteFeed(item.urlFeed) }}>
                                    <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>

                    );
                }}
            />
        </>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('Add') /* redireciono para 'Add' */ }}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    apaga:{
        fontSize: 22,
        fontWeight: '900',
        color: 'red'
    },
    icon: {
        fontSize: 24
    }
});

export default IndexScreen;

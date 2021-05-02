import React from 'react';
import { View, Text, StyleSheet, Button, Image, Linking } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Context as FeedListContext } from '../context/FeedListContext'
import { Context as FeedContext } from '../context/FeedContext'
import { useContext, useEffect } from 'react';
import rssfeed from '../api/rssfeed';
import { Feather } from '@expo/vector-icons';



const ShowFeedScreen = ({ navigation }) => {
    const feedListContext = useContext(FeedListContext);
    const feedID = navigation.getParam('id');
    const feed = feedListContext.state.find((feed) => feed.urlFeed === feedID);
    const fetch = rssfeed(feed.urlFeed);
    const { state, fetchItems, deleteItem, restoreState } = useContext(FeedContext);
    fetchItems(fetch);

    useEffect(() =>
        restoreState(), []);

    const abrirLink = (link) => {
        Linking.openURL(link)
            .catch(
                (erro) => console.error('ERRO: Erro ao abrir o link ', erro)
            );
    }

    return (
        <>

            <TouchableOpacity onPress={() => { navigation.navigate('Add') /* redireciono para 'Add' */ }}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>

            <FlatList
                data={state}
                keyExtractor={(item) => item.link}
                renderItem={({ item }) => {
                    
                    return (
                        <>
                            <View style={styles.row}>
                                <Image style={styles.image} source={{ uri:
                                item.imagem ? item.imagem : 
                                'http://talktoanimals.weebly.com/uploads/2/1/5/8/21585364/published/image-not-found.png?1533765593'
                            }} />
                                <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.dataPublicacao}>{item.dataPublicacao}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.descricao} numberOfLines={3} ellipsizeMode='tail'
                                    onPress={() => abrirLink(item.link)}>
                                    {item.descricao}
                                </Text>
                                <TouchableOpacity onPress={() => { deleteItem(item.link) }}>
                                    <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>

                            </View>
                        </>
                    );
                }}
            />
        </>
    );
};

//altere os estilos como desejar para melhorar o layout
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray',
        width: '90%',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        width: '30%',
    },
    image: {
        //pode alterar largura e altura como desejar
        width: 100,
        height: 100,
        borderRadius: 4,
        margin: 5
    },
    descricao: {
        fontSize: 8
    },
    dataPublicacao: {
        fontSize: 10,
        fontStyle: 'italic'
    },
    icon: {
        fontSize: 24
    }
});

export default ShowFeedScreen;

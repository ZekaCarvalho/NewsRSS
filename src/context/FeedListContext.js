import React from 'react';
import createDataContext from './createDataContext';
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'feed';

const rssFeeds =  [
    {
        title: 'G1 - Todas as notícias',
        urlFeed: 'http://g1.globo.com/dynamo/rss2.xml',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        title: 'G1 - Brasil',
        urlFeed: 'http://g1.globo.com/dynamo/brasil/rss2.xml',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        title: 'G1 - Tecnologia e Games',
        urlFeed: 'http://g1.globo.com/dynamo/tecnologia/rss2.xml',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        title: 'Jovem Nerd - Site Completo',
        urlFeed: 'http://jovemnerd.com.br/rss',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    }
    
];

/*
 * Executa a função provida sobre o estado.
 */
const feedListReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'add_feed':
            //adiciona feed ao state
            newState = [...state,
                {
                    title: action.payload.title,
                    urlFeed: action.payload.urlFeed
                }
            ];     

            // Salvo o estado do feed e retorno para atualização da View
            saveStateFeed(newState);
            return newState

        case 'delete_feed':
            newState = state.filter( f => f.urlFeed !== action.payload);
            
            deleteFeedStorage();
            return newState;
            
        case 'restore_state':
            newState = action.payload;
            return newState;

        case 'delete_all':
            clearStorage();
            return [];
        default:
            return state;
    }
};


/**
 * Funções base para 'feedListReducer'. 
 * Juntas, funcionam como funções agregadoras atuando sobre 
 * o estado passado como parametro para 'feedListReducer'.
 */

const addFeed = dispatch => {
    
    //Adiciono callback para evitar problemas com uso de chamadas assíncronas
    return (title, urlFeed, callback) => {
        dispatch({ type: 'add_feed', payload: { title, urlFeed } });
        
        if (callback) callback();
    };
};

const deleteFeed = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_feed', payload: id });
    };
};

const restoreState = dispatch => async () => {
    
        try {
             const savedState = await AsyncStorage.getItem(KEY);
            if (!savedState) {
                saveStateFeed(rssFeeds);
                console.log('não tem nada salvo [ FeedListContext ]');
            }
            else {
                dispatch({ type: 'restore_state', payload: JSON.parse(savedState) })
            }
        } catch (e) {
            console.log('erro: ' + e);
        }
    }


const deleteAll = dispatch => {
    return () => {
        dispatch({ type: 'delete_all' })
    }
}


// === === =| FUNÇÕES AUXILIARES |= === === 

const saveStateFeed = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        AsyncStorage.setItem(KEY, jsonValue);
    } catch (e) {
        console.log('erro: ' + e);
    }
}

const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    }
    catch (e) {
        console.log(e);
        alert('Algum problema ao limpar armazenamento');
    }
}

const deleteFeedStorage = async () => {
    try {
        await AsyncStorage.removeItem(KEY)
      } catch(e) {
        console.log('Erro: ' + e);
        alert('Houve algum problema ao deletar o item');
      }
  }






  
export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll },
    rssFeeds
);


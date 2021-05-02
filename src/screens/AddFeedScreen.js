import React from 'react';
import { useContext} from 'react';
import { StyleSheet } from 'react-native';
import FeedForm from '../components/FeedForm';
import {Context} from '../context/FeedListContext';


const AddFeedScreen = ({ navigation }) => {
    const { addFeed } = useContext(Context);
    
    return (
        <>
            <FeedForm style={styles.row} 
                buttonTitle="Adicionar Feed"
                onSubmit={
                    (title, content) => {
                        addFeed(title, content, () => navigation.navigate('Index')
                        )
                    }
                }/>
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    }
});

AddFeedScreen.defaultProps = {
    initialValues: {
        title: "",
        urlFeed: ""
    }
}

export default AddFeedScreen;

import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView,  FlatList, Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';
import Parse from 'parse/react-native';

const ParseAppId = 'parse-rn-example';
const ParseJSKey = 'parse-rn-jsKey';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(ParseAppId, ParseJSKey);
Parse.serverURL = 'http://172.30.1.77:3000/parse'

export default function App() {

    const [movies, setMovies] = useState([])

    resolveMovies = async () => {
        try {
            const Movies = Parse.Object.extend('Movie');
            const query = new Parse.Query(Movies);
            const results = await query.find();
            setMovies(results);
        } catch (error) {
            console.warn(error);
        }
    }

    useEffect(() => {
        resolveMovies();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.head}>Parse and ReactNative Example</Text>
            <FlatList
                style={{flex:1}}
                data={movies}
                renderItem={({item}) => (
                    <View style={styles.listItem}>
                        <Text>{item.get('title')}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    head: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 12,

    },
    listItem: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        margin: 2,
        padding: 4,
        height: 46,
        justifyContent: 'center'
    }
});

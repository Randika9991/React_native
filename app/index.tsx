import React from 'react';
import { Link } from 'expo-router';
import { View} from 'react-native';
import Loading from "./Loading";

export default function Index() {
    return (
        <View style={{ flex: 1 }}>
            <Link href="/Player" style={{ flex: 1 }}>
                <Loading />



                {/*Player*/}
                {/*LoginScreen*/}
                {/*home*/}
                {/*Songs*/}
            </Link>
        </View>
    );
}
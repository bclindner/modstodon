import React, { useEffect } from "react"
import { View, Text } from "react-native"

const AuthLoading = ({ loading, loggedIn, navigation }) => {
    useEffect(() => {
        if (!loading) {
            if (loggedIn) {
                navigation.navigate("App")
            } else {
                navigation.navigate("Auth")
            }
        }
    })
    return (
        <View>
            <Text>wait...</Text>
        </View>
    )
}

export default AuthLoading
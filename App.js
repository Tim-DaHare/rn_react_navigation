/**
 * @format
 * @flow
 */

import React from 'react'
import { Text, View, Button, Animated, Easing } from 'react-native'
import styles from './styles'
import { createStackNavigator, createAppContainer } from 'react-navigation'

const HomeScreen = ({ navigation }) => (
    <View style={styles.app__container}>
        <Text>Home {navigation.getParam('wow')}</Text>
        <Button
            title="Go to settings"
            onPress={() => navigation.navigate('Settings')}
        />
    </View>
)

const SettingsScreen = ({ navigation }) => (
    <View style={styles.app__container}>
        <Text>Settings</Text>
        <Button
            title="Go to Home"
            onPress={() => navigation.navigate('Home', { wow: 'wow' })}
        />
    </View>
)

const appNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: 'Home'
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                title: 'Settings'
            }
        }
    },
    {
        initialRouteName: 'Home',
        transitionConfig: () => ({
            transitionSpec: {
                duration: 200,
                timing: Animated.timing,
                useNativeDriver: true
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps

                const index = scene.index
                const width = layout.initWidth

                const translateX = position.interpolate({
                    inputRange: [index -1, index],
                    outputRange: [width, 0]
                })

                return { transform: [{ translateX }] }
            }
        })
    }
)

const AppContainer = createAppContainer(appNavigator)

const App = () => (
    <AppContainer />
)

export default App
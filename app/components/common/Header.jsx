import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

const HEADER_EXPANDED_HEIGHT = 100;
const HEADER_COLLAPSED_HEIGHT = 60;

const Header = ({scrollY}) => {
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
        extrapolate: 'clamp',
    });

    const titleFontSize = scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [32, 25],
        extrapolate: 'clamp',
    });

    const titleTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [0, 0],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View style={[styles.header, {height: headerHeight}]}>
            <Animated.Text
                style={[
                    styles.title,
                    {
                        fontSize: titleFontSize,
                        transform: [{translateY: titleTranslateY}],
                    },
                ]}
            >
                My Big Title
            </Animated.Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        // paddingBottom: 10,
        zIndex: 1000,
    },
    title: {
        fontWeight: 'bold',
        // paddingBottom:10,
    },
});

export default Header;

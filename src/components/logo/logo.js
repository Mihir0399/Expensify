import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Logo = ({color, marginVertical, elevation, size}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: marginVertical ? marginVertical : 90,
      }}>
      <Text
        style={{
          fontSize: size ? 30 : 80,
          fontWeight: '700',
          color: color ? color : '#3d7f8f',
          // elevation: elevation ? elevation : null,
        }}>
        E
      </Text>
      <Text
        style={{
          fontSize: size ? 15 : 40,
          fontWeight: '700',
          color: color ? color : '#3d7f8f',
          marginTop: size ? 8 : 24,
          // elevation: elevation ? elevation : null,
        }}>
        xpensify
      </Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({});

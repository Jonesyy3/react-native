import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

export const Timings = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton
          size={100}
          title="5"
          onPress={() => {
            onChangeTime(5);
          }}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={100}
          title="10"
          onPress={() => {
            onChangeTime(10);
          }}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={100}
          title="20"
          onPress={() => {
            onChangeTime(20);
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

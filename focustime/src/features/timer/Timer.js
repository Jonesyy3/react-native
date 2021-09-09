import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { colours } from '../../utils/colours';
import { spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { ProgressBar } from 'react-native-paper';
import { Timings } from './Timings';
import { RoundedButton } from '../../components/RoundedButton';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(null);
  const [progress, setProgress] = useState(1);
  const [newTime, setNewTime] = useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => {
        Vibration.vibrate(), 1000;
      });
      setTimeout(() => clearInterval(interval), 2000);
    } else {
      Vibration.vibrate(2000);
    }
  };

  const onEnd = () => {
    vibrate();
    setNewTime(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (time) => {
    setNewTime(time);
    setProgress(1);
    setIsStarted(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={newTime}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: 100 }}>
        <Text style={styles.title}> We are focusing on: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: 100 }}>
        <ProgressBar
          color="#5E84E2"
          progress={progress}
          style={{ paddheight: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timings onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton size={175} title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton size={175} title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-"size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xxxl,
  },
  title: {
    color: colours.white,
    textAlign: 'center',
    paddingTop: 50,
  },
  task: {
    color: colours.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    paddingTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: 20,
    paddingLeft: 20,
  },
});

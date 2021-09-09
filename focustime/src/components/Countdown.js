import React, { useState, useEffect } from 'react';
import { colours } from '../utils/colours';
import { spacing, fontSizes } from '../utils/sizes';
import { Text, View, StyleSheet } from 'react-native';

const minutesToMillis = (min) => {
  return min * 1000 * 60;
};

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  const interval = React.useRef(null);
  const countdown = () => {
    setMillis((time) => {
      if (!time) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
    if(!millis) {
      onEnd();
    }
  }, [minutes]);

useEffect(() => {
      onProgress(millis / minutesToMillis(minutes));
}, [millis])

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countdown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  setInterval;
  return (
    <Text style={styles.text}>
      {formatTime(minute)} : {formatTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colours.white,
    padding: spacing.lg,
    marginTop: 70,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});

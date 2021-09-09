import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { RoundedButton } from './src/components/RoundedButton';
import { colours } from './src/utils/colours';
import { spacing } from './src/utils/sizes';
import { FocusHistory } from './src/features/focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUS = {
  COMPLETE: 1,
  FAILED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusSubjectWithStatus = (key, subject, status) => {
    setFocusHistory([...focusHistory, {key:String(focusHistory.length+1), subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };
  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if(history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history))
      }
    } catch (e) {
      console.log(e);
    }
  };

//empty array means do on load
  useEffect(() => {
    loadFocusHistory();
  }, [])

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  console.log(focusHistory);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <View>
          <Timer
            focusSubject={focusSubject}
            clearSubject={() => {
              addFocusSubjectWithStatus(focusSubject, STATUS.FAILED);
              setFocusSubject(null);
            }}
            onTimerEnd={() => {
              addFocusSubjectWithStatus(focusSubject, STATUS.COMPLETE);
              setFocusSubject(null);
            }}
          />
          <RoundedButton
            size={50}
            title="Back"
            onPress={() => {
              setFocusSubject(null);
            }}
          />
        </View>
      ) : (
        <View style={{flex:1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.md,
    backgroundColor: colours.darkBlue,
  },
});

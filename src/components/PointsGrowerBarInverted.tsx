import { fontSize, spacing } from 'app/theme';
import { debugOptions } from 'app/utils/debugOptions';
import print from 'app/utils/log';
import { vibrationShort, vibrationShortest } from 'app/utils/vibration';
import { LinearGradient } from 'expo-linear-gradient';
import { Moment } from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { Text } from '../components/Text';

interface PointsGrowerBarInvertedProps {
  duration: number;
  textDescription: string;
  textUntil: string | null;
  valueRight: number;
  barFraction: number;
  colorBlurLeft: string;
  colorBlurRight: string | null;
  borderColor: string;
  backgroundColorProp: string;
  borderWidth: number;
  resetPointsMoment: Moment;
}

export const PointsGrowerBarInverted: React.FC<
  PointsGrowerBarInvertedProps
> = ({
  duration,
  textDescription,
  textUntil,
  valueRight,
  barFraction,
  colorBlurLeft,
  colorBlurRight,
  borderColor,
  backgroundColorProp,
  borderWidth,
  resetPointsMoment,
}) => {
  const numSteps = 25;
  const timeStep = duration / numSteps;
  const pointStep = valueRight / numSteps;

  const progressAnim = useRef(new Animated.Value(0));
  const colorAnim = useRef(new Animated.Value(0));
  const [pointsUp, setPointsUp] = useState<number>(0);

  const aProgress: any = Animated.timing(progressAnim.current, {
    toValue: barFraction,
    duration,
    useNativeDriver: false,
    // easing: Easing.linear,
  });

  const aColor: any = Animated.timing(colorAnim.current, {
    toValue: 1,
    duration,
    useNativeDriver: false,
  });

  useEffect(() => {
    aProgress.start(() => {
      print.white('ANIMATION DONE');
    });
    // aColor.start(() => {});
  }, [valueRight, barFraction, progressAnim.current, colorAnim.current]);

  useEffect(() => {
    // print.yellow('RESETTING POINTS', resetPointsMoment.format('HH:mm:ss'))
    let myPoints = 0;
    let myStep = 0;
    setPointsUp(0);

    //----------------------------------------
    // ANIMATIONS
    //----------------------------------------
    progressAnim.current = new Animated.Value(0);
    colorAnim.current = new Animated.Value(0);

    //----------------------------------------
    // NUMBER
    //----------------------------------------
    const myInterval = setInterval(() => {
      if (myPoints >= valueRight) {
        setPointsUp(valueRight);
        debugOptions.extraVibrations && vibrationShort();
        clearInterval(myInterval);
        return;
      }
      myPoints += pointStep;
      myStep += 1;
      if (myStep % 2 === 0) {
        debugOptions.extraVibrations && vibrationShortest();
      }
      setPointsUp(myPoints);
    }, timeStep);
  }, [resetPointsMoment]);

  const backgroundColorInterpolation = colorAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', colorBlurLeft],
    // inputRange: [0, 0.25, 0.5, 0.75, 1],
    // outputRange: ['transparent', 'red', 'blue', 'yellow', colorBlurLeft],
  });

  const widthInterpolation = progressAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%'],
  });

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
          paddingHorizontal: spacing.paddingScreen,
        }}>
        <Text
          style={{
            fontSize: fontSize.sm,
          }}>
          {textDescription}
        </Text>
        <Text
          style={{
            fontSize: fontSize.sm,
          }}>
          {Math.floor(pointsUp)}
        </Text>
      </View>

      <LinearGradient
        style={{
          overflow: 'hidden',
          borderColor,
          borderWidth,
          height: 20,
          width: '90%',
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 5,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[
          colorBlurLeft,
          colorBlurRight !== null ? colorBlurRight : 'gold',
        ]}>
        <Animated.View
          style={{
            height: '100%',
            width: widthInterpolation,
            backgroundColor: backgroundColorProp,
          }}
        />
      </LinearGradient>

      <View
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        {textUntil !== null && (
          <Text
            style={{
              fontSize: fontSize.sm,
            }}>
            {textUntil}
          </Text>
        )}
        {textUntil !== null && (
          <Text
            style={{
              fontSize: fontSize.sm,
            }}>
            {Math.floor(pointsUp)}
          </Text>
        )}
      </View>
    </View>
  );
};

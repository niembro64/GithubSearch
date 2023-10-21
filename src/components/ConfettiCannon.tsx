import React from 'react';
import Confetti from 'react-native-confetti-cannon';
import {ScreenWidth} from 'react-native-elements/dist/helpers';
import {colors} from '../colors';

interface ConfettiCannonProps {}

export const ConfettiCannon: React.FC<ConfettiCannonProps> = ({}) => {
  // const [useColors, setUseColors] = useState<string[] | null>(null);

  // const slpColors: string[] = [
  //   colors.palette.blue500,
  //   colors.palette.blue500,
  //   colors.palette.blue200,
  //   colors.palette.blue200,
  //   colors.palette.blue900,
  //   colors.palette.blue900,
  //   colors.palette.green900,
  //   colors.palette.green900,
  //   colors.palette.green500,
  //   colors.palette.yellow500,
  // ];

  // const greenColors: string[] = [
  //   colors.palette.green200,
  //   colors.palette.green500,
  //   colors.palette.green500,
  //   colors.palette.green200,
  //   colors.palette.green200,
  //   colors.palette.green900,
  //   colors.palette.green900,
  //   colors.palette.green900,
  //   colors.palette.green900,
  // ];

  // const blueColors: string[] = [
  //   colors.palette.blue200,
  //   colors.palette.blue500,
  //   colors.palette.blue500,
  //   colors.palette.blue200,
  //   colors.palette.blue200,
  //   colors.palette.blue900,
  //   colors.palette.blue900,
  //   colors.palette.blue900,
  //   colors.palette.blue900,
  // ];

  const goldColors: string[] = [
    colors.palette.yellow200,
    colors.palette.yellow500,
    colors.palette.yellow500,
    colors.palette.yellow200,
    colors.palette.yellow200,
    colors.palette.yellow900,
    colors.palette.yellow900,
    colors.palette.yellow900,
    colors.palette.yellow900,
  ];

  // const silverColors: string[] = [
  //   colors.palette.gray200,
  //   colors.palette.gray500,
  //   colors.palette.gray500,
  //   colors.palette.gray200,
  //   colors.palette.gray200,
  //   colors.palette.gray300,
  //   colors.palette.gray300,
  //   colors.palette.gray900,
  //   colors.palette.gray900,
  // ];

  // const bronzeColors: string[] = [
  //   colors.palette.bronze200,
  //   colors.palette.bronze500,
  //   colors.palette.bronze500,
  //   colors.palette.bronze200,
  //   colors.palette.bronze200,
  //   colors.palette.bronze900,
  //   colors.palette.bronze900,
  //   colors.palette.bronze900,
  //   colors.palette.bronze900,
  // ];

  // const pinkColors: string[] = [
  //   colors.palette.pink200,
  //   colors.palette.pink500,
  //   colors.palette.pink500,
  //   colors.palette.pink200,
  //   colors.palette.pink200,
  //   colors.palette.pink900,
  //   colors.palette.pink900,
  //   colors.palette.pink900,
  //   colors.palette.pink900,
  // ];

  // useEffect(() => {
  //   switch ('gold') {
  //     case 'gold':
  //       setUseColors(goldColors);
  //       break;
  //     // case 'silver':
  //     //   setUseColors(silverColors);
  //     //   break;
  //     // case 'bronze':
  //     //   setUseColors(bronzeColors);
  //     //   break;
  //     // case 'blue':
  //     //   setUseColors(blueColors);
  //     //   break;
  //     // case 'green':
  //     //   setUseColors(greenColors);
  //     //   break;
  //     // case 'pink':
  //     //   setUseColors(pinkColors);
  //     //   break;
  //     // case 'slp':
  //     //   setUseColors(slpColors);
  //     //   break;
  //     // default:
  //     //   setUseColors(slpColors);
  //     //   break;
  //   }

  //   // playExplode();
  // }, [goldColors]);

  return (
    <>
      {
        <Confetti
          count={50}
          origin={{x: ScreenWidth / 2 - 8, y: -100}}
          autoStart={true}
          fadeOut={true}
          // fallSpeed={3000}
          explosionSpeed={1000}
          colors={goldColors}
        />
      }
    </>
  );
};

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import styles from './style';

type Variant = 'default' | 'operator' | 'equal' | 'clear';

type BtnProps = {
  label: string;
  onPress: () => void;
  wide?: boolean;
  variant?: Variant;
};

export default function App(): React.ReactElement {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string>('');

  const handleNumberInput = (num: number) => {
    setDisplayValue(displayValue === '0' ? num.toString() : displayValue + num);
  };

  const handleOperatorInput = (op: string) => {
    setOperator(op);
    setFirstValue(displayValue);
    setDisplayValue('0');
  };

  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);
    if (isNaN(num1) || isNaN(num2) || !operator) return;

    let result = 0;
    if (operator === '+') result = num1 + num2;
    else if (operator === '-') result = num1 - num2;
    else if (operator === '*') result = num1 * num2;
    else if (operator === '/') result = num2 === 0 ? NaN : num1 / num2;

    setDisplayValue(Number.isFinite(result) ? String(result) : 'Error');
    setOperator(null);
    setFirstValue('');
  };

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
  };

  const Btn = ({ label, onPress, wide, variant = 'default' }: BtnProps) => {
    const baseStyle = wide ? styles.btnWide : styles.btn;
    const styleByVariant =
      variant === 'equal'
        ? styles.btnEqual
        : variant === 'clear'
        ? styles.btnClear
        : styles.btn; // default/operator use same white background

    const textStyle =
      variant === 'operator'
        ? styles.btnTextOperator
        : variant === 'equal'
        ? styles.btnTextEqual
        : styles.btnText;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[baseStyle, styleByVariant]}
        onPress={onPress}
      >
        <Text style={textStyle}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F3F3" />

      {/* Display: nền sáng, số đen, căn giữa (giống ảnh) */}
      <View style={styles.display}>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.displayText}>
          {displayValue}
        </Text>
      </View>

      {/* Keypad */}
      <View style={styles.keypad}>
        <View style={styles.row}>
          <Btn label="7" onPress={() => handleNumberInput(7)} />
          <Btn label="8" onPress={() => handleNumberInput(8)} />
          <Btn label="9" onPress={() => handleNumberInput(9)} />
          <Btn label="+" variant="operator" onPress={() => handleOperatorInput('+')} />
        </View>

        <View style={styles.row}>
          <Btn label="4" onPress={() => handleNumberInput(4)} />
          <Btn label="5" onPress={() => handleNumberInput(5)} />
          <Btn label="6" onPress={() => handleNumberInput(6)} />
          <Btn label="×" variant="operator" onPress={() => handleOperatorInput('*')} />
        </View>

        <View style={styles.row}>
          <Btn label="1" onPress={() => handleNumberInput(1)} />
          <Btn label="2" onPress={() => handleNumberInput(2)} />
          <Btn label="3" onPress={() => handleNumberInput(3)} />
          <Btn label="−" variant="operator" onPress={() => handleOperatorInput('-')} />
        </View>

        <View style={styles.row}>
          <Btn label="0" wide onPress={() => handleNumberInput(0)} />
          <Btn label="÷" variant="operator" onPress={() => handleOperatorInput('/')} />
          <Btn label="=" variant="equal" onPress={handleEqual} />
        </View>

        {/* Thanh C bên dưới (giống thanh rộng màu xám nhạt) */}
        <View style={styles.bottomBar}>
          <Btn label="C" variant="clear" onPress={handleClear} />
        </View>
      </View>
    </SafeAreaView>
  );
}

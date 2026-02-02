import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuantityStepper = (props: QuantityStepperProps) => {
  const { quantity, onIncrement, onDecrement } = props;

  return (
    <View style={styles.stepper}>
      <TouchableOpacity
        onPress={onDecrement}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
        accessibilityHint={`Current quantity is ${quantity}`}
        style={styles.stepperButton}
        activeOpacity={0.7}
      >
        <Text style={styles.stepperButtonText}>−</Text>
      </TouchableOpacity>
      <Text
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel={`Quantity: ${quantity}`}
        style={styles.stepperCount}
      >
        {quantity}
      </Text>
      <TouchableOpacity
        onPress={onIncrement}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
        accessibilityHint={`Current quantity is ${quantity}`}
        style={styles.stepperButton}
        activeOpacity={0.7}
      >
        <Text style={styles.stepperButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  stepperButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  stepperButtonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  stepperCount: {
    width: 36,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});

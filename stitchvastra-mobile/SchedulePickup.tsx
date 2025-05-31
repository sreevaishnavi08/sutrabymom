import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

interface SchedulePickupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SchedulePickup: React.FC<SchedulePickupProps> = ({ isOpen, onClose }) => {
  return (
    <Modal visible={isOpen} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Schedule Pickup</Text>
        <Text style={styles.description}>Select a date and time for your pickup.</Text>
        {/* Add date and time picker here */}
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 20,
  },
});

export default SchedulePickup;

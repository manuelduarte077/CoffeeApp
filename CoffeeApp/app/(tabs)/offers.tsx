import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function OffersScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Offers</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

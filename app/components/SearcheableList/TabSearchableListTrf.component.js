import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ScrollView} from 'react-native';
import styles from './TabSearchableListTrf.styles';


class TabSearchableListTrf extends React.Component {
  static propTypes = {
    detailProductData: PropTypes.array,
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.containerBifast}>
          <Text style={styles.midContainer} />
        </View>
      </ScrollView>
    );
  }
}

export default TabSearchableListTrf;

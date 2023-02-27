import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import styles from './Tabs.styles';
import {result} from 'lodash';

class Casa extends React.Component {
  static propTypes = {
    detailProductData: PropTypes.array,
  }

  render () {
    const {detailProductData} = this.props;
    const description = result(detailProductData, 'description', '');
    return (
      <View style={styles.tabInvestmentContainer}>
        <View style={styles.transparentContainer}>
          <Text>{description}</Text>
        </View>
      </View>

    );
  }
}

export default Casa;
import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './TabShop.styles';
import SimasPoinHistory from '../Egift/SimasPoinHistory.component';


class SimasPoinPage extends React.Component {
  static propTypes = {
    simasPoinHistory: PropTypes.object,
    getSimasPoinHistory: PropTypes.func,
  }

  render () {
    const {simasPoinHistory = [], getSimasPoinHistory} = this.props;
    return (
      <View style={styles.containerTab}>
        <SimasPoinHistory simasPoinHistory={simasPoinHistory} getSimasPoinHistory={getSimasPoinHistory}/>
      </View>
    );
  }
}

export default SimasPoinPage;

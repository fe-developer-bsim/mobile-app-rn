import React from 'react';
import PropTypes from 'prop-types';
import styles from './SimasPoinHeader.styles';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import result from 'lodash/result';
import Poin from '../../assets/images/poin.png';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {currencyFormatter} from '../../utils/transformer.util';

class SimasPoinHeader extends React.Component {
  static propTypes = {
    simasPoin: PropTypes.object,
    onReload: PropTypes.func,
  }

  render () {
    const {simasPoin, onReload} = this.props;
    const poin = result(simasPoin, 'simasPoin.data.total_point', 0);
    const isLockdown = result(simasPoin, 'isLockdown', true);
    const status = result(simasPoin, 'status', 'loading');
    return (
      <View>
        {isLockdown ?
          status === 'success' ?
            <View style={styles.container}>
              <Text style={styles.amount}>{currencyFormatter(poin)} </Text>
              <View style={styles.imageContainer}><Image source={Poin} style={styles.poinImage}/></View>
            </View>
            :
            status === 'error' ?
              <Touchable onPress={onReload} style={styles.container}>
                <Text style={styles.error}>{language.SIMAS_POIN__RELOAD} </Text>
                <View style={styles.imageContainer}><SimasIcon name='reload' style={styles.iconStyle} size={20}/></View>
              </Touchable>
              :
              <View style={styles.container}>
                <Text style={styles.loading}>{language.EMONEY__DASHBOARD_LOADING} </Text>
                <View style={styles.imageContainer}><ActivityIndicator/></View>
              </View>
          :
          null
        }
      </View>
    );
  }
}

export default SimasPoinHeader;

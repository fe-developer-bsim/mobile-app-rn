import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator} from 'react-native';
import {language} from '../../config/language';
import styles from './CardSpinner.styles';
import noop from 'lodash/noop';
import Touchable from '../Touchable.component';

class CardSpinner extends React.Component {
  static propTypes = {
    loadingError: PropTypes.bool,
    onReload: PropTypes.func
  }

  render () {
    const {loadingError = false, onReload = noop} = this.props;
    return (
      <View style={styles.container}>
        {loadingError ?
          <Touchable onPress={onReload}>
            <View style={styles.textContainer}>
              <Text style={styles.refreshText}>{language.DASHBOARD__RELOAD_ACCOUNTS}</Text>
            </View>
          </Touchable>
          :
          <ActivityIndicator color={styles.red} size={styles.spinner}/>
        }
      </View>
    );
  }
}

export default CardSpinner;

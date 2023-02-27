import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {language} from '../../config/language';
import styles from './Payment.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Field} from 'redux-form';
import {SinarmasIconInput, SinarmasButton} from '../FormComponents';

class QRPromoDetail extends React.Component {
  static propTypes = {
    goToConfirmation: PropTypes.func,
    invalid: PropTypes.bool,
  }

  render () {
    const {goToConfirmation, invalid = false} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.middleContainer}>
          <Text style={styles.title}>{language.EGIFT__SEND_TO}</Text>
          <Field
            name={'email'}
            component={SinarmasIconInput}
            theme='primary'
            style={styles.fieldContainer}
            label={language.IDENTITYSECONDFORM__EMAIL_TITLE}
            placeholder={language.HINTTEXT__EMAIL}/>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <SimasIcon style={styles.iconColor} name='caution-circle' size={24}/>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.info}>{language.EGIFT__SEND_EMAIL}</Text>
            </View>
          </View>
          <SinarmasButton disabled={invalid} text={language.GENERIC_BILLER__CONFIRM_PAYMENT_BUTTON} onPress={goToConfirmation}/>
        </View>
      </View>
    );
  }
}

export default QRPromoDetail;

import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './ConfirmationAccount.styles';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import BankSinarmasLogo from '../../assets/images/banksinarmas.png';

class ConfirmationAccountComponent extends React.Component {
  static propTypes = {
    onExistingAccountBankPress: PropTypes.func,
    onNewToBankPress: PropTypes.func,
  }

  render () {
    const {onExistingAccountBankPress, onNewToBankPress} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.bankLogoContainer}>
            <Image source={BankSinarmasLogo} style={styles.bankSinarmasLogo}  />
          </View>
        </View>
        <View style={styles.mainTextWrapper}>
          <Text style={styles.text}>{language.CONFIRMATION_ACCOUNT_EXISTING_TITLE}</Text>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.footerContainer}>
            <SinarmasButton text={language.CONFIRMATION_ACCOUNT_EXISTING_BUTTON_YES} style={styles.mainbutton} onPress={onExistingAccountBankPress}/>
          </View>
          <SinarmasButton text={language.CONFIRMATION_ACCOUNT_EXISTING_BUTTON_NO} style={styles.secondButton} onPress={onNewToBankPress}/>
        </View>
      </View>
    );
  }
}

export default ConfirmationAccountComponent;

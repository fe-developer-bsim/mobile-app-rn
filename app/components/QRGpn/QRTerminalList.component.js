import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRTerminalList.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';

class QRTerminalList extends React.Component {

  static propTypes = {
    isMerchantAccount: PropTypes.array,
    merchant_pan_name: PropTypes.string,
    username: PropTypes.string,
    mobile_number: PropTypes.string,
    pan: PropTypes.string,
    getTerminalDelete: PropTypes.func,
    getTerminalEdit: PropTypes.func,
    getTerminalReset: PropTypes.func,
    getMerchantTerminal: PropTypes.func,
    user_status: PropTypes.string,
    terminal_id: PropTypes.string,
  }

  render () {
    const {username, mobile_number, user_status, getTerminalDelete, getTerminalReset} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' style={styles.container} extraHeight={120}>
        { user_status === 'on_process' || user_status === 'active' ?
          <View>
            <View style={styles.terminalContainer}>
              <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.bold}>{language.QR_GPN__TERMINAL_CASHIERS}</Text>
                  <Text style={styles.nameStyle}>{username}</Text>
                </View>
                <View style={styles.row}>
                  <Touchable onPress={getTerminalDelete}>
                    <SimasIcon name={'trash'} size={22} style={styles.icon}/>
                  </Touchable>
                </View>
              </View>
              <View style={styles.row2}>
                <View>
                  <Text>{mobile_number}</Text>
                </View>
                <View style={styles.resetContainer}>
                  <Touchable onPress={getTerminalReset}>
                    <Text style={styles.red}>{language.QR_GPN__TERMINAL_RESET}</Text>
                  </Touchable>
                </View>
              </View>
            </View>
          </View>
          :
          null
        }
      </KeyboardAwareScrollView>
    );
  }
}


export default QRTerminalList;

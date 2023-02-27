import React from 'react';
import PropTypes from 'prop-types';
import {View, Clipboard, Text, ScrollView} from 'react-native';
import {Toast} from '../../utils/RNHelpers.util.js';
import styles from './GenerateCodeTimeout.styles';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {result} from 'lodash';
import Barcode from 'react-native-barcode-builder';
import BackgroundTimer from 'react-native-background-timer';

class TapGenerateCodeNumber extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    generateNewCode: PropTypes.func,
    handleSubmit: PropTypes.func,
    goBack: PropTypes.func,
    finish: PropTypes.func,
    goToMainOffline: PropTypes.func,
    timeout: PropTypes.func,
  }
  writeToClipboard = () => {
    const {navigation} = this.props;
    const code = result(navigation, 'state.params.code', '');
    Clipboard.setString(code);
    Toast.show('Code copied to clipboard', Toast.LONG);
  };

  componentWillReceiveProps (newProps) {
    const respoonseCodeSuccess = result(newProps, 'isSuccess.responseCode', false);
    if (respoonseCodeSuccess === true) {
      BackgroundTimer.clearInterval(this.interval);
    } else if (this.state.secondsRemaining < 0) {
      BackgroundTimer.clearInterval(this.interval);
    }
  }

  render () {
    const {finish, navigation} = this.props;
    let code = String(result(navigation, 'state.params.code', ''));
    const showCode = String(code).replace(/(.{4})/g, '$1 ');
    return (
      <ScrollView>
        <View style={styles.containerWhite}>
          <View style={styles.containerButtonX}>
            <Touchable style={styles.buttonX} onPress={finish}>
              <SimasIcon name='close' style={styles.closeIcon} size={20}/>
            </Touchable>
          </View>
          <View style={styles.viewImageSand2}>
            <Barcode value={code} format='CODE128' width={2.5} height={80}/>
            <Text style={styles.codeText}>{showCode}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default TapGenerateCodeNumber;
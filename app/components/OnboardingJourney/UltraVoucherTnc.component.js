import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './UltraVoucherTnc.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import Touchable from '../Touchable.component';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import {noop} from 'lodash';
import WebView from 'react-native-webview';

class UltraVoucherTnc extends React.Component {
  static propTypes = {
    goToNextPage: PropTypes.func,
    currentLanguage: PropTypes.string,
    toogleCheckbox: PropTypes.func,
    checked: PropTypes.bool,
    alfacartTncUrlEn: PropTypes.string,
    alfacartTnCUrlId: PropTypes.string,
    nav: PropTypes.object,
    url: PropTypes.string,
    feedbackChecklist: PropTypes.bool,
    isLockedDevice: PropTypes.bool,
    goToNextPageNLD: PropTypes.func
  };
  state = {
    checked: false,
    disable: false
  };

  toogleCheckbox = (checked) => {
    this.setState({checked, disable: checked});
  };

  render () {
    const {url, goToNextPage = noop, nav} = this.props;

    return (
      <View style={styles.container}>
        <WebView source={{uri: url}} />
        <View>
          <Touchable style={styles.rowNoSpace}>
            <CheckBox
              onChange={this.toogleCheckbox}
              uncheckedImage={RedCheckBox}
              checkedImage={UnCheckBox}
              label=''
              checkboxStyle={styles.checkboxStyle}
              checked={!this.state.checked} // somehow checked value is reversed
            />
            <Text style={styles.tncTxt}> {language.ALFACART_TEXT_TNC}</Text>
          </Touchable>
        </View>
        <View style={styles.buttonContainer}>
          <SinarmasButton
            disabled={!this.state.disable}
            onPress={goToNextPage(nav)}
          >
            <Text style={styles.nextButton}>
              {language.ALFACART_BUTTON_TNC}
            </Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default UltraVoucherTnc;

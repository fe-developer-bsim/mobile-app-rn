import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './TnCLoan.style';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {WebView} from 'react-native-webview';
import SuccessIcon from '../../assets/images/success-done-signing.png';
import {Platform} from 'react-native';
let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}

class SignSignatureLoan extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    urlAndroid: PropTypes.string,
    urlIos: PropTypes.string,
    goBackHome: PropTypes.func,
    goToLanding: PropTypes.func,
    code: PropTypes.string,
    cif: PropTypes.string,
    productCode: PropTypes.string
  }

  state ={
    buttonDisable: false,
    hideWeb: ''
  }

  onSubmit = () => {
    const {goBackHome} = this.props;
    this.setState({buttonDisable: true}, () => {
      goBackHome();
      setTimeout(() => {
        this.setState({buttonDisable: false});
      }, 5000);
    });
  }

  onMessage = () => {
    this.setState({hideWeb: '1'});
  }
  
  render () {
    const {urlAndroid, goToLanding, code, cif, productCode} = this.props;
    let jsCode = `document.getElementsByClassName('btn btn-info')[0].addEventListener('click', function(){
      window.ReactNativeWebView.postMessage("true")
    })
    true`;
    let adjustEvent;
    if (productCode.includes('CC')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('geq1m6');
        adjustEvent.addCallbackParameter('page_id', 'ak-daocc-11');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    }

    return (
      <View style={styles.bodyContainer}>
        {this.state.hideWeb === '1' ? 
          <View style={styles.successTextWeb}>
            <Image source={SuccessIcon} style={styles.successDone}/>
            <Text>{language.OPENING__SUCCESS_MESSAGE_SIGNING_TITLE}</Text>
            <Text>{language.OPENING__SUCCESS_MESSAGE_SIGNING_SUBTITLE}</Text>
          </View> :
          <WebView source={urlAndroid}
            injectedJavaScript={jsCode}
            onMessage={this.onMessage}
            domStorageEnabled = {true}
            javaScriptEnabled={true}/>}
        {this.state.hideWeb === '1' &&
        <View style={styles.buttonWrapper}>
          <View style={styles.anotherLink}>
            <Text>{language.PGO__NOTE_AFTER_SIGN}</Text>
          </View>
          <SinarmasButton onPress={this.onSubmit} disabled={this.state.buttonDisable}>
            <Text style={styles.nextButton}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButton>
        </View>
        }
        {code === 'LoanKPR' ?
          <View style={styles.buttonWrapper}>
            <SinarmasButton onPress={goToLanding}>
              <Text style={styles.nextButton}>{language.GENERIC__CLOSE}</Text>
            </SinarmasButton>
          </View>
          : null
        }
      </View>
    );
  }
}

export default SignSignatureLoan;

import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './Products.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {noop, result} from 'lodash';
import WebView from 'react-native-webview';

class ProductsTnc extends React.Component {
  static propTypes = {
    goToNextPage: PropTypes.func,
    currentLanguage: PropTypes.string,
    nav: PropTypes.object,
    urlTNCID: PropTypes.string,
    urlTNCEN: PropTypes.string,
    endReached: PropTypes.func
  }
  
  state = {
    checked: false
  }

  scollingToEnd = () => {
    this.webscroll.scrollToEnd();
  }

  message = (data) => {
    const {endReached} = this.props;
    endReached();
    const checkBox = result(data, 'nativeEvent.data', false);
    if (checkBox) {
      this.setState({checked: !this.state.checked});
    }
  }

  render () {
    const {currentLanguage, goToNextPage = noop, nav, urlTNCID, urlTNCEN} = this.props;
    const url = currentLanguage === 'en' ? urlTNCEN : urlTNCID;

    let GET_VALUE_CHECKBOX = `document.getElementById('checkbox').addEventListener('click', function(){
      window.ReactNativeWebView.postMessage("true")
    })
    true`;

    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBgProductItems}>
          <WebView style={styles.containerTnc} source={{uri: url}}
            javaScriptEnabled={true}
            injectedJavaScript={GET_VALUE_CHECKBOX}
            onMessage={this.message}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.buttonTNCContainer}>
            <SinarmasButton onPress={goToNextPage(nav)} disabled={!this.state.checked}>
              <Text style={styles.nextButton}>{language.SMARTFREN__AGREE_BUTTON}</Text>
            </SinarmasButton>
          </View>
        </View>
      </View>
    );
  }
}

export default ProductsTnc;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import result from 'lodash/result';
import styles from './NewProxyConfirmationBIFast.style';
import {language} from '../../config/language';
import noop from 'lodash/noop';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class FundTransferConfirmation extends Component {
  static propTypes = {
    payee: PropTypes.object,
    handleSubmit: PropTypes.func,
    triggerAuth: PropTypes.func,
    currentDate: PropTypes.string,
    isOwnAccount: PropTypes.bool,
    doTransfer: PropTypes.func,
    resData: PropTypes.object,
    config: PropTypes.object,
    gapTime: PropTypes.number,
    billerFavorite: PropTypes.array,
    favoriteBill: PropTypes.string,
    showFavorite: PropTypes.func,
    removeFavorite: PropTypes.func,
    ownAccount: PropTypes.array,
    saveAlias: PropTypes.func,
    isFavorite: PropTypes.bool,
    navigation: PropTypes.object,
    timeConfig: PropTypes.object,
  }

  state = {
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed: true,
  }

  setContainerHeightStyle = (e) => {
    this.setState({containerHeightStyle: {minHeight: e.nativeEvent.layout.height - 20}});
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
  }

  expand = () => {
    this.setState({showExpand: !this.state.showExpand});
  }

  render () {
    const {navigation, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const addProxyAddress = result(navigation, 'state.params.addProxyAddress', '');
    const proxyAlias = result(navigation, 'state.params.proxyAlias', '');
    const accountName = result(navigation, 'state.params.myAccount.name', '');
    const accountNumb = result(navigation, 'state.params.myAccount.accountNumber', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraScrollHeight={100} enableOnAndroid={true}>
        <View>
          <View style={styles.containerDiv}>
            <View style={styles.containerTransferType}>
              <Text style={styles.titles}>{language.BIFAST_NEW_PROXY_ACCOUNT}</Text>
            </View>
            
            <View style={styles.containtextExplanation}>
              <View style={styles.senderDetail}>
                <View style={styles.rightItemContainer}>
                  <Text style={styles.captionText}>{language.BIFAST_PROXY_ADDRESS_TYPE}</Text>
                  <Text style={styles.sendAccNumber}>{addProxyAddress}</Text>
                </View>
              </View>
            </View>
            <View style={styles.labelSpacing} />

            <View style={styles.containtextExplanation}>
              <View style={styles.senderDetail}>
                <View style={styles.rightItemContainer}>
                  <Text style={styles.captionText}>{language.HINTTEXT__ALIAS}</Text>
                  <Text style={styles.sendAccNumber}>{proxyAlias}</Text>
                </View>
              </View>
            </View>
            <View style={styles.labelSpacing} />
              
            <View style={styles.containtextExplanation}>
              <View style={styles.senderDetail}>
                <View style={styles.rightItemContainer}>
                  <Text style={styles.captionText}>{language.BIFAST_PROXY_ACCOUNT}</Text>
                  <Text style={styles.sendAccNumber}>{accountName} - {accountNumb}</Text>
                </View>
              </View>
            </View>
              
          </View>
        </View>

        <View style={styles.buttonBottom}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)}  disabled={invalid || submitting} >
            <Text style={styles.buttonLargeTextStyle}>{language.GENERATE_CONFIRMATION_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default FundTransferConfirmation;
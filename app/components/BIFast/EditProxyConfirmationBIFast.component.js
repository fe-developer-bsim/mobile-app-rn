import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import result from 'lodash/result';
import styles from './EditProxyConfirmationBIFast.style';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationActions} from 'react-navigation';
import {wrapMethodInFunction} from '../../utils/transformer.util';

class FundTransferConfirmation extends Component {
  static propTypes = {
    formValues: PropTypes.object,
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
    dispatch: PropTypes.func
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
  backtoPreviousPage= () => {
    this.props.dispatch(NavigationActions.back());
  }

  render () {
    const {navigation, handleSubmit, formValues} = this.props;
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
                  {result(formValues, 'proxyTypeNumber', '') === '01' ?
                    <Text style={styles.sendAccNumber}>Phone Number</Text>
                    : result(formValues, 'proxyTypeNumber', '') === '02' ?
                      <Text style={styles.sendAccNumber}>Email Address</Text>
                      :
                      <Text style={styles.sendAccNumber}>{''}</Text>
                  }
                </View>
              </View>
            </View>
            <View style={styles.labelSpacing} />

            <View style={styles.containtextExplanation}>
              <View style={styles.senderDetail}>
                <View style={styles.rightItemContainer}>
                  <Text style={styles.captionText}>{language.HINTTEXT__ALIAS}</Text>
                  <Text style={styles.sendAccNumber}>{result(formValues, 'proxyAlias', '')}</Text>
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
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)}   >
            <Text style={styles.buttonLargeTextStyle}>{language.GENERATE_CONFIRMATION_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default FundTransferConfirmation;
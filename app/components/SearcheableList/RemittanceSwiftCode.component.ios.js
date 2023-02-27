import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard, Image} from 'react-native';
import styles from './ReminttanceSwiftCode.style';
import {formatFieldNote, formatFieldAccount, formatMobileNumberEmoney} from '../../utils/transformer.util';
import {noop, result, isEmpty} from 'lodash';
import ErrorTextIndicator from '../ErrorTextIndicator/ErrorTextIndicator.component';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import PaymentHistoryTrf from '../PaymentHistory/PaymentHistoryTrf.component';
import PaymentHistoryTrfRev from '../PaymentHistory/PaymentHistoryTrfRev.component';
import {selectContactPhone} from 'react-native-select-contact';
import withmerc from '../../assets/images/withmerc.png';
import {SinarmasButton, SinarmasInputBoxNewRemittance} from '../FormComponents';
import {Field} from 'redux-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class RemittanceSwiftCode extends Component {
  static propTypes = {
    searchlist: PropTypes.array,
    textKey: PropTypes.string,
    subtextKey: PropTypes.string,
    secondaryText: PropTypes.string,
    listHeader: PropTypes.string,
    inputHeader: PropTypes.string,
    minLength: PropTypes.number,
    inputProps: PropTypes.object,
    inputPropsAdd: PropTypes.object,
    onNextClick: PropTypes.func,
    onItemClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onChangeText: PropTypes.func,
    validator: PropTypes.func,
    placeholderText: PropTypes.string,
    placeholderSearch: PropTypes.string,
    labelSearch: PropTypes.string,
    labelAdd: PropTypes.string,
    labelTitlle: PropTypes.string,
    tittleSearch: PropTypes.string,
    hideAcc: PropTypes.bool,
    acc: PropTypes.bool,
    btnNewAcc: PropTypes.string,
    buttonText: PropTypes.string,
    disabled: PropTypes.bool,
    isCardless: PropTypes.bool,
    payeeStatus: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object]),
    reloadHistory: PropTypes.func,
    toGenerateMain: PropTypes.func,
    haveEmoney: PropTypes.object,
    flagLKDCashOut: PropTypes.bool,
    transactionTypeLKD: PropTypes.object,
    drawer: PropTypes.bool,
    kyc: PropTypes.bool,
    swiftCodeForm: PropTypes.object,
    onBankNamePress: PropTypes.func,
    originalName: PropTypes.string,
    handleSubmit: PropTypes.func,
    onRemittancePress: PropTypes.func,
    isRemittance: PropTypes.bool,
    swiftCodeText: PropTypes.string
  }
  state = {
    searchlist: [],
    searchText: '',
    searchTextAcc: '',
    hideAcc: false,
    acc: false,
  }
  onChangeInput = (text) => {
    const {onChangeText = noop, validator = noop} = this.props;
    onChangeText(text);
    this.onFocusSearch();
    const error = validator(text);
    this.setState({
      searchText: formatFieldNote(text),
      error
    });
  }
  onChangeInputNewAccount = (text) => {
    const {validator = noop} = this.props;
    const error = validator(text);
    this.setState({
      searchTextAcc: formatFieldAccount(text),
      error
    });
  }
  onNextClick=() => {
    const {onNextClick = noop, swiftCodeForm} = this.props;
    const swiftCode = result(swiftCodeForm, 'swiftCode', '');
    onNextClick(swiftCode);
  }
  componentWillMount () {
    const {searchlist = []} = this.props;
    this.setState({searchlist});
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }
  componentWillReceiveProps (nextProps) {
    const {searchlist} = nextProps;
    this.setState({searchlist});
  }
  onFocusAcc=() => {
    const {hideAcc = false} = this.props;
    this.setState({hideAcc});
  }
  onFocusSearch=() => {
    const {hideAcc = true} = this.props;
    this.setState({hideAcc});
  }
  onBlurSearch=() => {
    const {hideAcc = false} = this.props;
    this.setState({hideAcc});
  }
  _keyboardDidHide=() => {
    const {hideAcc = false} = this.props;
    this.setState({hideAcc});
  }
    
  getContact = () => {
    const {validator = noop} = this.props;
    selectContactPhone().then((selection) => {
      if (!selection) {
        return null;
      }
      let {selectedPhone} = selection;
      const error = validator(selectedPhone.number);
      this.setState({
        searchTextAcc: formatMobileNumberEmoney(selectedPhone.number),
        error
      });
    }).catch(noop);
  }

  render () {
    const {labelTitlle = '', isCardless, placeholderText = '',
      textKey = 'text', subtextKey = 'subtext', secondaryText = 'secondaryText', onItemClick = noop, onDeleteClick = noop, payeeStatus, drawer, reloadHistory = noop,
      disabled = false, toGenerateMain = noop, flagLKDCashOut, 
      transactionTypeLKD, kyc, swiftCodeForm, isRemittance, swiftCodeText = 'swiftCodeText'} = this.props;
    const isEmptySwiftCode = isEmpty(result(swiftCodeForm, 'swiftCode', ''));
    return (
      <KeyboardAwareScrollView style={styles.flex} keyboardShouldPersistTaps='handled' extraHeight={120} enableOnAndroid={true}>
        <View style={isCardless ? styles.container : styles.containerGrey}>
          {
            flagLKDCashOut  && isCardless && kyc ?
              <View>
                <Touchable onPress={toGenerateMain(result(transactionTypeLKD, 'cashOut', ''))}>
                  <View style={styles.merchantPayContainer}>
                    <Image source={withmerc} style={styles.iconMerch}/>
                    <View style={styles.merchantPayMargin}>
                      <Text style={styles.merchantPayAt}>{language.GENERATE_CODE__WITHDRAW}</Text>
                      <Text style={styles.merchantPayWith}>{language.GENERATE_CODE__WITHDRAW_INFO}</Text>
                    </View>
                    <View style={styles.merchantPayIcon}>
                      <SimasIcon name={'arrow'} style={styles.arrowIcon} size={20}/>
                    </View>
                  </View>
                </Touchable>
              </View>
              : null
          }
          {
            !isCardless ?
              <View style={styles.containerUtama}>
                <View style={styles.flexGrey}>
                  <View style={styles.backgroundColorPink}/>
                  <View style={styles.containerBannerWhite}>
                    <View style={styles.rowInformation}>
                      <View style={styles.paddingBox}>
                        <Field
                          name='swiftCode'
                          label={language.TRANSFER_REMITTANCE_INPUT_SWIFT_CODE}
                          placeholder={language.TRANSFER_REMITTANCE_INPUT_SWIFT_CODE}
                          disabled={false}
                          component={SinarmasInputBoxNewRemittance}
                          maxLength={35}
                          isSwiftCode={true}
                        />
                        <View style={styles.containtextExplanation}>
                          <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
                          <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.TRANSFER__REMITTANCE_SWIFT_CODE_DETAIL}</Text></View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.buttonBottom}>
                    <SinarmasButton disabled={isEmptySwiftCode} onPress={this.onNextClick} text={language.SERVICE__NEXT_BUTTON} style={styles.nextButton}/>
                  </View>
                </View>
              </View>
              : null
          }
          {
            isCardless ? 
              <View style={this.state.hideAcc ? styles.inputContainerHide : styles.headerContainer}>
                <Text style={styles.tittle}>{labelTitlle}</Text>
              </View> 
              : null
          }
          
          
          {this.state.error && <ErrorTextIndicator style={styles.ErrorTextIndicator} text={this.state.error}/>}
          {
            isCardless ?
              <PaymentHistoryTrf
                listOfItems={this.state.searchlist}
                textKey={textKey}
                subtextKey={subtextKey}
                secondaryTextKey={secondaryText}
                placeholderText={placeholderText}
                onSelect={onItemClick}
                onDeleteClick={onDeleteClick}
                drawer={drawer}
                reloadHistory={reloadHistory}
                payeeStatus={payeeStatus}
                disabled={disabled}/>
              :
              <PaymentHistoryTrfRev
                listOfItems={this.state.searchlist}
                textKey={textKey}
                subtextKey={subtextKey}
                secondaryTextKey={secondaryText}
                placeholderText={placeholderText}
                onSelect={onItemClick}
                onDeleteClick={onDeleteClick}
                drawer={drawer}
                reloadHistory={reloadHistory}
                payeeStatus={payeeStatus}
                disabled={disabled}
                isRemittance={isRemittance}
                swiftCodeTextKey={swiftCodeText}
              />
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default RemittanceSwiftCode;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard, ScrollView, Image} from 'react-native';
import NButtonTrf from './NButtonTrf.component';
import styles from './SearcheableListTrf.style';
import {formatFieldNote, formatFieldAccount, formatMobileNumberEmoney, upperCase, wrapObjectInFunction} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import ErrorTextIndicator from '../ErrorTextIndicator/ErrorTextIndicator.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import SinarmasInputBox from '../FormComponents/SinarmasInputBox/SinarmasInputBox.component';
import PaymentHistoryTrf from '../PaymentHistory/PaymentHistoryTrf.component';
import {language} from '../../config/language';
import {selectContactPhone} from 'react-native-select-contact';
import result from 'lodash/result';
import withmerc from '../../assets/images/withmerc.png';
import {theme} from '../../styles/core.styles';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TabSearchableListTrf from './TabSearchableListTrf.component';

const tabBarConfig = {
  tabBarBackgroundColor: theme.white,
  tabBarActiveTextColor: theme.brand,
  tabBarInactiveTextColor: theme.black,
  tabBarUnderlineStyle: {
    backgroundColor: theme.brand,
  },
  tabBarTextStyle: styles.tabText
};

class SearcheableListTrf extends Component {
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
      PropTypes.object,
      PropTypes.string
    ]),
    reloadHistory: PropTypes.func,
    toGenerateMain: PropTypes.func,
    haveEmoney: PropTypes.object,
    flagLKDCashOut: PropTypes.bool,
    transactionTypeLKD: PropTypes.object,
    drawer: PropTypes.bool,
    kyc: PropTypes.bool,
    isTransfer: PropTypes.bool,
    isCashless: PropTypes.bool,
    toggleBiFast: PropTypes.func,
    isBiFast: PropTypes.bool,
    inputPropsBiFast: PropTypes.object,
    placeholderEmail: PropTypes.string,
    placeholderPhone: PropTypes.string,
    onNextClickBiFast: PropTypes.func,
    addProxyBiFast: PropTypes.func,
    textKeyBiFast: PropTypes.string,
    SetBiFast: PropTypes.string,
    placeholderBiFast: PropTypes.string,
    dtActionName: PropTypes.string,
    dtActionNameHistory: PropTypes.string,
  }

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar style={styles.scrollStyle} tabStyle={styles.tabStyle}/>)

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
  onChangeInputBiFast = (text) => {
    const {validator = noop, addProxyBiFast = noop} = this.props;
    const error = validator(text);
    this.setState({
      searchTextAcc: text,
      error
    });
    addProxyBiFast(upperCase(text));
  }
  onNextClick=() => {
    const {onNextClick = noop} = this.props;
    onNextClick(this.state.searchTextAcc);
  }
  onNextClickBiFast=() => {
    const {onNextClickBiFast = noop} = this.props;
    onNextClickBiFast(this.state.searchTextAcc);
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
    const {btnNewAcc = '', labelTitlle = '', isCardless,
      placeholderText = '', buttonText = '', textKey = 'text',
      subtextKey = 'subtext', secondaryText = 'secondaryText', onItemClick = noop,
      onDeleteClick = noop, payeeStatus, drawer, reloadHistory = noop, onNextClick, minLength = 6,
      inputPropsAdd = {}, disabled = false, toGenerateMain = noop, flagLKDCashOut, transactionTypeLKD, kyc, isTransfer, isCashless,
      toggleBiFast, isBiFast, inputPropsBiFast = {}, placeholderEmail, placeholderPhone, placeholderBiFast, textKeyBiFast, SetBiFast, dtActionName, dtActionNameHistory} = this.props;
    const nextEnabled = (this.state.searchTextAcc.length >= minLength) && !this.state.error;

    return (
      <ScrollView style={styles.flex}>
        <View style={styles.container}>
          {isTransfer || isCashless ?
            <View style={styles.paddingHeader}/> : null}
          {
            flagLKDCashOut && isCardless && kyc ?
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
          <View style={this.state.hideAcc ? styles.inputContainerHide : styles.headerContainer}>
            <Text style={styles.tittle}>{labelTitlle}</Text>
          </View>
          {
            isTransfer ?
              <ScrollableTabView {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar} onChangeTab={toggleBiFast} ref={'Tabs'}>
                <TabSearchableListTrf tabLabel={language.DASHBOARD__ACCOUNT_NUMBER} />
                <TabSearchableListTrf tabLabel={language.BIFAST__PHONE_NUMBER}/>
                <TabSearchableListTrf tabLabel={language.BIFAST__EMAIL_ADDRESS}/>
              </ScrollableTabView>
              :
              null
          }
          <View style={this.state.hideAcc ? styles.inputContainerHide : styles.inputContainer}>
            <View style={onNextClick ? styles.inputAcc : styles.inputWithPaddingHorizontalAcc}>
              {isCardless ?
                <View style={styles.textInputContainerPadding}>
                  <SinarmasInputBox
                    {...inputPropsAdd}
                    label={placeholderText}
                    onChangeText={this.onChangeInputNewAccount}
                    disabled={false}
                    placeholder={placeholderText}
                    onFocus={this.onFocusAcc}
                    value={this.state.searchTextAcc}
                  />
                  <Touchable onPress={this.getContact} style={styles.contactIcon}>
                    <View><SimasIcon name='contact' size={25}/></View>
                  </Touchable>
                </View>
                :
                SetBiFast === '3' ?
                  <View>
                    <View style={styles.textInputContainer}>
                      <SinarmasInputBox
                        {...inputPropsBiFast}
                        label={placeholderText}
                        onChangeText={this.onChangeInputBiFast}
                        disabled={false}
                        placeholder={placeholderEmail}
                        onFocus={this.onFocusAcc}
                        value={this.state.searchTextAcc}
                      />
                    </View>
                    <View style={styles.biFastDisclaimer}>
                      <SimasIcon name={'caution-circle'} style={styles.cautinIcon} size={20}/>
                      <Text style={styles.biFastCaution}>{language.BIFAST__EMAIL_ADDRESS_DICLAIMER}</Text>
                    </View>
                  </View>
                  :
                  SetBiFast === '2' ?
                    <View>
                      <View style={styles.textInputContainer}>
                        <SinarmasInputBox
                          {...inputPropsAdd}
                          label={placeholderText}
                          onChangeText={this.onChangeInputBiFast}
                          disabled={false}
                          placeholder={placeholderPhone}
                          onFocus={this.onFocusAcc}
                          value={this.state.searchTextAcc}
                        />
                      </View>
                      <View style={styles.biFastDisclaimer}>
                        <SimasIcon name={'caution-circle'} style={styles.cautinIcon} size={20}/>
                        <Text style={styles.biFastCaution}>{language.BIFAST__PHONE_NUMBER_DICLAIMER}</Text>
                      </View>
                    </View>
                    :
                    <View style={styles.textInputContainer}>
                      <SinarmasInputBox
                        {...inputPropsAdd}
                        label={placeholderText}
                        onChangeText={this.onChangeInputNewAccount}
                        disabled={false}
                        placeholder={placeholderText}
                        onFocus={this.onFocusAcc}
                        value={this.state.searchTextAcc}
                        isIconBiFast={true}
                      />
                    </View>
              }
              <View style={styles.center}>
                <View style={styles.lineRow}>
                  <View style={styles.greyLineLeft} />
                  <Text style={styles.lineText}>{language.PAY_BILLS__OR}</Text>
                  <View style={styles.greyLineRight} />
                </View>
              </View>
            </View>
            {onNextClick && <NButtonTrf style={styles.NButtonTrfs} dtActionName={dtActionName} text={btnNewAcc} disabled={nextEnabled} onPress={isBiFast ? this.onNextClickBiFast : this.onNextClick}
              icon={buttonText} getContact={this.getContact}/>}
          </View>
          {this.state.error && <ErrorTextIndicator style={styles.ErrorTextIndicator} text={this.state.error}/>}
          { 
            isBiFast ? 
              <PaymentHistoryTrf
                listOfItems={this.state.searchlist}
                textKey={textKeyBiFast}
                secondaryTextKey={secondaryText}
                placeholderText={placeholderBiFast}
                onSelect={onItemClick}
                onDeleteClick={onDeleteClick}
                drawer={drawer}
                reloadHistory={reloadHistory}
                payeeStatus={payeeStatus}
                disabled={disabled}
                isBiFast={isBiFast}
                SetBiFast={SetBiFast}
                dtActionName={dtActionNameHistory}
              />
              :
              <PaymentHistoryTrf
                listOfItems={this.state.searchlist}
                textKey={textKey}
                subtextKey={subtextKey}
                secondaryTextKey={secondaryText}
                onSelect={onItemClick}
                onDeleteClick={onDeleteClick}
                payeeStatus={payeeStatus}
                drawer={drawer}
                reloadHistory={reloadHistory}
                placeholderText={placeholderText}
                disabled={disabled}
                dtActionName={dtActionNameHistory}/>
          }
        </View>
      </ScrollView>
    );
  }
}

export default SearcheableListTrf;

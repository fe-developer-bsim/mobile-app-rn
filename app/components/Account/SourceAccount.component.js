import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SourceAccount.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {listViewComparator, getAllAccountsExcludeEmoneyFT} from '../../utils/transformer.util';
import AccountList from './AccountList.component';
import {find, filter, isEmpty, sortBy} from 'lodash';
import result from 'lodash/result';
import groupBy from 'lodash/groupBy';
import poin from '../../assets/images/poin.png';
import {currencyFormatter} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {set, storageKeys} from '../../utils/storage.util';


class SourceAccount extends React.Component {
  static propTypes = {
    accountsBiller: PropTypes.array,
    accountsTransfer: PropTypes.array,
    accountsSaving: PropTypes.array,
    accountsBillerWithCC: PropTypes.array,
    creditCardBalance: PropTypes.array,
    emoneyAccount: PropTypes.array,
    getConfirmation: PropTypes.func,
    getConfirmationSimas: PropTypes.func,
    navigation: PropTypes.object,
    getCreditCardBalance: PropTypes.func,
    simasPoin: PropTypes.object,
    getUseSimas: PropTypes.func,
    simasConfig: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    newSof: PropTypes.bool,
    enableCCsof: PropTypes.string
  }
  comparator = listViewComparator

  renderListItemConfirmation = (value) => () => {
    const {getConfirmation = {}} = this.props;
    return getConfirmation ? getConfirmation(value) : {};
  }

  renderCreditCardBalance = () => {
    const {getCreditCardBalance} = this.props;
    return getCreditCardBalance ? getCreditCardBalance : {};
  }

  getValueConfirmation = (values) => {
    const {getConfirmation = {}} = this.props;
    return getConfirmation ? getConfirmation(values) : {};
  }

  selectAccount = () => {
    const {simasPoin, accountsBiller} = this.props;
    const isUseSimas = 'true';
    const groupedAccounts = groupBy(accountsBiller, 'accountType');
    const simasPoinAcc = result(groupedAccounts, 'SimasPoinAccount.0', {});
    const accountNumber = result(simasPoinAcc, 'accountNumber', '');
    const currency = result(simasPoinAcc, 'currency', '');
    const currentBalance = Number(result(simasPoin, 'simasPoin.data.total_point', '') === '' ? 0 : result(simasPoin, 'simasPoin.data.total_point', ''));
    const availableBalance = Number(result(simasPoin, 'simasPoin.data.total_point', '') === '' ? 0 : result(simasPoin, 'simasPoin.data.total_point', ''));
    const workingBalance = Number(result(simasPoin, 'simasPoin.data.total_point', '') === '' ? 0 : result(simasPoin, 'simasPoin.data.total_point', ''));
    const balances = {
      accountNumber,
      availableBalance,
      currency,
      currentBalance,
      workingBalance
    };
    const values = {...simasPoinAcc, balances, isUseSimas};
    this.getValueConfirmation(values);
    set(storageKeys['NEW_SOF'], true);
  };

  renderListItem = ({item}) => (<AccountList {...item} getConfirmation={this.renderListItemConfirmation(item)}  getCreditCardBalance={this.renderCreditCardBalance()}/>);

  render () {
    const {accountsBiller, accountsTransfer, accountsSaving, navigation, simasPoin, newSof, emoneyAccount, accountsBillerWithCC, creditCardBalance, enableCCsof} = this.props;
    const numberaccountsBillerWithCC = accountsBillerWithCC.map(function (el, key) {
      const o = Object.assign({}, el);
      o.number = key;
      return o;
    });
    const creditAvailable = isEmpty(creditCardBalance) ? '' : result(creditCardBalance, 'availableBalance.amount', '0');
    const creditCardId = isEmpty(creditCardBalance) ? '' : result(creditCardBalance, 'id', '');
    let ccAccountFind = find(numberaccountsBillerWithCC, (data) => data.id === creditCardId);
    if (!isEmpty(creditAvailable)) {
      ccAccountFind.creditAvailable = creditAvailable;
    }
    const filterAccountsBillerWithCC = filter(numberaccountsBillerWithCC, (data) => data.id !== creditCardId);
    const tempNewAccountsBillerWithCC = isEmpty(creditAvailable) ? numberaccountsBillerWithCC : [...filterAccountsBillerWithCC, ccAccountFind];
    const newAccountsBillerWithCC = sortBy(tempNewAccountsBillerWithCC, [function (o) {
      return o.number;
    }]);
    const sourceType = result(navigation, 'state.params.sourceType', '');
    const billerCode = result(navigation, 'state.params.billerCode', '');
    const simasAlfaCart = result(navigation, 'state.params.simasAlfaCart', '');
    const simasPoint = result(simasPoin, 'simasPoin.data.total_point', '') === '' ? 0 : result(simasPoin, 'simasPoin.data.total_point', '');
    const name = result(simasPoin, 'fullName', '');
    const isTopup = result(navigation, 'state.params.isTopup', '');
    const accountTransferCustom = isTopup ? getAllAccountsExcludeEmoneyFT(accountsTransfer) : accountsTransfer;
    
    const exceptBiller = billerCode === '810128' || billerCode === '812277' || billerCode === '001022' || billerCode === '002240';
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapContainer} extraHeight={120}>
        <View style={styles.container}>
          <View>
            <View style={styles.row}>
              <Text style={styles.titleTxt}>{language.CGV__PAY_FROM}</Text>
            </View>
          </View>
          { sourceType === 'genericBiller' || sourceType === 'genericBillerWithCC' || simasAlfaCart ?
            <View>
              <View>
                <Text style={styles.subtitleTxt}>{language.ONBOARDING__REDEEM_TITLE}</Text>
              </View>
              <View>
                <View style={exceptBiller ? styles.bgGreySimpo : styles.bgWhiteSimpo}>
                  <Touchable disabled={exceptBiller} onPress={this.selectAccount}>
                    <View style={styles.row}>
                      <View style={styles.iconContainer}>
                        <Text style={styles.simasText}>{language.CGV__SIMAS}</Text>
                        <Image source={poin} style={styles.imageOffer} />
                      </View>
                      <View style={styles.infoContainer}>
                        {
                          !newSof || newSof === {} ?
                            <View style={styles.pad2new}>
                              <Text style={styles.typeTxt1}>{language.CGV__SIMAS_POIN}  </Text>
                              <View style={styles.typeTxt2}>
                                <Text style={styles.typeTxtNew}>  new  </Text>
                              </View>
                            </View>
                            :
                            <View style={styles.pad2}>
                              <Text style={styles.typeTxt1}>{language.ONBOARDING__REDEEM_TITLE}</Text>
                            </View>
                        }
                        <View style={styles.pad2}>
                          <Text style={styles.nameTxt}>{name}</Text>
                        </View>
                        <View style={styles.pad2}>
                          <Text style={styles.balanceTxt}>{language.CGV__AVAIL_BALANCE2}  {currencyFormatter(simasPoint)} {language.CGV__POIN}</Text>
                        </View>
                      </View>
                      <View style={styles.arrowContainer}>
                        <SimasIcon name={'arrow'} size={15} style={styles.arrowIcon}/>
                      </View>
                    </View>
                  </Touchable>
                </View>
              </View>
            </View>
            : null }
          <View>
            <Text style={styles.subtitleTxt}>{language.CGV__ACCOUNTS}</Text>
          </View>
          <View>
            { sourceType === 'genericBiller' ?
              <FlatList enableEmptySections data={accountsBiller} renderItem={this.renderListItem} removeClippedSubviews={false}/>
              : sourceType === 'etaxBiller' ?
                <FlatList enableEmptySections data={accountsSaving} renderItem={this.renderListItem} removeClippedSubviews={false}/>
                : sourceType === 'fundTransfer' ?
                  <FlatList enableEmptySections data={accountTransferCustom} renderItem={this.renderListItem} removeClippedSubviews={false}/>
                  : sourceType === 'emoneyBiller' ?
                    <FlatList enableEmptySections data={emoneyAccount} renderItem={this.renderListItem} removeClippedSubviews={false}/>
                    : sourceType === 'genericBillerWithCC' ?
                      <FlatList enableEmptySections data={enableCCsof === 'TRUE' ? newAccountsBillerWithCC : accountsBiller} renderItem={this.renderListItem} removeClippedSubviews={false}/>
                      :
                      null
            }
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default SourceAccount;

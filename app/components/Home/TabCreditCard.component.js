import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ImageBackground, ScrollView} from 'react-native';
import AccountCarousel from './AccountCarousel.component';
import styles from './Tabs.styles';
import noop from 'lodash/noop';
import result from 'lodash/result';
import LinearGradient from 'react-native-linear-gradient';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import creditCardImage from '../../assets/images/credit-card.png';

class TabCreditCard extends React.Component {
  static propTypes = {
    accountList: PropTypes.array,
    navigateToCcHistory: PropTypes.func,
    onSnapToCreditCardItem: PropTypes.func,
    setCarouselReference: PropTypes.func,
    linkCreditCard: PropTypes.func,
    creditCardDetail: PropTypes.object,
    loadingError: PropTypes.bool,
    showLoader: PropTypes.bool,
    onReloadPress: PropTypes.func,
    showReload: PropTypes.bool,
    transactionsCC: PropTypes.array,
    payCCBill: PropTypes.func,
    activeTab: PropTypes.string,
    settingCC: PropTypes.func,
    cachedTransactions: PropTypes.object,
    triggerAuthNav: PropTypes.func,
    arrowNavigateToCcHistory: PropTypes.func,
    goToCreditCard: PropTypes.func,
    invalid: PropTypes.func,
    cif: PropTypes.string,
    loadBalances: PropTypes.func,
    historyIndex: PropTypes.number,
    approveAplication: PropTypes.func,
    showVCC: PropTypes.func,
    navigateToConfirm: PropTypes.func,
    numberCVV: PropTypes.object,
    deleteReducer: PropTypes.func,
    CCtransDetail: PropTypes.func,
    lang: PropTypes.string,
    iPass: PropTypes.string,
    goToFilter: PropTypes.func,
    dispatch: PropTypes.func,
    navigateToConvert: PropTypes.func,
    accountVisibility: PropTypes.object,
  }
  static defaultProps = {
    accountList: [],
    onSnapToCreditCardItem: noop,
    setCarouselReference: noop,
    creditCardDetail: {},
    loadingError: false,
    showLoader: false,
    onReloadPress: noop,
    showReload: false,
    payCCBill: noop,
    settingCC: noop,
    activeTab: '',
    showVCC: noop,
    deleteReducer: noop,
    navigateToConvert: noop,
  }
  openCC = () => {
    const {goToCreditCard, invalid} = this.props;
    return (<View>
      <View style={styles.imageContainer}>
        <ImageBackground source={creditCardImage} borderRadius={15} style={styles.backgroundImage}>
          <Text style={styles.titleLarge}>{language.DASHBOARD__ACCOUNT_CREDIT}</Text>
          <Text style={styles.titleLarge}>{language.DASHBOARD__CARD}</Text>
        </ImageBackground>
      </View>
      <View style={styles.tdDesription}>
        <Text style={styles.title}>{language.DASHBOARD__CREDIT_CARD__WHY}</Text>
        <View style={styles.borderBottomRow}>
          <SimasIcon name={'bling'} size={20} style={styles.blackBling}/>
          <Text style={styles.lightText}>{language.DASHBOARD__CREDIT_CARD__REASON_ONE}</Text>
        </View>
        <View style={styles.borderBottomRow}>
          <SimasIcon name={'bling'} size={20} style={styles.blackBling}/>
          <Text style={styles.lightText}>{language.DASHBOARD__CREDIT_CARD__REASON_TWO}</Text>
        </View>
        <View style={styles.borderBottomRow}>
          <SimasIcon name={'bling'} size={20} style={styles.blackBling}/>
          <Text style={styles.lightText}>{language.DASHBOARD__CREDIT_CARD__REASON_THREE}</Text>
        </View>
      </View>
      <View style={styles.buttonView}>
        <Touchable onPress={goToCreditCard} disabled={invalid}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={styles.gradientBlack} style={styles.openTdButton}>
            <Text style={styles.openTdText}>{language.DASHBOARD__NEW_CREDIT_ACCOUNT_TITLE}</Text>
            <View style={styles.addIcon}>
              <SimasIcon style={styles.iconColor} name='Plus' size={20}/>
            </View>
          </LinearGradient>
        </Touchable>
      </View>
    </View>);
  }
  render () {
    const {accountList = [], onSnapToCreditCardItem, setCarouselReference, linkCreditCard = noop, activeTab, navigateToCcHistory,
      showLoader, loadingError, onReloadPress, showReload, payCCBill, settingCC, cachedTransactions = [], triggerAuthNav,
      arrowNavigateToCcHistory = noop, loadBalances, historyIndex, approveAplication, showVCC, navigateToConfirm, numberCVV, deleteReducer, CCtransDetail, cif = '', lang, iPass, goToFilter, dispatch, navigateToConvert, accountVisibility} = this.props;
    const transactionsCC = result(cachedTransactions, 'lastTransactionsCreditCardMiniStatement', []);
    const creditCardDetail = cachedTransactions.lastTransactionsCreditCardDetail;
    return (
      <View style={styles.container}>
        {accountList.length === 0 ?
          <ScrollView horizontal>
            {this.openCC()}
            <AccountCarousel setCarouselReference={setCarouselReference} onSnapToItem={onSnapToCreditCardItem} accountList={accountList} linkCreditCard={linkCreditCard}
              activeTab={activeTab} historyIndex={historyIndex}
              details={{showLoader, loadingError, onReloadPress, activeTab, arrowNavigateToCcHistory,
                showReload, creditCardDetail, transactionsCC, payCCBill, navigateToCcHistory, accountList, settingCC, triggerAuthNav, showVCC, navigateToConfirm, numberCVV, deleteReducer, CCtransDetail, lang, iPass, goToFilter, dispatch, navigateToConvert}} accountVisibility={accountVisibility}/>
          </ScrollView> :
          <AccountCarousel setCarouselReference={setCarouselReference} onSnapToItem={onSnapToCreditCardItem} accountList={accountList} linkCreditCard={linkCreditCard}
            activeTab={activeTab} historyIndex={historyIndex} cif={cif}
            details={{showLoader, loadingError, onReloadPress, activeTab, arrowNavigateToCcHistory,
              showReload, creditCardDetail, transactionsCC, payCCBill, navigateToCcHistory, accountList, settingCC, triggerAuthNav, showVCC, navigateToConfirm, numberCVV, deleteReducer, CCtransDetail, lang, iPass, goToFilter, dispatch, navigateToConvert}} loadBalances={loadBalances} approveAplication={approveAplication} accountVisibility={accountVisibility}/>
        }
      </View>
    );
  }
}

export default TabCreditCard;

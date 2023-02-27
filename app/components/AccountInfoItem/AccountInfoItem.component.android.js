import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ImageBackground, Modal, ScrollView} from 'react-native';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import LayeredIcon from '../LayeredIcon/LayeredIcon.component';
import styles from './AccountInfoItem.styles';
import savingsImage from '../../assets/images/savings-card.png';
import timeDepositImage from '../../assets/images/time-deposit-card.png';
import investmentImage from '../../assets/images/investment-card.png';
import loanImage from '../../assets/images/loan-card.png';
import syariahImage from '../../assets/images/syariah-card.png';
import creditCardImage from '../../assets/images/credit-card.png';
import investmentIcon from '../../assets/images/wallet.png';
import AccountInfoItemDetails from './AccountInfoItemDetails.component';
import {result, truncate, startCase, toLower, noop, findIndex, isEmpty, find} from 'lodash';
import AccountDetails from '../Home/AccountDetails.component';
import Touchable from '../Touchable.component';
import {checkSyaria, generateCcImage, generateProductName, wrapMethodInFunction, copyToCLipboard, generateCcImagebyType, checkSmartSaving} from '../../utils/transformer.util';
import {connect} from 'react-redux';
import {goToVAtransfer, getSimasTaraDetail} from '../../state/thunks/dashboard.thunks';
import {closeSimasTara} from '../../state/thunks/savingAccount.thunks';
import moment from 'moment';
import {currencyFormatter} from '../../utils/transformer.util';
import {detailLockedAmount} from '../../state/thunks/transactionHistory.thunks';
import newLoanImage from '../../assets/images/new-loan-card.png';
import smartSavingsImage from '../../assets/images/sunline-card.png';

class AccountInfoItem extends React.Component {
  static propTypes = {
    goAccountDetail: PropTypes.func,
    accountInfo: PropTypes.object.isRequired,
    index: PropTypes.number,
    details: PropTypes.object,
    onItemPress: PropTypes.func,
    setVisibility: PropTypes.func,
    accountVisibility: PropTypes.object,
    activeTab: PropTypes.string,
    setDefaultAccount: PropTypes.func,
    defaultAccount: PropTypes.object,
    showDefaultAccountInfo: PropTypes.func,
    getMmq: PropTypes.object,
    getMmqDataDetail: PropTypes.func,
    goToBillerVirtualAccount: PropTypes.func,
    loadBalances: PropTypes.func,
    goToSimasTaraDetail: PropTypes.func,
    currentCarouselIndex: PropTypes.number,
    approveAplication: PropTypes.func,
    accountsCust: PropTypes.array,
    goToCloseSimasTara: PropTypes.func,
    spinner: PropTypes.bool,
    detailLockedAmount: PropTypes.func,
    detailLocked: PropTypes.array,
    isUsingDigisign: PropTypes.bool,
    lang: PropTypes.string,
    goToshowDormantModal: PropTypes.func,
  }

  state = {
    showDetail: false,
    data: {},
  }

  componentDidUpdate (prevProps) {
    const {spinner} = this.props;
    const {data} = this.state;
    if (prevProps.spinner === false && spinner === true && !isEmpty(data)) {
      this.closeDetail();
    }
  }

  accountTypeMapping = {
    'CurrentAccount': 'currentAccount',
    'SavingAccount': 'savingAccount',
    'SimasSavingPlanAccount': 'savingAccount',
    'TimeDepositAccount': 'timeDepositAccount',
    'CreditCardAccount': 'creditCardAccount',
    'Rekening Dana Nasabah (RDN)': 'rdn',
    'ListLoan': 'loanList',
    'MudharabahMuqayyadah': 'mmq',
    'OpeningSA': 'openingSA',
    'OpeningCC': 'openingCC',
    'VirtualCreditCardAccount': 'creditCardAccount',
    'savingAccount': 'savingAccount',
    'OpeningLOAN': 'openingLOAN'
  };

  getItemTheme = (accountInfo, details) => {
    let title = null, image = savingsImage, iconName = 'savings', styleType = 'savings', displayArrow = true, pngIcon, displayEye = false, merchant = '', displayCopy = false;
    const {accountType, NamaProgram} = accountInfo;
    const accountNumber = result(accountInfo, 'accountNumber', '');
    const itemType = this.accountTypeMapping[isEmpty(accountType) ? NamaProgram : accountType];
    const numberCVV = result(details, 'numberCVV', '');
    const cardType = result(accountInfo, 'cardType', '');
    const merchantName = result(accountInfo, 'merchantName', '');
    const accountTypeCode = result(accountInfo, 'accountTypeCode', '');
    switch (itemType) {
    case 'timeDepositAccount': {
      title = language.DASHBOARD__ACCOUNT_TIME_DEPOSIT;
      image = timeDepositImage;
      iconName = 'deposit';
      styleType = 'deposit';
      displayArrow = true;
      displayEye = true;
      break;
    }
    case 'currentAccount': {
      image = checkSmartSaving(accountTypeCode) ? smartSavingsImage : checkSyaria(accountNumber) ? syariahImage : savingsImage;
      title = truncate(startCase(toLower(result(accountInfo, 'productType', ''))), {'length': '25', 'omission': ' ...'});
      displayEye = true;
      displayCopy = true;
      break;
    }
    case 'savingAccount': {
      title = truncate(startCase(toLower(result(accountInfo, 'productType', ''))), {'length': '25', 'omission': ' ...'});
      image = checkSmartSaving(accountTypeCode) ? smartSavingsImage : checkSyaria(accountNumber) ? syariahImage : savingsImage;
      merchant = merchantName;
      displayEye = true;
      displayCopy = true;
      break;
    }
    case 'creditCardAccount': {
      image = !isEmpty(cardType) ? generateCcImagebyType(accountNumber, numberCVV, cardType) : generateCcImage(accountNumber, numberCVV);
      styleType = 'creditCard';
      iconName = 'none';
      displayEye = false;
      displayArrow = false;
      break;
    }
    case 'rdn': {
      title = language.DASHBOARD__RDN_LONG;
      image = investmentImage;
      pngIcon = investmentIcon;
      styleType = 'rdn';
      displayEye = true;
      break;
    }
    case 'mmq': {
      title = language.DASHBOARD__MMQ_LONG;
      image = investmentImage;
      pngIcon = investmentIcon;
      styleType = 'mmq';
      displayEye = true;
      displayArrow = true;
      break;
    }
    case 'loanList': {
      title = accountInfo.channeling_company === 'SIMAS_KASBON' ? language.DASHBOARD__SIMAS_KASBON : accountInfo.jenis_kredit_desc;
      image = loanImage;
      styleType = 'loan';
      displayArrow = false;
      iconName = 'loan';
      displayEye = true;
      break;
    }
    case 'openingSA': {
      title = truncate(startCase(toLower(result(accountInfo, 'productType', ''))), {'length': '25', 'omission': ' ...'});
      image =  savingsImage;
      merchant = merchantName;
      displayEye = true;
      break;
    }
    case 'openingCC': {
      image = creditCardImage;
      styleType = 'creditCard';
      iconName = 'none';
      displayEye = false;
      displayArrow = false;
      break;
    }
    case 'openingLOAN': {
      title = truncate(startCase(toLower(result(accountInfo, 'productType', ''))), {'length': '25', 'omission': ' ...'});
      image = newLoanImage;
      styleType = 'newLoan';
      iconName = 'none';
      displayEye = true;
      displayArrow = false;
      break;
    }
    default:
      break;
    }
    return {title, image, iconName, styleType, displayArrow, pngIcon, displayEye, merchant, displayCopy};
  }

  goToLoanSummaryPage= () => {
    if (this.props.accountInfo.typeOfLoan === 'PGO') {
      this.props.onItemPress(this.props.accountInfo);
    }
  }

  closeDetail = () => () => {
    this.setState({showDetail: false, data: {}});
  }

  closeSimasTara = (accountNumber, productType, sourceAccNoSimasTara) => () => {
    const {goToCloseSimasTara} = this.props;
    this.setState({showDetail: false});
    goToCloseSimasTara(accountNumber, productType, sourceAccNoSimasTara);
  }

  showDetail = () => () => {
    const {detailLockedAmount, goToSimasTaraDetail, accountInfo} = this.props;
    const accountNumber = result(accountInfo, 'accountNumber', '');
    const accountType = result(accountInfo, 'accountType', '');
    detailLockedAmount(accountNumber).then(() => {
      if (accountType === 'SimasSavingPlanAccount') {
        goToSimasTaraDetail(accountInfo).then((res) => this.setState({showDetail: true, data: res}));
      } else {
        this.setState({showDetail: true});
      }
    });
  }

  renderLockItems = (item) => {
    const {detailLocked} = this.props;
    const fromDate = moment(result(item, 'fromDate', '')).format('DD MMMM YYYY');
    const toDate = moment(result(item, 'toDate', '')).format('DD MMMM YYYY');
    const amount = result(item, 'lockedAmount', '--');
    const description = result(item, 'lockDescription', '--');
    return (
      <View style={detailLocked.length === 1 ? null : styles.brandPadding}>
        <View style={styles.boxLocked}>
          <View style={styles.rowContainer3}>
            <View>
              <Text style={styles.modalDetailLabel}>{language.DASHBOARD__LOCKAMOUNT_TOTAL}</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.modalDetailValue}>Rp. {currencyFormatter(amount)}</Text>
            </View>
          </View>
          <View style={styles.rowContainer2}>
            <View>
              <Text style={styles.modalDetailLabel}>{isEmpty(result(item, 'toDate', '')) ? language.TRANSFER__START_DATE : language.DASHBOARD__LOCKAMOUNT_PERIOD}</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.modalDetailValue}>{fromDate} {isEmpty(result(item, 'toDate', '')) ? null : language.DASHBOARD__LOCKAMOUNT_DATE_EX}</Text>
              {toDate === '' || toDate === 'Invalid date' ?
                null
                :
                <Text style={styles.modalDetailValue}>{toDate}</Text>}
            </View>
          </View>
          <View style={styles.rowContainer2}>
            <View>
              <Text style={styles.modalDetailLabel}>{language.DASHBOARD__LOCKAMOUNT_DESCRIPTION}</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.modalDetailValue}>{description}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderView = (item) => {
    const {lang} = this.props;
    const titleEN = result(item, 'titleEN', '');
    const isDone = result(item, 'isDone', false);
    const date = result(item, 'date.date', '');

    return (
      <View style={styles.detailRowLoop}>
        <View style={styles.blockOne}>
          <View style={styles.circleCheck}>
            {isDone === null ?
              <View style={styles.circleCheck} /> :
              isDone ?
                <SimasIcon name={'check-black'} size={9} style={styles.checkList}/> :
                <SimasIcon name={'fail'} size={7} style={styles.checkListcross}/>
            }
          </View>
          <View/>
        </View>
        <View>
          <Text style={styles.textTitleLoanOAIOS}>
            {lang === 'id' ? titleEN : titleEN}
            {language.GENERAL__COMMA}
            {date !== '' ? moment.unix(date / 1000).format('DD MMM YYYY [at] HH:mm') : ''}
          </Text>
        </View>
      </View>
    );
  }

  render () {
    const {accountInfo = {}, index, details, onItemPress = noop, setVisibility, accountVisibility, activeTab, getMmq, getMmqDataDetail, goToBillerVirtualAccount, loadBalances, goToSimasTaraDetail, approveAplication, isUsingDigisign, accountsCust, detailLocked, goToshowDormantModal} = this.props;
    const {accountType, balances, cardStatus, cardBase, accountStatus, NamaProgram = {}} = accountInfo;
    const itemTheme = this.getItemTheme(accountInfo, details);
    const checkIndex = accountVisibility ? findIndex(accountVisibility[`${activeTab}`], {'index': index}) : null;
    const accountVisible = checkIndex === null || checkIndex < 0 ? true : accountVisibility[`${activeTab}`][`${checkIndex}`] ? accountVisibility[`${activeTab}`][`${checkIndex}`].visible : true;
    const eyeOpenIcon = [{
      iconName: 'eye-open-fill', iconSize: 30, iconStyle: styles.eyeFillColor},
    {
      iconName: 'eye-open-stroke', iconSize: 30, iconStyle: styles.eyeStrokeColor
    }];
    const eyeCloseIcon = [{
      iconName: 'eye-close-fill', iconSize: 30, iconStyle: styles.eyeFillColor},
    {
      iconName: 'eye-close-stroke', iconSize: 30, iconStyle: styles.eyeStrokeColor
    }];
    const typeOfLoan = result(accountInfo, 'typeOfLoan', '');
    const status = result(accountInfo, 'loanStatus', '');
    const checkStatus = status === 'SIGN_SUCCESS' || status === 'LOAN_SUCCESS' || status === 'SUCCESS_REPAY' || status === 'OVERDUE' ? '1' : '0';
    const checkStatusDetail = status === 'LOAN_SUCCESS' || status === 'SUCCESS_REPAY' || status === 'OVERDUE' ? '1' : '0';
    const availableBalances = result(balances, 'availableBalance', null);
    const statusOpeningAccount = result(accountInfo, 'statusNew.status', '');
    const nextStepOpeningAccount = result(accountInfo, 'statusNew.nextStep', '');
    const openingAccount = result(accountInfo, 'typeOpening', '');
    const infoDateRaw = result(accountInfo, 'status.historyStatus', []);
    const aplicationReceived = result(infoDateRaw, '0.date', '');
    const verificationDate = result(infoDateRaw, '1.date', '');
    const signingDate = result(infoDateRaw, '2.date', '');
    const productName = generateProductName(result(accountInfo, 'code', ''));
    const itemType = this.accountTypeMapping[isEmpty(accountType) ? NamaProgram : accountType];

    const {showDetail, data} = this.state;
    const findAccountNumber = data ? find(accountsCust, function (accList) {
      return accList.accountNumber === data.debitAccountNumber;
    }) : null;
    const sourceAccNoSimasTara = result(data, 'debitAccountNumber', '');

    // detail untuk saving account atau rdn
    const accountNumber = result(accountInfo, 'accountNumber', '');
    const accountName = result(accountInfo, 'name', '');
    const productType = result(accountInfo, 'productType', '');
    const accountCurrency = result(accountInfo, 'currency', '');

    const loopingData = result(accountInfo, 'statusNew.listStatus', []);
    // const isLoanDigisign = isUsingDigisign && (result(accountInfo, 'productCode', '') === 'LOAN');

    return (
      <View style={styles.container}>
        {
          showDetail ?
            <Modal
              animationType='slide'
              transparent={true}
              visible={showDetail}
              onRequestClose={this.closeDetail()}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Touchable style={styles.simasTaraDetailArrowClose} onPress={this.closeDetail()}>
                    <SimasIcon name={'arrow'} style={styles.simasTaraDetailArrow} size={18} />
                  </Touchable>
                  <ScrollView contentContainerStyle={styles.simasTaraDetailContainer}>
                    <Text style={styles.simasTaraDetailTitle}>{language.SIMAS_TARA_SAVING_DETAILS}</Text>
                    {
                      accountInfo.productType === 'SIMAS TARA' && !isEmpty(data) ?
                        <View style={styles.center}>
                          <View style={styles.modalDetailRow}>
                            <Text style={styles.modalDetailLabel}>{language.PAGE__SIMAS_TARA_SIMULATION_TITLE}</Text>
                            <Text style={styles.modalDetailValue}>Rp {currencyFormatter(data.initialDeposit)}</Text>
                          </View>
                          <View style={styles.greyLine} />

                          <View style={styles.modalDetailRow}>
                            <Text style={styles.modalDetailLabel}>{language.PAGE__SIMAS_TARA_SIMULATION_SOURCE_ACC}</Text>
                            <Text style={styles.modalDetailValue}>{findAccountNumber.productType}{'\n'}{sourceAccNoSimasTara}</Text>
                          </View>
                          <View style={styles.greyLine} />

                          <View style={styles.modalDetailRow}>
                            <Text style={styles.modalDetailLabel}>{language.SIMAS_TARA_RATE}</Text>
                            <Text style={styles.modalDetailValue}>{data.rate}% p.a.</Text>
                          </View>
                          <View style={styles.greyLine} />

                          <View style={styles.modalDetailRow}>
                            <Text style={styles.modalDetailLabel}>{language.PAGE__SIMAS_TARA_SIMULATION_PERIOD}</Text>
                            <Text style={styles.modalDetailValue}>{data.period} {language.SIMAS_TARA_PERIOD_YEAR}</Text>
                          </View>
                          <View style={styles.greyLine} />

                          <View style={styles.modalDetailRow}>
                            <Text style={styles.modalDetailLabel}>{language.SIMAS_TARA_START_DATE}</Text>
                            <Text style={styles.modalDetailValue}>{moment(data.appliedDate).format('D MMMM YYYY')}</Text>
                          </View>
                          <View style={styles.greyLine} />

                          <View style={styles.modalDetailRow}>
                            <Text style={styles.modalDetailLabel}>{language.PAGE__SIMAS_TARA_SIMULATION_MATURITY_DATE}</Text>
                            <Text style={styles.modalDetailValue}>{moment(data.completionDate).format('D MMMM YYYY')}</Text>
                          </View>
                          <View style={styles.greyLine} />
                          <Touchable style={styles.closeSimasTaraButton} onPress={this.closeSimasTara(accountNumber, findAccountNumber.productType, sourceAccNoSimasTara)} >
                            <View style={styles.icon}>
                              <SimasIcon name={'setting-fill'} size={30} style={styles.closeSimasTaraIcon} />
                            </View>
                            <Text style={styles.closeSimasTaraLabel}>{language.CLOSE_SIMAS_TARA}</Text>
                            <SimasIcon name={'arrow'} style={styles.closeSimasTaraArrow} />
                          </Touchable>
                        </View>
                        : accountType === 'SavingAccount' || accountType === 'CurrentAccount' || accountType === 'Rekening Dana Nasabah (RDN)' || accountType === 'savingAccount' ?
                          <View style={styles.center}>
                            <View style={styles.modalDetailRow}>
                              <Text style={styles.modalDetailLabel}>{language.DASHBOARD__ACCOUNT_NUMBER}</Text>
                              <Text style={styles.modalDetailValue}>{accountNumber}</Text>
                            </View>
                            <View style={styles.greyLine} />

                            <View style={styles.modalDetailRow}>
                              <Text style={styles.modalDetailLabel}>{language.TIME_DEPOSIT__ACCOUNT_NAME}</Text>
                              <Text style={styles.modalDetailValue}>{accountName}</Text>
                            </View>
                            <View style={styles.greyLine} />

                            <View style={styles.modalDetailRow}>
                              <Text style={styles.modalDetailLabel}>{language.GENERIC_BILLER__AVAILABLE_BALANCE}</Text>
                              <Text style={styles.modalDetailValue}>{accountCurrency} {currencyFormatter(availableBalances)}</Text>
                            </View>
                            <View style={styles.greyLine} />

                            <View style={styles.modalDetailRow}>
                              <Text style={styles.modalDetailLabel}>{language.DASHBOARD__ACCOUNT_PRODUCT_TYPE}</Text>
                              <Text style={styles.modalDetailValue}>{productType}</Text>
                            </View>
                            <View style={styles.greyLine} />
                          </View>
                          : null
                    }
                    {
                      !isEmpty(detailLocked) ?
                        <View style={styles.lockContainer}>
                          <View>
                            <Text style={styles.lockedTitle}>{language.DASHBOARD__LOCKAMOUNT_HEADER}</Text>
                          </View>
                          {
                            detailLocked.length === 1 ?
                              <View>
                                {detailLocked.map(this.renderLockItems)}
                              </View>
                              :
                              <ScrollView horizontal={true}>
                                {detailLocked.map(this.renderLockItems)}
                              </ScrollView>
                          }
                          <View style={{flexDirection: 'row'}}>
                            <SimasIcon name={'caution-reverse'} size={15} style={styles.cautionIcon} />
                            <Text style={styles.lockedBalanceNote}>{language.DASHBOARD__LOCKAMOUNT_INFORMATION}</Text>
                          </View>
                        </View>
                        : null
                    }
                  </ScrollView>
                </View>
              </View>
            </Modal>
            : null
        }
        {typeOfLoan === 'PGO' ?
          <View>
            <ImageBackground source={itemTheme.image} borderRadius={15} style={styles.backgroundImage}>
              {checkStatus !== '1' ?
                <View style={styles.detailContainer}>
                  <View>
                    <Text style={styles.textTitleLoan}>{language.PGO__TITLE_LOAN}</Text>
                  </View>
                  <View style={styles.boxSubtitle}>
                    <Text style={styles.textSubtitleLoan}>{language.DASHBOARD__LOAN_APPLICATION_STATUS}</Text>
                  </View>
                  <View style={styles.rowLoan}>
                    <View style={styles.blockOne}>
                      <View style={styles.circleCheck}>
                        <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                      </View>
                      <View style={styles.verticalLine}/>
                      {status === 'AUDIT_SUCCESS' ?
                        <View style={styles.circleCheck}>
                          <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                        </View> :
                        status !== 'AUDIT_REFUSE' ?
                          <View style={styles.circleCheck}/> :
                          <View style={styles.circleCheck}>
                            <SimasIcon name={'fail'} size={7} style={styles.checkListCross}/>
                          </View>
                      }
                      <View style={styles.verticalLine}/>
                      {status === 'AUDIT_SUCCESS' ?
                        <View style={styles.circleCheck}>
                          <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                        </View> : status !== 'AUDIT_REFUSE' ?
                          <View style={styles.circleCheck} /> :
                          <View style={styles.circleCheck}>
                            <SimasIcon name={'fail'} size={7} style={styles.checkListcross}/>
                          </View>
                      }
                    </View>

                    <View style={styles.blockTwo}>
                      <Text style={styles.textTitleLoan}>
                        {language.PGO__DISPLAY_CARD_APLICATION_RECEIVED}
                      </Text>
                      <Text style={styles.textTitleLoanApprove}>
                        {language.PGO__DISPLAY_CARD_ON_REVIEW}
                      </Text>
                      {status === 'AUDIT_SUCCESS' ?
                        <Text style={styles.textTitleLoan}>
                          {language.PGO__DISPLAY_CARD_ON_APROVED}
                        </Text> : status === 'AUDIT_REFUSE' ?
                          <Text style={styles.textTitleLoan}>
                            {language.PGO__DISPLAY_CARD_ON_REJECT}
                          </Text> :
                          <Text style={styles.textTitleLoan}>
                            {language.PGO__LOAN_RESULT_STATUS}
                          </Text>
                      }
                    </View>

                  </View>
                  {status === 'AUDIT_SUCCESS' ?
                    <Touchable onPress={this.goToLoanSummaryPage} style={styles.arrowIconContainerLoan}>
                      <View style={styles.arrowContainer}>
                        <SimasIcon name={'arrow'} size={13} style={styles.loanArrow}/>
                      </View>
                    </Touchable> : null
                  }
                </View> :
                <View style={styles.detailContainer}>
                  <View style={styles.row}>
                    <Text style={styles[`${itemTheme.styleType}FeatureTitle`]}>{language.PGO__TITLE_LOAN}</Text>
                  </View>
                  {
                    availableBalances === null && (accountType === 'SavingAccount' || accountType === 'CurrentAccount' || accountType === 'TimeDepositAccount' || accountType === 'savingAccount') ?
                      <View style={styles.reloadBalance}>
                        <Text style={styles.reloadText}>{language.DASHBOARD__TAP_TO_RELOAD}</Text>
                        <View style={styles.reloadIcon}><SimasIcon name='reload' style={styles.reloadIcon} size={15}/></View>
                      </View>
                      :
                      <AccountInfoItemDetails accountType={accountType} itemTheme={itemTheme} accountInfo={accountInfo} balances={balances}
                        setVisibility={setVisibility} accountVisible={accountVisible} {...details} typeOfLoan={typeOfLoan}/>
                  }
                  {itemTheme.displayArrow && <Touchable onPress={availableBalances === null ? loadBalances : onItemPress} style={styles.arrowIconContainer}>
                    <View style={styles.arrowContainer}>
                      <SimasIcon name={'arrow'} size={13} style={styles.loanArrow}/>
                    </View>
                  </Touchable>}
                </View>}
            </ImageBackground>
            {checkStatus === '1' &&
            <View>
              <View>
                <AccountDetails getMmqDataDetail={getMmqDataDetail} index={index} accountInfo={accountInfo} {...details} goToSimasTaraDetail={goToSimasTaraDetail}/>
              </View>

              {checkStatusDetail === '1' &&
              <Touchable style={styles.buttonPay} onPress={goToBillerVirtualAccount(result(accountInfo, 'va', ''))}>
                <Text style={styles.textPay}>
                  {language.DASHBOARD__LOAN_PAY_NOW}
                </Text>
              </Touchable>
              }
            </View> }
          </View>
          : openingAccount === 'openingSA' ?
            <View>
              <View style={styles.imageContainer}>
                <ImageBackground source={itemTheme.image} borderRadius={15} style={styles.backgroundImage}>
                  <View style={styles.detailContainer}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.textTitleLoan}>{productName}</Text>
                    </View>
                    <View style={styles.boxSubtitle}>
                      <Text style={styles.textSubtitleLoan}>{language.DASHBOARD__LOAN_APPLICATION_STATUS}:</Text>
                    </View>
                    {isUsingDigisign ?
                      statusOpeningAccount !== '' ?
                        <View style={styles.detailRowAndr}>
                          <View style={styles.blockOne}>
                            <View style={styles.circleCheck}>
                              <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                            </View>

                            <View style={styles.verticalLine}/>
                            {statusOpeningAccount === '20' || statusOpeningAccount === '30' || statusOpeningAccount === '99' ?
                              <View style={styles.circleCheck}>
                                <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                              </View> : statusOpeningAccount === '98' || statusOpeningAccount === '97' ?
                                <View style={styles.circleCheck}>
                                  <SimasIcon name={'fail'} size={7} style={styles.checkListcross}/>
                                </View> : <View style={styles.circleCheck} />
                            }

                            <View style={styles.verticalLine}/>
                            {statusOpeningAccount === '30' || statusOpeningAccount === '99' ?
                              <View style={styles.circleCheck}>
                                <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                              </View> : statusOpeningAccount === '98' || statusOpeningAccount === '97' ?
                                <View style={styles.circleCheck}>
                                  <SimasIcon name={'fail'} size={7} style={styles.checkListcross}/>
                                </View> :
                                <View style={styles.circleCheck} />
                            }
                          </View>

                          <View>
                            <Text style={styles.textTitleLoanOA}>
                              {language.PGO__DISPLAY_CARD_APLICATION_RECEIVED}
                              {language.GENERAL__COMMA}
                              {aplicationReceived !== '' ? moment.unix(aplicationReceived / 1000).format('DD MMM YYYY [at] HH:mm') : ''}
                            </Text>

                            <Text style={styles.textTitleLoanOA}>
                            Verification {statusOpeningAccount === '20' || statusOpeningAccount === '30' || statusOpeningAccount === '99' ? <Text>- Approved</Text> : statusOpeningAccount === '97' || statusOpeningAccount === '98' ? <Text>- Rejected</Text> : null}
                              {language.GENERAL__COMMA}
                              {verificationDate !== '' ? moment.unix(verificationDate / 1000).format('DD MMM YYYY [at] HH:mm') : ''}
                            </Text>
                            <Text style={styles.textTitleLoanOA}>
                            Sign Document {statusOpeningAccount === '30' || statusOpeningAccount === '99' ? <Text>- Complete</Text> : statusOpeningAccount === '97' || statusOpeningAccount === '98' ? <Text>- Rejected</Text> : null}
                              {language.GENERAL__COMMA}
                              {signingDate !== '' ? moment.unix(signingDate / 1000).format('DD MMM YYYY [at] HH:mm') : ''}
                            </Text>
                          </View>
                        </View>
                        :
                        <Touchable onPress={approveAplication(accountInfo)} style={styles.reloadUpdates}>
                          <Text style={styles.reloadText}>{language.TAP__SEE_UPDATE}</Text>
                          <View style={styles.reloadIcon}><SimasIcon name='reload' style={styles.reloadIcon} size={15}/></View>
                        </Touchable>
                      :
                    // no digisign
                      statusOpeningAccount !== '' ?
                        <View style={styles.detailRowAndrSA}>
                          <View style={styles.blockOne}>
                            <View style={styles.circleCheck}>
                              <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                            </View>

                            <View style={styles.verticalLineSA}/>
                            {statusOpeningAccount === '20' || statusOpeningAccount === '30' || statusOpeningAccount === '99' ?
                              <View style={styles.circleCheck}>
                                <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                              </View> : statusOpeningAccount === '98' || statusOpeningAccount === '97' ?
                                <View style={styles.circleCheck}>
                                  <SimasIcon name={'fail'} size={7} style={styles.checkListcross}/>
                                </View> : <View style={styles.circleCheck} />
                            }
                          </View>

                          <View>
                            <Text style={styles.textTitleLoanOASA}>
                              {language.PGO__DISPLAY_CARD_APLICATION_RECEIVED}
                              {language.GENERAL__COMMA}
                              {aplicationReceived !== '' ? moment.unix(aplicationReceived / 1000).format('DD MMM YYYY [at] HH:mm') : ''}
                            </Text>

                            <Text style={styles.textTitleLoanOASA}>
                          Verification {statusOpeningAccount === '20' || statusOpeningAccount === '30' || statusOpeningAccount === '99' ? <Text>- Approved</Text> : statusOpeningAccount === '97' || statusOpeningAccount === '98' ? <Text>- Rejected</Text> : null}
                              {language.GENERAL__COMMA}
                              {verificationDate !== '' ? moment.unix(verificationDate / 1000).format('DD MMM YYYY [at] HH:mm') : ''}
                            </Text>
                          </View>
                        </View>
                        :
                        <Touchable onPress={approveAplication(accountInfo)} style={styles.reloadUpdates}>
                          <Text style={styles.reloadText}>{language.TAP__SEE_UPDATE}</Text>
                          <View style={styles.reloadIcon}><SimasIcon name='reload' style={styles.reloadIcon} size={15}/></View>
                        </Touchable>
                    }
                  </View>
                </ImageBackground>
              </View>
              {nextStepOpeningAccount === '1' || nextStepOpeningAccount === '2' || nextStepOpeningAccount === '3' ?
                <View style={styles.borderSignDocument}>
                  <Touchable style={styles.buttonSignDocument} onPress={approveAplication(accountInfo, true)}>
                    <Text style={styles.textSignDocument}>
                      {language.BUTTON__SIGN_DOCUMENT}
                    </Text>
                  </Touchable>
                </View>
                : null}
              {(nextStepOpeningAccount === '99' && statusOpeningAccount === '30') || (nextStepOpeningAccount === '0' && statusOpeningAccount === '30') ?
                <View style={styles.boxedInfo}>
                  <View>
                    <SimasIcon style={styles.iconColor} name='caution-circle' size={15}/>
                  </View>
                  <View>
                    <Text style={styles.info}>{language.BOX__INFO1} {productName}</Text>
                    <Text style={styles.info}>{language.BOX__INFO2}</Text>
                  </View>
                </View>
                : null
              }
            </View>
            : openingAccount === 'openingCC' ?
              <View>
                <View style={styles.imageContainer}>
                  <ImageBackground source={itemTheme.image} borderRadius={15} style={styles.backgroundImage}>
                    <View style={styles.detailContainer}>
                      <View style={styles.titleContainer}>
                        <Text style={styles.textTitleLoan}>{productName}</Text>
                      </View>
                      <View style={styles.boxSubtitle}>
                        <Text style={styles.textSubtitleLoan}>{language.DASHBOARD__LOAN_APPLICATION_STATUS}</Text>
                      </View>
                      {statusOpeningAccount !== '' ?
                        <View style={styles.detailRowAndr}>
                          <View style={styles.blockOne}>
                            <View style={styles.circleCheck}>
                              <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                            </View>

                            <View style={styles.verticalLine}/>
                            {statusOpeningAccount === '20' || statusOpeningAccount === '30' || statusOpeningAccount === '99' ?
                              <View style={styles.circleCheck}>
                                <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                              </View> : statusOpeningAccount === '98' || statusOpeningAccount === '97' ?
                                <View style={styles.circleCheck}>
                                  <SimasIcon name={'fail'} size={7} style={styles.checkListcross}/>
                                </View> : <View style={styles.circleCheck} />
                            }

                            <View style={styles.verticalLine}/>
                            {statusOpeningAccount === '30' || statusOpeningAccount === '99' ?
                              <View style={styles.circleCheck}>
                                <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                              </View> : statusOpeningAccount === '98' || statusOpeningAccount === '97' ?
                                <View style={styles.circleCheck}>
                                  <SimasIcon name={'fail'} size={7} style={styles.checkListcross}/>
                                </View> :
                                <View style={styles.circleCheck} />
                            }
                          </View>

                          <View>
                            <Text style={styles.textTitleLoanOA}>
                              {language.PGO__DISPLAY_CARD_APLICATION_RECEIVED}
                              {language.GENERAL__COMMA}
                              {aplicationReceived !== '' ? moment.unix(aplicationReceived / 1000).format('DD MMM YYYY [at] HH:mm') : ''}
                            </Text>

                            <Text style={styles.textTitleLoanOA}>
                            Verification {statusOpeningAccount === '20' || statusOpeningAccount === '30' || statusOpeningAccount === '99' ? <Text>- Approved</Text> : statusOpeningAccount === '97' || statusOpeningAccount === '98' ? <Text>- Rejected</Text> : null}
                              {language.GENERAL__COMMA}
                              {verificationDate !== '' ? moment.unix(verificationDate / 1000).format('DD MMM YYYY [at] HH:mm') : ''}
                            </Text>
                            <Text style={styles.textTitleLoanOA}>
                            Sign Document {statusOpeningAccount === '30' || statusOpeningAccount === '99' ? <Text>- Complete</Text> : statusOpeningAccount === '97' || statusOpeningAccount === '98' ? <Text>- Rejected</Text> : null}
                              {language.GENERAL__COMMA}
                              {signingDate !== '' ? moment.unix(signingDate / 1000).format('DD MMM YYYY [at] HH:mm') : ''}
                            </Text>
                          </View>
                        </View>
                        :
                        <Touchable onPress={approveAplication(accountInfo)} style={styles.reloadUpdates}>
                          <Text style={styles.reloadText}>{language.TAP__SEE_UPDATE}</Text>
                          <View style={styles.reloadIcon}><SimasIcon name='reload' style={styles.reloadIcon} size={15}/></View>
                        </Touchable>
                      }
                    </View>
                  </ImageBackground>
                </View>
                {nextStepOpeningAccount === '1' || nextStepOpeningAccount === '2' || nextStepOpeningAccount === '3' ?
                  <View style={styles.borderSignDocument}>
                    <Touchable style={styles.buttonSignDocument} onPress={approveAplication(accountInfo, true)}>
                      <Text style={styles.textSignDocument}>
                        {language.BUTTON__SEE_OFFER}
                      </Text>
                    </Touchable>
                  </View>
                  : null }

                {(nextStepOpeningAccount === '99' && statusOpeningAccount === '30') || (nextStepOpeningAccount === '0' && statusOpeningAccount === '30') ?
                  <View style={styles.boxedInfo}>
                    <View>
                      <SimasIcon style={styles.iconColor} name='caution-circle' size={15}/>
                    </View>
                    <View>
                      <Text style={styles.info}>{language.BOX__INFO1} {productName}</Text>
                      <Text style={styles.info}>{language.BOX__INFO2}</Text>
                    </View>
                  </View>
                  : null
                }
              </View>

              : openingAccount === 'openingLOAN' ?
                <View>
                  <View style={styles.imageContainer}>
                    <ImageBackground source={itemTheme.image} borderRadius={15} style={styles.backgroundImage}>
                      <View style={styles.detailContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.textTitleLoan}>{productName}</Text>
                        </View>
                        <View style={styles.boxSubtitle}>
                          <Text style={styles.textSubtitleLoan}>{language.DASHBOARD__LOAN_APPLICATION_STATUS}</Text>
                        </View>
                        {result(accountInfo, 'code', '') === 'LoanKPR' ?
                          statusOpeningAccount !== '' ? isEmpty(loopingData) ?
                            null :
                            loopingData.map(this.renderView)
                            :
                            <Touchable onPress={approveAplication(accountInfo)} style={styles.reloadUpdates}>
                              <Text style={styles.reloadText}>{language.TAP__SEE_UPDATE}</Text>
                              <View style={styles.reloadIcon}><SimasIcon name='reload' style={styles.reloadIcon} size={15}/></View>
                            </Touchable>
                          :
                          statusOpeningAccount !== '' ?
                            <View style={styles.detailRowAndr}>
                              <View style={styles.blockOne}>
                                <View style={styles.circleCheck}>
                                  <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                                </View>

                                <View style={styles.verticalLine}/>
                                {statusOpeningAccount === '20' || statusOpeningAccount === '30' || statusOpeningAccount === '99' ?
                                  <View style={styles.circleCheck}>
                                    <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                                  </View> : statusOpeningAccount === '98' || statusOpeningAccount === '97' ?
                                    <View style={styles.circleCheck}>
                                      <SimasIcon name={'fail'} size={7} style={styles.checkListcross}/>
                                    </View> : <View style={styles.circleCheck} />
                                }

                                <View style={styles.verticalLine}/>
                                {statusOpeningAccount === '30' || statusOpeningAccount === '99' ?
                                  <View style={styles.circleCheck}>
                                    <SimasIcon name={'check-black'} size={9} style={styles.checkList}/>
                                  </View> : statusOpeningAccount === '98' || statusOpeningAccount === '97' ?
                                    <View style={styles.circleCheck}>
                                      <SimasIcon name={'fail'} size={7} style={styles.checkListcross}/>
                                    </View> :
                                    <View style={styles.circleCheck} />
                                }
                              </View>

                              <View>
                                <Text style={styles.textTitleLoanOA}>
                                  {language.PGO__DISPLAY_CARD_APLICATION_RECEIVED}
                                  {language.GENERAL__COMMA}
                                  {aplicationReceived !== '' ? moment.unix(aplicationReceived / 1000).format('DD MMM YYYY [at] HH:mm') : ''}
                                </Text>

                                <Text style={styles.textTitleLoanOA}>
                              Verification {statusOpeningAccount === '20' || statusOpeningAccount === '30' || statusOpeningAccount === '99' ? <Text>- Approved</Text> : statusOpeningAccount === '97' || statusOpeningAccount === '98' ? <Text>- Rejected</Text> : null}
                                  {language.GENERAL__COMMA}
                                  {verificationDate !== '' ? moment.unix(verificationDate / 1000).format('DD MMM YYYY [at] HH:mm') : ''}
                                </Text>
                                <Text style={styles.textTitleLoanOA}>
                              Sign Document {statusOpeningAccount === '30' || statusOpeningAccount === '99' ? <Text>- Complete</Text> : statusOpeningAccount === '97' || statusOpeningAccount === '98' ? <Text>- Rejected</Text> : null}
                                  {language.GENERAL__COMMA}
                                  {signingDate !== '' ? moment.unix(signingDate / 1000).format('DD MMM YYYY [at] HH:mm') : ''}
                                </Text>
                              </View>
                            </View>
                            :
                            <Touchable onPress={approveAplication(accountInfo)} style={styles.reloadUpdates}>
                              <Text style={styles.reloadText}>{language.TAP__SEE_UPDATE}</Text>
                              <View style={styles.reloadIcon}><SimasIcon name='reload' style={styles.reloadIcon} size={15}/></View>
                            </Touchable>
                        }
                      </View>
                    </ImageBackground>
                  </View>
                  {nextStepOpeningAccount === '1' || nextStepOpeningAccount === '2' || nextStepOpeningAccount === '3' ?
                    <View style={styles.borderSignDocument}>
                      <Touchable style={styles.buttonSignDocument} onPress={approveAplication(accountInfo, true)}>
                        <Text style={styles.textSignDocument}>
                          {language.BUTTON__SEE_OFFER}
                        </Text>
                      </Touchable>
                    </View>
                    : null }
                  {(nextStepOpeningAccount === '99' && statusOpeningAccount === '30') || (nextStepOpeningAccount === '0' && statusOpeningAccount === '30') ?
                    <View style={styles.boxedInfo}>
                      <View>
                        <SimasIcon style={styles.iconColor} name='caution-circle' size={15}/>
                      </View>
                      <View>
                        <Text style={styles.info}>{language.BOX__INFO1} {productName}</Text>
                        <Text style={styles.info}>{language.BOX__INFO2}</Text>
                      </View>
                    </View>
                    : null
                  }
                </View>

                : cardStatus === '2' || cardStatus === '3' || cardStatus === '5' || (cardStatus === '0' && cardBase === 'physicalCreditCard') ?
                  <View style={styles.imageContainer}>
                    <ImageBackground source={itemTheme.image} borderRadius={15} style={styles.backgroundImage}>
                      <View style={styles.backgroundImage2}>
                        <SimasIcon style={styles.imageOffer2} name='change-password-2-outline' size={75}/>
                        <Text style={styles.informationText}>{cardStatus === '2' ? language.DASHBOARD__CREDIT_UNBLOCK : language.DASHBOARD__CREDIT_ACTIVATE}</Text>
                        <View style={styles.detailContainer}>
                          <View style={styles.row}>
                            <Text style={styles[`${itemTheme.styleType}FeatureTitle`]}>{itemTheme.title}</Text>
                            {itemTheme.displayEye ?
                              <Touchable onPress={setVisibility} style={{width: 30, height: 30}}>
                                <LayeredIcon layers={accountVisible ?  eyeCloseIcon : eyeOpenIcon }/>
                              </Touchable>
                              : null}
                          </View>
                          <AccountInfoItemDetails accountType={accountType} itemTheme={itemTheme} accountInfo={accountInfo} balances={balances}
                            setVisibility={setVisibility} accountVisible={accountVisible} details={details} {...details}/>
                          {itemTheme.displayArrow && <View onPress={onItemPress} style={styles.arrowIconContainer}>
                            <View style={styles.arrowContainer}>
                              <SimasIcon name={'arrow'} size={13} style={styles[`${itemTheme.styleType}ArrowIcon`]}/>
                            </View>
                          </View>}
                        </View>
                      </View>
                    </ImageBackground>
                  </View>
                  : accountStatus === 'dormant' ?
                    <View style={styles.imageContainer}>
                      <ImageBackground source={itemTheme.image} borderRadius={15} style={styles.backgroundImage}>
                        <View style={styles.backgroundImage2}>
                          <SimasIcon style={styles.imageOffer2} name='change-password-2-outline' size={75}/>
                          <Text style={styles.informationText}>{language.DASHBOARD__CREDIT_ACTIVATE}</Text>
                          <View style={styles.detailContainer}>
                            <View style={styles.row}>
                              <Text style={styles[`${itemTheme.styleType}FeatureTitle`]}>{itemTheme.title}</Text>
                              {itemTheme.displayEye ?
                                <Touchable onPress={setVisibility} style={{width: 30, height: 30}}>
                                  <LayeredIcon layers={accountVisible ?  eyeCloseIcon : eyeOpenIcon }/>
                                </Touchable>
                                : null}
                            </View>
                            {
                              availableBalances === null && (accountType === 'SavingAccount' || accountType === 'CurrentAccount' || accountType === 'TimeDepositAccount' || accountType === 'savingAccount') ?
                                <View style={styles.reloadBalance}>
                                  <Text style={styles.reloadText}>{language.DASHBOARD__TAP_TO_RELOAD}</Text>
                                  <View style={styles.reloadIcon}><SimasIcon name='reload' style={styles.reloadIcon} size={15}/></View>
                                </View>
                                :
                                <AccountInfoItemDetails accountType={accountType} itemTheme={itemTheme} accountInfo={accountInfo} balances={balances}
                                  setVisibility={setVisibility} accountVisible={accountVisible} getMmqDataDetail={getMmqDataDetail}
                                  getMmq={getMmq} NamaProgram={NamaProgram} {...details} />
                            }
                            {itemTheme.displayArrow && <Touchable onPress={goToshowDormantModal} style={styles.arrowIconContainer}>
                              <View style={styles.arrowContainer}>
                                <SimasIcon name={'arrow'} size={13} style={styles[`${itemTheme.styleType}ArrowIcon`]}/>
                              </View>
                            </Touchable>}
                          </View>
                        </View>
                      </ImageBackground>
                    </View>
                    :
                    <View>
                      <View style={styles.imageContainer}>
                        <ImageBackground source={itemTheme.image} borderRadius={15} style={styles.backgroundImage}>
                          <View style={styles.detailContainer}>

                            <View style={styles.row}>
                              <Text style={styles[`${itemTheme.styleType}FeatureTitle`]}>{itemTheme.title}</Text>
                              {itemTheme.displayEye ?
                                <Touchable onPress={setVisibility} style={{width: 30, height: 30}}>
                                  <LayeredIcon layers={accountVisible ?  eyeCloseIcon : eyeOpenIcon }/>
                                </Touchable>
                                : null}
                            </View>
                            {
                              availableBalances === null && (accountType === 'SavingAccount' || accountType === 'CurrentAccount' || accountType === 'TimeDepositAccount' || accountType === 'savingAccount') ?
                                <View style={styles.reloadBalance}>
                                  <Text style={styles.reloadText}>{language.DASHBOARD__TAP_TO_RELOAD}</Text>
                                  <View style={styles.reloadIcon}><SimasIcon name='reload' style={styles.reloadIcon} size={15}/></View>
                                </View>
                                :
                                <AccountInfoItemDetails accountType={accountType} itemTheme={itemTheme} accountInfo={accountInfo} balances={balances}
                                  setVisibility={setVisibility} accountVisible={accountVisible} getMmqDataDetail={getMmqDataDetail} getMmq={getMmq} NamaProgram={NamaProgram} {...details}/>
                            }
                            {itemTheme.displayArrow && <Touchable onPress={accountInfo.NamaProgram === 'MudharabahMuqayyadah' ? getMmqDataDetail(accountInfo) : availableBalances === null ? loadBalances : itemType === 'savingAccount' || itemType === 'currentAccount' || itemType === 'rdn' ? this.showDetail() : onItemPress(accountInfo)} style={styles.arrowIconContainer3}>
                              {
                                availableBalances !== null && (itemType === 'savingAccount' || itemType === 'currentAccount') ?
                                  <View style={styles.accountNumberContainer}>
                                    <Text style={styles[`${itemTheme.styleType}AccountNumberText`]}>{language.DASHBOARD__CARD_NUMBER}</Text>
                                    <View style={styles.arrowContainer2}>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text style={styles[`${itemTheme.styleType}AccountNumberValue`]}>{accountNumber}</Text>
                                        {
                                          itemTheme.displayCopy ?
                                            <Touchable onPress={wrapMethodInFunction(copyToCLipboard, accountNumber)} style={{paddingLeft: 5}}>
                                              <SimasIcon style={styles[`${itemTheme.styleType}AccountNumberValue`]} name={'copy'}/>
                                            </Touchable>
                                            : null
                                        }
                                      </View>
                                      <SimasIcon name={'arrow'} size={13} style={styles[`${itemTheme.styleType}ArrowIcon`]}/>
                                    </View>
                                    <Text style={styles.codeMerchant}>{itemTheme.merchant}</Text>
                                  </View>
                                  :
                                  <View style={styles.arrowContainer}>
                                    <SimasIcon name={'arrow'} size={13} style={styles[`${itemTheme.styleType}ArrowIcon`]}/>
                                  </View>
                              }
                            </Touchable>}
                          </View>
                        </ImageBackground>
                      </View>
                    </View>
        }
      </View>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  goToBillerVirtualAccount: (virtualData) => () => {
    dispatch(goToVAtransfer(virtualData, true));
  },
  goToSimasTaraDetail: (accountInfo) => dispatch(getSimasTaraDetail(accountInfo)),
  goToCloseSimasTara: (simasTaraAccNo, productType, sourceAccNoSimasTara) => dispatch(closeSimasTara(simasTaraAccNo, productType, sourceAccNoSimasTara)),
  detailLockedAmount: (accountNumber) => dispatch(detailLockedAmount(accountNumber)),
});

const mapStateToProps = (state) => {
  const accountsCust = result(state, 'accounts', []);
  const spinner = result(state, 'showSpinner');
  const detailLocked = result(state, 'deatilLockedAmount', {});
  return {accountsCust, spinner, detailLocked};
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfoItem);

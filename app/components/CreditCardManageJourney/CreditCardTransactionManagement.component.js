import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './CreditCardTransactionManagement.style';
import {language} from '../../config/language';
import {Field} from 'redux-form';
import {SinarmasAlert} from '../FormComponents';
import Switch from '../FormComponents/SinarmasSwitch/Switch.component';
import EasyPinModal from '../EasyPin/EasyPinModal.component';

class CreditCardTransactionManagement extends React.Component {

  static propTypes = {
    selectedAccount: PropTypes.object,
    dispatch: PropTypes.func,
    txnManage: PropTypes.func,
    moveTo: PropTypes.func,
    navigation: PropTypes.object,
    txnValue: PropTypes.object
  }

  state = {
    eEmodalVisible: false,
    iEmodalVisible: false,
    cEmodalVisible: false,
    EtoggleCheck: false,
    ItoggleCheck: false,
    CtoggleCheck: false,
    authModal: false,
  }

  toogleFirst = () => {
    const {txnValue} = this.props;
    const isOff = false;
    this.setState({EtoggleCheck: txnValue.flagECommerce === 'Y' ? true : isOff});
    this.setState({ItoggleCheck: txnValue.flagOverSeas === 'Y' ? true : isOff});
    this.setState({CtoggleCheck: txnValue.flagCav === 'Y' ? true : isOff});
  };

  componentDidMount () {
    this.toogleFirst();
  }

  EetoggleModalVisible = () => {
    this.setState({eEmodalVisible: true});
  };

  IetoggleModalVisible = () => {
    this.setState({iEmodalVisible: true});
  };

  CetoggleModalVisible = () => {
    this.setState({cEmodalVisible: true});
  };

  goBack = () => {
    this.setState({eEmodalVisible: false});
    this.setState({iEmodalVisible: false});
    this.setState({cEmodalVisible: false});
  };

  handleEToggle = () => {
    const {txnValue} = this.props;
    const isOff = false;
    this.setState({EtoggleCheck: txnValue.flagECommerce === 'Y' ? isOff : true});
    this.setState({eEmodalVisible: false});
    this.showModal();
  };

  handleIToggle = () => {
    const {txnValue} = this.props;
    const isOff = false;
    this.setState({ItoggleCheck: txnValue.flagOverSeas === 'Y' ? isOff : true});
    this.setState({iEmodalVisible: false});
    this.showModal();
  };

  handleCToggle = () => {
    const {txnValue} = this.props;
    const isOff = false;
    this.setState({CtoggleCheck: txnValue.flagCav === 'Y' ? isOff : true});
    this.setState({cEmodalVisible: false});
    this.showModal();
  };

  hideModal = () => this.setState({authModal: false});

  showModal = () => {
    const {moveTo} = this.props;
    const params = {onSubmit: this.onModalSubmit, isOtp: false, isEasypin: true};
    moveTo('AuthDashboard', params);
  };

  onModalSubmit = () => {
    const {EtoggleCheck, ItoggleCheck, CtoggleCheck} = this.state;
    const {selectedAccount, txnValue} = this.props;
    this.setState(() => {
      // set time out because of this bug
      // https://github.com/facebook/react-native/issues/10471
      setTimeout(() => {
        const flagECommerce = EtoggleCheck ? 'Y' : 'N';
        const flagCav = CtoggleCheck ? 'Y' : 'N';
        const flagOverSeas = ItoggleCheck ? 'Y' : 'N';
        const allowEcommTxn = txnValue.flagECommerce;
        const allowCavTxn = txnValue.flagCav;
        const allowOverseaTxn = txnValue.flagOverSeas;

        this.props.txnManage(selectedAccount, flagECommerce, flagCav, flagOverSeas, allowEcommTxn, allowCavTxn, allowOverseaTxn);
      }, 500);
    });
  };

  render () {
    const {txnValue} = this.props;
    const {eEmodalVisible, iEmodalVisible, cEmodalVisible} = this.state;
    const isOff = false;
    return (
      <View style={styles.container}>

        <View style={styles.rightItemContainer}>
          <View style={styles.containerLeft}>
            <Text style={styles.optionText}>{language.DASHBOARD__CREDIT_CARD_ECOMERCE}</Text>
            <Switch
              onChangeHandler={this.EetoggleModalVisible}
              defaultValue={txnValue.flagECommerce === 'Y' ? true : isOff}
              noText={true}
              colorBrand={true}
              switchWidth={38}
              switchHeight={19}
              buttonWidth={16}
              buttonHeight={16}/>
          </View>

          <View style={styles.summaryArea}/>

          <View style={styles.containerLeft}>
            <Text style={styles.optionText}>{language.DASHBOARD__CREDIT_CARD_INT_TRX}</Text>
            <Switch
              onChangeHandler={this.IetoggleModalVisible}
              defaultValue={txnValue.flagOverSeas === 'Y' ? true : isOff}
              noText={true}
              colorBrand={true}
              switchWidth={38}
              switchHeight={19}
              buttonWidth={16}
              buttonHeight={16}/>
          </View>

          <View style={styles.summaryArea}/>

          <View style={styles.containerLeft}>
            <Text style={styles.optionText}>{language.DASHBOARD__CREDIT_CARD_CASH}</Text>
            <Switch
              onChangeHandler={this.CetoggleModalVisible}
              defaultValue={txnValue.flagCav === 'Y' ? true : isOff}
              noText={true}
              colorBrand={true}
              switchWidth={38}
              switchHeight={19}
              buttonWidth={16}
              buttonHeight={16}/>
          </View>

          <View style={styles.summaryArea}/>

        </View>

        <SinarmasAlert
          visible = {eEmodalVisible}
          button1 = {txnValue.flagECommerce === 'N' ? language.DASHBOARD__CREDIT_CARD_ACTIVATE : language.DASHBOARD__CREDIT_CARD_DISABLE}
          button2 = {language.MANAGE__CREDIT_CARD_STATEMENT_CANCEL}
          heading1 = {language.DASHBOARD__CREDIT_CARD_ATTENTION}
          heading2 = {txnValue.flagECommerce === 'N' ? language.DASHBOARD__CREDIT_CARD_ACONFE : language.DASHBOARD__CREDIT_CARD_DCONFE}
          onButton1Press = {this.handleEToggle}
          onButton2Press = {this.goBack}
          image = 'TMANAGE'
          button2color = 'red'
          onClose = {this.goBack}
        />

        <SinarmasAlert
          visible = {iEmodalVisible}
          button1 = {txnValue.flagOverSeas === 'N' ? language.DASHBOARD__CREDIT_CARD_ACTIVATE : language.DASHBOARD__CREDIT_CARD_DISABLE}
          button2 = {language.MANAGE__CREDIT_CARD_STATEMENT_CANCEL}
          heading1 = {language.DASHBOARD__CREDIT_CARD_ATTENTION}
          heading2 = {txnValue.flagOverSeas === 'N' ? language.DASHBOARD__CREDIT_CARD_ACONFI : language.DASHBOARD__CREDIT_CARD_DCONFI}
          onButton1Press = {this.handleIToggle}
          onButton2Press = {this.goBack}
          image = 'TMANAGE'
          button2color = 'red'
          onClose = {this.goBack}
        />

        <SinarmasAlert
          visible = {cEmodalVisible}
          button1 = {txnValue.flagCav === 'N' ? language.DASHBOARD__CREDIT_CARD_ACTIVATE : language.DASHBOARD__CREDIT_CARD_DISABLE}
          button2 = {language.MANAGE__CREDIT_CARD_STATEMENT_CANCEL}
          heading1 = {language.DASHBOARD__CREDIT_CARD_ATTENTION}
          heading2 = {txnValue.flagCav === 'N' ? language.DASHBOARD__CREDIT_CARD_ACONFC : language.DASHBOARD__CREDIT_CARD_DCONFC}
          onButton1Press = {this.handleCToggle}
          onButton2Press = {this.goBack}
          image = 'TMANAGE'
          button2color = 'red'
          onClose = {this.goBack}
        />


        <Field name='easyPin' component={EasyPinModal} visible={this.state.authModal}
          onClose={this.hideModal} submitHandler={this.onModalSubmit}/>

      </View>
    );
  }
}

export default CreditCardTransactionManagement;

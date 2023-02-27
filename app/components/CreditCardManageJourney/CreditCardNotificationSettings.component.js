import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './CreditCardNotificationSettings.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Field} from 'redux-form';
import {result, isEmpty} from 'lodash';
import * as Utils from '../../utils/transformer.util';
import {SinarmasInput, SinarmasAlert} from '../FormComponents';
import Switch from '../FormComponents/SinarmasSwitch/Switch.component';
import {Toast} from '../../utils/RNHelpers.util.js';

class CreditCardNotificationSettings extends React.Component {

  static propTypes = {
    selectedAccount: PropTypes.object,
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    notifSettings: PropTypes.func,
    moveTo: PropTypes.func,
    setNotifSettings: PropTypes.func,
  }

  state = {
    smsToggleCheck: false,
    emailToggleCheck: false,
    smsModalVisible: false,
    emailModalVisible: false,
  }

  firstToogle = () => {
    const {notifSettings} = this.props;
    const isOn = false;
    this.setState({
      smsToggleCheck: notifSettings.notifFlag === 'Y' ? true : isOn,
    });
  }

  componentDidMount () {
    this.firstToogle();
  }

  toggleSmsModalVisible = () => {
    const {formValues, notifSettings} = this.props;
    const amount = result(formValues, 'amount', '');
    if (!isEmpty(amount)) {
      this.setState({smsModalVisible: true});
    } else if (notifSettings.notifFlag === 'Y') {
      this.setState({smsModalVisible: true});
    } else {
      Toast.show(language.DASHBOARD__CREDIT_CARD_NOTIF_ENABLE);
    }
  }

  toggleEmailModalVisible = () => {
    this.setState({emailModalVisible: true});
  }

  goBack = () => {
    this.setState({
      smsModalVisible: false,
      emailModalVisible: false
    });
  }

  handleSmsToggle = () => {
    const {notifSettings} = this.props;
    const isOn = false;
    this.setState({
      smsToggleCheck: notifSettings.notifFlag === 'Y' ? isOn : true,
      smsModalVisible: false
    });
    this.showModal();
  }

  handleEmailToggle = () => {
    this.setState({
      emailToggleCheck: !this.state.emailToggleCheck,
      emailModalVisible: false
    });
    this.showModal();
  }

  showModal = () => {
    const {moveTo} = this.props;
    const params = {onSubmit: this.onModalSubmit, isOtp: false, isEasypin: true};
    moveTo('AuthDashboard', params);
  }

  hideModal = () => this.setState({authModal: false});

  onModalSubmit = () => {
    const {smsToggleCheck, emailToggleCheck} = this.state;
    const {notifSettings, navigation, formValues} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount', {});
    this.setState(() => {
      setTimeout(() => {
        const allowNotifFlag = notifSettings.notifFlag;
        const allowEmailNotifFlag = notifSettings.emailNotifFlag;
        const flagSms = smsToggleCheck ? 'Y' : 'N';
        const flagEmail = emailToggleCheck ? 'Y' : 'N';
        const amount = result(formValues, 'amount', '');
        this.props.setNotifSettings(selectedAccount, allowNotifFlag, allowEmailNotifFlag, flagSms, flagEmail, amount);
      }, 500);
    });
  }

  render () {
    const {smsModalVisible, emailModalVisible} = this.state;
    const {notifSettings, formValues} = this.props;
    const amount = parseInt(result(formValues, 'amount', ''));
    const isOff = false;
    return (
      <View style={styles.container}>
        <View style={styles.halfWidth}>
          <View style={styles.halfWidth}>
            <ScrollView contentContainerStyle={{paddingBottom: 60}} style={styles.container}>
              <View style={styles.top}>
                <View style={styles.containerLeft}>
                  <View style={styles.detail}>
                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.CREDITCARD__SMS_NOTIF}</Text>
                      <Switch
                        onChangeHandler={this.toggleSmsModalVisible}
                        defaultValue={notifSettings.notifFlag === 'Y' ? true : isOff}
                        noText={true}
                        colorBrand={true}
                        switchWidth={38}
                        switchHeight={19}
                        buttonWidth={16}
                        buttonHeight={16}
                      />
                    </View>
                    <View style={styles.detailInside}>
                      <View style={styles.greyLine}/>
                    </View>
                    {/* <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.CREDITCARD__EMAIL_NOTIF}</Text>
                      <Switch
                        onChangeHandler={this.toggleEmailModalVisible}
                        defaultValue={emailToggleCheck}
                        noText={true}
                        colorBrand={true}
                        switchWidth={38}
                        switchHeight={19}
                        buttonWidth={16}
                        buttonHeight={16}
                      />
                    </View>
                    <View style={styles.detailInside}>
                      <View style={styles.greyLine}/>
                    </View> */}
                    <View>
                      <View style={styles.box}>
                        <View style={styles.rowRight}>
                          <View style={styles.inputStyle}>
                            <Field
                              name='amount'
                              placeholder={language.CREDITCARD__NOTIF_HINT_MIN}
                              format={Utils.formatFieldAmount}
                              normalize={Utils.normalizeAmount}
                              keyboardType='numeric'
                              component={SinarmasInput}
                              style={styles.inputStyle}
                              maxLength={13}
                              textPosition='left'
                              label={language.CREDITCARD__NOTIF_SET_MIN}
                              errorDisable={true}
                            />
                          </View>
                        </View>
                      </View>
                      {(amount < 500000) ?

                        <View style={styles.warningContainer}>
                          <SimasIcon name={'input-error'} size={12} style={styles.warningIconR}/>
                          <View style={styles.warningTextContainer}>
                            <Text style={styles.warningTextR}>{language.CREDITCARD__NOTIF_MIN_AMOUNT}</Text>
                          </View>
                        </View>

                        : null }

                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.mid}>
                <View style={styles.rightItemContainer}>
                  <View style={styles.containerRightDetail}>
                    <View style={styles.detailWarning}>
                      <View style={styles.detailInside}>
                        <View style={styles.iconContainer}>
                          <SimasIcon name={'caution-circle'} size={30} style={styles.warningIcon}/>
                        </View>
                        <View>
                          <Text style={styles.warningText}>{language.CREDITCARD__NOTIF_CAUTION}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <SinarmasAlert
          visible = {smsModalVisible}
          button1 = {language.CREDITCARD__NOTIF_SAVE}
          button2 = {language.CREDITCARD__NOTIF_CANCEL}
          heading1 = {language.CREDITCARD__NOTIF_HEADER}
          heading2 = {language.CREDITCARD__NOTIF_DESC}
          onButton1Press = {this.handleSmsToggle}
          onButton2Press = {this.goBack}
          image = 'TMANAGE'
          button2color = 'red'
          onClose = {this.goBack}
        />
        <SinarmasAlert
          visible = {emailModalVisible}
          button1 = {language.CREDITCARD__NOTIF_SAVE}
          button2 = {language.CREDITCARD__NOTIF_CANCEL}
          heading1 = {language.CREDITCARD__NOTIF_HEADER}
          heading2 = {language.CREDITCARD__NOTIF_DESC}
          onButton1Press = {this.handleEmailToggle}
          onButton2Press = {this.goBack}
          image = 'TMANAGE'
          button2color = 'red'
          onClose = {this.goBack}
        />
      </View>
    );
  }
}

export default CreditCardNotificationSettings;

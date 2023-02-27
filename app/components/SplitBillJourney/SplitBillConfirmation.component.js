import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Platform} from 'react-native';
import {language} from '../../config/language';
import styles from './SplitBillConfirmation.component.styles';
import {formatFieldAmount, currencyFormatter, sumTotalInput, formatFieldNote, removeDot, amountMemberSplitBill, makePositive, formatMobileNumberEmoney} from '../../utils/transformer.util';
import {SinarmasButton, SinarmasPickerBoxNew, SinarmasInputBoxNewSplitBill} from '../FormComponents';
import {Field} from 'redux-form';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {SinarmasInputBillSmall} from '../FormComponents';
import * as Utils from '../../utils/transformer.util';
import {result, isEmpty, map, size, filter, trimEnd, sortBy, startsWith, capitalize, startCase, noop} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import iconRp from '../../assets/images/icon_rp.png';


export const fields = {
  AMOUNT: 'amount',
  DESCRIPTION: 'description',
  RECEIPT: 'receipt',
  DESTINATION_ACCOUNT: 'destinationAccount',
  MEMBER: 'member',
}; 

class SplitBillConfirmation extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      contacts: [],
      selectedContact: [],
      search: '',
      method: true,
    };
  }

  state = {
    total: 0,
    remainingBill: 0,
    valueInput: 0,
    totalRemaining: 0,
    billIndex: [],
    saveAmount: '',
  };

  static propTypes = {
    selectMobileNo: PropTypes.bool,
    handleSubmit: PropTypes.func,
    formValues: PropTypes.object,
    amount: PropTypes.string,
    onChangeAmountField: PropTypes.func, 
    total: PropTypes.string,
    accounts: PropTypes.array,
    onChangeMemberField: PropTypes.func,
    member: PropTypes.string,
    selectedContacts: PropTypes.array,
    selectInput: PropTypes.func,
    receiptBill: PropTypes.string,
    createBill: PropTypes.func,
    addNewParticipants: PropTypes.func,
    createBillEqual: PropTypes.func,
    isEmptyDescription: PropTypes.bool,
    validationInput: PropTypes.func,
    errors: PropTypes.bool,
    errorsMax: PropTypes.bool,
    hasilTotal: PropTypes.string,
    dispatch: PropTypes.func,
    errorBalance: PropTypes.bool,
    isEmptyDestinationAcc: PropTypes.bool,
    dataUser: PropTypes.object,
    getValueBillNew: PropTypes.object,
    cif: PropTypes.string,
    valueSplitBillQR: PropTypes.bool,
    valueSplitBillAddQR: PropTypes.bool,
    fillOwnBill: PropTypes.func,
    updateEmoneyBalance: PropTypes.func
  }
  equal =() => {
    this.setState({method: true});
  } 
  amount = () => {
    const {fillOwnBill} = this.props;
    this.setState({method: false});
    fillOwnBill();
  }

  createBillbyAmount = () => {
    const {billIndex} = this.state;
    const {selectedContacts = [], dataUser, createBill} = this.props;
    if (!isEmpty(billIndex) && !isEmpty(selectedContacts)) {
      if (billIndex.length !== selectedContacts.length) {
        const value = {
          indexBill: 0,
          Amount: '0',
          Nama: dataUser.displayName,
          mobileNumber: result(dataUser, 'phoneNumbers.0.number', '')
        };
        const finalBillIndex = [value, ...billIndex];
        createBill(finalBillIndex);
      } else {
        createBill(billIndex);
      }
    }
  }

  componentWillReceiveProps (newProps) {
    if (result(newProps, 'formValues.amount', '')) {
      const amountBillBefore = result(newProps, 'formValues.amount', '');
      const amountBill = removeDot(amountBillBefore);
      this.setState({remainingBill: parseFloat(amountBill)});
      const counterBill = size(this.state.billIndex);
      if (counterBill > 0) {
        const total = sumTotalInput(this.state.billIndex);
        this.setState({totalRemaining: total - this.state.remainingBill});
      }
    }
  }
  

  setBillPayObject=(value) => {
    this.setState({totalRemaining: 0});
    const counterBill = size(this.state.billIndex);
    const indexBill = result(value, 'indexBill', '');
    const AmountBefore = result(value, 'val', '');
    const Amount = removeDot(AmountBefore);
    const NamaBefore = result(value, 'fullName', '');
    const Nama = trimEnd(NamaBefore);
    const mobileNumber = formatMobileNumberEmoney(result(value, 'phoneNumber', ''));
    const valueBillNew = {indexBill, Amount, Nama, mobileNumber};
    if (counterBill > 0) {
      const checkIndex = filter(this.state.billIndex, (item) => {
        const resultIndex = result(item, 'indexBill', '');
        return indexBill === resultIndex;
      });
      const resultSize = size(checkIndex);
      if (resultSize === 1) {
        const checkIndexResult = filter(this.state.billIndex, (item) => {
          const resultIndex = result(item, 'indexBill', '');
          return indexBill !== resultIndex;
        });
        this.setState({billIndex: [...checkIndexResult, valueBillNew]});
        const total = sumTotalInput(this.state.billIndex);
        this.setState({totalRemaining: total - this.state.remainingBill});
      } else {
        this.setState({billIndex: [...this.state.billIndex, valueBillNew]});
        const total = sumTotalInput(this.state.billIndex);
        this.setState({totalRemaining: total - this.state.remainingBill});
      }
    } else {
      this.setState({billIndex: [valueBillNew]});
      const total = sumTotalInput(this.state.billIndex);
      this.setState({totalRemaining: total - this.state.remainingBill});
    }
  }

  updateEmoneyBalance = (value) => {
    const {updateEmoneyBalance} = this.props;
    const isEmoney = result(value, 'accountType', '') === 'emoneyAccount';
    if (isEmoney) {
      updateEmoneyBalance();
    }

  }

  selectedConfirm = (contact) => {
    const {total} = this.props; 
    const {method} = this.state;
    const index = result(contact, 'id', 0);
    const type = result(contact, 'type', '');
    const phoneNumberManual = formatMobileNumberEmoney(result(contact, 'phoneNumber', ''));
    const lastName = startCase(capitalize(result(contact, 'familyName', '')));
    const phoneNumbers = result(contact, 'phoneNumbers', []);
    const givenName = result(contact, 'givenName', '');
    const familyName = result(contact, 'familyName', '');
    const displayName = startCase(capitalize(result(contact, 'displayName', '')));
    const autoName = Platform.OS === 'ios' ? startCase(capitalize(givenName + ' ' + familyName)) : displayName;
    const userAccount = result(contact, 'user', '');
    const typeContact = result(contact, 'type', '');
    const phoneNumber = type === 'manual' ? phoneNumberManual : formatMobileNumberEmoney(result(phoneNumbers, '[0].number', ''));
    const uName = Platform.OS === 'ios' ?  startCase(capitalize(result(contact, 'displayName', ''))) : startCase(capitalize(result(contact, 'nama', '')));
    let fullName;
    if (lastName === null) {
      fullName = autoName;
    } else if (userAccount === 'user') {
      fullName = displayName;
    } else if (typeContact === 'manual') {
      fullName = displayName;
    } else {
      fullName = autoName;
    }
    const valueContactIndex = {fullName, phoneNumber};
    return (
      <View style={[styles.rowContainer, styles.stretch, styles.objData]}>
        <View style={styles.memberContainer}>
          {lastName === null ?
            <Text style={styles.contactName}>{displayName}</Text>
            :
            uName === 'You' ?
              <Text style={styles.contactName}>{uName}</Text>
              :
              <Text style={styles.contactName}>{fullName}</Text>
          }
          <Text style={styles.contactPhone}>{phoneNumber}</Text>
        </View>
        <View style={method ? styles.containerParticipantsEqual : styles.containerParticipants}>
          {method ?
            <Text style={styles.contactName}>{language.SPLITBILL__IDR} {currencyFormatter(total)}</Text>
            :
            <View style={styles.containerFieldByAmount}> 
              <View style={styles.labelRp}> 
                <Text style={styles.contactName}>{language.SPLITBILL__IDR}</Text>
              </View>
              <Field 
                name= {fields.MEMBER + index}
                component={SinarmasInputBillSmall}
                theme='primary'
                style={styles.fieldContainer}
                label={language.SPLITBILL__IDR}
                placeholder={language.SPLITBILL__AMOUNT_MEMBER_PLACEHOLDER}
                format={formatFieldAmount}
                typeField={'member'}
                keyboardType='numeric'
                disabled={method}
                indexSet= {index}
                setBillPayObject={this.setBillPayObject}
                valueContact={valueContactIndex}
                normalize={Utils.normalizeAmount}
                maxLength={10}
              />
            </View> 
          }
        </View>
      </View>
    );
  };

  render () {
    const {billIndex, method} = this.state;
    const {selectedContacts = [], amount, validationInput, accounts, selectInput = noop, receiptBill, addNewParticipants = noop, createBillEqual, isEmptyDescription, errors, errorsMax, hasilTotal, errorBalance, isEmptyDestinationAcc, dataUser, cif, valueSplitBillQR, valueSplitBillAddQR, ...reduxFormProps} = this.props;
    const {invalid, submitting} = reduxFormProps;
    const regex = /(^[0-9]*$)/;
    const checkAmount = isEmpty(amount);
    let validateMemberBack;
    let oneLessAmountMember;
    if (!isEmpty(billIndex)) {
      oneLessAmountMember = amountMemberSplitBill(billIndex, dataUser, selectedContacts);
    }
    const checkByAmount = isEmpty(billIndex);
    const bill = hasilTotal;
    const totalBillIndex = sumTotalInput(billIndex);
    let checkTotalByAmount;
    if (totalBillIndex > bill || totalBillIndex < bill) {
      checkTotalByAmount = true;
    }
    let isAmountMember;
    let amountMemberByAmount;
    let amountMember;
    map(billIndex, (value) => {
      const mobileNumber = result(value, 'mobileNumber', '');
      const uPhoneNumbers = result(dataUser, 'phoneNumbers', []);
      const userMobileNumber = result(uPhoneNumbers, '[0].number', '');
      isAmountMember = result(value, 'Amount', '');
      if (mobileNumber === userMobileNumber) {
        if (isAmountMember < 0) {
          amountMemberByAmount = true;
          amountMember = true;
        }
      } else {
        if (isAmountMember < 1000) {
          amountMemberByAmount = true;
          amountMember = true;
        }
      }
    });
    let checkAmountMember;
    if (isAmountMember === '' || !regex.test(isAmountMember)) {
      checkAmountMember = true;
    }
    const lengthSelectedContacts = selectedContacts.length;
    let dataArray = [...selectedContacts];
    dataArray.forEach((item, i) => {
      item.id = i + 1;
    });
    let isContactList = dataArray;
    isContactList.map((value) => {
      const mobileNumber = result(value, 'phoneNumbers', []);
      const mobileNumberArray = result(mobileNumber, '[0].number', '');
      const uPhoneNumbers = result(dataUser, 'phoneNumbers', []);
      const userMobileNumber = result(uPhoneNumbers, '[0].number', '');
      if (userMobileNumber === mobileNumberArray) {
        value['id'] = 0;
      }
    });
    const data = sortBy(isContactList, 'id');
    const totalRemainingNegative = makePositive(this.state.totalRemaining);
    const isKyc = !startsWith(cif, 'NK');
    let validateMember;
    if (lengthSelectedContacts >= 10) {
      validateMember = true;
    }
    return (
      <View style={styles.containerHead}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContentRevamp} style={styles.containerRevamp} extraScrollHeight={100} enableOnAndroid={true}>
          <View style={styles.backgroundColor2}/>
          <View>
            <View style={styles.containerBanner2}>
              <View style={styles.contentInnerBox}>
                <View style={styles.billAmount}>
                  {valueSplitBillQR || valueSplitBillAddQR ? 
                    <View>
                      <Image source={iconRp} style={styles.newRpIcon} />
                      <Field
                        name={fields.AMOUNT}
                        component={SinarmasInputBoxNewSplitBill}
                        theme='primary'
                        style={styles.fieldAmount}
                        placeholder={language.SPLITBILL__AMOUNT_PLACEHOLDER}
                        typeField={'amount'}
                        format={Utils.formatFieldAmount}
                        keyboardType='numeric'
                        normalize={Utils.normalizeAmount}
                        maxLength={10}
                        isAmountSplitBill={true}
                        label={language.SPLITBILL__AMOUNT}
                        disabled={true}
                      />
                    </View>
                    :
                    <View>
                      <Image source={iconRp} style={styles.newRpIcon} />
                      <Field
                        name={fields.AMOUNT}
                        component={SinarmasInputBoxNewSplitBill}
                        theme='primary'
                        style={styles.fieldAmount}
                        placeholder={language.SPLITBILL__AMOUNT_PLACEHOLDER}
                        typeField={'amount'}
                        format={Utils.formatFieldAmount}
                        keyboardType='numeric'
                        normalize={Utils.normalizeAmount}
                        maxLength={10}
                        isAmountSplitBill={true}
                        label={language.SPLITBILL__AMOUNT}
                      />
                    </View>
                  }
                </View>
                {
                  errors ?
                    <View style={styles.row}>
                      <SimasIcon name='input-error' style={styles.errIcon}/>
                      <Text style={styles.redText}>{language.VALIDATE__LESS_THAN_MIN_SPLITBILL}</Text>
                    </View>
                    : errorsMax ?
                      <View style={styles.row}>
                        <SimasIcon name='input-error' style={styles.errIcon}/>
                        <Text style={styles.redText}>{language.VALIDATE__LESS_THAN_MAX_SPLITBILL}</Text>
                      </View>
                      : null
                }
                <Field
                  name={fields.DESCRIPTION}
                  component={SinarmasInputBoxNewSplitBill}
                  theme='primary'
                  style={styles.fieldContainer}
                  label={language.SPLITBILL__DESCRIPTION}
                  placeholder={language.SPLITBILL__DESCRIPTION}
                  isUseSuccessInputText={true}
                  typeField={'description'}
                  validationInput={validationInput}
                  format={formatFieldNote}
                  normalize={formatFieldNote}
                  maxLength={25}
                  isSplitBillForm={true}
                />
                <Touchable onPress={selectInput()}>
                  <Field
                    name={fields.RECEIPT}
                    component={SinarmasInputBoxNewSplitBill}
                    theme='primary'
                    style={styles.fieldContainer}
                    label={language.SPLITBILL__RECEIPT_PLACEHOLDER}
                    placeholder={language.SPLITBILL__RECEIPT_PLACEHOLDER}
                    isUseSuccessInputText={true}
                    typeField={'receipt'}
                    disabled={true}
                    value={receiptBill}
                    isSplitBillForm={true}
                  />
                  <View style={styles.cameraIconStyle}><SimasIcon name='camera' size={20} style={styles.iconColor} /></View>
                </Touchable>
                <Field
                  name={fields.DESTINATION_ACCOUNT}
                  component={SinarmasPickerBoxNew}
                  theme='primary'
                  style={styles.fieldContainer}
                  label={language.SPLITBILL__DESTINATION_ACCOUNT}
                  placeholder={language.SPLITBILL__SELECT_DESTINATION_ACCOUNT}
                  itemList={Utils.generateAccountLabelSplitBill(accounts)}
                  isUseSuccessInputText={true}
                  typeField={'receipt'}
                  labelKey='display'
                  isSplitBillForm={true}
                  labelText={language.SPLITBILL__DESTINATION_ACCOUNT}
                  onValChange={this.updateEmoneyBalance}
                />
                {errorBalance ?
                  <View style={styles.rowMember}>
                    <SimasIcon name='input-error' style={styles.errIcon}/>
                    {isKyc === false ? 
                      <Text style={styles.redText}>{language.VALIDATE__MAX_BALANCE_EMONEY_SPLITBILL}</Text>
                      :
                      <Text style={styles.redText}>{language.VALIDATE__MAX_BALANCE_EMONEY_SPLITBILL_KYC}</Text>
                    }
                  </View>
                  : 
                  null
                }
              </View>
            </View>
          </View>

          <View style={styles.headerMember}>
            <Text style={styles.memberSelectedContacts}>{language.SPLITBILL__MEMBERS}</Text>
            <Text style={styles.countParticipants}>{'(' + selectedContacts.length} {language.SPLITBILL__PARTICIPANTS + ')'}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.containerDistributionMethod}>
              <View>
                <Text style={styles.paddingVer10}>{language.SPLITBILL__DISTRIBUTION_METHOD}</Text>
                <View style={styles.rowContainer}>
                  <View>
                    <Touchable style={method === true ? styles.distributionButton : styles.distributionButtonGrey} onPress={this.equal}>
                      <Text style={method === true ? styles.equalText : styles.equalText2}>{language.SPLITBILL__EQUAL}</Text>
                    </Touchable>
                  </View>
                  <View style={styles.containerByAmout}>
                    <Touchable style={method === true ? styles.distributionButtonGrey : styles.distributionButton} onPress={this.amount}>
                      <Text style={method === true ? styles.amountText : styles.amountText2}>{language.SPLITBILL__BY_AMOUNT}</Text>
                    </Touchable>
                  </View>
                </View>
              </View>
            </View>  

            <View>
              { !isEmpty(data) ? 
                data.map(this.selectedConfirm)
                : null
              }
              {
                oneLessAmountMember && !method ?
                  <View style={styles.rowMember}>
                    <SimasIcon name='input-error' style={styles.errIcon}/>
                    <Text style={styles.redText}>{language.VALIDATION__REQUIRED_FIELD_SPLITBILL}</Text>
                  </View>
                  :
                  validateMemberBack && !method ?
                    <View style={styles.rowMember}>
                      <SimasIcon name='input-error' style={styles.errIcon}/>
                      <Text style={styles.redText}>{language.VALIDATION__REQUIRED_FIELD_SPLITBILL}</Text>
                    </View>
                    :
                    amountMemberByAmount && !method ?
                      <View style={styles.rowMember}>
                        <SimasIcon name='input-error' style={styles.errIcon}/>
                        <Text style={styles.redText}>{language.SPLITBILL__VALIDATE_LESS_THAN_MIN_AMOUNT_MEMBER}</Text>
                      </View>
                      :
                      null
              }
              {method ? null : 
                (parseInt(this.state.totalRemaining) > 0 || parseInt(this.state.totalRemaining) < 0) &&
                <View style={styles.groupCounter}>
                  <View style={styles.remainingBill}>
                    <Text style={styles.splitBillRemaining}>{language.SPLITBILL__VALIDATION_CONFIRMATION}</Text>
                  </View>
                  <View style={styles.counterBill}>
                    {
                      this.state.totalRemaining < 0 ?
                        <Text style={styles.splitBillValidaton}>- {language.SPLITBILL__IDR} {formatFieldAmount(totalRemainingNegative)}</Text>
                        :
                        <Text style={styles.splitBillValidaton}>+ {language.SPLITBILL__IDR} {formatFieldAmount(this.state.totalRemaining)}</Text>
                    }
                  </View>
                </View>      
              }
              <View style={styles.containerAddNewParticipant}>
                <Touchable onPress={addNewParticipants(validateMember)}>
                  <View style={styles.iconStore}>
                    <SimasIcon name='expand-black' style={styles.store} size={20}/> 
                    <View style={styles.memberContainerAddNew}>
                      <Text style={styles.addNewParticipantText}>{language.SPLITBILL__ADD_NEW_PARTICIPANT}</Text>
                    </View>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.buttonSplitBill}>
          { method === true ?
            <SinarmasButton style={styles.buttonSpacing} onPress={createBillEqual} disabled={invalid || submitting || checkAmount || isEmptyDescription || errors || errorsMax || errorBalance || isEmptyDestinationAcc}>
              <Text style={styles.buttonLargeTextStyle}>{language.SPLITBILL__BUTTON}</Text>
            </SinarmasButton>
            : 
            <SinarmasButton style={styles.buttonSpacing} onPress={this.createBillbyAmount} disabled={checkAmount || checkByAmount || isEmptyDescription || checkTotalByAmount || checkAmountMember || errors || errorsMax || amountMember || errorBalance || isEmptyDestinationAcc || oneLessAmountMember || validateMemberBack || amountMemberByAmount}>
              <Text style={styles.buttonLargeTextStyle}>{language.SPLITBILL__BUTTON}</Text>
            </SinarmasButton>
          }
        </View>
      </View>
    );
  }
}

export default SplitBillConfirmation;

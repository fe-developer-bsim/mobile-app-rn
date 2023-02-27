import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, ScrollView, Image, Platform} from 'react-native';
import {language} from '../../config/language';
import styles from './SplitBillIndex.component.style';
import {noop, result, isEmpty, sortBy, upperFirst} from 'lodash';
import {SinarmasButton, SinarmasInputBoxNewSplitBill} from '../FormComponents';
import {Field} from 'redux-form';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {wrapMethodInFunction, formatFieldNote, listViewComparator, filterSearchContact, formatMobileNumberEmoney, getErrorMessage} from '../../utils/transformer.util';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Toast} from '../../utils/RNHelpers.util';

export const fields = {
  PHONE: 'phone',
  ALIAS: 'givenName',
}; 

class SplitBillIndex extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      contacts: [],
      selectedContact: [],
      searchFilter: '',
      blink: false,
      catagory: '',
      disabled: false,
      containerHeightStyle: {minHeight: 0},
      showExpand: false,
      summaryCollapsed1: true,
    };
  }

  bs = React.createRef();

  static propTypes = {
    submitting: PropTypes.bool,
    selectMobileNo: PropTypes.bool,
    handleSubmit: PropTypes.func,
    selectedContacts: PropTypes.array,
    phone: PropTypes.string,
    givenName: PropTypes.string,
    validationInput: PropTypes.func,
    changeCheck: PropTypes.func,
    onChangePhoneField: PropTypes.func,    
    onChangeAliasField: PropTypes.func,
    addContact: PropTypes.func,
    deleting: PropTypes.func,
    deleteAll: PropTypes.func,
    contacts: PropTypes.array,
    selectNoPolis: PropTypes.func,
    inquiryData: PropTypes.object,
    changeData: PropTypes.func,
    infoPolis: PropTypes.object,
    summaryPolis: PropTypes.object,
    goToEmFund: PropTypes.func,
    addNewContact: PropTypes.func,
    onCloseDelete: PropTypes.func,
    validateGivenName: PropTypes.bool,
    validatePhone: PropTypes.bool,
    phoneNotValid: PropTypes.bool,
    IdentifyPhoneNumber: PropTypes.string,
    valueTransfer: PropTypes.string,
    paramsSelectedContacts: PropTypes.array,
    isAddNewParticipants: PropTypes.bool,
    addNewParticipantsValue: PropTypes.array,
    dispatch: PropTypes.func
  }

  comparator = listViewComparator

  _showContactList = (combineContacts) => {
    const {changeCheck, paramsSelectedContacts} = this.props;
    const phoneNumbers = result(combineContacts, 'phoneNumbers', []);
    const phoneNumber = formatMobileNumberEmoney(result(phoneNumbers, '[0].number', ''));
    const check = result(combineContacts, 'check', false);
    const thumbnailPath = result(combineContacts, 'thumbnailPath', '');
    const type = result(combineContacts, 'type', '');
    const givenName = result(combineContacts, 'givenName', '');
    const familyName = result(combineContacts, 'familyName', '');
    const displayName = result(combineContacts, 'displayName', '');
    const autoName = Platform.OS === 'ios' ? givenName + ' ' + familyName : displayName;
    return (
      <Touchable onPress={changeCheck(combineContacts, paramsSelectedContacts)}>
        {type === 'manual' ? 
          null
          :
          <View style={styles.contactContainer}>
            <View style={styles.greyLine} />
            <View style={styles.rowContainerRender}>
              <View style={styles.rowContainer}>
                {thumbnailPath === '' ?
                  <SimasIcon name='new-profile' style={styles.profileIcon} size={40}/>
                  :
                  <Image style={styles.imageContact} source={{uri: thumbnailPath}} />
                }
                <View style={styles.containerContact}>
                  <Text style={styles.contactName}>{autoName}</Text>
                  <Text style={styles.contactPhone}>{phoneNumber}</Text>
                </View>
              </View>
              <View>
                {check && <SimasIcon name='check-black' style={styles.checkIcon} size={20}/>}
              </View>
            </View>
          </View>
        }
      </Touchable>
    );
  };



  showSelectedContact = (selectedContacts) => {
    const givenName = result(selectedContacts, 'givenName', '');
    const familyName = result(selectedContacts, 'familyName', '');
    const displayName = result(selectedContacts, 'displayName', '');
    const autoName = Platform.OS === 'ios' ? givenName + ' ' + familyName : displayName;
    const type = result(selectedContacts, 'type', '');
    const {deleting} = this.props;
    return (
      <View style={[styles.row, styles.contentBox]}>
        <Text style={styles.paddingHor10}>{type === 'manual' ? givenName : autoName}</Text>
        <Touchable style={styles.paddingHor10} onPress={deleting(selectedContacts)}>
          <SimasIcon name='close-black' size={10} style={styles.colorX} />
        </Touchable>
      </View>
    );
  };

  filterChange = (searchFilter) => {
    this.setState({searchFilter});
  }

  onCloseDelete = () => {
    this.setState({searchFilter: ''});
  }

  inputAdd = () => {
    const {selectedContacts} = this.props;
    const totalMember = selectedContacts.length;
    let validateMember;
    if (totalMember >= 9) {
      validateMember = true;
    }
    if (!validateMember) {
      this.bs.current.open();
    } else {
      this.bs.current.open();
      Toast.show(getErrorMessage(language.SPLITBILL_LIMIT_SELECTED_CONTACT__ALERT), Toast.LONG);
    }
  }

  successInputManually = () => {
    const {addContact, selectedContacts} = this.props;
    const totalMember = selectedContacts.length;
    let validateMember;
    if (totalMember >= 9) {
      validateMember = true;
    }
    this.bs.current.close();
    addContact(validateMember);
  }

  render () {
    const {searchFilter} = this.state;
    const {contacts, selectedContacts = [], phone,
      givenName, onChangeAliasField, onChangePhoneField, validateGivenName, validatePhone, phoneNotValid, addNewParticipantsValue = [], IdentifyPhoneNumber, validationInput, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const checkSelectedContact = isEmpty(selectedContacts);
    const {deleteAll} = this.props;
    let contactsFilterBefore = [];
    if (!isEmpty(addNewParticipantsValue)) {
      contactsFilterBefore  = contacts.filter(function (array_one) {
        return addNewParticipantsValue.filter(function (array_two) {
          return Platform.OS === 'ios' ? array_two.recordID === array_one.recordID :  array_two.rawContactId === array_one.rawContactId;
        }).length === 0;
      });
    } else {
      contactsFilterBefore = contacts;
    }
    const combineContactsBefore = [...contactsFilterBefore, ...addNewParticipantsValue];
    let sortingFilterAddNew = [];
    if (Platform.OS === 'ios') {
      sortingFilterAddNew = sortBy(combineContactsBefore, 'givenName');
      sortingFilterAddNew.map((value) => {
        value['displayName'] = upperFirst(result(value, 'givenName', '')) + upperFirst(result(value, 'familyName', ''));
      });
    } else {
      sortingFilterAddNew = sortBy(combineContactsBefore, 'displayName');
      sortingFilterAddNew.map((value) => {
        value['displayName'] = upperFirst(result(value, 'displayName', ''));
      });
    }
    
    const listContact = filterSearchContact(sortingFilterAddNew, searchFilter);
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled' bounces={false}>
          <View style={styles.searchContainer}>
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={language.SPLITBILL__LIST_SEARCH_TITLE}
              onChangeText={this.filterChange}
              placeholderTextColor='#848484'
              autoFocus={false}
              style={styles.textInput}
              value={this.state.searchFilter}
              maxLength={20}
            />
            { searchFilter === '' ?
              <View>
                <SimasIcon name={'search'} size={15} style={styles.searchSplitBill}/>
              </View> :
              <Touchable onPress={this.onCloseDelete}>
                <View style={styles.containerSearch}>
                  <SimasIcon name={'close-black'} size={15}/>
                </View>
              </Touchable>

            }
          </View>
          <View style={styles.middleContactContainer}>
            {!isEmpty(selectedContacts) ?
              <View style={styles.containerCountClear}>
                <View style={styles.countContainer}>
                  <Text style={styles.countSelectedContacts}>{selectedContacts.length} {language.COUNT__SELECTED_CONTACTS}</Text>
                </View>
                <View style={styles.containerClearAll}>
                  <Text style={styles.clearAll} onPress={deleteAll(sortingFilterAddNew)}>{language.CLEAR__ALL}</Text>
                </View>
              </View>
              : null
            }
          
            <View style={styles.containerSelected}>
              { !isEmpty(selectedContacts) ? 
                selectedContacts.map(this.showSelectedContact)
                : null
              }
            </View>
            {!isEmpty(selectedContacts) ?
              <View style={styles.greyLineSelected} />
              :
              null
            }
            <Text style={styles.contactsText}>{language.SPLITBILL__CONTACTS}</Text>
            <View style={styles.rowContainerContent}>
              <Touchable onPress={this.inputAdd} >
                <View style={styles.containerManually}>
                  <SimasIcon name='expand-black' style={styles.iconTrans} size={20}/>
                  <Text style={styles.addContact}>{language.SPLITBILL__ADD_MANUALLY}</Text>
                </View>
              </Touchable>
            </View>
          </View>

          {!isEmpty(listContact) ?
            listContact.map(this._showContactList)
            :
            null
          }
          <View style={listContact.length > 2 ? styles.contactContainerNoticeTwo : styles.contactContainerNotice}>
            <Text style={styles.splitbillNotice}>{language.SPLITBILL_NOTICE}</Text>
          </View>
        </ScrollView>
       
        
        <View style={styles.greyLineContinue} />
        <View style={styles.buttonNext}>
          <SinarmasButton style={styles.buttonSpacing} onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting || checkSelectedContact} >
            <Text style={styles.buttonLargeTextStyle}>{language.SPLITBILL__BUTTON_NEXT}</Text>
          </SinarmasButton>
        </View>

        <RBSheet
          ref={this.bs}
          closeOnDragDown={true}
          height={300}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }
          }}
        >
          <View style ={styles.panel}>
            <View style={styles.inputManuallyContainer}>
              <Text style={styles.inputManualyText}>{language.SPLITBILL__INPUT_MANUAL}</Text>
            </View> 
            <Field
              name={fields.PHONE}
              component={SinarmasInputBoxNewSplitBill}
              theme='primary'
              style={styles.fieldContainer}
              label={language.SPLITBILL__PHONE}
              placeholder={language.SPLITBILL__PHONE}
              isUseSuccessInputText={true}
              typeField={'phone'}
              value={phone}
              onInputChange={onChangePhoneField}
              validationInput={validationInput}
              keyboardType='numeric'
              maxLength={15}
              isSplitBillForm={true}
            />
            {
              phoneNotValid ?
                <View style={styles.row}>
                  <SimasIcon name='input-error' style={styles.errIcon}/>
                  <Text style={styles.redText}>{IdentifyPhoneNumber}</Text>
                </View>
                : null
            }
            <Field
              name={fields.ALIAS}
              component={SinarmasInputBoxNewSplitBill}
              theme='primary'
              style={styles.fieldContainer}
              label={language.SPLITBILL__ALIAS}
              placeholder={language.SPLITBILL__ALIAS}
              isUseSuccessInputText={true}
              typeField={'givenName'}
              value={givenName}
              onInputChange={onChangeAliasField}
              format={formatFieldNote}
              normalize={formatFieldNote}
              maxLength={16}
              validationInput={validationInput}
              isSplitBillForm={true}
            />
            <View style={styles.bottomWrapperAdd}>
              <SinarmasButton onPress={this.successInputManually} disabled={invalid || submitting || validateGivenName || validatePhone || phoneNotValid} >
                <Text style={styles.buttonLargeTextStyle}>{language.SPLITBILL__BUTTON_NEXT}</Text>
              </SinarmasButton>
            </View>
          </View>
        </RBSheet>
      </View>
    );
  }
}

export default SplitBillIndex;
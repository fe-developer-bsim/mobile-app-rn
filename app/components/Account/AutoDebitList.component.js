import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './AutoDebitList.styles';
import Touchable from '../Touchable.component';
import {noop, isEmpty, find, result} from 'lodash';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';
import {SwipeRow} from 'react-native-swipe-list-view';
import Overlay from '../Overlay/OverlayRadius.component';
import {SinarmasPickerBoxNew, SinarmasInputBoxNew} from '../FormComponents';
import {Field} from 'redux-form';
import {normalizeAmount, formatFieldAmount} from '../../utils/transformer.util';

class AutoDebitList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToBiller: PropTypes.func,
    autoDebitList: PropTypes.object,
    closeOnTouchOutside: PropTypes.bool,
    visible: PropTypes.bool,
    deleteAutoDebitList: PropTypes.func,
    reloadHistory: PropTypes.func,
    dispatch: PropTypes.func,
    AutoDebitList: PropTypes.object,
    isEdit: PropTypes.bool,
    accountList: PropTypes.array,
    dateList: PropTypes.array,
    billerList: PropTypes.array,
    goToDetail: PropTypes.func,
    editAutoDebit: PropTypes.func,
    handleSubmit: PropTypes.func,
    setSelectedAccount: PropTypes.func,
    invalid: PropTypes.bool,
    resetForm: PropTypes.func,
    setSelectedAutodebit: PropTypes.func,
  }

  state = {
    searchFilter: '',
    category: 'regular',
    editOverlayVisible: false,
    autoDebitData: {},
  }

  static defaultProps = {
    visible: false,
    onClose: noop,
  }

  onRowOpen (data) {
    const rowRef = data.index;
    rowRef.closeRow();
  }
  delRowItem = (data) => {
    const {deleteAutoDebitList = {}} = this.props;
    deleteAutoDebitList(data);
  }
  goToDetail = (data) => () => {
    const {goToDetail} = this.props;
    goToDetail(data);
  }
  getBiller = () => {
    const {goToBiller} = this.props;
    const isAddNew = true;
    goToBiller(isAddNew);
  }
  renderBillerList = (data) => {
    const {deleteAutoDebitList = {}} = this.props;
    const merchantName = result(data, 'item.merchantName', '');
    const period = result(data, 'item.periode', '');
    const subscriberNumber = result(data, 'item.subscriberNumber', '');
    return (
      <View key={data.index} style={styles.objectData}> 
        <SwipeRow swipeToOpenPercent={10} rightOpenValue={-75}  leftOpenValue={75} stopLeftSwipe={75} stopRightSwipe={-75}>
          <View style={[styles.slider]}>
            <Touchable onPress={this.showEditOverlay(true, data)} style={styles.edit}>
              <View style={styles.buttonDetail}>
                <SimasIcon name='edit' style={styles.editIcon} size={20} />
                <Text style={styles.textTrash}>{'Edit'}</Text>
              </View>
            </Touchable>
            <Touchable onPress={deleteAutoDebitList(data)} style={styles.trash}>
              <View style={styles.buttonDetail}>
                <SimasIcon name='trash' style={styles.whiteIcon} size={20} />
                <Text style={styles.textTrash}>{language.AUTODEBIT__LIST_DELETE}</Text>
              </View>
            </Touchable>
          </View>
          <Touchable style={[styles.historyItem]} onPress={this.goToDetail(data)}>
            <View style={[styles.flex, styles.row, styles.spaceBetween]}>
              <View>
                <Text style={styles.subNo}>{merchantName}</Text>
                <Text >{subscriberNumber}</Text>
                <Text style={styles.period}>{language.AUTODEBIT__LIST_NEXT_PAYMENTS} {period}</Text>
              </View>
              <SimasIcon name={'arrow'} style={styles.arrowIcon}/>
            </View>
          </Touchable>          
        </SwipeRow>
      </View>
    );
  }

  changeCategory = (category) => () => {
    this.setState({
      category: category,
    });
  }

  showEditOverlay = (status, data) => () => {
    const {accountList, setSelectedAccount, setSelectedAutodebit, resetForm} = this.props;
    const item = result(data, 'item', {});
    const accNumber = result(data, 'item.accountNumber', '');
    const selectedAccount = find(accountList, {'accountNumber': accNumber});
    if (status === true) {
      setSelectedAccount(selectedAccount);
      setSelectedAutodebit(item);
      this.setState({
        editOverlayVisible: status,
        autoDebitData: item || {...this.state.autoDebitData},
      });
    } else {
      this.setState({editOverlayVisible: status});
      resetForm();
    }
  }

  getBillerDetail (billerCode) {
    const {billerList} = this.props;
    const billerDetail = find(billerList, function (biller) {
      return biller.billerPreferences.code === billerCode;
    });
    return billerDetail;
  }

  getBillerAmountType = (billerConfig) => {
    if (!isEmpty(billerConfig)) {
      const billerType = result(billerConfig, 'billerPreferences.billerType', '');
      const denomList = result(billerConfig, 'denomList', []);
      if (billerType === '1' || billerType === '3' || billerType === '8' || billerType === '10') {
        return 'billedAmount';
      } else {
        if (!isEmpty(denomList)) {
          return 'denom';
        } else {
          return 'openAmount';
        }
      }
    } else {
      return '';
    }
  }

  handleSubmit = () => {
    const {handleSubmit} = this.props;
    this.setState({editOverlayVisible: false, autoDebitData: {}});
    handleSubmit();
  }
  
  render () {
    const {autoDebitList, reloadHistory, isEdit} = this.props;
    const status = result(autoDebitList, 'status', 'loading');
    const historyAutodebitList = result(autoDebitList, 'list', []);

    // edit popup detail
    const {dateList, invalid} = this.props;
    const {autoDebitData} = this.state;
    const visible = this.state.editOverlayVisible && !isEmpty(autoDebitData);
    const merchantCode = result(autoDebitData, 'merchantCode', '');
    const billerConfig = this.getBillerDetail(merchantCode);
    const denomList = result(billerConfig, 'denomList', []);
    const amountType = this.getBillerAmountType(billerConfig);
    return (
      <View>
        { // edit popup
          autoDebitData ?
            <Overlay closeOnTouchOutside={true} visible={visible} onClose={this.showEditOverlay(false)}>
              <View style={styles.overlayContent}>
                <Text style={styles.editTitle}>{language.AUTODEBIT__LIST_EDIT_HEADER}</Text>
                {
                  !isEmpty(denomList) && amountType === 'denom' ?
                    <View style={styles.pickerContainer}>
                      <Field
                        name='denomination'
                        component={SinarmasPickerBoxNew}
                        placeholder={language.GENERIC_BILLER__PICKER_AMOUNT}
                        itemList={denomList}
                        labelKey={'label'}
                        labelText={language.AUTODEBIT__LIST_NOMINAL}
                        labelTextStyle={styles.labelTextStyle}
                        textPickerStyle={styles.textPickerStyle}
                        arrowPickerStyle={styles.arrowPickerStyle}
                      />
                    </View>
                    : amountType === 'openAmount' ?
                      <View style={styles.pickerContainer}>
                        <Field
                          name='amount'
                          component={SinarmasInputBoxNew}
                          format={formatFieldAmount}
                          normalize={normalizeAmount}
                          label={language.AUTODEBIT__LIST_NOMINAL}
                          placeholder={'0'}
                          labelTextStyle={styles.labelTextStyle}
                          textPickerStyle={styles.textPickerStyle}
                          textStyle={styles.arrowPickerStyle}
                          keyboardType='numeric'
                        />
                      </View>
                      : null
                }
                <View style={styles.pickerContainer}>
                  <Field
                    name='date'
                    component={SinarmasPickerBoxNew}
                    placeholder={language.AUTODEBIT__LIST_EDIT_DATE_PLACEHOLDER}
                    itemList={dateList}
                    labelKey={'label'}
                    labelText={language.AUTODEBIT__LIST_EDIT_DATE_LABEL}
                    labelTextStyle={styles.labelTextStyle}
                    textPickerStyle={styles.textPickerStyle}
                    arrowPickerStyle={styles.arrowPickerStyle}
                  />
                </View>
                <Touchable style={invalid ? styles.saveButtonDisabled : styles.saveButton} onPress={this.handleSubmit} disabled={invalid}>
                  <Text style={[styles.whiteIcon, styles.bold]}>{language.GENERIC__SAVE}</Text>
                </Touchable>
                <Touchable style={styles.cancelButton} onPress={this.showEditOverlay(false)}>
                  <Text style={styles.cancelText}>{language.GENERIC__CANCEL}</Text>
                </Touchable>
              </View>
            </Overlay>
            : null
        }
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120}>
          {
            status === 'loading' ?
              <View style={styles.activityContainer}>
                <ActivityIndicator size='large' />
              </View>
              : status === 'error' ?
                <Touchable onPress={reloadHistory} style={styles.activityContainer}>
                  <Text style={styles.errorText}>
                    {language.AUTODEBIT__LIST_ERROR}
                    <Text style={styles.reloadText}>{language.PAY_BILLS__HISTORY_RELOAD}</Text>
                  </Text>
                </Touchable>
                : status === 'success' ?
                  <View>
                    {!isEmpty(historyAutodebitList) ?
                      <FlatList enableEmptySections data={historyAutodebitList} isEdit={isEdit} renderItem={this.renderBillerList} />
                      :
                      <View style={styles.activityContainer}>
                        <Text style={styles.errorText}>
                          {language.AUTODEBIT__LIST_EMPTY}
                        </Text>
                      </View>
                    }
                  </View> :
                  <View style={styles.activityContainer}>
                    <Text style={styles.errorText}>
                      {language.AUTODEBIT__LIST_EMPTY}
                    </Text>
                  </View>
          }
        </KeyboardAwareScrollView>
        <View style={styles.buttonContainer}>
          <Touchable style={styles.createButton} onPress={this.getBiller}>
            <Text style={[styles.whiteIcon, styles.bold]}>{language.AUTODEBIT__LIST_CREATE}</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

export default AutoDebitList;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {language} from '../../../config/language';
import {currencyFormatter, wrapMethodInFunction, isEmptyOrNull, getPushBillPossibleAccounts} from '../../../utils/transformer.util';
import result from 'lodash/result';
import styles from './SelectSourceAccount.styles';
import ErrorTextIndicator from '../../ErrorTextIndicator/ErrorTextIndicator.component';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import Touchable from '../../Touchable.component';
import {connect} from 'react-redux';
import {getFormVal, goTo} from '../../../state/thunks/common.thunks';

class SelectSourceAccount extends Component {
  static propTypes = {
    meta: PropTypes.object,
    disabled: PropTypes.bool,
    accountInfo: PropTypes.func,
    formName: PropTypes.string,
    chooseAccount: PropTypes.func,
    fieldName: PropTypes.string,
    sourceType: PropTypes.string,
    customView: PropTypes.object,
    kmrt: PropTypes.bool,
    emoneyAccount: PropTypes.object
  }

  render () {
    const {meta, disabled = false, accountInfo, formName = 'sourceAccount', fieldName = 'accountNo', chooseAccount, sourceType, customView = {}, kmrt, emoneyAccount} = this.props;
    const err = !disabled && (meta && !meta.active && meta.error);
    const sourceAccountVal = accountInfo(formName);
    const accNoEmoney = result(emoneyAccount, 'emoneyAccount.accountNumber', '');
    const nameEmoney = result(emoneyAccount, 'emoneyAccount.name', '');
    const productEmoney = result(emoneyAccount, 'emoneyAccount.productType', '');
    const balanceEmoney = result(emoneyAccount, 'emoneyAccount.balances.availableBalance', '');
    const accNo = kmrt ? accNoEmoney : result(sourceAccountVal, `${fieldName}.accountNumber`, '');
    const name = kmrt ? nameEmoney : result(sourceAccountVal, `${fieldName}.name`, '');
    const productType = kmrt ? productEmoney : result(sourceAccountVal, `${fieldName}.productType`, '');
    const checkAcc = isEmptyOrNull(result(sourceAccountVal, fieldName, {}));
    const balance = kmrt ? currencyFormatter(balanceEmoney) : currencyFormatter(result(sourceAccountVal, `${fieldName}.balances.availableBalance`, ''));

    return (
      <View>
        <View style={[styles.container, customView]}>
          <View style={styles.row}>
            <View>
              <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>            
            </View>
            {
              kmrt ?
                <View>
                  <Text style={styles.title}>{language.OPEN_NEW_ACCOUNT__SOURCE_ACCOUNT}</Text>
                </View>
                :  
                <View>
                  <Text style={styles.title}>{language.GENERIC_BILLER__WALLET}</Text>
                </View>
            }
          </View>
          <View style={styles.labelSpacing} />
          {
            kmrt ?
              <View>
                <Text style={[styles.accNo, styles.roboto]}>{accNo}</Text> 
                <Text style={[styles.name]}>{name}</Text> 
                <Text style={[styles.product]}>{productType}</Text>                  
                <View style={styles.row}>
                  <Text style={[styles.balance, styles.roboto]}>{language.GENERIC_BILLER__BALANCE} </Text> 
                  <Text style={[styles.balance, styles.roboto]}>{balance}</Text>
                </View>
              </View>   
              :
              <Touchable onPress={wrapMethodInFunction(chooseAccount, formName, fieldName, sourceType)} style={[styles.row2]}>
                { checkAcc ?
                  <View>
                    <Text style={[styles.roboto, styles.black]}>{language.GENERIC_BILLER__WALLET}</Text>            
                  </View>
                  :
                  <View>
                    <Text style={[styles.accNo, styles.roboto]}>{accNo}</Text> 
                    <Text style={[styles.name]}>{name}</Text> 
                    <Text style={[styles.product]}> {productType}</Text>                  
                    <View style={styles.row}>
                      <Text style={[styles.balance, styles.roboto]}>{language.GENERIC_BILLER__BALANCE} </Text> 
                      <Text style={[styles.balance, styles.roboto]}>{balance}</Text>
                    </View>
                  </View>           
                }
                <View>
                  <SimasIcon name={'more-menu-2'} size={15} style={styles.balance}/>            
                </View>
              </Touchable>
          }
          {err && <ErrorTextIndicator text={err}/>}
        </View>
        <View style={styles.labelSpacing} />
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  accountInfo: (formName) => dispatch(getFormVal(formName)),
  chooseAccount: (formName, fieldName, sourceType /** 'genericBiller' or 'fundTransfer' atm */, payee = {}) => dispatch(goTo(sourceType === 'genericBiller' ? 'BillerAccount' : 'TransferSourceAccount' /** set transfer account as default */, {formName, fieldName, sourceType, payee})),
});

const mapStateToProps = (state) => ({
  emoneyAccount: getPushBillPossibleAccounts(result(state, 'accounts', []), 'bp'),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectSourceAccount);




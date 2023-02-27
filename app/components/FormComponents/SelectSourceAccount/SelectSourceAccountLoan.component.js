import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {language} from '../../../config/language';
import {wrapMethodInFunction} from '../../../utils/transformer.util';
import {result, isEmpty} from 'lodash';
import styles from './SelectSourceAccount.styles';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import Touchable from '../../Touchable.component';
import {connect} from 'react-redux';
import {goTo} from '../../../state/thunks/common.thunks';

class SelectSourceAccount extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    formName: PropTypes.string,
    chooseAccount: PropTypes.func,
    fieldName: PropTypes.string,
    sourceType: PropTypes.string,
    customView: PropTypes.object,
    formValues: PropTypes.object
  }

  render () {
    const {formValues, formName = 'EForm', fieldName = 'accountNo', chooseAccount, sourceType, customView = {}} = this.props;
    const sourceAccountVal = formValues;
    const accNo = result(sourceAccountVal, `${fieldName}.accountNumber`, '');
    const accountType = result(sourceAccountVal, `${fieldName}.accountType`, '');
    const checkAcc = isEmpty(result(formValues, 'accountNo', {}));
    
    return (
      <View>
        <View style={[styles.container, customView]}>
          <Text style={styles.mb10}>{language.EMONEY__TOP_UP_ACCOUNT}</Text>
          <Touchable onPress={wrapMethodInFunction(chooseAccount, formName, fieldName, sourceType)} style={[styles.row2]}>
            { checkAcc ?
              <View>
                <Text style={[styles.roboto, styles.black]}>{language.GENERIC_BILLER__WALLET}</Text>            
              </View>
              :
              <View style={styles.row2}>
                <Text style={[styles.accNo, styles.roboto]}>{accountType} - {accNo}</Text> 
              </View>           
            }
            <View>
              <SimasIcon name={'more-menu-2'} size={15} style={styles.balance}/>            
            </View>
          </Touchable>
        </View>
        <View style={styles.greyLine} />
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  chooseAccount: (formName, fieldName, sourceType, payee = {}) => dispatch(goTo('LoanSourceAccount', {formName, fieldName, sourceType, payee})),
});

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.EForm.values', {})
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectSourceAccount);
import {View, Text, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './Services.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {result, find} from 'lodash';
import {popUpActivate} from '../../state/thunks/common.thunks';

const mapStateToProps = (state) => ({
  accountsCust: result(state, 'accounts', []),
});

const mapDispatchToProps = (dispatch) => ({
  getPopUpActivate: (accName, accountNo, idCard, cardNo, contractCard, bankBranchName, nameFull) => () => dispatch(popUpActivate(accName, accountNo, idCard, cardNo, contractCard, bankBranchName, nameFull)),
});

class ActiveListAccounts extends React.Component {
  static propTypes = {
    accountName: PropTypes.string,
    accNo: PropTypes.string,
    cardId: PropTypes.string,
    cardNumber: PropTypes.string,
    cardContract: PropTypes.string,
    goToPopUpActivate: PropTypes.func,
    getPopUpActivate: PropTypes.func,
    accountsCust: PropTypes.array,
    FullName: PropTypes.string,
    imageCard: PropTypes.string,
  }

  render () {
    const {accountName, accNo, cardNumber, cardId, cardContract, getPopUpActivate, accountsCust, FullName, imageCard} = this.props;
    const accName = accountName;
    const accountNo = accNo;
    const cardNo = cardNumber;
    const idCard = cardId;
    const contractCard = cardContract;
    const nameFull = FullName;
    const findAccountNumber = find(accountsCust, function (accList) {
      return accList.accountNumber === accountNo;
    });
    const bankBranchName = result(findAccountNumber, 'bankBranch.name', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View style={styles.container2}>
          <View>
            <View style={styles.offerContainer}>
              <View style={styles.cardContainer2}>
                <View style={styles.imageContainerList}>
                  <Image source={{uri: imageCard}} style={styles.imageList} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.txtBold}>{accName}</Text>
                  <Text style={styles.txtLight}>{language.DASHBOARD__ACCOUNT_NUMBER}: {accountNo}</Text>
                  <Text style={styles.txtLight2}>{language.DASHBOARD__CREDIT_CARD_ACCOUNT_NUMBER}: {cardNo}</Text>
                  <SinarmasButton style={styles.button2} onPress={getPopUpActivate(accName, accountNo, idCard, cardNo, contractCard, bankBranchName, nameFull)} >
                    <Text style={styles.activeBlockButton}>{language.BUTTON__ACTIVATE}</Text>
                  </SinarmasButton>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveListAccounts);

import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './Products.styles';
import Touchable from '../../components/Touchable.component';
import ccImage from '../../assets/images/cc.png';
import savingImage from '../../assets/images/saving.png';
import loanImage from '../../assets/images/loan.png';
import Tooltip from 'react-native-walkthrough-tooltip';
import TutorialContent from './TutorialContent.component';

class ChooseProducts extends React.Component {
  static propTypes = {
    goToCreditCard: PropTypes.func,
    goToSavingAccount: PropTypes.func,
    goToLoan: PropTypes.func,
    creditCardEnabled: PropTypes.bool,
    isEmoneyKyc: PropTypes.bool,
    isLogin: PropTypes.bool,
    loanMenuEnabledNTB: PropTypes.bool,
    loanMenuEnabledETB: PropTypes.bool,
    addOrder: PropTypes.func,
    tutorialProduct: PropTypes.object,
    tutorialON: PropTypes.bool,
    order: PropTypes.number,
    finishOrder: PropTypes.func
  }

  render () {
    const {goToCreditCard, goToSavingAccount, creditCardEnabled, goToLoan, isEmoneyKyc,
      isLogin, loanMenuEnabledETB, loanMenuEnabledNTB, tutorialON, order, finishOrder} = this.props;
    const showLoanMenu = isLogin && isEmoneyKyc ? loanMenuEnabledETB : loanMenuEnabledNTB;

    return (
      <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120} style={styles.contentContainerStyle}>
        <View style={styles.container}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>{language.PRODUCTS__CHOOSE_PRODUCTS}</Text>
          </View>
          {creditCardEnabled ?
            <View>
              <Touchable onPress={goToCreditCard} style={styles.offerContainer}>
                <View style={styles.cardContainer2}>
                  <View style={styles.imageContainer}>
                    <Image source={ccImage} style={styles.image} />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.txtBold}>{language.PRODUCTS__CREDITCARD_TITLE}</Text>
                    <Text style={styles.txtLight}>{language.PRODUCTS__CREDITCARD_INTRO}</Text>
                  </View>
                </View>
              </Touchable>
            </View> : null
          }

          
          <Tooltip
            animated
            isVisible={tutorialON ? order === 1 : false}
            content={<TutorialContent text={language.EMONEY__CHOSE_PRODUCT2} 
              order={order} finish={finishOrder}/>}
            placement='bottom'
            displayInsets={styles.tooltip}
          >

            <Touchable onPress={goToSavingAccount} style={styles.offerContainer}>
              <View style={styles.cardContainer2}>
                <View style={styles.imageContainer}>
                  <Image source={savingImage} style={styles.image} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.txtBold}>{language.PRODUCTS__SAVING_TITLE}</Text>
                  <Text style={styles.txtLight}>{language.PRODUCTS__SAVING_INTRO}</Text>
                </View>
              </View>
            </Touchable>
          </Tooltip>         

          {showLoanMenu ?
            <View>
              <Touchable onPress={goToLoan} style={styles.offerContainer}>
                <View style={styles.cardContainer2}>
                  <View style={styles.imageContainer}>
                    <Image source={loanImage} style={styles.image} />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.txtBold}>{language.PRODUCTS__LOAN_TITLE}</Text>
                    <Text style={styles.txtLight}>{language.PRODUCTS__LOAN_INTRO}</Text>
                  </View>
                </View>
              </Touchable>
            </View> : null
          }
        </View>
      </ScrollView>
    );
  }
}

export default ChooseProducts;
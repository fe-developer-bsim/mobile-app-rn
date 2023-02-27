import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './Products.styles';
import Touchable from '../../components/Touchable.component';
import ccImage from '../../assets/images/cc.png';
import CCSAImage from '../../assets/images/creditcard-saving.png';
import savingImage from '../../assets/images/saving.png';
import loanImage from '../../assets/images/loan.png';
import {upperCase} from 'lodash';
import SALoanImage from '../../assets/images/saving-loan.png';

class ProductList extends React.Component {
  static propTypes = {
    goToCreditCard: PropTypes.func,
    goToSavingAccount: PropTypes.func,
    goToLoan: PropTypes.func,
    isValidKyc: PropTypes.bool,
    isLogin: PropTypes.bool,
    loanMenuEnabledNTB: PropTypes.bool,
    tutorialON: PropTypes.bool,
    order: PropTypes.number,
    finishOrderOnboard: PropTypes.func,
    toggleMenuCCSANTB: PropTypes.bool,
    toggleMenuSavingNTB: PropTypes.bool
  }

  render () {
    const {goToCreditCard, goToSavingAccount, goToLoan, isValidKyc, isLogin, 
      loanMenuEnabledNTB, toggleMenuCCSANTB, toggleMenuSavingNTB
    } = this.props;
    const showCCSAMenuNTB = (!isLogin && !isValidKyc) || (isLogin && !isValidKyc) ? toggleMenuCCSANTB : false;
    const showSavingMenuNTB = (!isLogin && !isValidKyc) || (isLogin && !isValidKyc) ? toggleMenuSavingNTB : true;
    const showSALoanMenuNTB = (!isLogin && !isValidKyc) || (isLogin && !isValidKyc) ? loanMenuEnabledNTB : false;

    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <ScrollView extraHeight={120} showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainerTop}>
              <Text style={styles.titleText}>{language.PRODUCTS__CHOOSE_PRODUCTS}</Text>
            </View>

            {showSavingMenuNTB ?
              <Touchable dtActionName='Saving Account' onPress={goToSavingAccount} style={styles.offerContainer}>
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
              : null }

            {showCCSAMenuNTB ?
              <View>
                <Touchable dtActionName='Credit Card' onPress={goToCreditCard} style={styles.offerContainer}>
                  <View style={styles.cardContainer2}>
                    <View style={styles.imageContainer}>
                      <Image source={CCSAImage} style={styles.image} />
                    </View>
                    <View style={styles.detailContainer}>
                      <View style={styles.row}>
                        <Text style={styles.txtBold}>{language.PRODUCTS__CREDITCARD_SAVING_TITLE}</Text>
                        <View style={styles.newTextContainer}>
                          <Text style={styles.newText}>{upperCase(language.LANDING_NEW)}</Text>
                        </View>
                      </View>
                      <Text style={styles.txtLight}>{language.PRODUCTS__CREDITCARD_SAVING_INTRO}</Text>
                    </View>
                  </View>
                </Touchable>
              </View> :
              <Touchable dtActionName='Credit Card' onPress={goToCreditCard} style={styles.offerContainer}>
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
            }

            {showSALoanMenuNTB ?
              <View>
                <Touchable dtActionName='Loan' onPress={goToLoan} style={styles.offerContainer}>
                  <View style={styles.cardContainer2}>
                    <View style={styles.imageContainer}>
                      <Image source={SALoanImage} style={styles.image} />
                    </View>
                    <View style={styles.detailContainer}>
                      <View style={styles.row}>
                        <Text style={styles.txtBold}>{language.PRODUCTS__LOAN_SAVING_TITLE}</Text>
                        <View style={styles.newTextContainer}>
                          <Text style={styles.newText}>{upperCase(language.LANDING_NEW)}</Text>
                        </View>
                      </View>
                      <Text style={styles.txtLight}>{language.PRODUCTS__LOAN_SAVING_INTRO}</Text>
                    </View>
                  </View>
                </Touchable>
              </View>
              :
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
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ProductList;
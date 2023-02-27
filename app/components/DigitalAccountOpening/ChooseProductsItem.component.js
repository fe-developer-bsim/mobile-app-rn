import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {language} from '../../config/language';
import styles from './Products.styles';
import {result, startsWith} from 'lodash';
import {theme} from '../../styles/core.styles';
import {ScrollableTabView, ScrollableTabBar} from '@valdio/react-native-scrollable-tabview';
import TabProduct from './TabProduct.component';
import {wrapObjectInFunction} from '../../utils/transformer.util';

const tabBarConfig = {
  tabBarBackgroundColor: theme.white,
  tabBarActiveTextColor: theme.black,
  tabBarInactiveTextColor: theme.textGrey,
  tabBarUnderlineStyle: {
    backgroundColor: theme.brand,
    borderRadius: 5
  },
  tabBarTextStyle: styles.tabText,
};

class ChooseProductsItem extends React.Component {
  static propTypes = {
    productItems: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToTnC: PropTypes.func,
    show: PropTypes.bool,
    activeTab: PropTypes.string,
    setCarouselReferenceFor: PropTypes.func,
    emoneyKycOnly: PropTypes.bool,
    isLogin: PropTypes.bool,
    cifCode: PropTypes.string,
    showCCUnsecureETB: PropTypes.bool,
    showCCUnsecureNTB: PropTypes.bool,
  }

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar style={{borderWidth: 0}}/>)

  render () {
    const {productItems, goToTnC, currentLanguage, show, setCarouselReferenceFor, activeTab = '', emoneyKycOnly, 
      isLogin, cifCode, showCCUnsecureETB, showCCUnsecureNTB} = this.props;
    const listProducts = result(productItems, 'config', []);
    const listSecure = listProducts.filter((prod) => prod.creditCardType === 'secured');
    const listUnSecure = listProducts.filter((prod) => prod.creditCardType === 'unsecured');
    const productTitle = language[result(productItems, 'configTitle', '')];
    const isCreditCard = result(productItems, 'isCreditCard', false);
    let showUnsecureCC = false;

    if (isLogin) {
      if (!startsWith(cifCode, 'NK')) {
        if (emoneyKycOnly) {
          showUnsecureCC = showCCUnsecureNTB;
        } else {
          showUnsecureCC = showCCUnsecureETB;
        }
      } else {
        showUnsecureCC = showCCUnsecureNTB;
      }
    } else {
      showUnsecureCC = showCCUnsecureNTB;
    }

    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBgProductItems}>
          <ScrollView extraHeight={120} showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainerProduct}>
              <Text style={styles.titleText}>{productTitle}</Text>
            </View>

            {isCreditCard ? 
              <View>
                {
                  !showUnsecureCC ?
                    <TabProduct listProducts={listProducts} goToTnC={goToTnC} currentLanguage={currentLanguage} show={show}/>
                    :
                    <ScrollableTabView {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar} ref={'Tabs'}>
                      <TabProduct activeTab={activeTab} setCarouselReference={setCarouselReferenceFor('secureCC')} 
                        tabLabel={'With Deposit'} listProducts={listSecure} goToTnC={goToTnC} currentLanguage={currentLanguage} show={show}
                      />
                      <TabProduct activeTab={activeTab} setCarouselReference={setCarouselReferenceFor('unsecureCC')}
                        tabLabel={'Without Deposit'} listProducts={listUnSecure} goToTnC={goToTnC} currentLanguage={currentLanguage} show={show}
                      />
                    </ScrollableTabView>
                }
              </View>
              :
              <TabProduct listProducts={listProducts} goToTnC={goToTnC} currentLanguage={currentLanguage} show={show}/>
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ChooseProductsItem;

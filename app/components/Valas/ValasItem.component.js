import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import styles from './ValasItem.component.styles';
import result from 'lodash/result';
import ValasList from './ValasList.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {language} from '../../config/language';
import moment from 'moment';
import {SinarmasButton} from '../FormComponents';
import SimasIcon from '../../assets/fonts/SimasIcon';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

class ValasItem extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    header: PropTypes.string,
    goToDetailTransaction: PropTypes.func,
    onOrderDetail: PropTypes.func,
    simasPoinHistory: PropTypes.object,
    currencyRates: PropTypes.array,
    isLogin: PropTypes.bool,
    goToTransfer: PropTypes.func,
    isOBMPassword: PropTypes.bool,
  }
  state = {
    currency: ''
  }
  renderListItem = (item) => (<ValasList {...item[0]} type='detail' />)
  onChange = (item) => {
    this.setState({
      currency: item.value
    });
  }
  renderIdrTitle = () => {
    const {currencyRates = []} = this.props;
    const currencyGroup = groupBy(currencyRates, 'currency', '');
    delete currencyGroup['null'];
    return (
      <View>
        <View style={[styles.content, styles.row]}>
          <View style={styles.wrapCoupon}>
            <Text style={styles.descriptionHeading}>{language.EXCHANGE__RATES_CURRENCY}</Text>
          </View>
          <View style={styles.wrapCoupon}>
            <Text style={styles.descriptionHeading}>{language.EXCHANGE__RATES_BUY}</Text>
          </View>
          <View style={styles.wrapCoupon}>
            <Text style={styles.descriptionHeading}>{language.EXCHANGE__RATES_SELL}</Text>
          </View>
        </View>
        <View style={styles.greyLine} />
        {map(currencyGroup, this.renderListItem)}
      </View>
    );
  }
  renderUsdTitle = () => {
    const {currencyRates = []} = this.props;
    const currencyGroupUSD = groupBy(currencyRates, 'changeCurrency', '');
    delete currencyGroupUSD['null'];
    return (
      <View>
        <View style={[styles.content, styles.row]}>
          <View style={styles.wrapCoupon}>
            <Text style={styles.descriptionHeading}>{language.EXCHANGE__RATES_CURRENCY}</Text>
          </View>
          <View style={styles.wrapCoupon}>
            <Text style={styles.descriptionHeading}>{language.EXCHANGE__RATES_BUY_USD}</Text>
          </View>
          <View style={styles.wrapCoupon}>
            <Text style={styles.descriptionHeading}>{language.EXCHANGE__RATES_SELL_USD}</Text>
          </View>
        </View>
        <View style={styles.greyLine} />
        {map(currencyGroupUSD, this.renderListItem)}
      </View>
    );
  }

  render () {
    const {currencyRates = [], isLogin, goToTransfer, isOBMPassword} = this.props;
    const lastUpdatedDate = result(currencyRates, '0.lastUpdatedDate', '');
    const lastDate = moment(lastUpdatedDate).format('DD-MM-YYYY H:mm');
    const loading = result(currencyRates, 'loading', false);
    const currencyGroup = groupBy(currencyRates, 'currency', '');
    delete currencyGroup['null'];
    const currencyGroupUSD = groupBy(currencyRates, 'changeCurrency', '');
    delete currencyGroupUSD['null'];

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120} contentContainerStyle={styles.container}>
        { loading ?
          <View style={styles.errorContainer}>
            <ActivityIndicator size='large' color={styles.red} />
          </View>
          :
          <ScrollView>
            {isOBMPassword === true ?
              <View style={styles.containerBanner}>
                <View style={styles.containerTrfTitle}>
                  <Text style={styles.transferTitle}>{language.DRAWER__EXCHANGE_RATES}</Text>
                </View>
              </View>
              : null  
            }
            <View>
              <Text style={styles.heading}>{language.EXCHANGE__RATES_TITLE}</Text>
              {/* <Field
                  name='currency'
                  rightIcon='arrow'
                  component={SinarmasPickerLine}
                  placeholder={language.SELECT_BILLER}
                  labelKey='name'
                  itemList={currencyTarget}
                /> */}
              <View>
                <View style={[styles.content, styles.row]}>
                  <View style={styles.wrapCoupon}>
                    <Text style={styles.descriptionHeading}>{language.EXCHANGE__RATES_CURRENCY}</Text>
                  </View>
                  <View style={styles.wrapCoupon}>
                    <Text style={styles.descriptionHeading}>{language.EXCHANGE__RATES_BUY}</Text>
                  </View>
                  <View style={styles.wrapCoupon}>
                    <Text style={styles.descriptionHeading}>{language.EXCHANGE__RATES_SELL}</Text>
                  </View>
                </View>
                <View style={styles.greyLine} />
                {map(currencyGroup, this.renderListItem)}
                <View style={styles.spaceLine} />
                <View style={[styles.content, styles.row]}>
                  <View style={styles.wrapCoupon}>
                    <Text style={styles.descriptionHeading}>{language.EXCHANGE__RATES_CURRENCY}</Text>
                  </View>
                  <View style={styles.wrapCoupon}>
                    <Text style={styles.descriptionHeading}>{language.EXCHANGE__RATES_BUY_USD}</Text>
                  </View>
                  <View style={styles.wrapCoupon}>
                    <Text style={styles.descriptionHeading}>{language.EXCHANGE__RATES_SELL_USD}</Text>
                  </View>
                </View>
                <View style={styles.greyLine} />
                {map(currencyGroupUSD, this.renderListItem)}
              </View>
              <View style={styles.row}>
                <Text style={styles.dateText}>{language.EXCHANGE__RATES_DATE}: </Text>
                <Text style={styles.dateTextBold}>{lastDate} WIB</Text>
              </View>
              <View style={[styles.container2]}>
                <View style={styles.bottomSpacing}>
                  <View style={styles.containtextExplanation}>
                    <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon} />
                    <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.EXCHANGE__RATES_EXPLANATION}</Text></View>
                  </View>
                  {isLogin ?
                    <SinarmasButton style={styles.btnConfirm} onPress={goToTransfer} >
                      <Text style={styles.buttonLargeTextStyle}>{language.EXCHANGE__RATES_SEND}</Text>
                    </SinarmasButton>
                    : null}
                </View>
              </View>
            </View>
          </ScrollView>
        }
      </KeyboardAwareScrollView>
    );
  }
}

export default ValasItem;
import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {language} from '../../config/language';
import RecentPaymentCard from '../RecentPaymentCard/RecentPaymentCard.component';
import {buttonLargeTextStyle} from '../../styles/common.styles';
import noop from 'lodash/noop';
import Carousel from '../Carousel/Carousel.component';
import {SinarmasPicker, SinarmasInput, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import styles from './WaterBill.component.style';
import {wrapMethodInFunction, waterBillPlaceholder} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import result from 'lodash/result';

class WaterBill extends React.Component {
  static propTypes ={
    billerData: PropTypes.array,
    recentTransactions: PropTypes.array,
    handleCardClick: PropTypes.func,
    handleSubmit: PropTypes.func,
    billerCode: PropTypes.string,
    invalid: PropTypes.bool,
  }

  render () {
    const {billerData, recentTransactions = [], handleCardClick = noop, billerCode = '', invalid, handleSubmit = noop} = this.props;
    const merchant = billerCode;
    const showAreaCode = (billerCode === '009937');
    const showConsumerNumber = !!merchant;
    const areaList = result(billerData, '0.areaList', []);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'  style={[styles.tabBarMargin, styles.background]} extraHeight={120}>
        <View style={{...styles.bottomSpacing, ...styles.horizontalSpacing}}>
          {recentTransactions.length > 0 ?
            (<View>
              <Text style={styles.labelSpacing}>{language.WATER_BILL__RECENT_ACCOUNT}</Text>
              <Carousel>
                {recentTransactions.map((transaction, i) => (<RecentPaymentCard key={i}  onPress={handleCardClick(transaction)} biller={transaction.waterBiller} {...transaction}/>))}
              </Carousel>
            </View>
            ) : null
          }

          <View style={styles.verticalSpacing}>
            <Text style={styles.bottomSpacing}>{language.WATER_BILL__PAY_NEW_BILL_HEADER}</Text>
            <Text>{language.WATER_BILL__BILLER_NAME_HEADER}</Text>
            <Field
              name='waterBiller'
              rightIcon='arrow'
              autocomplete={false}
              placeholder={language.WATER_BILL__SELECT_MERCHANT_PLACEHOLDER}
              component={SinarmasPicker}
              itemList={billerData}
              labelKey='name' />
            {
              showConsumerNumber &&
              <View style={styles.topSpacing}>
                <Field
                  name='consumerNo'
                  keyboardType='numeric'
                  component={SinarmasInput}
                  label={language.WATER_BILL__CONSUMER_NO}
                  placeholder={waterBillPlaceholder(merchant)} />
              </View>
            }
            {
              showAreaCode &&
              <View style={styles.topSpacing}>
                <Text>{language.WATER_BILL__AREA_CODE}</Text>
                <Field
                  name='areaCode'
                  rightIcon='arrow'
                  component={SinarmasPicker}
                  placeholder={language.GENERIC_BILLER__AREA_LABEL_PLACEHOLDER}
                  labelKey='label'
                  itemList={areaList} />
              </View>
            }
          </View>
          <View style= {styles.buttonNext}>
            <SinarmasButton disabled={invalid} onPress={wrapMethodInFunction(handleSubmit)}>
              <Text style={buttonLargeTextStyle}>{language.SERVICE__NEXT_BUTTON}</Text>
            </SinarmasButton>
          </View>

        </View>

      </KeyboardAwareScrollView>
    );
  }
}
export default WaterBill;

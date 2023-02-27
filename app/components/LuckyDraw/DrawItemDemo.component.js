import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './DrawItem.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import PropTypes from 'prop-types';
import moment from 'moment';
import result from 'lodash/result';
import noBanner from '../../assets/images/lucky-draw-banner.jpg';


class DrawItem extends React.Component {
  getTnC = () => this.props.luckyDrawTnC(this.props.termNCondition);
  getOffer = () => this.props.onOfferClick();
  state = {
    isDialogVisible: false,
    timeLeft: ''
  }

  showDialog = () => {
    this.props.testStorage(this.setStorage, this.props.luckyDrawCode, this.props.luckyDrawName);
  }

  setStorage = (data) => {
    const isShow = result(data, 'isShow', '');
    const timeLeft = result(data, 'timeLeft', '');
    this.setState({isDialogVisible: isShow, timeLeft: timeLeft});
  }

  render () {
    const {style, luckyDrawName, startDatePeriode, endDatePeriode, description} = this.props;
    const startDate = moment(startDatePeriode).format('D MMM YYYY');
    const endDate = moment(endDatePeriode).format('D MMM YYYY');
    return (
      <View style={[styles.offerContainer, style]}>
        <View>
          <Touchable onPress={this.getTnC}>
            <View style={styles.headerContainer}>
              <Text style={styles.headingCode}>{luckyDrawName}</Text>
              <View style={styles.flexEnd}>
                <SimasIcon name='arrow' size={15} style={styles.iconDetail}/>
              </View>
            </View>
            <View>
              <Image source={noBanner} style={styles.imageOffer2} />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.transactionHeading}>{description}</Text>
              <Text style={styles.PeriodeDate}>{language.LUCKYDRAW__PERIOD}: {startDate} - {endDate}</Text>
            </View>
          </Touchable>
          <View style={styles.greyLine}/>
          <View style={styles.containerItem}>
            <View style={styles.touchableRowUndian} >
              <View style={styles.iconContainer2}><SimasIcon name='undian-outline' style={styles.iconStyle} size={35}/></View>
              <View style={styles.sumUndianstyle} >
                <Text style={styles.styleText}>{language.LUCKYDRAW__QUANTITY}</Text>
                <Text style={styles.styleTextNumber}>{'212'}</Text>
              </View>
            </View>
            <View style={styles.greyLineVertical}/>
            <View style={styles.touchableRowUnduh} >
              <View style={styles.iconContainer}><SimasIcon name='emoney-history' style={styles.iconStyle} size={25}/></View>
              <View style={styles.sumUndianstyle} >
                <View style={styles.rowText}>
                  <Text style={styles.styleText}>{language.LUCKYDRAW__DETAIL}</Text>
                  <View style={styles.paddingRight}>
                    <SimasIcon style={styles.iconColor} name='caution-reverse' size={15}/>
                  </View>
                </View>
                <TouchableOpacity onPress={this.showDialog} style={styles.rowText}><Text style={styles.styleText2}>{language.LUCKYDRAW__DOWNLOAD}</Text>{this.state.timeLeft === '' ? null : <Text style={styles.styleText2}> ({this.state.timeLeft} {language.LUCKYDRAW__HOURS})</Text>}</TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  static propTypes = {
    navigation: PropTypes.object,
    style: PropTypes.object,
    onPress: PropTypes.func,
    mockDate: PropTypes.bool,
    emailDrawAlert: PropTypes.func,
    luckyDrawName: PropTypes.string,
    quantityOfLuckyDraw: PropTypes.number,
    endDatePeriode: PropTypes.string,
    startDatePeriode: PropTypes.string,
    description: PropTypes.string,
    luckyDrawCode: PropTypes.string,
    testStorage: PropTypes.func,
    luckyDrawTnC: PropTypes.func,
    termNCondition: PropTypes.string,
    onOfferClick: PropTypes.func,
    offerClick: PropTypes.func,
    dateOfDrawing: PropTypes.string,
    renderDemoAccount: PropTypes.bool
  }
}
export default DrawItem;

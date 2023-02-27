import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {language} from '../../config/language';
import styles from './SuccessHeader.style';
import SimobiPlus from '../../assets/images/simobiplus.png';
import {Text, View, Image} from 'react-native';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';

class SuccessHeader extends Component {
  static propTypes = {
    transRefNum: PropTypes.string,
    text: PropTypes.string, 
    status: PropTypes.string,
    textType: PropTypes.string,
  };

  // status props -> 'success', or 'pending', else 'fail' atm
  render () {
    const {textType, transRefNum, text, status} = this.props;
    const txDate = moment(new Date()).format('D MMM YYYY, h:mm a');
    return (
      <View>
        <View style={styles.titleContainer}>
          <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
          <Text style={styles.transactionDate}>{txDate}</Text>
        </View>
        <View style={[styles.row, styles.ph20]}>
          <View style={styles.mainTitle}> 
            <Text style={styles.successHeader}>{`${textType} ${status === 'success' ? language.COMMON__SUCCESS : status === 'pending' ? language.COMMON__PENDING : language.COMMON__FAILED}`}</Text>
            <Text style={styles.successText}>{text}</Text>
            {
              transRefNum ?
                <Text style={styles.transrefnum}>{language.PAYMENT_STATUS__NO_TRANS} {transRefNum}</Text>
                : <Text/>
            }
          </View>
          <SimasIcon name={status ===  'success' ? 'success-circle' : status === 'pending' ? 'pending-circle' : 'fail-circle'} style={status === 'success' ? styles.logoSuccess : styles.logoFail} size={50}/>
        </View>
        <View>
          <View style={styles.borderGreyTop}/>
        </View>
      </View>
    );
  }
}

export default SuccessHeader;
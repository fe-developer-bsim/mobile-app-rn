import {View, Text, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './PushNotifInbox.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import inboxArrow from '../../assets/images/inboxArrow.png';
import inboxTransaction from '../../assets/images/inboxTransaction.png';
import moment from 'moment';



class InboxList extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    send_date: PropTypes.string,
    status: PropTypes.number
  }

  render () {
    const {text, image, send_date} = this.props;
    const endDate = '000';
    const sendDate = send_date.concat(endDate);
    const date2 = parseInt(sendDate);
    const newDate = new Date(date2);
    const date = moment(newDate).format('MMM D');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View>
          <View style={styles.bgWhite}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Image  source={ image === '' ? inboxTransaction : {uri: image}} style={styles.imageOffer2} />
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.pad2}>
                  <Text style={styles.typeTxt}>{text}</Text>
                </View>
              </View>
              <View style={styles.date}>
                <Text style={styles.dateText}>{date}</Text>
              </View>
              <View style={styles.arrowContainer}>
                <Image source={inboxArrow} size={15} style={styles.arrowIcon}/>
              </View>
            </View>
            <View style={styles.greyLine} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default InboxList;

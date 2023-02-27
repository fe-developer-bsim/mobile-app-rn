import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import NavListItem from '../../components/NavListItem/NavListItem.component';
import {language} from '../../config/language';
import styles from './Help.styles';
import VersionNumber from 'react-native-version-number';

class Help extends React.Component {
  static propTypes = {
    onPrimaryCustomerCall: PropTypes.func,
    gotoFAQform: PropTypes.func,
    onSecondaryCustomerCall: PropTypes.func,
    onFeedbackClick: PropTypes.func
  }
  render () {
    const {onPrimaryCustomerCall, onSecondaryCustomerCall, onFeedbackClick, gotoFAQform} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.container}>
          <View style={styles.navItemsContainer}>
            <NavListItem label={language.HELP__CALL_US} subtitle={language.HELP__CALL_US__SUBTITLE} featureIconName='call' onPress={onPrimaryCustomerCall}/>
            <NavListItem label={language.HELP__CALL_US} subtitle={language.HELP__CALL_US__SUBTITLE_SECONDARY} featureIconName='call' onPress={onSecondaryCustomerCall}/>
            <NavListItem label={language.HELP__FREQUENTLY_ASKED_QUESTIONS} subtitle={language.HELP__FREQUENTLY_ASKED_QUESTIONS_SUBTITLE} featureIconName='faq' onPress={gotoFAQform}/>
            <NavListItem label={language.HELP__SUBMIT_FEEDBACK} featureIconName='tutorial-shield' onPress={onFeedbackClick}/>
          </View>
          <Text style={styles.versionNumber}>Version: {VersionNumber.appVersion}</Text>
        </View>
      </ScrollView>
    );
  }
}

export default Help;

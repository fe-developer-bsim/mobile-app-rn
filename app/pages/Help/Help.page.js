import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Linking, Alert} from 'react-native';
import HelpComponent from '../../components/Help/Help.component';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import {connect} from 'react-redux';
import tracker from '../../utils/googleAnalytics.util';
import result from 'lodash/result';
import {showFeedbackDialogue} from '../../state/thunks/feedback.thunks';
import {logout} from '../../state/thunks/onboarding.thunks';

const mapStateToProps = ({currentLanguage, user}) => ({currentLanguage, userId: result(user, 'profile.customer.id', 0)});

const mapDispatchToProps = (dispatch) => ({
  showFeedback: () => dispatch(showFeedbackDialogue(true)),
  logoutUser: () => dispatch(logout())
});

class HelpPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    gotoFAQform: PropTypes.func,
    userId: PropTypes.number,
    showFeedback: PropTypes.func,
    logoutUser: PropTypes.func
  }
  gotoFAQform = () => {
    this.props.navigation.navigate('FAQform');
  }
  onCustomerCall = (telephone) => () => {
    Linking.canOpenURL(telephone).then((supported) => {
      if (supported) {
        Linking.openURL(telephone);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }
  onRevertClick = (url) => () => {
    Alert.alert('', language.HELP__REVERT_TO_OLD_APP_ALERT_MSG, [{
      text: language.GENERIC__OK, onPress: () => {
        const {userId} = this.props;
        tracker.trackEvent('PREVIOUS_SIMOBI_APP_LINK', 'VISITED', null, {label: `id:${userId}`});
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url);
            this.props.logoutUser();
          } else {
            Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL);
          }
        });
      }
    }, {
      text: language.GENERIC__CANCEL
    }]);

  };
  render () {
    const {showFeedback} = this.props;
    return (
      <HelpComponent gotoFAQform={this.gotoFAQform}
        onRevertClick={this.onRevertClick('https://www.banksinarmas.com/PersonalBanking/mobile/classic.html')}
        onSecondaryCustomerCall={this.onCustomerCall('tel:50188888')}
        onPrimaryCustomerCall={this.onCustomerCall('tel:1500153')}
        onFeedbackClick={showFeedback}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpPage);

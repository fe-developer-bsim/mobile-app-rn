import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './NavRightSkip.style';
import {NavigationActions} from 'react-navigation';
import Touchable from '../Touchable.component';
// import Tooltip from 'react-native-walkthrough-tooltip';
import {language} from '../../config/language';
// import {result} from 'lodash';
// import TutorialTooltip from '../DigitalAccountOpening/TutorialTooltip.component';
import {addOrderOnboard} from '../../state/thunks/onboarding.thunks';
import {Platform} from 'react-native';
// import firebase from 'react-native-firebase';
// let Analytics = firebase.analytics();
let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}

class NavLeftLogo extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    tutorialOnboard: PropTypes.object
  };

  goToNextPage = () => {
    const {dispatch} = this.props;
    const firebaseEmoney = true;
    let adjustEvent;
    // Analytics.logEvent('REGIST_EMONEY', {device: 'android', step_route: '3'});
    dispatch(
      NavigationActions.navigate({
        routeName: 'EmoneyRegistration',
        params: {firebaseEmoney},
      })
    );
    if (Platform.OS === 'android') {
      adjustEvent = new adjustAndroid.AdjustEvent('v035jg');
      adjustEvent.addCallbackParameter('page_id', 'ak-emnkyc-1');
      adjustAndroid.Adjust.trackEvent(adjustEvent);
    }
  }

  addOrder = () => {
    const {dispatch} = this.props;
    dispatch(addOrderOnboard());
  };

  render () {
    // const {tutorialOnboard} = this.props;
    // const tutorialON = result(tutorialOnboard, 'tutorialON', '');
    // const order = result(tutorialOnboard, 'order', '');

    return (
      <Touchable onPress={this.goToNextPage}>
        <View style={styles.mr10}>
          <Text style={styles.textRed}>{language.CREATE_ACCOUNT__SKIP}</Text>
        </View>
        {/* <Tooltip
            animated
            isVisible={tutorialON ? order === 0 : false}
            content={<TutorialTooltip text={language.EMONEY__CHOSE_PRODUCT1}
            order={order} next={this.addOrder} />}
            placement='bottom'
          >
          <View style={styles.mr10}>
            <Text style={styles.textRed}>{language.CREATE_ACCOUNT__SKIP}</Text>
          </View>
        </Tooltip> */}
      </Touchable>
    );
  }
}

export default NavLeftLogo;
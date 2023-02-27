import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {language} from '../../config/language';
import styles from './ShareReferralCodeMgm.styles';
import Touchable from '../Touchable.component';
import TabReferralYou from './TabReferralYou.component';
import TabReferralYourFriend from './TabReferralYourFriend.component';


class HowReferralWorks extends React.Component {
  static propTypes = {
    onChangeTab: PropTypes.func,
    initialTab: PropTypes.number,
  }

  state = {
    onYou: true,
    onYouFriend: false,
  }

  tabYou = () => {
    this.setState({onYou: true});
    this.setState({onYouFriend: false});
  }

  tabYouFriend = () => {
    this.setState({onYou: false});
    this.setState({onYouFriend: true});
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.containerDetailProduct}>
          <View style={styles.rowReward}>
            <Touchable onPress={this.tabYou}>
              <View style={this.state.onYou ? styles.upperContainerTextYouActive : styles.upperContainerTextYouInActive} >
                <Text style={this.state.onYou ? styles.textTabReferralActive : styles.textTabReferralInActive}>{language.MGM__YOU_REFERRAL_WORKS}</Text>
              </View>
            </Touchable>
            <Touchable  onPress={this.tabYouFriend}>
              <View style={this.state.onYouFriend ? styles.upperContainerTextActiveFriend : styles.upperContainerTextInActiveFriend}>
                <Text style={this.state.onYouFriend ? styles.textTabReferralActive : styles.textTabReferralInActive}>{language.MGM__YOUR_FRIEND_REFERRAL_WORKS}</Text>
              </View>
            </Touchable>
          </View>
          <View>
            {this.state.onYou ?
              <TabReferralYou/>
              :
              <TabReferralYourFriend/> 
            }
          </View>

        </View>
        
      </ScrollView>
    );
  }
}

export default HowReferralWorks;

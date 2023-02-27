import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import Touchable from './../../components/Touchable.component';
import styles from './NavHeader.styles';
import {NavigationActions} from 'react-navigation';
import {language} from '../../config/language';

export default class LoginSwitch extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    isBrandColor: PropTypes.bool,
    dispatch: PropTypes.func,
  }

  onPress = () => {
    const {dispatch} = this.props;
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Login'})
      ]
    }));
  }

  render () {
    return (
      <View style={styles.navContainerLogin}>
        <Text style={styles.blackColor}>
          {language.EMONEY__HAVE_AN_ACCOUNT}
        </Text>
        <Touchable  onPress={this.onPress} >
          <Text style={styles.primaryColor}>
            {language.IDENTITYFORM__HAVE_AN_ACCOUNT_LOG_IN}
          </Text>
        </Touchable>
      </View>
    );
  }
}

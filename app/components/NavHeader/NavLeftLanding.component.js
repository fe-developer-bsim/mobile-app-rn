import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NavLeftClose.styles';
import Touchable from '../Touchable.component';
import {StackActions, NavigationActions} from 'react-navigation';
import SimasIcon from '../../assets/fonts/SimasIcon';

class NavLeftClose extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };
  goToDashboard = () => {
    const {dispatch} = this.props;
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Landing'})],
      }),
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Touchable onPress={this.goToDashboard}>
          <View>
            <SimasIcon name={'close-black'} size={15} style={styles.close} />
          </View>
        </Touchable>
      </View>
    );
  }
}

export default NavLeftClose;

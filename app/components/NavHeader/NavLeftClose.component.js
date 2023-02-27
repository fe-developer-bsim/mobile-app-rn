import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NavLeftClose.styles';
import Touchable from '../Touchable.component';
import {NavigationActions} from 'react-navigation';
import SimasIcon from '../../assets/fonts/SimasIcon';

class NavLeftClose extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    goBack: PropTypes.bool,
  }
  goToDashboard = () => {
    const {dispatch} = this.props;
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Landing'})
      ]
    }));
  }
  goBack = () => {
    const {dispatch} = this.props;
    dispatch(NavigationActions.back());
  }
  render () {
    const {goBack = false} = this.props;
    return (
      <View style={styles.container}>
        <Touchable onPress={goBack ? this.goBack : this.goToDashboard} style={goBack ? styles.largerArea : null}>
          <View>
            <SimasIcon name={'close-black'} size={15} style={styles.close}/>
          </View>
        </Touchable>
      </View>);
  }
}

export default NavLeftClose;

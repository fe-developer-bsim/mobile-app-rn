import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NavLeftBackEP.styles';
import Touchable from '../Touchable.component';
import {NavigationActions} from 'react-navigation';
import SimasIcon from '../../assets/fonts/SimasIcon';
import result from 'lodash/result';

class NavLeftBackEP extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    goBack: PropTypes.bool,
    navParams: PropTypes.object,
  }
  goToIntroduction = () => {
    const {dispatch, navParams} = this.props;
    const isFromSearch = result(navParams, 'navigation.state.params.isFromSearch', false);
    if (isFromSearch) {
      dispatch(NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'Landing'}),
          NavigationActions.navigate({routeName: 'MenuHeaderSearch'})
        ]
      }));
    } else {
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Landing'})
        ]
      }));
    }
  }
  goBack = () => {
    const {dispatch} = this.props;
    dispatch(NavigationActions.back());
  }
  render () {
    const {goBack = false} = this.props;
    return (
      <View>
        <Touchable style={styles.container} onPress={goBack ? this.goBack : this.goToIntroduction}>
          <View>
            <SimasIcon name={'arrow'} size={20} style={styles.arrow}/>
          </View>
        </Touchable>
      </View>);
  }
}

export default NavLeftBackEP;
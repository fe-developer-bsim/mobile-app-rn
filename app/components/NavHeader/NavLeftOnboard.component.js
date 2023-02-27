import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NavLeftOnboard.styles';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {NavigationActions} from 'react-navigation';

class NavLeftOnboard extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    props: PropTypes.func
  }

  gobackEForm = () => {
    const {dispatch} = this.props;
    dispatch(NavigationActions.back());
  }

  render () {
    return (
      <View style={styles.container}>
        <Touchable onPress={this.gobackEForm}>
          <View>
            <SimasIcon name={'arrow'} size={20} style={styles.arrow}/>
          </View>
        </Touchable>
      </View>);
  }
}

export default NavLeftOnboard;

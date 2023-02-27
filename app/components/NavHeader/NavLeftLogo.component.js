import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NavLeftLogo.styles';
import {showDrawer} from '../../state/actions/index.actions';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';

class NavLeftLogo extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }
  openDrawer = () => {
    const {dispatch} = this.props;
    dispatch(showDrawer());
  }
  render () {
    return (
      <View style={styles.container}>
        <Touchable onPress={this.openDrawer}>
          <View>
            <SimasIcon name={'Burger'} size={20} style={styles.burger}/>
          </View>
        </Touchable>
      </View>);
  }
}

export default NavLeftLogo;

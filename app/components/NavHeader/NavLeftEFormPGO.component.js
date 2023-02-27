import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NavLeftEForm.styles';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {getFirstPage} from '../../state/thunks/EForm.thunks';
import {result} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {destroy} from 'redux-form';

class NavLeftEFormPGO extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    props: PropTypes.func
  }

  gobackEForm = () => {
    const {dispatch, props} = this.props;
    const dataDukcapil = result(props, 'navigation.state.params.dataDukcapil', {});
    const dataCore = result(props, 'navigation.state.params.dataCore', {});
    const pageNameBack = result(props, 'navigation.state.params.pageCode', '');
    const pageName = result(props, 'navigation.state.params.pageName', '');
    const flagBack = true;
    dispatch(destroy('EForm'));
    if (pageName.toLowerCase().includes('simulation')) {
      dispatch(NavigationActions.back());
    } else {
      dispatch(NavigationActions.back());
      dispatch(getFirstPage(dataDukcapil, dataCore, flagBack, pageNameBack));
    }
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

export default NavLeftEFormPGO;
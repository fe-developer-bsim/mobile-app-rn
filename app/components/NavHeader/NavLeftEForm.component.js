import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NavLeftEForm.styles';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {getChoosenPage} from '../../state/thunks/digitalAccountOpening.thunks';
import {result} from 'lodash';

class NavLeftEForm extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    props: PropTypes.func
  }

  gobackEForm = () => {
    const {dispatch, props} = this.props;
    const pageNameBack = result(props, 'navigation.state.params.pageCode', '');
    const item = result(props, 'navigation.state.params.item', {});
    const flagBack = true;
    dispatch(getChoosenPage(item, flagBack, pageNameBack));
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

export default NavLeftEForm;
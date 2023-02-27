import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import {theme} from '../../styles/core.styles';
import {reset} from 'redux-form';

class NavReset extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    form: PropTypes.string,
  }
  resetForm = () => {
    const {dispatch, form} = this.props;
    dispatch(reset(form));
  }
  render () {
    return (
      <View>
        <Touchable onPress={this.resetForm} style={{paddingHorizontal: 10, paddingVertical: 10}}>
          <View>
            <Text style={{color: theme.pinkBrand}}>{language.GENERIC__RESET.toUpperCase()}</Text>
          </View>
        </Touchable>
      </View>);
  }
}

export default NavReset;

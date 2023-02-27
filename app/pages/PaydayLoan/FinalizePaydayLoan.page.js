import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IdentityFourthForm from '../../components/PaydayLoan/FinalizePaydayLoan.component';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  returnTohome: () => {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'HomeScreen'}),
      ]
    }));
  }
});

class FinalizePaydayLoan extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    returnTohome: PropTypes.func
  }


  render () {
    const {navigation, returnTohome} = this.props;
    return (
      <IdentityFourthForm navigation={navigation} returnTohome={returnTohome}/>
    );
  }
}

export default connect(null, mapDispatchToProps)(FinalizePaydayLoan);

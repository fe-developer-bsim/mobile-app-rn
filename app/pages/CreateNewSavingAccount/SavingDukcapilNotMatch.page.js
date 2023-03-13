import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DukcapilNotMatch from '../../components/CreateNewSavingAccount/SavingDukcapilNotMatch.component';
import {result, isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';

const mapDispatchToProps = dispatch => ({
  onButtonPress: rootName =>
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: rootName})],
      }),
    ),
});
const mapStateToProps = state => ({
  isLogin: !isEmpty(result(state, 'user', {})),
});

class DukcapilNotMatchPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    onButtonPress: PropTypes.func,
    onBackPress: PropTypes.func,
    isLogin: PropTypes.bool,
  };

  backToHome = () => {
    const {isLogin, onButtonPress} = this.props;
    onButtonPress(isLogin ? 'Landing' : 'ChooseProductsIntroduction');
  };

  render() {
    const {navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return <DukcapilNotMatch backToHome={this.backToHome} {...navParams} />;
  }
}
const ConnectedIntroductionPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DukcapilNotMatchPage);
export default ConnectedIntroductionPage;

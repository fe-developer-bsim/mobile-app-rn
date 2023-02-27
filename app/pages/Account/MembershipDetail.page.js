import React from 'react';
import PropTypes from 'prop-types';
import AccountMenu from '../../components/Account/MembershipDetail.component.js';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {resetAndNavigate, couponCustomerView} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';
import toLower from 'lodash/toLower';
import {shouldGiveChecklistSimasCatalog} from '../../state/thunks/digitalStore.thunks';

const mapStateToProps = (state) => ({
  currentLanguage: state.currentLanguage.id,
  accounts: result(state, 'accounts', []),
  user: state.user,
  toogleLuckyDraw: result(state, 'config.toogleLuckyDraw', ''),
  statusMember: toLower(result(state, 'memberUser', '')),
  configCustSegment: result(state, 'config.configCustSegment', []),
  lang: result(state, 'currentLanguage.id', 'id'),
});

const mapDispatchToProps = (dispatch) => ({
  resetAndNavigateTo: (destinationRoute, params) => () => {
    dispatch(resetAndNavigate(destinationRoute, params));
  },
  goToMembership: () => {
    dispatch(NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit'}));
  },
  goToTncSimasCatalog: () => {
    dispatch(shouldGiveChecklistSimasCatalog());
  },
  goToMyCoupon: () => dispatch(couponCustomerView()),
  dispatch: (data) => dispatch(data)
});


class AccountMenuPage extends React.Component {
  state = {
    backgrounded: false,
    backgroundedTime: new Date(),
    timeout: 10,
    visible: false,
    checkLogin: false
  }
  static propTypes = {
    statusMember: PropTypes.string,
    goToMembership: PropTypes.func,
    configCustSegment: PropTypes.array,
    goToTncSimasCatalog: PropTypes.func,
    goToMyCoupon: PropTypes.func,
    lang: PropTypes.string,
  }


  render () {
    const {statusMember, goToMembership, configCustSegment, goToTncSimasCatalog, goToMyCoupon, lang} = this.props;
    return <AccountMenu statusMember={statusMember} goToMembership={goToMembership} configCustSegment={configCustSegment} goToTncSimasCatalog={goToTncSimasCatalog} goToMyCoupon={goToMyCoupon} lang={lang}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenuPage);

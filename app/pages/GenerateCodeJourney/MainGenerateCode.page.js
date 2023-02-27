import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import MainGenerateCode from '../../components/GenerateCodeJourney/MainGenerateCode.component';
import {resetAndNavigate} from '../../state/thunks/common.thunks.js';
import {getLoginStorage} from '../../state/thunks/generateCode.thunks.js';
import {result, isEmpty} from 'lodash';

const formConfig = {
  form: 'ChooseOffline',
  destroyOnUnmount: false,
  onSubmit: (dispatch) => dispatch()
};

const mapStateToProps = (state) => ({
  user: result(state, 'user', {}),
  nav: result(state, 'nav', {}),
  form: result(state, 'form', {}),
  generateCode: result(state, 'generateCode', {}),
});

const mapDispatchToProps = (dispatch, state) => ({
  goNextPage: (data, trxType) => () => {
    dispatch(resetAndNavigate('GenerateForm', {data, trxType}));
  },
  offlineStorage: () => {
    const trxType = result(state, 'navigation.state.params.trxType', '');
    dispatch(getLoginStorage(trxType));
  }
});

const DecoratedForm = reduxForm(formConfig)(MainGenerateCode);

class MainOfflineOnboarPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goNextPage: PropTypes.func,
    user: PropTypes.object,
    nav: PropTypes.object,
    offlineStorage: PropTypes.func,
    generateCode: PropTypes.object,
  };

  componentDidMount = () => {
    const {offlineStorage} = this.props;
    offlineStorage();
  }

  render () {
    const {navigation = {}, goNextPage, user, nav, offlineStorage, generateCode} = this.props;
    const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
    const isLogin = !isEmpty(user) && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
    return <DecoratedForm
      navigation = {navigation}
      goNextPage={goNextPage}
      isLogin={isLogin}
      offlineStorage={offlineStorage}
      generateCode={generateCode}
    />;
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(MainOfflineOnboarPage);

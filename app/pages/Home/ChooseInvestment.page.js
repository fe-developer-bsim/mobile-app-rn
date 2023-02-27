import React from 'react';
import PropTypes from 'prop-types';
import Investment from '../../components/Home/ChooseInvestment.component';
import {investmentDataView, investmentDataViewSmartSIL, investmentDataViewStarInvestama, simasSekuritas} from '../../state/thunks/dashboard.thunks';
import result from 'lodash/result';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  investmentAccounts: result(state, 'investmentAccounts', {}), 
});

const mapDispatchToProps = (dispatch) => ({
  goToNextPage: (item) => () => {
    if (item.code === 'ASJ') {
      dispatch(investmentDataViewSmartSIL(item));
    } else if (item.code === 'SinarmasSekuritas') {
      dispatch(simasSekuritas(item));
    } else if (item.code === 'starInvestama') {
      dispatch(investmentDataViewStarInvestama(item));
    } else {
      dispatch(investmentDataView(item));
    }
  },
});

class Investmentform extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToNextPage: PropTypes.func,
    simasSekuritas: PropTypes.func,
    investmentDataView: PropTypes.func,
    goToStarInvestama: PropTypes.func,
    investmentAccounts: PropTypes.object,
  }

  render () {
    const {navigation, goToNextPage, goToStarInvestama, investmentDataView, simasSekuritas, investmentAccounts} = this.props;
    const items = result(navigation, 'state.params.item');
    const isSearch = result(navigation, 'state.params.isSearch');
    const nextRouteName = result(navigation, 'state.params.nextRouteName', '');
    return (
      <Investment items={items} goToNextPage={goToNextPage} goToStarInvestama={goToStarInvestama} investmentDataView={investmentDataView} 
        simasSekuritas={simasSekuritas} isSearch={isSearch} investmentAccounts={investmentAccounts} nextRouteName={nextRouteName}/>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Investmentform);

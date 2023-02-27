import React from 'react';
import PropTypes from 'prop-types';
import InvestmentComponent from '../../components/InvestmentJourney/Investment.component';
import {connect} from 'react-redux';
import {result} from 'lodash';
import {reduxForm, change} from 'redux-form';
import {dataArrayMagnaLink, dataArrayPrimeLink, generateNoPolis} from '../../utils/transformer.util';

const InvestmentProductConfig = {
  form: 'InvestmentProduct',
  destroyOnUnmount: true,
  initialValues: {
  },
};

const Investment = reduxForm(InvestmentProductConfig)(InvestmentComponent);

const mapStateToProps = (state) => ({
  accountsCust: result(state, 'accounts', []),
  currentLanguage: result(state, 'currentLanguage.id', ''),
  formValuesMagna: result(state, 'form.InvestmentProduct.values.nomorPolisMagna', {}),
  formValuesPrime: result(state, 'form.InvestmentProduct.values.nomorPolisPrime', {}),
});

const mapDispatchToProps = (dispatch) => ({
  prefilledNoPolisMagna: (noPolicy) => {
    dispatch(change('InvestmentProduct', 'nomorPolisMagna', noPolicy));
  },
  prefilledNoPolisPrime: (noPolicy) => {
    dispatch(change('InvestmentProduct', 'nomorPolisPrime', noPolicy));
  },
});

class InvestmentProductClass extends React.Component {
  static propTypes = {
    investmentAllData: PropTypes.object,
    navigation: PropTypes.object,
    type: PropTypes.string,
    currentLanguage: PropTypes.string,
    prefilledNoPolisMagna: PropTypes.func,
    prefilledNoPolisPrime: PropTypes.func,
    formValuesMagna: PropTypes.object,
    formValuesPrime: PropTypes.object,
  }

  componentDidMount = () => {
    const {navigation = {}, prefilledNoPolisMagna, prefilledNoPolisPrime} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const dataMagnaLink = dataArrayMagnaLink(result(navParams, 'dataMagnaLink', []));
    const dataPrimeLink = dataArrayPrimeLink(result(navParams, 'dataPrimeLink', []));
    const listDataMagna = result(dataMagnaLink, '0', {});
    const listDataPrime = result(dataPrimeLink, '0', {});
    prefilledNoPolisMagna(listDataMagna);
    prefilledNoPolisPrime(listDataPrime);
  }

  render () {
    const {navigation = {}, currentLanguage, formValuesMagna, formValuesPrime} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const dataMagnaLink = dataArrayMagnaLink(result(navParams, 'dataMagnaLink', []));
    const dataPrimeLink = dataArrayPrimeLink(result(navParams, 'dataPrimeLink', []));
    const noPolisMagna = generateNoPolis(dataMagnaLink);
    const noPolisPrime = generateNoPolis(dataPrimeLink);
    const detailList = [formValuesMagna, formValuesPrime];
    const detailListRemoveNull = detailList.filter((d) => !Object.values(d).every((v) => v === null));
    return <Investment
      navParams={navParams}
      dataMagnaLink={dataMagnaLink}
      dataPrimeLink={dataPrimeLink}
      nomorPolisMagna={noPolisMagna}
      nomorPolisPrime={noPolisPrime}
      detailList={detailList}
      detailListRemoveNull={detailListRemoveNull}
      currentLanguage={currentLanguage}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentProductClass);

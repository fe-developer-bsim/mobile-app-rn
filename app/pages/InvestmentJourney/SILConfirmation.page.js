import React from 'react';
import PropTypes from 'prop-types';
import ConfirmationBuyComponent from '../../components/InvestmentJourney/SILConfirmation.component';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {saveSilIdrUsd, saveCcCode} from '../../state/actions/index.actions.js';
import {getinputPolisIndividu, getRipleyPersonal} from '../../state/thunks/dashboard.thunks';


const formConfig = {
  form: 'confirmationBuyPolis',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    dispatch(getinputPolisIndividu());
  },
};


const mapStateToProps = (state) => ({
  silStorage: result(state, 'silStorage', ''),
  fullName: result(state, 'smartInvestasiLinkPolis.namaLengkap', ''),
  ktp: result(state, 'smartInvestasiLinkPolis.nik', ''),
  birthdate: result(state, 'smartInvestasiLinkPolis.tanggalLahir', ''),
  gender: result(state, 'smartInvestasiLinkPolis.jenisKelamin', ''),
  mothersMaiden: result(state, 'smartInvestasiLinkPolis.motherMaidenName', ''),
  birthPlace: result(state, 'smartInvestasiLinkPolis.tempatLahir', ''),
  maritalStatus: result(state, 'silStorage[2].dataBody.maritalStatus.label', ''),
  agama: result(state, 'silStorage[2].dataBody.agama.label', ''),
  warganegara: result(state, 'silStorage[2].dataBody.warganegara.label', ''),
  pendidikan: result(state, 'silStorage[2].dataBody.pendidikan.label', ''),
  question1: result(state, 'healthQuestion[0].label', ''),
  question2: result(state, 'healthQuestion[1].label', ''),
  question3: result(state, 'healthQuestion[2].label', ''),
  answer1: result(state, 'silStorage[6].dataBody.answers0.label', ''),
  answer2: result(state, 'silStorage[6].dataBody.answers1.label', ''),
  answer3: result(state, 'silStorage[6].dataBody.answers2.label', ''),
  explain1: result(state, 'silStorage[6].dataBody.explain0', ''),
  explain2: result(state, 'silStorage[6].dataBody.explain2', ''),
  checkbox: result(state, 'silStorage[6].dataBody.checkboxArray.checkboxArray', {}),
  isSilIdrUsd: result(state, 'silIdrUsd', ''),
  moneyInsured: result(state, 'getMoneyInsuredSil.pertanggungan', ''),
  listProductDetailIdr: result(state, 'getProductListSil.listProduct.0.listProdDetail.0', {}),
  listProductDetailUsd: result(state, 'getProductListSil.listProduct.1.listProdDetail.0', {}),
  listProductIdr: result(state, 'getProductListSil.listProduct.0', {}),
  formValues: result(state, 'silStorage[4].dataBody.sourceOfFund', {}),
  listProductUsd: result(state, 'getProductListSil.listProduct.1', {}),
  totalPremi: result(state, 'silStorage[1].dataBody.amount', ''),
  monthOption: result(state, 'silStorage[1].dataBody.income.label', ''),
  silInvesOption: result(state, 'silStorage[1].dataBody.investa.label', ''),
  fullNameBenefit: result(state, 'silStorage[5].dataBody.fullName', ''),
  birthdateBenefit: result(state, 'silStorage[5].dataBody.birthdate', ''),
  genderBenefit: result(state, 'silStorage[5].dataBody.gender.label', ''),
  polisRelation: result(state, 'silStorage[5].dataBody.polisRelation.label', ''),
  basicPremiumIdr: result(state, 'getProductListSil.listProduct[0].listProdDetail[0].basicPremium', ''),
  basicPremiumUsd: result(state, 'getProductListSil.listProduct[1].listProdDetail[0].basicPremium', ''),
  nav: result(state, 'nav', {}),
  config: result(state, 'config', {}),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
});

const mapDispatchToProps = (dispatch) => ({

  getinputPolisIndividu: () => dispatch(getinputPolisIndividu()),

  goInformationUSD: () => {
    dispatch(saveSilIdrUsd('USD'));
    dispatch(saveCcCode('SILINFOUSD_SIMOBI-002'));
    dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkPolisInformasiTnCUSD'}));
  },

  goInformationIDR: () => {
    dispatch(saveSilIdrUsd('IDR'));
    dispatch(saveCcCode('SILINFOIDR_SIMOBI-002'));
    dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkPolisInformasiTnCIDR'}));
  },

  getRipleyPersonal: () => dispatch(getRipleyPersonal())
});


const ConfirmationBuyPolis = reduxForm(formConfig)(ConfirmationBuyComponent);


class ConfirmationBuyPolisSIL extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    getinputPolisIndividu: PropTypes.func,
    inquiryData: PropTypes.object,
    goToEmF: PropTypes.func,
    showAlert: PropTypes.func,
    config: PropTypes.object,
    goToTopUp: PropTypes.func,
    triggerAuth: PropTypes.func,
    email: PropTypes.string,
    fullName: PropTypes.string,
    phoneNumber: PropTypes.string,
    birthdate: PropTypes.string,
    gender: PropTypes.object,
    ktp: PropTypes.string,
    mothersMaiden: PropTypes.string,
    birthPlace: PropTypes.string,
    maritalStatus: PropTypes.object,
    agama: PropTypes.object,
    warganegara: PropTypes.object,
    pendidikan: PropTypes.object,
    question1: PropTypes.object,
    question2: PropTypes.object,
    question3: PropTypes.object,
    answer1: PropTypes.object,
    answer2: PropTypes.object,
    answer3: PropTypes.object,
    explain1: PropTypes.string,
    explain2: PropTypes.string,
    listProductDetailIdr: PropTypes.object,
    listProductDetailUsd: PropTypes.object,
    totalPremi: PropTypes.string,
    moneyInsured: PropTypes.object,
    isSilIdrUsd: PropTypes.string,
    monthOption: PropTypes.object,
    listProductIdr: PropTypes.object,
    listProductUsd: PropTypes.object,
    silInvesOption: PropTypes.object,
    amountValue: PropTypes.object,
    fullNameBenefit: PropTypes.object,
    birthdateBenefit: PropTypes.object,
    genderBenefit: PropTypes.object,
    polisRelation: PropTypes.object,
    silStorage: PropTypes.object,
    basicPremiumIdr: PropTypes.object,
    basicPremiumUsd: PropTypes.object,
    formValues: PropTypes.object,
    checkbox: PropTypes.array,
    goInformationIDR: PropTypes.func,
    goInformationUSD: PropTypes.func,
    responseCode: PropTypes.string,
    getRipleyPersonal: PropTypes.func,
  }

  onGoNextInfoUSD = () => {
    this.props.goInformationUSD();
  }

  onGoNextInfoIDR = () => {
    this.props.goInformationIDR();
  }

  render () {
    const {gender, fullName, email, birthdate, phoneNumber, ktp, mothersMaiden, birthPlace, maritalStatus, agama, warganegara, pendidikan,
      isSilIdrUsd, listProductIdr, listProductUsd, moneyInsured, question1, question2, question3, answer1, answer2, answer3, explain1, explain2, listProductDetailIdr, listProductDetailUsd,
      totalPremi, monthOption, getinputPolisIndividu, silInvesOption, amountValue, fullNameBenefit, birthdateBenefit, genderBenefit, polisRelation,
      silStorage, basicPremiumUsd, basicPremiumIdr, navigation, formValues, checkbox, responseCode, getRipleyPersonal} = this.props;
    const items = result(navigation, 'state.params.data.code');
    return (
      <ConfirmationBuyPolis
        getinputPolisIndividu={getinputPolisIndividu}
        gender={gender}
        email={email}
        fullName={fullName}
        birthdate={birthdate}
        phoneNumber={phoneNumber}
        navigation={navigation}
        ktp={ktp}
        mothersMaiden={mothersMaiden}
        birthPlace={birthPlace}
        maritalStatus={maritalStatus}
        agama={agama}
        warganegara={warganegara}
        pendidikan={pendidikan}
        answer1={answer1}
        answer2={answer2}
        answer3={answer3}
        explain1={explain1}
        explain2={explain2}
        isSilIdrUsd={isSilIdrUsd}
        moneyInsured={moneyInsured}
        listProductDetailIdr={listProductDetailIdr}
        listProductDetailUsd={listProductDetailUsd}
        totalPremi={totalPremi}
        monthOption={monthOption}
        listProductIdr={listProductIdr}
        listProductUsd={listProductUsd}
        silInvesOption={silInvesOption}
        amountValue={amountValue}
        fullNameBenefit={fullNameBenefit}
        birthdateBenefit={birthdateBenefit}
        genderBenefit={genderBenefit}
        polisRelation={polisRelation}
        silStorage={silStorage}
        basicPremiumIdr={basicPremiumIdr}
        basicPremiumUsd={basicPremiumUsd}
        formValues={formValues}
        question1={question1}
        question2={question2}
        question3={question3}
        checkbox={checkbox}
        onGoNextInfoUSD={this.onGoNextInfoUSD}
        onGoNextInfoIDR={this.onGoNextInfoIDR}
        items={items}
        responseCode={responseCode}
        getRipleyPersonal={getRipleyPersonal}
      />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationBuyPolisSIL);

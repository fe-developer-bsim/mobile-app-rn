import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import SmartInvestaLinkPolisDetailComponent, {fields} from '../../components/InvestmentJourney/SILeSPAJForm1.component';
import {result, isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {getCityListSil, saveSILDATA} from '../../state/thunks/dashboard.thunks';
import {validateRequiredFields, validateNameEform} from '../../utils/validator.util';

const formConfig = {
  form: 'SileSPAJForm1',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, checkboxArray) => {
    dispatch(getCityListSil());
    const dataCollected = {
      formName: 'SileSPAJForm1',
      dataBody: {
        checkboxArray: checkboxArray,
        maritalStatus: values.maritalStatus,
        agama: values.agama,
        warganegara: values.warganegara,
        pendidikan: values.pendidikan
      }
    };
    dispatch(saveSILDATA(dataCollected));
  },

  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, [fields.MARITALSTATUS, fields.RELIGION, fields.NATIONALITY, fields.EDUCATION])
    };
    return {
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  formMyInformation: result(state, 'form.SilIustrasiForm1.values', {}),
  amountValue: result(state, 'form.registerSILProdukPolisForm.values.amount', 0),
  dropList: result(state, 'getDropList.dropDownList', {}),
  smartInvestasiLinkPolis: result(state, 'smartInvestasiLinkPolis', ''),
  mothersMaiden: result(state, 'smartInvestasiLinkPolis.motherMaidenName', ''),
  isSilIdrUsd: result(state, 'silIdrUsd', ''),
  nikKtp: result(state, 'smartInvestasiLinkPolis.nik', ''),
  birthPlace: result(state, 'smartInvestasiLinkPolis.tempatLahir', ''),
  gender: result(state, 'smartInvestasiLinkPolis.jenisKelamin', ''),
  fullName: result(state, 'smartInvestasiLinkPolis.namaLengkap', ''),
  birthdate: result(state, 'smartInvestasiLinkPolis.tanggalLahir', ''),
});

const mapDispatchToProps = (dispatch) => ({
  getCityListSil: () => dispatch(getCityListSil()),

  preilledWargaNegara: (defaultIndo) => {
    dispatch(change('SileSPAJForm1', 'warganegara', defaultIndo));
  }
});

const SmartInvestaLinkInfoPolisPage = reduxForm(formConfig)(SmartInvestaLinkPolisDetailComponent);
const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(SmartInvestaLinkInfoPolisPage);

class SmartInvestaLinkDetailPolis extends React.Component {
  static propTypes = {
    formMyInformation: PropTypes.object,
    amountValue: PropTypes.number,
    dropList: PropTypes.array,
    smartInvestasiLinkPolis: PropTypes.object,
    getCityListSil: PropTypes.func,
    email: PropTypes.string,
    prefilledMotherMaiden: PropTypes.func,
    mothersMaiden: PropTypes.string,
    nikKtp: PropTypes.string,
    prefilledNikKtp: PropTypes.func,
    birthPlace: PropTypes.string,
    preilledBirthPlace: PropTypes.func,
    gender: PropTypes.string,
    preilledWargaNegara: PropTypes.func,
    defaultWargaNega: PropTypes.string,
    fullName: PropTypes.string,
    birthdate: PropTypes.string,
  }

  state = {
    checkboxArray: [],
    setWargaNegara: '',
    nationality: []
  }

  changeCheckboxArray = (checkbox) => {
    this.setState({checkboxArray: checkbox});
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('maritalStatus' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('agama' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('warganegara' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('pendidikan' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  componentWillMount () {
    const {dropList, preilledWargaNegara} = this.props;
    const listNationality = result(dropList, 'wargaNegara', []);
    const defaultIndo = result(listNationality, '20', {});
    preilledWargaNegara(defaultIndo);
    this.setState({nationality: listNationality});
  }

  render () {
    const {formMyInformation, smartInvestasiLinkPolis, amountValue, dropList, getCityListSil, mothersMaiden, gender, nikKtp, birthPlace, fullName, birthdate} = this.props;

    return <ConnectedForm
      smartInvestasiLinkPolis={smartInvestasiLinkPolis}
      formMyInformation={formMyInformation}
      validationInput={this.validationInput}
      amountValue={amountValue}
      dropList = {dropList}
      getCityListSil={getCityListSil}
      checkboxArray={this.state.checkboxArray}
      changeCheckboxArray={this.changeCheckboxArray}
      mothersMaiden={mothersMaiden}
      gender={gender}
      nationality={this.state.nationality}
      nikKtp={nikKtp}
      birthPlace={birthPlace}
      fullName={fullName}
      birthdate={birthdate}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartInvestaLinkDetailPolis);
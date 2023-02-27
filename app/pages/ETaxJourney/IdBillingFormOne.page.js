import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IdBillingFormOne from '../../components/ETaxJourney/IdBillingFormOne.component';
import {connect} from 'react-redux';
import {createIDBilling, goToConfirmation, getDataSetoran} from '../../state/thunks/common.thunks';
import {reduxForm, change, reset} from 'redux-form';
import result from 'lodash/result';
import {validateRequiredFields, validateKtpDukcapil, validateNpwpLengthEtaxFormat, validateAmountEtax} from '../../utils/validator.util';
const formConfig = {
  form: 'IdBillingFormOne',
  destroyOnUnmount: true,
  validate: (values) => {
    const errors =  {
      ...validateRequiredFields(values, ['nik', 'namaWP', 'alamatWP', 'npwp', 'jenisPajak', 'jenisSetoran', 'dateStart', 'dateEnd', 'tahunPajak', 'jumlahSetor'])
    };
    return {
      nik: validateKtpDukcapil(values.nik),
      npwp: validateNpwpLengthEtaxFormat(values.npwp),
      jumlahSetor: validateAmountEtax(values.jumlahSetor),
      ...errors
    };
  },
  onSubmit: (values, dispatch, {biller, haveNpwp}) => {
    dispatch(goToConfirmation(values, biller, haveNpwp));
  },
};

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.IdBillingFormOne.values'),
  jenisPajak: result(state, 'etaxInformation.jenisPajak', []),
  jenisPajakNonNpwp: result(state, 'etaxInformation.jenisPajakNonNPWP', []),
  jenisSetoranNonNoKetetapan: result(state, 'etaxInformation.jenisSetoranNonNoKetetapan', []),
  jenisSetoran: result(state, 'etaxDepositType', []),
  lang: result(state, 'currentLanguage.id', 'id'),
  state
});

const mapDispatchToProps = (dispatch) => ({
  createIDBilling: () => dispatch(createIDBilling()),
  getTypeSetoran: (kodePajak, haveNpwp) => {
    dispatch(change('IdBillingFormOne', 'jenisSetoran', ''));
    dispatch(getDataSetoran(kodePajak, haveNpwp));
  },
  clearFormNonNpwp: () => {
    dispatch(change('IdBillingFormOne', 'nik', ''));
    dispatch(change('IdBillingFormOne', 'namaWP', ''));
    dispatch(change('IdBillingFormOne', 'alamatWP', ''));
    dispatch(change('IdBillingFormOne', 'kotaWP', ''));
    dispatch(change('IdBillingFormOne', 'nop', ''));
    dispatch(change('IdBillingFormOne', 'jenisPajak', ''));
    dispatch(change('IdBillingFormOne', 'jenisSetoran', ''));
    dispatch(change('IdBillingFormOne', 'tahunPajak', ''));
    dispatch(change('IdBillingFormOne', 'nomorKetetapan', ''));
    dispatch(change('IdBillingFormOne', 'jumlahSetor', ''));
    dispatch(change('IdBillingFormOne', 'terbilang', ''));
    dispatch(change('IdBillingFormOne', 'berita', ''));
    dispatch(change('IdBillingFormOne', 'npwp', ''));
    dispatch(change('IdBillingFormOne', 'dateStart', ''));
    dispatch(change('IdBillingFormOne', 'dateEnd', ''));
  },
  changeValue: (data) => {
    dispatch(change('IdBillingFormOne', 'dateStart', data));
    dispatch(change('IdBillingFormOne', 'dateEnd', data));
  },
  destroyForm: () => {
    dispatch(reset('IdBillingFormOne'));
  }

});

const DecoratedForm = reduxForm(formConfig)(IdBillingFormOne);

class IdBillingForm extends Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    formValues: PropTypes.object,
    jenisPajak: PropTypes.array,
    jenisPajakNonNpwp: PropTypes.array,
    jenisSetoran: PropTypes.array,
    getTypeSetoran: PropTypes.func,
    navigation: PropTypes.object,
    clearFormNonNpwp: PropTypes.func,
    lang: PropTypes.string,
    changeValue: PropTypes.func,
    destroyForm: PropTypes.func,
    jenisSetoranNonNoKetetapan: PropTypes.array,
  }
  
  state = {
    haveNpwp: false
  }

  onChangeHandler = () => {
    const {haveNpwp} = this.state;
    const {destroyForm} = this.props;
    destroyForm();
    if (haveNpwp) {
      this.setState({haveNpwp: false});
    } else {
      this.setState({haveNpwp: true});
    }
  }

  changeStateOnComponentMount () {
    this.setState({
      haveNpwp: true,
    });
  }

  componentDidMount () {
    this.changeStateOnComponentMount();
  }
  
  render () {
    const {createIDBilling, formValues, jenisPajak, jenisPajakNonNpwp, getTypeSetoran, jenisSetoran, navigation, lang, changeValue, jenisSetoranNonNoKetetapan, ...extraProps} = this.props;
    const {haveNpwp} = this.state;
    const biller = result(navigation, 'state.params.biller', {});
    return (
      <DecoratedForm
        createIDBilling={createIDBilling}
        formValues={formValues}
        jenisPajak={jenisPajak}
        jenisPajakNonNpwp={jenisPajakNonNpwp}
        getTypeSetoran={getTypeSetoran}
        jenisSetoran={jenisSetoran}
        biller={biller}
        changeState={this.onChangeHandler}
        haveNpwp={haveNpwp}
        lang={lang}
        changeValue={changeValue}
        jenisSetoranNonNoKetetapan={jenisSetoranNonNoKetetapan}
        {...extraProps}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdBillingForm);
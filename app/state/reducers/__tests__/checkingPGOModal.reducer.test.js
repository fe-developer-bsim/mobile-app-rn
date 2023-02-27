import checkingPGOModal from '../checkingPGOModal.reducer';
import {SAVE_FLAG_CHECKING_MODAL, CLEAR_FLAG_CHECKING_MODAL} from '../../actions/index.actions';

describe('Reducer: checkingPGOModal', () => {
  it('Should return default state by default', () => {
    expect(checkingPGOModal(undefined, '')).toEqual('');
  });
  it('Should save checkingPGOModal', () => {
    expect(checkingPGOModal('', {type: SAVE_FLAG_CHECKING_MODAL, payload: '123'})).toEqual('123');
  });
  it('Should clear checkingPGOModal', () => {
    expect(checkingPGOModal('123', {type: CLEAR_FLAG_CHECKING_MODAL})).toEqual('');
  });
});

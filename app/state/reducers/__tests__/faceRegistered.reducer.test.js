import faceRegistered from '../faceRegistered.reducer';
import {IS_FACE_REGISTERED_UPDATE, CLEAR_IS_FACE_REGISTERED} from '../../actions/index.actions';

describe('Reducer: faceRegistered', () => {
  it('Should return default state by default', () => {
    const initialState =  {
      isFaceRegistered: false,
      skipped: false
    };
    expect(faceRegistered(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {
      isFaceRegistered: false,
      skipped: false
    };
    const previousState = {
      isFaceRegistered: true,
      skipped: true
    };
    const action = {type: CLEAR_IS_FACE_REGISTERED};
    expect(faceRegistered(previousState, action)).toEqual(initialState);
  });
  it('Should update face registered', () => {
    const previousState = {
      isFaceRegistered: false,
      skipped: false
    };
    const nextState = {
      isFaceRegistered: true,
      skipped: true
    };
    const action = {type: IS_FACE_REGISTERED_UPDATE, payload: {isFaceRegistered: true, skipped: true}};
    expect(faceRegistered(previousState, action)).toEqual(nextState);
  });
});

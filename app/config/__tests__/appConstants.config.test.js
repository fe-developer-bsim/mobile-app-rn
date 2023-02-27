import {updateFundTransferFees, fundMatrix} from '../appConstants.config';

describe('App constants : Maintains constants defined at app source level', () => {
  it('updateFundTransferFees: updates the fees of each fundtransfer type from server', () => {
    updateFundTransferFees({transfer: [{mode: 'skn', charge: 100}]});
    expect(fundMatrix.skn.fees).toBe(100);
    updateFundTransferFees();
    expect(fundMatrix.skn.fees).toBe(100);
    updateFundTransferFees({transfer: [{mode: 'inbank', charge: 200}]});
    expect(fundMatrix.inbank.fees).toBe(200);
    updateFundTransferFees({transfer: [{mode: 'network', charge: 400}, {mode: 'inbank', charge: 500}]});
    expect(fundMatrix.inbank.fees).toBe(500);
    expect(fundMatrix.network.fees).toBe(400);
  });
});

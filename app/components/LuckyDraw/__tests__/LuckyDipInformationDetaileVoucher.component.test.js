import React from 'react';
import renderer from 'react-test-renderer';

import LuckyDipInformationDetaileVoucher from '../LuckyDipInformationDetaileVoucher.component';

describe('LuckyDipInformationDetaileVoucher component', () => {
  xit('LuckyDipInformationDetaileVoucher: renders correctly', () => {
    const tree = renderer.create(<LuckyDipInformationDetaileVoucher />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

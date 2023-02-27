import React from 'react';
import renderer from 'react-test-renderer';

import MyOrder from '../MyOrder.component';

describe('MyOrder component', () => {
  const voucherList = [
    {
      agregator: 'SOF',
      canBeArchived: 'false',
      cifCode: '4918233',
      expiredDate: '2023-04-11 00:00:00',
      orderNumber: 'POD80270950000-0',
      redemptionDate: '2022-08-19 10:38:01',
      transRefNum: 'MB-49182330881341963',
      voucher: {
        id_voucher: 'KFCD50B-20220411-000030',
        tgl_expired: '2023-04-11',
      },
      voucherName: 'Voucher Kfc Digital Rp. 50.000 B',
    },
  ];

  it('MyOrder: renders correctly', () => {
    const tree = renderer.create(<MyOrder />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('MyOrder: loading correctly', () => {
    const orderData = {loading: true};
    const tree = renderer.create(<MyOrder orderData={orderData}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('MyOrder: sorted & rendered correctly', () => {
    const tree = renderer.create(<MyOrder sortVoucher={true} orderData={voucherList}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('MyOrder: searched & rendered correctly', () => {
    const tree = renderer.create(<MyOrder searchVoucher={'kfc'} orderData={voucherList}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('MyOrder: searched, sorted & rendered correctly', () => {
    const tree = renderer.create(<MyOrder searchVoucher={'kfc'} sortVoucher={true} orderData={voucherList}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

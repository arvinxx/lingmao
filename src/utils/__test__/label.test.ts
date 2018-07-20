import { getFilterLabels } from '../label';

describe('getFilterLabels', () => {
  it('should return filtered Dims ', () => {
    const dims = [
      {
        _key: '5afb98a5aec4ec586cd4bd86',
        text: '少门分，用被孟',
        key: 'rJecwftRf',
        refId: 'HJ@OwGtAG',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd84',
        text: '格活最任，问',
        key: 'SJQcwMYAz',
        refId: 'HJ@OwGtAG',
      },
      {
        refId: 'ryaD76uCz',
        key: 'r1H89JcRz',
        text: '百管百',
        _key: '5afc6a4e29917c234c05ecbd',
      },
      {
        refId: 'ryaD76uCz',
        key: 'ry2koFcAz',
        text: '离格活最',
        _key: '5afd0b062f3b5f43084de099',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd85',
        text: '。体而改几些地共类',
        key: 'Byb9PfYRG',
        refId: 'HJ@OwGtAG',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8f',
        text: '约车，正各发存转论西月',
        key: 'BJhdPGt0M',
        refId: 'ryaD76uCz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd90',
        text: '我柜把',
        key: 'BkjODGtAG',
        refId: 'ryaD76uCz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8e',
        text: '门识二此里除青，由门之六料',
        key: 'HkJtwMFRM',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd87',
        text: '身门识二此里除',
        key: 'ry0twGtCM',
        refId: 'HJ@OwGtAG',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8c',
        text: '问出豆',
        key: 'rkrYvGtRz',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8d',
        text: '体而改几些地共类边，',
        key: 'HJetvGFRM',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8a',
        text: 'D候我柜',
        key: 'r1FYPftAM',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd83',
        text: '节受三自验始候，',
        key: 'r1U9wzFRG',
        refId: 'HJ@OwGtAG',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd89',
        text: '各发存转论',
        key: 'HJjFvfF0M',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8b',
        text: '节受三自验始候',
        key: 'BkwKDMKCz',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd88',
        text: '传门',
        key: 'Bk3twMKAf',
        refId: 'HkavwGKRz',
      },
    ];
    const selectDims = ['rJecwftRf', 'SJQcwMYAz', 'Byb9PfYRG'];
    expect(getFilterLabels(dims, selectDims)).toEqual([
      {
        refId: 'ryaD76uCz',
        key: 'r1H89JcRz',
        text: '百管百',
        _key: '5afc6a4e29917c234c05ecbd',
      },
      {
        refId: 'ryaD76uCz',
        key: 'ry2koFcAz',
        text: '离格活最',
        _key: '5afd0b062f3b5f43084de099',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8f',
        text: '约车，正各发存转论西月',
        key: 'BJhdPGt0M',
        refId: 'ryaD76uCz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd90',
        text: '我柜把',
        key: 'BkjODGtAG',
        refId: 'ryaD76uCz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8e',
        text: '门识二此里除青，由门之六料',
        key: 'HkJtwMFRM',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd87',
        text: '身门识二此里除',
        key: 'ry0twGtCM',
        refId: 'HJ@OwGtAG',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8c',
        text: '问出豆',
        key: 'rkrYvGtRz',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8d',
        text: '体而改几些地共类边，',
        key: 'HJetvGFRM',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8a',
        text: 'D候我柜',
        key: 'r1FYPftAM',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd83',
        text: '节受三自验始候，',
        key: 'r1U9wzFRG',
        refId: 'HJ@OwGtAG',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd89',
        text: '各发存转论',
        key: 'HJjFvfF0M',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8b',
        text: '节受三自验始候',
        key: 'BkwKDMKCz',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd88',
        text: '传门',
        key: 'Bk3twMKAf',
        refId: 'HkavwGKRz',
      },
    ]);
  });
  it('should return selected Dims ', () => {
    const dims = [
      {
        _key: '5afb98a5aec4ec586cd4bd86',
        text: '少门分，用被孟',
        key: 'rJecwftRf',
        refId: 'HJ@OwGtAG',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd84',
        text: '格活最任，问',
        key: 'SJQcwMYAz',
        refId: 'HJ@OwGtAG',
      },
      {
        refId: 'ryaD76uCz',
        key: 'r1H89JcRz',
        text: '百管百',
        _key: '5afc6a4e29917c234c05ecbd',
      },
      {
        refId: 'ryaD76uCz',
        key: 'ry2koFcAz',
        text: '离格活最',
        _key: '5afd0b062f3b5f43084de099',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd85',
        text: '。体而改几些地共类',
        key: 'Byb9PfYRG',
        refId: 'HJ@OwGtAG',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8f',
        text: '约车，正各发存转论西月',
        key: 'BJhdPGt0M',
        refId: 'ryaD76uCz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd90',
        text: '我柜把',
        key: 'BkjODGtAG',
        refId: 'ryaD76uCz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8e',
        text: '门识二此里除青，由门之六料',
        key: 'HkJtwMFRM',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd87',
        text: '身门识二此里除',
        key: 'ry0twGtCM',
        refId: 'HJ@OwGtAG',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8c',
        text: '问出豆',
        key: 'rkrYvGtRz',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8d',
        text: '体而改几些地共类边，',
        key: 'HJetvGFRM',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8a',
        text: 'D候我柜',
        key: 'r1FYPftAM',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd83',
        text: '节受三自验始候，',
        key: 'r1U9wzFRG',
        refId: 'HJ@OwGtAG',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd89',
        text: '各发存转论',
        key: 'HJjFvfF0M',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd8b',
        text: '节受三自验始候',
        key: 'BkwKDMKCz',
        refId: 'HkavwGKRz',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd88',
        text: '传门',
        key: 'Bk3twMKAf',
        refId: 'HkavwGKRz',
      },
    ];
    const selectDims = ['rJecwftRf', 'SJQcwMYAz', 'Byb9PfYRG'];
    expect(getFilterLabels(dims, selectDims, false)).toEqual([
      {
        _key: '5afb98a5aec4ec586cd4bd86',
        text: '少门分，用被孟',
        key: 'rJecwftRf',
        refId: 'HJ@OwGtAG',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd84',
        text: '格活最任，问',
        key: 'SJQcwMYAz',
        refId: 'HJ@OwGtAG',
      },
      {
        _key: '5afb98a5aec4ec586cd4bd85',
        text: '。体而改几些地共类',
        key: 'Byb9PfYRG',
        refId: 'HJ@OwGtAG',
      },
    ]);
  });
});

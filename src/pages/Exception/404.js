import React from 'react';
import { Link } from 'umi/router';
import Exception from '../../components/Exception/index';

export default () => (
  <Exception type="404" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);

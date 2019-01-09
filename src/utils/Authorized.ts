import { RenderAuthorize } from '@/components';
import { getAuthority } from '@/utils';

let Authorized = RenderAuthorize(getAuthority(undefined)); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority(undefined));
};

export {reloadAuthorized, Authorized};

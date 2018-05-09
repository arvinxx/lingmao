import { Authorized as RenderAuthorized } from '../components';
import { getAuthority } from './authority';

let Authorized = RenderAuthorized(getAuthority());
// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default Authorized;

import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';

export default () => injectGlobal`
  ${reset}
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
`;

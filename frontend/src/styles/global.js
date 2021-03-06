import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './global.css';

export default createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus{
    outline: 0;
  }


  html, body, #root{
    height: 100%;

  }

  body, select, textarea{
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button, select, textarea {
    font-size: 14px;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none
  }

  button {
    cursor: pointer;
  }

`;

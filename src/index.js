import React from 'react';
import reactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css"
import reportWebVitals from "./reportWebVitals";
import App from "./app";
// const App = () => {
//     return <Users/>
// }
//
// reactDOM.render(
//     <App/>, document.getElementById("root")
// )
reactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

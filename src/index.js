import React from 'react';
import reactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css"
import Users from "./components/users";
import reportWebVitals from "./reportWebVitals";

// const App = () => {
//     return <Users/>
// }
//
// reactDOM.render(
//     <App/>, document.getElementById("root")
// )
reactDOM.render(
  <React.StrictMode>
    <Users />
  </React.StrictMode>,
  document.getElementById('root')
);
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

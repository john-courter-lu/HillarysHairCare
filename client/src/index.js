import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppoitmentList from "./components/appoitments/AppointmentList.js";
import AppointmentDetail from "./components/appoitments/AppointmentDetail.js";
import AppointmentCreate from "./components/appoitments/AppoitmentCreate.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="appointments">
          <Route index element={<AppoitmentList/>} />
          <Route path=":id" element={<AppointmentDetail/> } />
          <Route path=":id/edit" element={"AppointmentUpdate"} />
          <Route path="create" element={<AppointmentCreate/> } />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

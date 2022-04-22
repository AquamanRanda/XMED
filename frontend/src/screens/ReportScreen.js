import React from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import base64 from 'base-64'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLungsVirus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import logo from "../logo.png";
import moment from "moment";

import ReactToPrint from "react-to-print";

// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// import ReactPDF from '@react-pdf/renderer';

// import PDFFile from '../components/PDFFile.js';

const ReportComponent = React.forwardRef((props, ref) => {
  const location = useLocation();
  let date = moment(location.state.timestamps).format(
    "MMMM Do YYYY, h:mm:ss a"
  );
  let ud = window.sessionStorage.getItem("userData");
  const userDataObject = JSON.parse(ud);
  console.log("REP LOC", Boolean(location.state.prediction))

  return (
    <>
      <div class="h-[297mm] w-[210mm] p-12 pl-32" ref={ref}>
        <div class="flex justify-center border-2 border-yellow-400">
          {/* <div>
                        <p class="pb-2 text-4xl">{location.state.name}</p>
                        <p class="text-sm text-gray-400">{userDataObject.email}</p>
                        <p class="text-sm text-gray-400">{location.state.userId}</p>
                    </div> */}
          <div class="justify-center">
            <img src={logo} width="180px" height="180px" />
          </div>
        </div>
        <div class="flex justify-between pt-16">
          <div>
            <p>{location.state.timestamps.slice(0, 10)}</p>
            <p class="pb-3 text-4xl font-bold">REPORT</p>
            <p class="text-sm font-bold">
              SCAN ID. <span class="pl-1 font-normal">{location.state.id}</span>
            </p>
            <p class="text-sm font-bold">
              SCAN DATE: <span class="pl-1 font-normal">{date}</span>
            </p>
          </div>


          <div class="pl-2 text-right">
            <p class="pb-2 text-4xl">{location.state.name}</p>
            {/* <p class="text-sm text-black-400 font-bold">
              Email ID: <span class="font-normal">{userDataObject.email}</span>{" "}
            </p> */}
            <p class="text-sm text-black-400 font-bold">
              User ID: <span class="font-normal">{location.state.userId}</span>{" "}
            </p>
          </div>
        </div>
        <div class="pt-16">
          <table class="w-full table-auto text-sm">
            <thead class="border-b-2">
              <tr class="h-10 text-left">
                <th>Sl.No</th>
                <th>Name</th>
                <th>Disease</th>
                <th>Email</th>
                <th>Accuracy</th>
                <th class="text-right">Prediction</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h-10">
                <td>1</td>
                <td>{location.state.name}</td>
                <td>PNEUMONIA</td>
                <td>{userDataObject.email}</td>
                <td>93.15%</td>
                <td class="text-right">
                  {location.state.prediction == 'true' ? (
                    <span class="text-green-600">
                      {"Positive".toUpperCase()}
                    </span>
                  ) : (
                    <span class="text-red-600">{"Negative".toUpperCase()}</span>
                  )}
                </td>

                {/* <td class="text-right">360.00</td> */}
              </tr>
            </tbody>
          </table>

        </div>
        <div class="pt-6 flex justify-center ">


          <div><img src={"data:image/jpeg;base64," + location.state.img} /></div>


          {/* <p class="pt-6 text-xl font-bold">1860.00 €</p> */}
        </div>
        {/* <div class="pt-16 text-sm">
                    <p class="font-bold">PAYMENT ADVICE</p>
                    <p>Account name: MB Road apples</p>
                    <p>Bank name: Hello World</p>
                    <p>IBAN: GB95BARC20038428989175</p>
                </div> */}
      </div>
    </>
  );
});

const ReportScreen = () => {
  const componentRef = React.useRef();
  const location = useLocation();
  let ud = window.sessionStorage.getItem("userData");
  const userDataObject = JSON.parse(ud);
  console.log(userDataObject);
  console.log("location", Boolean(location.state.prediction));

  return (
    <>
      <div>
        <Header />
        <div class="container w-full mx-auto pt-2">
          <div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl pb-3">
              <span className="block xl:inline">Diagnostic</span>
              <span className="block text-yellow-400 xl:inline"> Report</span>
            </h1>

            <div class="flex flex-wrap">
              <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                <div class="bg-white border rounded shadow p-2">
                  <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                      <div class="rounded p-3 bg-green-600">
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          size="xl"
                          inverse
                        />
                      </div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                      <h5 class="font-bold uppercase text-gray-500">
                        Infection Presence
                      </h5>
                      <h3
                        class={
                          location.state.prediction == 'true'
                            ? "font-bold text-3xl text-green-500"
                            : "font-bold text-3xl text-red-500"
                        }
                      >
                        {location.state.prediction == 'true'
                          ? "POSITIVE"
                          : "NEGATIVE"}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                <div class="bg-white border rounded shadow p-2">
                  <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                      <div class="rounded p-3 bg-pink-600">
                        <FontAwesomeIcon
                          icon={faLungsVirus}
                          size="xl"
                          inverse
                        />
                      </div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                      <h5 class="font-bold uppercase text-gray-500">
                        Diagnosed Infection
                      </h5>
                      <h3 class="font-bold text-3xl">
                        {location.state.prediction == "true"
                          ? "PNEUMONIA"
                          : "Null"}{" "}
                        <span class="text-pink-500">
                          <i class="fas fa-exchange-alt"></i>
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                <div class="bg-white border rounded shadow p-2">
                  <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                      <div class="rounded p-3 bg-red-600">
                        <FontAwesomeIcon
                          icon={faBullseye}
                          size="xl"
                          inverse
                        />
                      </div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                      <h5 class="font-bold uppercase text-gray-500">
                        Diagnosed Accuracy
                      </h5>
                      <h3 class="font-bold text-3xl">
                        93.15%{" "}
                        
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ReactToPrint
        content={() => componentRef.current}
        documentTitle={location.state.name+"-"+location.state.id+"Scan"}
        trigger={() => <div className="h-[297mm] w-[210mm] p-2 pl-32"> <button class="bg-yellow-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
          <span>Download</span>
        </button></div>}
      />
      
      <ReportComponent ref={componentRef} />
     
    </>
  );
};


export default ReportScreen;

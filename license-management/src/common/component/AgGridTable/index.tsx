// import { Container, Typography } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import styles from "./index.module.scss";
// import {
//   ClientSideRowModelModule,
//   TextFilterModule,
//   NumberFilterModule,
//   PaginationModule,
//   RowSelectionModule,
// } from "ag-grid-community";
// import { Link, View } from 'lucide-react';
// import { ModuleRegistry } from "ag-grid-community";
// import DeleteIcon from '@mui/icons-material/Delete';
// import { ColDef } from "ag-grid-community";
// import { useDispatch } from "react-redux";
// import { addFormData } from "../../../Redux/Slice/LicenseForm";
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../Redux/Store/index';

// // Register the filter modules
// ModuleRegistry.registerModules([
//   TextFilterModule,
//   NumberFilterModule,
//   PaginationModule,
//   RowSelectionModule,
// ]);

// type RowData = {
//   shelfLife: number;
//   licenseName: string;
//    modalType: string;
//   billingEmail: string;
//   totalCost: string;
//   LicenseStatus: string;
// };
// export const AgGridTable: React.FC = () => {
//   const [rowData, setRowData] = useState<RowData[]>([]);
//   const dispatch =  useDispatch();
//   const formValues = useSelector((state: RootState) => state.form);


//   useEffect(() => {
//     const fetchData = async () => {

//       try {
//         const response = await axios.get("http://localhost:3034/licenses");
//         console.log("API Response Data: ", response.data);
//         response.data.forEach((item: any) => {
//             dispatch(
//                 addFormData({
//                     licenseName: item.licenseName,
//                     licenseType: item.licenseType, 
//                     modalType: item.modalType,
//                     subscriptionType: item.subscriptionType, 
//                     subscriptionModel: item.subscriptionModel, 
//                     billingEmail: item.billingEmail,
//                     departmentOwner: item.departmentOwner, 
//                     departmentName: item.departmentName,
//                     employeeName: item.employeeName, 
//                     totalSeats: item.totalSeats, 
//                     totalCost: item.totalCost,
//                     purchaseDate: item.purchaseDate, 
//                     expirationDate: item.expirationDate, 
//                     shelfLife: item.shelfLife,
//                 })
//             );
//         });

//         const updatedRowData = response.data.map((item: any) => ({
//             ...item,
//             LicenseStatus: parseInt(item.shelfLife, 10) < 0 ? "Expired" : "Active",
//             shelfLife: parseInt(item.shelfLife, 10),
//           }));

//         setRowData(updatedRowData);



//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);
//   console.log("Data in the redux State :",formValues);

//   const CustomButtonComponent = () => {
//     return (
//       <div className={styles.btnContainer}>
//         <button className={styles.vwbtn}><View /></button>
//         <button className={styles.delbtn}><DeleteIcon/></button>
//       </div>
//     );
//   };

//   const [columnDefs, setColumnDefs] = useState<ColDef[]>([
//     {
//       headerName: "License Name",
//       field: "licenseName",
//       sortable: true,
//       filter: true,
//     },

//     {
//       headerName: "Modal Type",
//       field: "modalType",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Department Name",
//       field: "departmentName",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Total Cost",
//       field: "totalCost",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "License Status",
//       field: "LicenseStatus",
//       sortable: true,
//       filter: true,
//     },


//     {
//       headerName: "Actions",
//       field: "button",
//       cellRenderer: CustomButtonComponent,
//     },
//   ]);

//   return (
//     <Container maxWidth="xl" style={{ paddingTop: "2rem"}}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Software Details Data
//       </Typography>

//       <div
//         className="ag-theme-quartz"
//         style={{ height: "auto", width: "100%" }}
//       >
//         <AgGridReact
//           rowData={formValues}
//           columnDefs={columnDefs}
//           domLayout="autoHeight"
//           pagination={true}
//           paginationPageSize={5}
//           paginationPageSizeSelector={[5, 15, 25, 35]}
//           modules={[
//             ClientSideRowModelModule,
//             TextFilterModule,
//             NumberFilterModule,
//             PaginationModule,
//             RowSelectionModule,
//           ]}
//         />
//       </div>
//     </Container>
//   );
// };

import { Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import styles from "./index.module.scss";
import {
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  PaginationModule,
  RowSelectionModule,
} from "ag-grid-community";
import { View } from "lucide-react";
import { ModuleRegistry } from "ag-grid-community";
import DeleteIcon from "@mui/icons-material/Delete";
import { ColDef } from "ag-grid-community";
import { useDispatch } from "react-redux";
import { addFormData } from "../../../Redux/Slice/LicenseForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/index";
import { useMatch, useNavigate } from "react-router-dom";
import { LicenseForm } from "../../../components/LicenseForm";

// Register the filter modules
ModuleRegistry.registerModules([
  TextFilterModule,
  NumberFilterModule,
  PaginationModule,
  RowSelectionModule,
]);

type RowData = {
  shelfLife: number;
  licenseName: string;
  modalType: string;
  billingEmail: string;
  totalCost: string;
  LicenseStatus: string;
  departmentName: string;
};

export const AgGridTable: React.FC = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const dispatch = useDispatch();
  const formValues = useSelector((state: RootState) => state.form);

  //to handle expired page
  const expired = useMatch('/expired');
  const [expiredLicensesData, setExpiredLicensesData] = useState<RowData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3034/licenses");
        console.log("API Response Data: ", response.data);

        const updatedRowData = response.data.map((item: any) => ({
          ...item,
          LicenseStatus: parseInt(item.shelfLife, 10) < 0 ? "Expired" : "Active",
          shelfLife: parseInt(item.shelfLife, 10),
        }));

        setRowData(updatedRowData);

        //store current date in order to calculate expired licenses
        const currDate = new Date();
        // store expired data
        setExpiredLicensesData(updatedRowData.map((license: any) => {
          const expiredDate = new Date(license.expirationDate);
          const timeDiff = currDate.getTime() - expiredDate.getTime();
          if (timeDiff > 0) {
            //expiration date over
            return { ...license, LicenseStatus: "Expired" };
          }
          else{
            return { ...license, LicenseStatus: "Active" };
          }
        }).filter((license: any) => {
          if(license.LicenseStatus == "Expired"){
            return true;
          }
          return false;
        }));

        // Dispatch the form data to Redux after processing
        updatedRowData.forEach((item: any) => {
          dispatch(
            addFormData({
              licenseName: item.licenseName,
              licenseType: item.licenseType,
              modalType: item.modalType,
              subscriptionType: item.subscriptionType,
              subscriptionModel: item.subscriptionModel,
              billingEmail: item.billingEmail,
              departmentOwner: item.departmentOwner,
              departmentName: item.departmentName,
              employeeName: item.employeeName,
              totalSeats: item.totalSeats,
              totalCost: item.totalCost,
              purchaseDate: item.purchaseDate,
              expirationDate: item.expirationDate,
              shelfLife: item.shelfLife,
              LicenseStatus: item.LicenseStatus,
            })
          );
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  console.log("Data in the redux State :", formValues);

  const navigate = useNavigate();
  const handleViewClick = (rowData: any) => {
    navigate("/detailedView", { state: { rowData } });
  };

  const RenewButton = (props: any) => {
    const { data } = props;
    console.log("renew data", data);

    const openForm = () => {
      console.log("open form");
    }
    return (
      <button className={styles.renew} onClick={openForm}>Renew</button>
    );
  }

  const CustomButtonComponent = (props: any) => {
    const { data } = props;
    console.log("data", data);
    return (
      <div className={styles.btnContainer}>
        <button className={styles.vwbtn} >
          <View onClick={() => handleViewClick(data)} />
        </button>
        <button className={styles.delbtn}>
          <DeleteIcon />
        </button>
      </div>
    );
  };


  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: "License Name",
      field: "licenseName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Modal Type",
      field: "modalType",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Department Name",
      field: "departmentName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Total Cost",
      field: "totalCost",
      sortable: true,
      filter: true,
    },
    {
      headerName: "License Status",
      field: "LicenseStatus",
      sortable: true,
      filter: true,
    },
    {
      headerName: expired != null ? "Renew" : "Actions",
      field: "button",
      cellRenderer: expired == null ? CustomButtonComponent : RenewButton,
    },
  ]);

  return (
    <Container
      maxWidth="xl"
      style={{
        paddingTop: "2rem",
        overflowY: "scroll"
      }}>
      {/* <Typography variant="h4" align="center" gutterBottom>
        Software Details Data
      </Typography> */}

      <div className="ag-theme-quartz" style={{ height: "400px", width: "100%" }}>
        <AgGridReact
          rowData={expired == null ? formValues : expiredLicensesData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[5, 15, 25, 35]}
          modules={[
            ClientSideRowModelModule,
            TextFilterModule,
            NumberFilterModule,
            PaginationModule,
            RowSelectionModule,
          ]}
        />
      </div>
    </Container>
  );
};

// import { Container, Typography } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import styles from "./AgGridTable/index.module.scss";
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

// // Register the filter modules
// ModuleRegistry.registerModules([
//   TextFilterModule,
//   NumberFilterModule,
//   PaginationModule,
//   RowSelectionModule,
// ]);

// type RowData = {
//   shelf_life: string;
//   licenseName: string;
//    modalType: string;
//   billingEmail: string;
//   totalCost: string;
//   LicenseStatus: string;
// };

// export const AgGridTable: React.FC = () => {
//   const [rowData, setRowData] = useState<RowData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {

//       try {
//         const response = await axios.get("http://localhost:3034/licenses");
//         console.log("API Response Data: ", response.data);
//         const updatedRowData = response.data.map((item: RowData) => ({
//             ...item,
//             LicenseStatus: parseInt(item.shelf_life, 10) > 0 ? "Active" : "Expired"
//           }));
  
//           setRowData(updatedRowData);
  
        
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

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
//       field: "modal_type",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Department Name",
//       field: "department_name",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Total Cost",
//       field: "total_cost",
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
//     <Container maxWidth="xl" style={{ paddingTop: "2rem" }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Software Details Data
//       </Typography>

//       <div
//         className="ag-theme-quartz"
//         style={{ height: "auto", width: "100%" }}
//       >
//         <AgGridReact
//           rowData={rowData}
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

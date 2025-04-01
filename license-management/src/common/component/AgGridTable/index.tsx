import { Container, Typography } from "@mui/material";
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
import { addFormData, removeFormData } from "../../../Redux/Slice/LicenseForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/index";
import { useNavigate } from "react-router-dom";
import { LicenseForm } from "../../../components/LicenseForm";

// Register the filter modules
ModuleRegistry.registerModules([
  TextFilterModule,
  NumberFilterModule,
  PaginationModule,
  RowSelectionModule,
]);

// Row data type
type RowData = {
  id: number;
  shelfLife: number;
  licenseName: string;
  modalType: string;
  billingEmail: string;
  totalCost: string;
  LicenseStatus: string;
  departmentName: string;
};

export const AgGridTable: React.FC = () => {
  const dispatch = useDispatch();
  // To access data from redux
  const formValues = useSelector((state: RootState) => state.form);

  //to display license form by clicking on renew button with respective data
  const [showLicenseForm, setShowLicenseForm] = useState<boolean>(false);
  const [licenseData, setLicenseData] = useState({});

  //to handle expired page
  // const expired = useMatch('/expired');
  const [expiredLicensesData, setExpiredLicensesData] = useState<RowData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is already present in Redux store before fetching
        if (formValues.length === 0) {
          const response = await axios.get("http://localhost:3034/licenses");
          // to get current day's date
          const today = new Date();
          const todayDate = today.toISOString().split("T")[0];
 // Update LicenseStatus based on expirationDate comparison with current day's date
          const updatedRowData = response.data.map((item: any) => {
            const isActive =
              item.expirationDate >= todayDate ? "Active" : "Expired";
            return {
              ...item,
              LicenseStatus: isActive, 
            };
          });

          // Dispatch data to Redux if not already present
          updatedRowData.forEach((item: any) => {
            dispatch(
              addFormData({
                id: item.id,
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, formValues.length]);

  const navigate = useNavigate();
  const handleViewClick = (rowData: any) => {
    navigate("/detailedView", { state: { rowData } });
  };

  const handleDeleteClick = (data: RowData) => {
    dispatch(removeFormData(data.id));
  // API call to delete from the backend [API]
    axios
      .delete(`http://localhost:3034/licenses/${data.id}`)
      .then((response) => {
        console.log("Record deleted successfully", response.data);
      })
      .catch((error) => {
        console.error("Error deleting the row", error);
      });
  };

  const CustomButtonComponent = (props: any) => {
    const { data } = props;
    return (
      <div className={styles.btnContainer}>
        <button className={styles.vwbtn}>
          <View onClick={() => handleViewClick(data)} />
        </button>
        <button className={styles.delbtn}>
          <DeleteIcon onClick={() => handleDeleteClick(data)} />
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
      headerName: "Expiration Date",
      field: "expirationDate",
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
      headerName: "Actions",
      field: "button",
      cellRenderer: CustomButtonComponent,
    },
  ]);

  //for expired page
  const [columnDefs1, setColumnDefs1] = useState<ColDef[]>([
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
    // {
    //   headerName: "Renew",
    //   field: "button",
    //   cellRenderer: RenewButton,
    // },
  ]);


  return (
    <Container
      maxWidth="xl"
      style={{ paddingTop: "2rem", overflowY: "scroll" }}
    >
      <div
        className="ag-theme-quartz"
        style={{ height: "650px", width: "100%" }}
      >
        <AgGridReact
          rowData={formValues} 
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

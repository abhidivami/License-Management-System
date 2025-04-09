import { Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip} from "@mui/material";
import ConfirmationDialog from "../ConfirmationDialog";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import styles from './index.module.scss';
import {
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  PaginationModule,
  RowSelectionModule,
} from "ag-grid-community";
import { Eye, UserIcon, View } from "lucide-react";
import { ModuleRegistry } from "ag-grid-community";
import DeleteIcon from "@mui/icons-material/Delete";
import { ColDef } from "ag-grid-community";
import { useDispatch } from "react-redux";
import { removeFormData, setData } from "../../../Redux/Slice/LicenseForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/index";
import { data, useLocation, useNavigate } from "react-router-dom";
import { LicenseForm } from "../../../components/LicenseForm";
import { toast } from "react-toastify";
import CardComponent from "../../../components/Analytics/CardComponent";
import { userIcon, walletIcon, briefcaseIcon, buildingIcon } from "../../../components/Analytics";

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
  totalSeats: number ;
  LicenseStatus: string;
  departmentName: string;
};

//in order to display renew button in expired page
interface TableProps {
  page: string;
}

export const AgGridTable: React.FC<TableProps> = (props: TableProps) => {

  //to get details about current page
  const { page } = props;
  const [rowData, setRowData] = useState<RowData[]>([]);
  const formValues = useSelector((state: RootState) => state.form);

  //to store licenses which are matched with search field
  let filteredValues: FormData[] = [];
  const searchText = useSelector((state: RootState) => state.search.searchText);

  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLicenseId, setSelectedLicenseId] = useState<string | null>(null);


  //to display license form by clicking on renew button with respective data
  const [showLicenseForm, setShowLicenseForm] = useState<boolean>(false);
  const [licenseData, setLicenseData] = useState({});

  const notify = () => toast("Record Deleted Successfully!");
  //to handle expired page
  const [expiredLicensesData, setExpiredLicensesData] = useState<RowData[]>([]);

  //to handle expiring soon page 
  const [expiringsoonData, setExpiringsoonData] = useState<RowData[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3005/licenses");
        console.log("API Response Data: ", response.data);

        const updatedRowData = response.data.map((item: any) => ({
          ...item,
          LicenseStatus: parseInt(item.shelfLife, 10) < 0 ? "Expired" : "Active",
          totalseats: Number(item.totalSeats),
          shelfLife: parseInt(item.shelfLife, 10),
        }));

        setRowData(updatedRowData);
        dispatch(setData(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  const navigate = useNavigate();

  console.log("Data in the redux State :", formValues);
  const handleViewClick = (rowData: RootState) => {
    navigate("/detailedView", { state: { rowData } });
  };

  const handleDeleteClick = (rowData: RowData) => {
    if (rowData.id) {
      setSelectedLicenseId(rowData.id);
      setOpenDialog(true);
    } else {
      console.error("License ID not found.");
    }
  };

  const confirmDelete = ()  => {
    if (selectedLicenseId) {
      // Delete from Redux state
      dispatch(removeFormData(selectedLicenseId));
      // Delete from the server
      axios.delete(`http://localhost:3005/licenses/${selectedLicenseId}`)
        .then(() => {
          setRowData(prevData => prevData.filter(item => item.id !== selectedLicenseId));
          console.log("Data deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        })
        .finally(() => {
          setOpenDialog(false);
          setSelectedLicenseId(null);
        });
      notify();
    }
  };

  const openLicenseForm = (data: any) => {
    setShowLicenseForm(true);
    setLicenseData(data);
  }

  const RenewButton = (props: any) => {
    const { data } = props;
    console.log("renew data", data);
    return (
      <button className={styles.renew} onClick={() => openLicenseForm(data)}>Renew</button>
    );
  }

  // const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setShowLicenseForm(false);
  };

  // const currDate = new Date();
  const dataFromRedux = useSelector((state: any) => state.form);
  // AgGridTable.tsx
  useEffect(() => {
    const currDate = new Date();
    const expiredLicenses = dataFromRedux.filter((item: any) => {
      const expirationDate = new Date(item.expirationDate);
      return expirationDate < currDate;
    });
    setExpiredLicensesData(expiredLicenses);
  }, [dataFromRedux]); 



  const [selectedDaysFilter, setSelectedDaysFilter] = useState<string>("all");

  // Update the expiring soon data useEffect
  useEffect(() => {
    console.log('data from redux expiring soon', dataFromRedux);
    const currentDate = new Date();

    // Process ALL licenses
    const allLicensesWithDays = dataFromRedux.map((item: any) => {
      const expirationDate = new Date(item.expirationDate);
      const timeDiff = expirationDate.getTime() - currentDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      return {
        ...item,
        expiredInDays: daysDiff >= 0 ? `${daysDiff} days` : "Expired",
        daysRemaining: daysDiff // Add numeric value for filtering
      };
    });

    // Apply filter based on selection
    let filteredData = allLicensesWithDays;
    if (selectedDaysFilter !== "all") {
      const maxDays = parseInt(selectedDaysFilter);
      filteredData = allLicensesWithDays.filter(item =>
        item.daysRemaining >= 0 && item.daysRemaining < maxDays
      );
    }

    setExpiringsoonData(filteredData);
  }, [dataFromRedux, selectedDaysFilter]);

  
  //store licenses that are matched with search field
  const filterLicensesByLicenseName = (licensesData: any) => {
    if (searchText != "") {
      //to display only filtered data
      filteredValues = licensesData.filter((license : any) => {
        if (license.licenseName.toLowerCase().search(searchText.toLowerCase()) != -1) {
          //matched
          return true;
        }
        //not matched
        return false;
      })
    }
  }

  //to filter values based on the url path and search field
  const location = useLocation();
  if (location.pathname == '/') {
    filterLicensesByLicenseName(formValues);
  }
  else if (location.pathname == '/expired') {
    filterLicensesByLicenseName(expiredLicensesData);
  }
  else if (location.pathname == '/expiring') {
    filterLicensesByLicenseName(expiringsoonData);
  }
// To apply colour to the license Status
 const StatusColor =(params: any) => {
  const status = params.value;
  return (
    <Chip
      variant="outlined"
      color={
        status === 'Active' ? 'success' : 
        status === 'Expired' ? 'error' : 'default'
      }
      size="small"
      sx={{ fontWeight: 'bold', textAlign:'center', alignItems:'center' }}
      label={status}
    />
  );
}
  const CustomButtonComponent = (props: any) => {
    const { data } = props;
    return (
      <div className={styles.btnContainer}>
         <Tooltip title='View Details'>
        <button className={styles.vwbtn}>
          <Eye onClick={() => handleViewClick(data)}  />
        </button>
        </Tooltip>
         <Tooltip title='Delete'>
        <button className={styles.delbtn}>
          <DeleteIcon onClick={() => handleDeleteClick(data)} />
        </button>
        </Tooltip>
      </div>
    );
  };
//  for home page
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: "License Name",
      field: "licenseName",
      sortable: true,
      filter: true,
      //  flex:1,
    },
    {
      headerName: "Modal Type",
      field: "modalType",
      sortable: true,
      filter: true,
      // width:120,
      //  flex:1,
    },
    {
      headerName: "Department Name",
      field: "departmentName",
      sortable: true,
      filter: true,
      // width:100,
      // flex: 1,
    },
   
    {
      headerName: "Billing Email",
      field: "billingEmail",
      sortable: true,
      filter: true,
      // flex: 1,
    },
    {
      headerName: "Total Cost",
      field: "totalCost",
      sortable: true,
      filter: true,
      // width:100,
      // flex: 1,
    },
    {
      headerName: "Purchase Date",
      field: "purchaseDate",
      sortable: true,
      filter: true,
      // width:150,
      // flex: 1,
    },
    {
      headerName: "Expiration Date",
      field: "expirationDate",
      sortable: true,
      filter: true,
      // width:150
      // flex: 1
    },
    {
      headerName: "License Status",
      field: "LicenseStatus",
      sortable: true,
      cellRenderer: StatusColor,
      filter: true,
      // width:150
      // flex: 1,
    },
    {
      headerName: "Actions",
      field: "button",
      cellRenderer: CustomButtonComponent,
      // width:150,
      // flex: 1
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
      headerName: "Total seats",
      field: "totalSeats",
      sortable: true,
      filter: true,
      // width:120
    },
    {
      headerName: "Total Cost",
      field: "totalCost",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Expired Date",
      field: "expirationDate",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Renew",
      field: "button",
      cellRenderer: RenewButton,
    },
  ]);

  //for expiring soon page 
  const [columnDefs2, setColumnDefs2] = useState<ColDef[]>(
    [
      {
        headerName: "License Name",
        field: "licenseName",
        sortable: true,
        filter: true,
        // width:150
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
        headerName: "Department Owner",
        field: "departmentOwner",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Total seats",
        field: "totalSeats",
        sortable: true,
        filter: true,
        // width:120
        // flex: 1
      },
      {
        headerName: "Total Cost",
        field: "totalCost",
        sortable: true,
        filter: true,
        // width:120
      },
      {
        headerName: "Expiration Date",
        field: "expirationDate",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Expiring in",
        field: "expiredInDays",
        sortable: true,
        filter: true,
        // flex: 1
      }
    ]
  )


  const gridRef = useRef<AgGridReact>(null);
  useEffect(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.refreshCells();
      gridRef.current.api.redrawRows();
    }
  }, [formValues, expiredLicensesData,expiringsoonData]);
//  To filter the number of
  const paginationPageSizeSelector = useMemo<number[] | boolean>(() => {
    return [ 10, 15, 20, 25,30];
  }, []);
   

  const expiredLicenses = dataFromRedux.filter((item: any) => {
    const expirationDate = new Date(item.expirationDate);
    return expirationDate < new Date();
  }
  );

  const userLicensesExpired = expiredLicenses.filter((item:any)  =>{
    return item.subscriptionModel === 'UserBased'
  })

  const groupLicensesExpired = expiredLicenses.filter((item:any) =>{
    return item.subscriptionModel === 'Enterprise'
  })

  const totalLicenses = dataFromRedux.length;

  const totalCostTorenew = expiredLicenses.reduce((acc: number, item: any) => {
    const cost = parseFloat(item.totalCost.replace(/[^0-9.-]+/g, ""));
    return acc + cost;
  }
  , 0);
  const totalCostInMillions = (totalCostTorenew / 1000000).toFixed(1);


  return (
    <Container
      maxWidth="xl"
      style={{
        paddingTop: "2rem",
        overflowY: "scroll"
      }}>
        {page === "expiring" && (
      <div className={styles.filterContainer}>
        <label>Expiration Range: </label>
        <select 
          value={selectedDaysFilter} 
          onChange={(e) => setSelectedDaysFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All</option>
          <option value="7">&lt; 7 days</option>
          <option value="15">&lt; 15 days</option>
          <option value="30">&lt; 30 days</option>
        </select>
      </div>
    )}
    {
      page === "expired" && (
        <div className={styles.cardContainer}>
          <CardComponent
                icon={briefcaseIcon}
                title="No of Expired Licenses"
                value={`${expiredLicenses.length} Licenses`}
                progressValue={(expiredLicenses.length)/totalLicenses * 100}
                licenses={dataFromRedux}
                filterKey="expiredLicenses"
              />
          <CardComponent
                icon={walletIcon}
                title="Cost to renew expired licenses"
                value={`${totalCostInMillions}M`}
                progressValue={(expiredLicenses.length)/totalLicenses * 100}
                licenses={dataFromRedux}
                filterKey="expiredLicenses"
              />
          <CardComponent
                icon={userIcon}
                title="User based Expired Licenses"
                value={`${userLicensesExpired.length} Licenses`}
                progressValue={(userLicensesExpired.length)/expiredLicenses.length * 100}
                licenses={dataFromRedux}
                filterKey="userBasedExpiredLicenses"
              />
          <CardComponent
                icon={buildingIcon}
                title="group based Expired Licenses"
                value={`${groupLicensesExpired.length} Licenses`}
                progressValue={(groupLicensesExpired.length)/expiredLicenses.length * 100}
                licenses={dataFromRedux}
                filterKey="groupExpiredLicenses"
              />
      </div>
    )}

      <div className="ag-theme-quartz" style={{ height: "590px", width: "100%", overflow:'auto' }}>
        {!showLicenseForm ?
          <AgGridReact
            rowData={
              searchText != ""
                ?
                //to display values that are matched with search field
                filteredValues
                :
                //to display all licenses data based on the current page
                page === "expired" ? expiredLicensesData : page === 'expiring' ? expiringsoonData : searchText != "" ? filteredValues : formValues
            }
            columnDefs={page === "expired" ? columnDefs1 : page === 'expiring' ? columnDefs2 : columnDefs}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={paginationPageSizeSelector}
            modules={[
              ClientSideRowModelModule,
              TextFilterModule,
              // NumberFilterModule,
              PaginationModule,
              // RowSelectionModule,
            ]}
          />
          :
          <Dialog
            open={handleOpenDialog}
            onClose={handleCloseDialog}
            fullWidth
          >
            <DialogTitle sx={{ backgroundColor: "navyblue" }}> Renew License </DialogTitle>
            <DialogContent>
              <LicenseForm close={handleCloseDialog} existingData={licenseData} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
            </DialogActions>
          </Dialog>
        }
      </div>
      <ConfirmationDialog open={openDialog} onClose={() => setOpenDialog(false)} onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this license? This action cannot be undone."
      />
    </Container>
  );
};

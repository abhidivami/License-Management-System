import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addFormData, updateData } from "../../Redux/Slice/LicenseForm/";
import axios from "axios";
import { toast } from "react-toastify";

type LicenceformProps = {
  close: () => void;
  existingData: any;
  formRef?: React.RefObject<HTMLFormElement>;
  create: string;
};

interface Department {
  id: number;
  name: string;
  owner: string;
  description: string;
}

interface Employee {
  id: number;
  name: string;
  designation: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

export const LicenseForm: React.FC<LicenceformProps> = ({
  close,
  existingData,
  formRef,
  create,
}: LicenceformProps) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      licenseId: existingData?.id || "",
      licenseName: existingData?.licenseName || "",
      licenseType: existingData?.licenseType || "",
      modalType: existingData?.modalType || "",
      subscriptionType: existingData?.subscriptionType || "",
      subscriptionModel: existingData?.subscriptionModel || "",
      billingEmail: existingData?.billingEmail || "",
      departmentOwner: existingData?.departmentOwner || "",
      departmentName: existingData?.department || "",
      employeeName: existingData?.employeeName || "",
      totalSeats: existingData?.totalSeats || "",
      totalCost: existingData?.totalCost || "",
      purchaseDate: "",
      expirationDate: "",
      shelfLife: existingData?.shelfLife || "",
    },
  });

  const [isModalOpen] = useState(true);
  const [formDataState, setFormDataState] = useState({ shelfLife: "" });
  const [loading, setLoading] = useState(false);

  const formData = watch();

  // Function to calculate shelf life in days

  const calculateShelfLife = (expirationDate: string): number => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
  };

  // Validate the License Name

  const validateLicenseName = (licenseName: string) => {
    if (!licenseName.trim()) {
      return "License Name Should not be empty";
    }
    return true;
  };
  // Validation function for negative numbers
  const validateNegativeValues = (value: string) => {
    const number = parseFloat(value);
    if (number <= 0 || isNaN(number)) {
      return "Value cannot be Negative or Zero";
    }
    return true;
  };

  // Validate Email
  const validateEmail = (billingEmail: string) => {
    const regex = /^[a-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(billingEmail)) {
      return "Enter valid email address";
    }
  };
  //  Date validation
  const validateDateOrder = (purchaseDate: string, expirationDate: string) => {
    if (new Date(expirationDate) <= new Date(purchaseDate)) {
      return "Expiration date must be greater than purchase date";
    }
    return true;
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (existingData) {
        data.id = existingData.id;
        if (data.modalType == "Perpetual") {
          data.LicenseStatus = "Active";
          data.expirationDate = "Life Time Access";
        } else {
          data.LicenseStatus =
            data.expirationDate < new Date().toISOString()
              ? "Expired"
              : "Active";
        }

        const response = await axios.put(
          `http://localhost:3005/licenses/${existingData.id}`,
          data
        );

        dispatch(updateData(response.data));
        toast.success("License Renewed Successfully!");
      } else {
        if (data.modalType == "Perpetual") {
          data.LicenseStatus = 'Active';
          data.expirationDate = 'Life Time Access';
        }
        else{
          data.LicenseStatus = data.expirationDate < new Date().toISOString() ? 'Expired' : 'Active';
          data.shelfLife = calculateShelfLife(data.expirationDate);
        }


       
        const response = await axios.post(
          "http://localhost:3005/licenses",
          data
        );
        dispatch(addFormData(response.data));
        toast.success("License Created Successfully!");
      }
      close();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save changes.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (formData.expirationDate) {
      const shelfLifeNumber = calculateShelfLife(formData.expirationDate);
      setFormDataState((prevState) => ({
        ...prevState,
        shelfLife: shelfLifeNumber > 0 ? shelfLifeNumber.toString() : "0",
      }));
    }
  }, [formData.expirationDate]);

  // Common style for input fields
  const commonTextFieldStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    width: "100%", // Ensure all fields are full width
  };

  //to store departments data
  const [departments, setDepartments] = useState<Department[]>([]);

  //to store employees data
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [categories, setcategories] = useState<Category[]>();

  //retrieving departments data from api and users data
  useEffect(() => {
    //retrieving departments data
    axios
      .get("http://localhost:3005/departments")
      .then((response) => {
        //store departments api data
        setDepartments(response.data);
      })
      .catch((error) => {
        console.log("Error fetching departments data: ", error);
      });

    //retrieving users data
    axios
      .get("http://localhost:3005/Users")
      .then((response) => {
        //store employees data
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log("Error fetching employees data: ", error);
      });

    axios
      .get("http://localhost:3005/category")
      .then((response) => {
        //store employees data
        setcategories(response.data);
      })
      .catch((error) => {
        console.log("Error fetching employees data: ", error);
      });
  }, []);

  //store department name in order to get respective dept owner
  const handleDeptName = (event: any, fieldOnChange: any) => {
    const selectedDeptName = event.target.value;
    fieldOnChange(selectedDeptName); // Update the form field

    // Find and set the department owner
    const selectedDept = departments.find(
      (dept) => dept.name === selectedDeptName
    );
    if (selectedDept) {
      setValue("departmentOwner", selectedDept.owner); // Update departmentOwner
    }
  };

  const handleCategory = (event: any, fieldOnChange: any) => {
    const selectedCatName = event.target.value;
    fieldOnChange(selectedCatName);
  };

  //to store employees details related to respective license
  let employeesDetails: string[] = [];
  const handleEmployeeDetails = (_: any, newValue: Employee[]) => {
    //newValue contains all employees details and storing employee name only
    for (let index = 0; index < newValue.length; index++) {
      employeesDetails.push(newValue[index].name);
    }

    //store details, in order to store in api
    setValue("employeeName", employeesDetails);
  };

  return (
    isModalOpen && (
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#f4f6f9",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <Stack spacing={3}>
            {/* License Name */}
            <Controller
              name="licenseName"
              control={control}
              rules={{ validate: validateLicenseName }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="License Name"
                  type="text"
                  fullWidth
                  required
                  margin="normal"
                  error={!!errors.licenseName}
                  helperText={errors.licenseName?.message?.toString()}
                  sx={commonTextFieldStyle}
                />
              )}
            />
            {/* License Type */}
            <Controller
              name="licenseType"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  sx={commonTextFieldStyle}
                >
                  <InputLabel>License Type</InputLabel>
                  <Select
                    {...field}
                    label="License Type"
                    onChange={(e) => handleCategory(e, field.onChange)}
                    required
                    error={!!errors.licenseType}
                  >
                    {departments &&
                      Array.isArray(departments) &&
                      departments.length > 0 &&
                      (categories ?? []).map((category: Category) => (
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            />

            {/* Modal Type */}
            <Controller
              name="modalType"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  sx={commonTextFieldStyle}
                >
                  <InputLabel>Modal Type</InputLabel>
                  <Select
                    {...field}
                    label="Modal Type"
                    required
                    error={!!errors.modalType}
                  >
                    <MenuItem value="Perpetual">Perpetual</MenuItem>
                    <MenuItem value="Subscription">Subscription</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            {/* Subscription Type */}
            {formData.modalType === "Subscription" && (
              <Controller
                name="subscriptionType"
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    margin="normal"
                    sx={commonTextFieldStyle}
                  >
                    <InputLabel>Subscription Type</InputLabel>
                    <Select
                      {...field}
                      label="Subscription Type"
                      required
                      error={!!errors.subscriptionType}
                    >
                      <MenuItem value="Annual">Annual</MenuItem>
                      <MenuItem value="Half-Yearly">Half-Yearly</MenuItem>
                      <MenuItem value="Quarterly">Quarterly</MenuItem>
                      <MenuItem value="Monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            )}

            {/* Subscription Model */}
            <Controller
              name="subscriptionModel"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  sx={commonTextFieldStyle}
                >
                  <InputLabel>Subscription Model</InputLabel>
                  <Select
                    {...field}
                    label="Subscription Model"
                    required
                    error={!!errors.subscriptionModel}
                  >
                    <MenuItem value="UserBased">User-Based</MenuItem>
                    <MenuItem value="Enterprise">Enterprise</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            {/* Billing Email */}
            <Controller
              name="billingEmail"
              control={control}
              rules={{ validate: validateEmail }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Billing Email"
                  type="email"
                  fullWidth
                  required
                  margin="normal"
                  error={!!errors.billingEmail}
                  helperText={errors.billingEmail?.message?.toString()}
                  sx={commonTextFieldStyle}
                />
              )}
            />

            {/* Department Name */}
            <Controller
              name="departmentName"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  sx={commonTextFieldStyle}
                >
                  <InputLabel>Department Name</InputLabel>
                  <Select
                    {...field}
                    label="Department Name"
                    onChange={(e) => handleDeptName(e, field.onChange)}
                    required
                    error={!!errors.departmentName}
                  >
                    {departments &&
                      Array.isArray(departments) &&
                      departments.length > 0 &&
                      departments.map((department: Department) => (
                        <MenuItem key={department.id} value={department.name}>
                          {department.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            />

            {/* Department Owner */}
            <Controller
              name="departmentOwner"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Department Head"
                  fullWidth
                  required
                  margin="normal"
                  error={!!errors.departmentOwner}
                  helperText={errors.departmentOwner?.message?.toString()}
                  sx={commonTextFieldStyle}
                />
              )}
            />

            {/* Employee Name */}
            {/* <Controller
              name="employeeName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Employee Name"
                  fullWidth
                  required
                  margin="normal"
                  error={!!errors.employeeName}
                  // helperText={errors.employeeName?.message}
                  sx={commonTextFieldStyle}
                />
              )}
            /> */}
            <Controller
              name="employeeName"
              control={control}
              render={({}) => (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={employees}
                  getOptionLabel={(employee: Employee) => employee.name}
                  onChange={(e, newEmployee) =>
                    handleEmployeeDetails(e, newEmployee)
                  }
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Employees"
                      placeholder="Employee"
                    />
                  )}
                />
              )}
            />

            {/* Total Seats */}
            <Controller
              name="totalSeats"
              control={control}
              rules={{ validate: validateNegativeValues }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Total Seats"
                  type="number"
                  fullWidth
                  required
                  margin="normal"
                  error={!!errors.totalSeats}
                  helperText={errors.totalSeats?.message?.toString()}
                  sx={commonTextFieldStyle}
                />
              )}
            />

            {/* Total Cost */}
            <Controller
              name="totalCost"
              control={control}
              rules={{ validate: validateNegativeValues }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Total Cost"
                  type="number"
                  fullWidth
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  error={!!errors.totalCost}
                  helperText={errors.totalCost?.message?.toString()}
                  sx={commonTextFieldStyle}
                />
              )}
            />

            {/* Purchase Date */}
            <Controller
              name="purchaseDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Purchase Date"
                  type="date"
                  fullWidth
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.purchaseDate}
                  helperText={errors.purchaseDate?.message}
                  sx={commonTextFieldStyle}
                />
              )}
            />

            {/* Expiration Date */}
            {formData.modalType === "Subscription" && (
              <Controller
                name="expirationDate"
                control={control}
                rules={{
                  validate: (value) =>
                    validateDateOrder(formData.purchaseDate, value),
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expiration Date"
                    type="date"
                    fullWidth
                    required
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.expirationDate}
                    helperText={errors.expirationDate?.message}
                    sx={commonTextFieldStyle}
                  />
                )}
              />
            )}

            {/* Shelf Life */}
            {formData.modalType === "Subscription" && (
              <TextField
                label="Shelf Life (in days)"
                value={formDataState.shelfLife}
                disabled
                fullWidth
                margin="normal"
                sx={commonTextFieldStyle}
              />
            )}

            {/* Action Buttons */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                marginLeft: "800px",
                top: "640px",
                justifyContent: "flex-end",
                marginTop: "16px",
                position: "sticky",
                bottom: "16px",
                left: "auto",
                right: "16px",
                zIndex: 1000,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => close()}
                sx={{
                  width: "120px",
                  fontWeight: 600,
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                sx={{
                  width: "120px",
                  fontWeight: 600,
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                {loading ? "Submitting..." : create}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Container>
    )
  );
};

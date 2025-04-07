import React, { useState, useEffect} from "react";
import { useForm, Controller, set } from "react-hook-form";
import { TextField, Button, Container, Stack, FormControl, InputLabel, Select, MenuItem, InputAdornment, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, updateData } from "../../Redux/Slice/LicenseForm/";
import axios from "axios";
import { toast } from 'react-toastify';


type LicenceformProps ={
  close : () =>void;
  existingData : any; 
  formRef?: React.RefObject<HTMLFormElement>;
}

export const LicenseForm: React.FC<LicenceformProps> = ({ close,existingData,formRef }: LicenceformProps) => {
  const dispatch = useDispatch();
  const { control, handleSubmit,formState: { errors }, watch,} = useForm({
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
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(true);

  const [formDataState, setFormDataState] = useState({
    shelfLife: "",
  });
  const [loading, setLoading] = useState(false);

  const formData = watch();

  // Function to calculate shelf life in days
  const calculateShelfLife = (expirationDate: string): number => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
  }

  // Validation function for negative numbers
  const validateNegativeValues = (value: string) => {
    const number = parseFloat(value);
    if (number < 0) {
      return "Value cannot be negative";
    }
    return true;
  };

  // Custom validation for date comparison
  const validateDateOrder = (purchaseDate: string, expirationDate: string) => {
    if (new Date(expirationDate) <= new Date(purchaseDate)) {
      return "Expiration date must be later than purchase date";
    }
    return true;
  };

const onSubmit = async (data: any) => {
  setLoading(true);
  try {
    if (existingData) {
      data.id = existingData.id;
      data.LicenseStatus = data.expirationDate < new Date().toISOString() ? 'Expired' : 'Active';
      const response = await axios.put(`http://localhost:3005/licenses/${existingData.id}`,data);
      
      dispatch(updateData(response.data));
      toast.success("License renewed successfully!");
    } 
    else{
      const response = await axios.post("http://localhost:3005/licenses", data);
      dispatch(addFormData(response.data));
      toast.success("License created successfully!");
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


  return (
    isModalOpen && (
      <Container maxWidth="lg" sx={{ backgroundColor: "#f4f6f9", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <Stack spacing={3}>
          {/* License Name */}
          <Controller
            name="licenseName"
            // defaultValue={data?.licenseName || ""}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="License Name"
                fullWidth
                required
                margin="normal"
                error={!!errors.licenseName}
                helperText={errors.licenseName?.message}
                sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
              />
            )}
          />

          {/* License Type */}
          <Controller
            name="licenseType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff", borderRadius: "8px" }}>
                <InputLabel>License Type</InputLabel>
                <Select
                  {...field}
                  label="License Type"
                  required
                  error={!!errors.licenseType}
                >
                  <MenuItem value="Software">Software</MenuItem>
                  <MenuItem value="Hardware">Hardware</MenuItem>
                  <MenuItem value="Cloud Services">Cloud Services</MenuItem>
                  <MenuItem value="Database">Database</MenuItem>
                  <MenuItem value="API">API</MenuItem>
                  <MenuItem value="Virtual Machine">Virtual Machine</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          {/* Modal Type */}
          <Controller
            name="modalType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff", borderRadius: "8px" }}>
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
                <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff", borderRadius: "8px" }}>
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
              <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff", borderRadius: "8px" }}>
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
            render={({ field }) => (
              <TextField
                {...field}
                label="Billing Email"
                type="email"
                fullWidth
                required
                margin="normal"
                error={!!errors.billingEmail}
                helperText={errors.billingEmail?.message}
                sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
              />
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
                helperText={errors.departmentOwner?.message}
                sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
              />
            )}
          />

          {/* Department Name */}
          <Controller
            name="departmentName"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff", borderRadius: "8px" }}>
                <InputLabel>Department Name</InputLabel>
                <Select
                  {...field}
                  label="Department Type"
                  required
                  error={!!errors.departmentName}
                >
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          {/* Employee Name */}
          <Controller
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
                helperText={errors.employeeName?.message}
                sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
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
                helperText={errors.totalSeats?.message}
                sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
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
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                error={!!errors.totalCost}
                helperText={errors.totalCost?.message}
                sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
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
                sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
              />
            )}
          />

          {/* Expiration Date */}
          <Controller
            name="expirationDate"
            control={control}
            rules={{
              validate: (value) => validateDateOrder(formData.purchaseDate, value),
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
                sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
              />
            )}
          />

          {/* Shelf Life */}
          <TextField
            label="Shelf Life (in days)"
            value={formDataState.shelfLife}
            disabled
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
          />

          {/* Action Buttons */}
          {/* <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", marginTop: "16px" }}>
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
              {loading ? "Submitting..." : "Create"}
            </Button>
          </Stack> */}
        </Stack>
      </form>
    </Container>
    )
  );
};
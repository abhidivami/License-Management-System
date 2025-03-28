// MyForm.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  Box,Stack,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addFormData } from "../../Redux/Slice/LicenseForm/"; 

// interface MyFormProps {
//   onFormSubmit: (newData: any) => void;
// }

export const LicenseForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormDataState] = useState({
    licenseName: "",
    licenseType: "",
    modalType: "",
    subscriptionType: "",
    subscriptionModel: "",
    billingEmail: "",
    departmentOwner: "",
    departmentName: "",
    employeeName: "",
    totalSeats: "",
    totalCost: "",
    purchaseDate: "",
    expirationDate: "",
    shelfLife: "",
  });

  const [loading, setLoading] = useState(false);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormDataState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculateShelfLife = (expirationDate: string) => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); 
    return dayDiff;
  };
  // To handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Dispatch the form data to Redux
    dispatch(addFormData(formData)); 

    // Optionally, pass data to parent or API call
    // onFormSubmit(formData);

    setFormDataState({
      licenseName: "",
      licenseType: "",
      modalType: "",
      subscriptionType: "",
      subscriptionModel: "",
      billingEmail: "",
      departmentOwner: "",
      departmentName: "",
      employeeName: "",
      totalSeats: "",
      totalCost: "",
      purchaseDate: "",
      expirationDate: "",
      shelfLife: "",
    });
    setLoading(false);
  };

  return (
    <Container
    maxWidth="lg"
    style={{
      backgroundColor: "#f5f5f5",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    }}
  >
    <Typography
      variant="h4"
      gutterBottom
      align="center"
      style={{ color: "#00796b" }}
    >
      License Details Form
    </Typography>
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3} flexWrap="wrap">
          {/* License Name */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <TextField
              label="License Name"
              name="licenseName"
              value={formData.licenseName}
              onChange={handleTextFieldChange}
              fullWidth
              required
              margin="normal"
            />
          </Box>

          {/* License Type */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>License Type</InputLabel>
              <Select
                name="licenseType"
                value={formData.licenseType}
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="Software">Software</MenuItem>
                <MenuItem value="Hardware">Hardware</MenuItem>
                <MenuItem value="Cloud Services">Cloud Services</MenuItem>
                <MenuItem value="Database">Database</MenuItem>
                <MenuItem value="API">API</MenuItem>
                <MenuItem value="Virtual Machine">Virtual Machine</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Stack direction="row" spacing={3} flexWrap="wrap">
          {/* Modal Type */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Modal Type</InputLabel>
              <Select
                name="modalType"
                value={formData.modalType}
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="Perpetual">Perpetual</MenuItem>
                <MenuItem value="Subscription">Subscription</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Subscription Model */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Subscription Model</InputLabel>
              <Select
                name="subscriptionModel"
                value={formData.subscriptionModel}
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="UserBased">User-Based</MenuItem>
                <MenuItem value="Enterprise">Enterprise</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Stack direction="row" spacing={3} flexWrap="wrap">
          {/* Subscription Type */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Subscription Type</InputLabel>
              <Select
                name="subscriptionType"
                value={formData.subscriptionType}
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Quarterly">Quarterly</MenuItem>
                <MenuItem value="Half-Yearly">Half-Yearly</MenuItem>
                <MenuItem value="Annually">Annually</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Billing Email */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <TextField
              label="Billing Email"
              name="billingEmail"
              type="email"
              value={formData.billingEmail}
              onChange={handleTextFieldChange}
              fullWidth
              required
              margin="normal"
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={3} flexWrap="wrap">
          {/* Department Name */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Department Name</InputLabel>
              <Select
                name="departmentName"
                value={formData.departmentName}
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="SE">SE</MenuItem>
                <MenuItem value="QA">QA</MenuItem>
                <MenuItem value="Devops">Devops</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Department Owner */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <TextField
              label="Department Owner"
              name="departmentOwner"
              value={formData.departmentOwner}
              onChange={handleTextFieldChange}
              fullWidth
              margin="normal"
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={3} flexWrap="wrap">
          {/* Employee Name */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <TextField
              label="Employee Name"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleTextFieldChange}
              fullWidth
              margin="normal"
            />
          </Box>

          {/* Total Seats */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <TextField
              label="Total Seats"
              name="totalSeats"
              type="number"
              value={formData.totalSeats}
              onChange={handleTextFieldChange}
              fullWidth
              margin="normal"
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={3} flexWrap="wrap">
          {/* Total Cost */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <TextField
              label="Total Cost"
              name="totalCost"
              type="number"
              value={formData.totalCost}
              onChange={handleTextFieldChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Purchase Date */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <TextField
              label="Purchase Date"
              name="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={handleTextFieldChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={3} flexWrap="wrap">
          {/* Expiration Date */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <TextField
              label="Expiration Date"
              name="expirationDate"
              type="date"
              value={formData.expirationDate}
              onChange={handleTextFieldChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Shelf Life */}
          <Box width={{ xs: "100%", md: "48%" }}>
            <TextField
              label="Shelf Life (in days)"
              name="shelfLife"
              value={calculateShelfLife(formData.expirationDate)}
              disabled
              fullWidth
              margin="normal"
            />
          </Box>
        </Stack>

        {/* Submit Button */}
        <Stack
  direction="row"
  spacing={2}
  sx={{
    
    justifyContent: 'end',
    marginTop: "4px",
  }}
>
  <Button
    variant="contained"
    color="inherit"
    type="submit"
    disabled={loading}
    sx={{  width: "99px" }}
  >
    Cancel
  </Button>
  <Button
    variant="contained"
    color="secondary"
    type="submit"
    disabled={loading}
    sx={{ padding: "8px 0px", width: "99px" }}
  >
    {loading ? "Submitting..." : "Create"}
  </Button>
</Stack>
      </Stack>
    </form>
  </Container>
);
};
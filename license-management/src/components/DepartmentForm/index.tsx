import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import styles from './index.module.scss';
import { TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

//department props which contains handlers required to close and open dialog
export interface DepartmentProps {
  open: boolean;
  onClose: () => void;
}

//department form contains 3 values
interface FormValues {
  name: string;
  owner: string;
  description: string;
}

//to specify the type of data coming from api
interface Department {
  id: number;
  name: string;
  owner: string;
  description: string;
}

/**
 * 
 * @param props : handlers for closing and opening dialog 
 * @returns department form which is used to create a new department
 */
function Department(props: DepartmentProps) {
  const { onClose, open } = props;

  const [departments, setDepartments] = React.useState<Department[]>([]);

  //make get call whenever post call hit
  const [temp, setTemp] = React.useState<number>(0);

  //to handle empty values
  const [deptDetailsError, setDeptDetailsError] = React.useState<number>(0);

  //fetch data from departments api
  React.useEffect(() => {
    axios.get("http://localhost:3005/departments")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDepartments(response.data);
        }
        else {
          setDepartments([]);
        }
      })
  }, [temp]);

  //to handle department already present or not by showing error
  const [deptError, setDeptError] = React.useState<boolean>(false);

  //input text field styles
  const textStyles = {
    width: "100%",
    marginBottom: "10px",
  }

  //form values 
  const [formValues, setFormValues] = React.useState<FormValues>({
    name: "",
    owner: "",
    description: "",
  });

  //handle changes in the form using single state object
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name == "name" && deptError) {
      setDeptError(false);
    }

    if (deptDetailsError != 0) {
      setDeptDetailsError(0);
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleClose = () => {

    //make fields empty
    setFormValues({
      name: "",
      owner: "",
      description: "",
    });

    //consider there is no error
    setDeptError(false);
    setDeptDetailsError(0);
    onClose();
  };

  //on clicking on submit button, department should be added to departments api
  const handleFormSubmit = (event: React.FormEvent) => {

    event.preventDefault();

    let isPresent = false;
    for (let index = 0; index < departments.length; index++) {
      if (departments[index].name.toLowerCase().trim() == formValues.name.toLowerCase().trim()) {
        isPresent = true;
        console.log("department already present");
        setDeptError(true);
        break;
      }
    }

    if (formValues.name.trim() == "" || formValues.name.trim().search(/^[0-9]/) == 0) {
      setDeptDetailsError(1);
    }
    else if (formValues.owner.trim() == "" || formValues.owner.trim().search(/^[0-9]/) == 0) {
      setDeptDetailsError(2);
    }
    else if (formValues.description.trim() == "" || formValues.description.trim().search(/^[0-9]/) == 0) {
      setDeptDetailsError(3);
    }
    else {
      if (isPresent == false) {
        toast("Department created successfully");
        const id: number = departments.length + 1;

        axios.post("http://localhost:3005/departments", {
          id: id,
          name: formValues.name.trim(),
          owner: formValues.owner.trim(),
          description: formValues.description.trim(),
        })
          .then((response) => {
            setTemp(1);
            console.log("department created successfully: ", response);
          })
          .catch((error) => {
            console.log(error);
          })
      }

     

      //make form values as empty
      if (!isPresent) {
        handleClose();
      }
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className={styles.department}>
        <h1 className={styles.departmentCreation}>Create Department</h1>
        <form onSubmit={handleFormSubmit} className={styles.departmentForm}>
          <TextField
            id="outlined-basic"
            label="Dept Name"
            variant="outlined"
            sx={textStyles}
            name='name'
            value={formValues.name}
            onChange={handleChange}
            required
            autoFocus
          />
          {deptError && <p className={styles.departmentFormError}>Dept already present</p>}
          {deptDetailsError == 1 && <p className={styles.departmentFormError}>Enter valid name</p>}

          <TextField
            id="outlined-basic"
            label="Dept Owner"
            variant="outlined"
            sx={textStyles}
            name='owner'
            value={formValues.owner}
            onChange={handleChange}
            required
          />
          {deptDetailsError == 2 && <p className={styles.departmentFormError}>Enter valid value</p>}

          <TextField
            id="outlined-basic"
            label="Dept Description"
            variant="outlined"
            sx={textStyles}
            name='description'
            value={formValues.description}
            onChange={handleChange}
            required
          />
          {deptDetailsError == 3 && <p className={styles.departmentFormError}>Enter valid value</p>}

          <div className={styles.departmentFormButton}>
            <Button variant="text" onClick={handleClose}>Cancel</Button>
            <Button variant="text" type='submit'>Create</Button>
          </div>
        </form>
      </div>

    </Dialog>
  );
}

function DepartmentForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p onClick={handleClickOpen}>Department</p>
      <Department
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

export default DepartmentForm;

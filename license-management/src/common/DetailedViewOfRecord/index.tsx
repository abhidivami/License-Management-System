import { ChangeEvent, useState } from "react";
import style from "./index.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DetailedViewOfEachRecord = () => {
  const [infoClicked, setInfoClicked] = useState(true);
  const [renewalHistoryClicked, setRenewalHistoryClicked] = useState(false);

  const [editStates, setEditStates] = useState({
    basicInfo: false,
    departmentDetails: false,
    additionalDetails: false,
  });

  const location = useLocation();
  const [data, setData] = useState(location.state.rowData);
  const [originalData, setOriginalData] = useState(data);
  const notify = () => toast("Data updated successfully!");

  const handleInfoClicked = () => {
    setInfoClicked(true);
    setRenewalHistoryClicked(false);
  };

  const handleRenewalHistoryClicked = () => {
    setInfoClicked(false);
    setRenewalHistoryClicked(true);
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/');
  }

  const handleSaveClick = (section: string) => {
    const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);
    if (hasChanges) {
      //use put api call
      axios.put(`http://localhost:3005/licenses/${data.id}`, data)
        .then((response) => {
          console.log("Data updated successfully:", response.data);
      })
      .catch((error) => { 
        console.error("Error updating data:", error);
      });
      console.log("Saving changes...");
      notify();
    }
    setOriginalData(data);
    setEditStates((prev) => ({
      ...prev,
      [section]: false,
    }));
    
  };
  

  const toggleEditMode = (section : string) => {
    setEditStates((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const { name, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  
  return (
    <div className={style.detailedViewCard}>
      <div className={style.detailedViewCardHeader}>
        <div className={style.detailedViewCardleftHeader}>
          <ArrowBackIcon className={style.backArrowIcon} onClick={handleGoBack}/>
          <button className={`${style.detailedViewCardHeaderInfoButton} ${infoClicked ? style.selected : ""}`}onClick={handleInfoClicked}>
            Info
          </button>
          <button className={`${style.detailedViewCardHeaderInfoButton} ${renewalHistoryClicked ? style.selected : ""}`} onClick={handleRenewalHistoryClicked}>
            Renewal History
          </button>
        </div>
      </div>
      <div className={style.detailedViewCardBody}>
        {infoClicked && (
          <div className="detailed-view-card__body__info">
            {/* Basic Info Section */}
            <div className={style.detailedViewInfoBodyBasicInfo}>
              <div className={style.detailedViewBodyHeader}>
              <p>Basic Info</p>
                {/* {editStates.basicInfo ? (
                  <button className={style.saveButton} onClick={() => handleSaveClick("basicInfo")}>
                    Save
                  </button>
                ) : (
                  <EditIcon className={style.editIcon} onClick={() => toggleEditMode("basicInfo")} />
                )} */}
              </div>
              <div className={style.detailedViewBodyBasicData}>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>License Name</span>
                  <input type="text" name="licenseName" value={data.licenseName} disabled={!editStates.basicInfo}
                    onChange={(e) => handleInputChange(e, "license_name")}/>
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>License Type</span>
                  <input type="text" name="licenseType" value={data.licenseType} disabled={!editStates.basicInfo} onChange={(e) => handleInputChange(e, "license_type")}/>
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>Total Seats</span>
                  <input type="number" name="totalSeats" value={data.totalSeats} disabled={!editStates.basicInfo} onChange={(e) => handleInputChange(e, "total_seats")}/>
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Modal Type
                  </span>
                  <input
                    type="text"
                    name="modal_type"
                    value={data.modalType}
                    disabled={!editStates.basicInfo}
                    onChange={(e) => handleInputChange(e, "modal_type")}
                  />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Purchased Date
                  </span>
                  <input type="date" name="purchaseDate" value={data.purchaseDate}  disabled={!editStates.basicInfo} onChange={(e) => handleInputChange(e, "purchase_date")} />
                </div>
              </div>
            </div>

            {/* Department Details Section */}
            <div className={style.detailedViewInfoBodyBasicInfo}>
              <div className={style.detailedViewBodyHeader}>
              <p>Department Details</p>
                {editStates.departmentDetails ? (
                  <button className={style.saveButton} onClick={() => handleSaveClick("departmentDetails")}>
                    Save
                  </button>
                ) : (
                  <EditIcon
                    className={style.editIcon}
                    onClick={() => toggleEditMode("departmentDetails")}
                  />
                )}
              </div>
              <div className={style.detailedViewBodyBasicData}>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Department
                  </span>
                  <input
                    type="text"
                    name="departmentName"
                    value={data.departmentName}
                    disabled={!editStates.departmentDetails}
                    onChange={(e) => handleInputChange(e, "department_name")}
                  />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Department Owner
                  </span>
                  <input
                    type="text"
                    name="departmentOwner"
                    value={data.departmentOwner}
                    disabled={!editStates.departmentDetails}
                    onChange={(e) => handleInputChange(e, "department_owner")}
                  />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>Access to</span>
                  <input
                    type="text"
                    name="employeeName"
                    value={data.employeeName} // Display array values as comma-separated
                    disabled={!editStates.departmentDetails}
                    onChange={(e) => handleInputChange(e, "access_to")}
                  />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Billing Email
                  </span>
                  <input
                    type="email"
                    name="billingEmail"
                    value={data.billingEmail}
                    disabled={!editStates.departmentDetails}
                    onChange={(e) => handleInputChange(e, "billing_email")}
                  />
                </div>
              </div>
            </div>

            {/* Additional Details Section */}
            <div className={style.detailedViewInfoBodyBasicInfo}>
              <div className={style.detailedViewBodyHeader}>
              <p>Additional Details</p>
                {/* {editStates.additionalDetails ? (
                  <button className={style.saveButton} onClick={() => handleSaveClick("additionalDetails")}>
                    Save
                  </button>
                ) : (
                  <EditIcon
                    className={style.editIcon}
                    onClick={() => toggleEditMode("additionalDetails")}
                  />
                )} */}
              </div>
              <div className={style.detailedViewBodyBasicData}>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Total Cost
                  </span>
                  <input
                    type="number"
                    name="totalCost"
                    value={data.totalCost}
                    disabled={!editStates.additionalDetails}
                    onChange={(e) => handleInputChange(e, "total_cost")}
                  />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Subscription Type
                  </span>
                  <input
                    type="text"
                    name="subscriptionType"
                    value={data.subscriptionType ? `${data.subscriptionType}`:"NA"}
                    disabled={!editStates.additionalDetails}
                    onChange={(e) => handleInputChange(e, "subscription_type")}
                  />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Subscription Model
                  </span>
                  <input type="text" name="subscription_model" value={data.subscriptionModel} disabled={!editStates.additionalDetails} onChange={(e) => handleInputChange(e, "subscription_model")} />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Expiry Date
                  </span>
                  <input type="date" name="expiry_date" value={data.expirationDate} disabled={!editStates.additionalDetails} onChange={(e) => handleInputChange(e, "expiry_date")}/>
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Shelf Life
                  </span>
                  <input type="text" name="shelf_life" value={data.shelfLife?`${data.shelfLife}`:"NA"} disabled={!editStates.additionalDetails} onChange={(e) => handleInputChange(e, "shelf_life")}/>
                </div>
              </div>
            </div>
          </div>
        )}
        {renewalHistoryClicked && (
          <div className={style.detailedViewInfoBodyBasicInfo}>
            <div className={style.detailedViewBodyHeader}>
              <p>History</p>
            </div>
            <div className={style.detailedViewBodyBasicData}>
              <div className={style.detailedViewBodyBasicDataItem}>
                <span className={style.bodyBasicDataHeadings}>Last Renewal Date</span>
                <span>{data.purchaseDate}</span>
              </div>
              <div className={style.detailedViewBodyBasicDataItem}>
                <span className={style.bodyBasicDataHeadings}>Cost</span>
                <span> $ {data.totalCost}</span>
              </div>
            </div>
            <div className={style.detailedViewBodyBasicData}>
                {Array.isArray(data.renewal_details?.renewal_history) && data.renewal_details.renewal_history.length > 0 ? (
                  data.renewal_details.renewal_history.map((history : any, index : any) => (
                    <div key={index}>
                      <div className={style.detailedViewBodyBasicDataItem}>
                        <span className={style.bodyBasicDataHeadings}>Previous Renewaled Date</span>
                        <span>{history}</span>
                      </div>
                      <div className={style.detailedViewBodyBasicDataItem}>
                        <span className={style.bodyBasicDataHeadings}>Cost</span>
                        <span>{data.renewal_details.renewal_costs[index]}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div></div> 
                )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedViewOfEachRecord;
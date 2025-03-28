import { useState } from "react";
import style from "./index.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";

const DetailedViewOfEachRecord = () => {
  const [infoClicked, setInfoClicked] = useState(true);
  const [renewalHistoryClicked, setRenewalHistoryClicked] = useState(false);

  // State to track which section is being edited
  const [editableSection, setEditableSection] = useState(null);

  // const [data, setData] = useState({
  //   license_name: "Microsoft Office 365",
  //   license_type: "Software",
  //   manufacturer: "Microsoft",
  //   modal_type: "Subscription",
  //   total_seats: 100,
  //   purchase_date: "2023-01-15",
  //   expiry_date: "2024-01-15",
  //   shelf_life: "365 days",
  //   department_owner: "IT Department",
  //   department_name: "IT",
  //   access_to: ["name1"],
  //   billing_email: "billing@company.com",
  //   cost_per_seat: 100,
  //   total_cost: 10000,
  //   subscription_type: "Annual",
  //   subscription_model: "user based",
  //   renewal_details: {
  //     last_renewaled_date: "2023-01-15",
  //     renewal_history: ["date1", "date2", "date3"],
  //     renewal_costs: ["cost1", "cost2", "cost3"],
  //   },
  // });
  const location = useLocation();
  const data = location.state.rowData;

  const handleInfoClicked = () => {
    setInfoClicked(true);
    setRenewalHistoryClicked(false);
  };

  const handleRenewalHistoryClicked = () => {
    setInfoClicked(false);
    setRenewalHistoryClicked(true);
  };

  const handleSaveClick = () => {
    const hasChanges = JSON.stringify(data) !== JSON.stringify(data);
    if (!hasChanges) {
      console.log("No changes made. Skipping API call.");
      return;
    } else {
      //api call
    }
    toggleEditMode(null);
  };

  const toggleEditMode = (section) => {
    if (editableSection === section) {
      setEditableSection(null);
    } else {
      setEditableSection(section);
    }
  };

  const handleInputChange = (e, field) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={style.detailedViewCard}>
      <div className={style.detailedViewCardHeader}>
        <button
          className={`${style.detailedViewCardHeaderInfoButton} ${infoClicked ? style.selected : ""
            }`}
          onClick={handleInfoClicked}
        >
          Info
        </button>
        <button
          className={`${style.detailedViewCardHeaderInfoButton} ${renewalHistoryClicked ? style.selected : ""
            }`}
          onClick={handleRenewalHistoryClicked}
        >
          Renewal History
        </button>
      </div>
      <div className={style.detailedViewCardBody}>
        {infoClicked && (
          <div className="detailed-view-card__body__info">
            {/* Basic Info Section */}
            <div className={style.detailedViewInfoBodyBasicInfo}>
              <div className={style.detailedViewBodyHeader}>
                <p>Basic Info</p>
                {editableSection === "basicInfo" ? (
                  <button className={style.saveButton} onClick={handleSaveClick}>Save</button>
                ) : (
                  <EditIcon className={style.editIcon} onClick={() => toggleEditMode("basicInfo")}/>
                )}
              </div>
              <div className={style.detailedViewBodyBasicData}>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>License Name</span>
                  <input type="text" name="license_name" value={data.licenseName} disabled={editableSection !=="basicInfo"}
                    onChange={(e) => handleInputChange(e, "license_name")}/>
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>License Type</span>
                  <input type="text" name="license_type" value={data.licenseType} disabled={editableSection !== "basicInfo"} onChange={(e) => handleInputChange(e, "license_type")}/>
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>Total Seats</span>
                  <input type="number" name="total_seats" value={data.totalSeats} disabled={editableSection !== "basicInfo"} onChange={(e) => handleInputChange(e, "total_seats")}/>
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Modal Type
                  </span>
                  <input
                    type="text"
                    name="modal_type"
                    value={data.modalType}
                    disabled={editableSection !== "basicInfo"}
                    onChange={(e) => handleInputChange(e, "modal_type")}
                  />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Purchased Date
                  </span>
                  <input type="date" name="purchase_date" value={data.purchaseDate}  disabled={editableSection !== "additionalDetails"} onChange={(e) => handleInputChange(e, "purchase_date")} />
                </div>
              </div>
            </div>

            {/* Department Details Section */}
            <div className={style.detailedViewInfoBodyBasicInfo}>
              <div className={style.detailedViewBodyHeader}>
                <p>Department Details</p>
                {editableSection === "departmentDetails" ? (
                  <button
                    className={style.saveButton}
                    onClick={handleSaveClick}
                  >
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
                    name="department_name"
                    value={data.departmentName}
                    disabled={editableSection !== "departmentDetails"}
                    onChange={(e) => handleInputChange(e, "department_name")}
                  />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Department Owner
                  </span>
                  <input
                    type="text"
                    name="department_owner"
                    value={data.departmentOwner}
                    disabled={editableSection !== "departmentDetails"}
                    onChange={(e) => handleInputChange(e, "department_owner")}
                  />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>Access to</span>
                  <input
                    type="text"
                    name="access_to"
                    value={data.employeeName.join(", ")} // Display array values as comma-separated
                    disabled={editableSection !== "departmentDetails"}
                    onChange={(e) => handleInputChange(e, "access_to")}
                  />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Billing Email
                  </span>
                  <input
                    type="email"
                    name="billing_email"
                    value={data.billingEmail}
                    disabled={editableSection !== "departmentDetails"}
                    onChange={(e) => handleInputChange(e, "billing_email")}
                  />
                </div>
              </div>
            </div>

            {/* Additional Details Section */}
            <div className={style.detailedViewInfoBodyBasicInfo}>
              <div className={style.detailedViewBodyHeader}>
                <p>Additional Details</p>
                {editableSection === "additionalDetails" ? (
                  <button
                    className={style.saveButton}
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                ) : (
                  <EditIcon
                    className={style.editIcon}
                    onClick={() => toggleEditMode("additionalDetails")}
                  />
                )}
              </div>
              <div className={style.detailedViewBodyBasicData}>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Total Cost
                  </span>
                  <input
                    type="number"
                    name="total_cost"
                    value={data.totalCost}
                    disabled={editableSection !== "additionalDetails"}
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
                    value={data.subscriptionType}
                    disabled={editableSection !== "additionalDetails"}
                    onChange={(e) => handleInputChange(e, "subscription_type")}
                  />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Subscription Model
                  </span>
                  <input type="text" name="subscription_model" value={data.subscriptionModel} disabled={editableSection !== "additionalDetails"} onChange={(e) => handleInputChange(e, "subscription_model")} />
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Expiry Date
                  </span>
                  <input type="date" name="expiry_date" value={data.expirationDate} disabled={editableSection !== "additionalDetails"} onChange={(e) => handleInputChange(e, "expiry_date")}/>
                </div>
                <div className={style.detailedViewBodyBasicDataItem}>
                  <span className={style.bodyBasicDataHeadings}>
                    Shelf Life
                  </span>
                  <input type="text" name="shelf_life" value={data.shelfLife} disabled={editableSection !== "additionalDetails"} onChange={(e) => handleInputChange(e, "shelf_life")}/>
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
                <span className={style.bodyBasicDataHeadings}>Last Renewaled Date</span>
                <span>{data.renewal_details.last_renewaled_date}</span>
              </div>
              <div className={style.detailedViewBodyBasicDataItem}>
                <span className={style.bodyBasicDataHeadings}>Cost</span>
                <span>{data.total_cost}</span>
              </div>
            </div>
            <div className={style.detailedViewBodyBasicData}>
              {data.renewal_details.renewal_history.map((history, index) => (
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedViewOfEachRecord;

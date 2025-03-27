import { useState } from 'react'
import style from './index.module.scss'

const detailedViewOfEachRecord = () => {
    const [infoClicked, setInfoClicked] = useState(true);
    const [renewalHistoryClicked, setRenewalHistoryClicked] = useState(false);

    const data = {
      "license_name": "Microsoft Office 365",
      "license_type": "Software",
      "manufacturer": "Microsoft",
      "modal_type": "Subscription",
      "total_seats": 100,
      "purchase_date": "2023-01-15",
      "expiry_date": "2024-01-15",
      "shelf_life": "365 days",
      "department_owner": "IT Department",
      "department_name": "IT",
      "access_to": ["name1"],
      "billing_email": "billing@company.com",
      "cost_per_seat": 100,
      "total_cost": 10000,
      "subscription_type": "Annual",
      "subscription_model": "user based",
      "renewal_details" : {
	   last_renewaled_date : "2023-01-15",
	   renewal_history: ["date1","date2","date3"],
	   renewal_costs: ["cost1","cost2","cost3"]
	    }
    }

    const handleInfoClicked = () => {
        setInfoClicked(true);
        setRenewalHistoryClicked(false);
    }

    const handleRenewalHistoryClicked = () => {
        setInfoClicked(false);
        setRenewalHistoryClicked(true);
    }

  return (
    <>
        <div className={style.detailedViewCard}>
            <div className={style.detailedViewCardHeader}>
                <button className={style.detailedViewCardHeaderInfoButton} onClick={handleInfoClicked}>info</button>
                <button className={style.detailedViewCardHeaderHistoryButton} onClick={handleRenewalHistoryClicked}>Renewal History</button>
            </div>
            <div className="detailed-view-card__body">
                {infoClicked && <div className="detailed-view-card__body__info">
                    {
                        <div className={style.detailedViewInfoBodyBasicInfo}>
                           <div className={style.detailedViewBodyHeader}>
                                <p>Basic Info</p>
                           </div>
                           <div className={style.detailedViewBodyBasicData}>
                                <div className={style.detailedViewBodyBasicDataItem}>
                                    <span className={style.bodyBasicDataHeadings}>License Name</span>
                                    <span>{data.license_name}</span>
                                </div>
                                <div className={style.detailedViewBodyBasicDataItem}>
                                    <span className={style.bodyBasicDataHeadings}>License Type</span>
                                    <span>{data.license_type}</span>
                                </div>
                                <div className={style.detailedViewBodyBasicDataItem}>
                                    <span className={style.bodyBasicDataHeadings}>Manufacturer</span>
                                    <span>{data.manufacturer}</span>
                                </div>
                                <div className={style.detailedViewBodyBasicDataItem}>
                                    <span className={style.bodyBasicDataHeadings}>Total Seats</span>
                                    <span>{data.total_seats}</span>
                                </div>
                                <div className={style.detailedViewBodyBasicDataItem}>
                                    <span className={style.bodyBasicDataHeadings}>Billing Email</span>
                                    <span>{data.billing_email}</span>
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                }
                {renewalHistoryClicked && <div className="detailed-view-card__body__renewal-history"> 

                </div>
                }
            </div>
            
        </div>
      
    </>
  )
}

export default detailedViewOfEachRecord

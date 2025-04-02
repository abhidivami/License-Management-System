import { useEffect } from 'react';
import style from './index.module.scss';
import CardComponent from './CardComponent';
import GraphComponent from './GraphComponent';
import axios from 'axios';
import { RootState } from '../../Redux/Store/index' 
import { useDispatch, useSelector } from 'react-redux';

// Define the icons
const userIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 1c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 12c3.31 0 6 2.69 6 6H6c0-3.31 2.69-6 6-6z"
    />
  </svg>
);

const buildingIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 3v16h16V3H4zm2 6h12m-6 6h6"
    />
  </svg>
);

const briefcaseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2l1.5 3h7a2 2 0 012 2v13a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h7L12 2z"
    />
  </svg>
);

const walletIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2zm2 0v16h16V5H5zm9 10h4m-4-4h4"
    />
  </svg>
);

const Analytics = () => {
    const fetchecdData = useSelector((state: RootState) => state.form);
    const totalLicenses = fetchecdData.length;
    const totalCost = fetchecdData.reduce((acc, item) => {
        const cost = parseFloat(item.totalCost.replace(/[^0-9.-]+/g, ""));
        return acc + cost;
    }, 0);
    //convet total cost into millions
    const totalCostInMillions = (totalCost / 1000000).toFixed(1);
    const totalCostString = `$ ${totalCostInMillions}M`;
    
    const userBasedLicenses = fetchecdData.filter(item => item.subscriptionModel === 'user based' || item.subscriptionModel === 'UserBased').length;
    const groupLicenses = fetchecdData.filter(item => item.subscriptionModel === 'group' || item.subscriptionModel === 'hardware based' || item.subscriptionModel === 'Enterprise').length;
    const activeLicenses = fetchecdData.filter(item => item.LicenseStatus === 'Active').length;

  return (
    <div className={style.analyticsBody}>
      <div className={style.analyticsBodyTopContent}>
        <CardComponent
          icon={walletIcon}
          title="Total Cost Spent"
          value={totalCostString}
          progressValue={20}
        />
        <CardComponent
          icon={userIcon}
          title="User-Based Licenses"
          value={`${userBasedLicenses} Licenses`}
          progressValue={userBasedLicenses/totalLicenses * 100}
        />
        <CardComponent
          icon={buildingIcon}
          title="Organizational Licenses"
          value={`${groupLicenses} Licenses`}
          progressValue={groupLicenses/totalLicenses * 100}
        />
        <CardComponent
          icon={briefcaseIcon}
          title="Total Licenses"
          value={`${totalLicenses} Licenses`}
          progressValue={100}
        />
        <CardComponent
              icon={walletIcon}
              title="No Of Active Licenses"
              value={`${activeLicenses} Licenses`}
              progressValue={(activeLicenses/totalLicenses) * 100}
        />
        <div className={style.analyticsGraph}>
            <GraphComponent />
          </div>
      </div>
    </div>
  );
};

export default Analytics;

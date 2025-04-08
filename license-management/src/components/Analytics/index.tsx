import style from './index.module.scss';
import CardComponent from './CardComponent';
import GraphComponent from './GraphComponent';
import BarChartComponent from './BarChartComponent'
import { RootState } from '../../Redux/Store/index' 
import { useSelector } from 'react-redux';

// Defining the icons 
export const userIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 1c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 12c3.31 0 6 2.69 6 6H6c0-3.31 2.69-6 6-6z" />
  </svg>
);

export const buildingIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 3v16h16V3H4zm2 6h12m-6 6h6" />
  </svg>
);

export const briefcaseIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l1.5 3h7a2 2 0 012 2v13a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h7L12 2z" />
  </svg>
);

export const walletIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2zm2 0v16h16V5H5zm9 10h4m-4-4h4" />
  </svg>
);

const Analytics = () => {
    const fetchedData = useSelector((state: RootState) => state.form);
    
    // Calculating metrics for cards
    const totalLicenses = fetchedData.length;
    const totalCost = fetchedData.reduce((acc, item) => {
        const cost = parseFloat(item.totalCost.replace(/[^0-9.-]+/g, ""));
        return acc + cost;
    }, 0);
    const totalCostInMillions = (totalCost / 1000000).toFixed(1);
    const totalCostString = `$ ${totalCostInMillions}M`;
    
    const userBasedLicenses = fetchedData.filter(item => 
        item.subscriptionModel === 'user based' || item.subscriptionModel === 'UserBased').length;
    const groupLicenses = fetchedData.filter(item => 
        item.subscriptionModel === 'group' || item.subscriptionModel === 'hardware based' || item.subscriptionModel === 'Enterprise').length;
    const activeLicenses = fetchedData.filter(item => item.LicenseStatus === 'Active').length;

    // Preparing data for bar chart 
    const costByYear = fetchedData.reduce((acc, item) => {
        const year = new Date(item.purchaseDate).getFullYear();
        const cost = parseFloat(item.totalCost.replace(/[^0-9.-]+/g, ""));
        
        if (!acc[year]) {
            acc[year] = 0;
        }
        acc[year] += cost;
        
        return acc;
    }, {} as Record<number, number>);

    // Converting to array for the bar chart
    const barChartData = Object.entries(costByYear).map(([year, cost]) => ({
        year: parseInt(year),
        cost: cost / 1000000, 
        label: `$${(cost / 1000000).toFixed(1)}M`
    })).sort((a, b) => a.year - b.year); 

    // Calculating year-over-year growth for the last available year
    const years = Object.keys(costByYear).map(Number).sort();
    const growthRate = years.length > 1 ? 
        ((costByYear[years[years.length - 1]] - costByYear[years[years.length - 2]]) / 
         costByYear[years[years.length - 2]] * 100).toFixed(1) : 0;

         return (
          <div className={style.analyticsBody}>
            <div className={style.analyticsBodyTopContent}>
              <CardComponent
                icon={walletIcon}
                title="Total Cost Spent(in M)"
                value={totalCostString}
                progressValue={20}
                trendValue={`${growthRate}%`}
                licenses={fetchedData}
                filterKey="total"
              />
              <CardComponent
                icon={userIcon}
                title="User-Based Licenses"
                value={`${userBasedLicenses} Licenses`}
                progressValue={userBasedLicenses/totalLicenses * 100}
                licenses={fetchedData}
                filterKey="userBased"
              />
              <CardComponent
                icon={buildingIcon}
                title="Organizational Licenses"
                value={`${groupLicenses} Licenses`}
                progressValue={groupLicenses/totalLicenses * 100}
                licenses={fetchedData}
                filterKey="group"
              />
              <CardComponent
                icon={briefcaseIcon}
                title="Total Licenses"
                value={`${totalLicenses} Licenses`}
                progressValue={100}
                licenses={fetchedData}
                filterKey="total"
              />
              <CardComponent
                icon={walletIcon}
                title="Active Licenses"
                value={`${activeLicenses} Licenses`}
                progressValue={(activeLicenses/totalLicenses) * 100}
                licenses={fetchedData}
                filterKey="active"
              />
            </div>

      <div className={style.chartContainer}>
        <div className={style.analyticsGraph}>
          <h3>License Distribution</h3>
            <div className={style.scrollableChart}>
              <GraphComponent />
            </div>
        </div>
        
        <div className={style.analyticsBarChart}>
          <h3>Annual Spending Trend</h3>
          <div className={style.scrollableChart}>
            <BarChartComponent data={barChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
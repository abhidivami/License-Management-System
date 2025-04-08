import { PieChart } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';

export default function GraphComponent() {
    const data = useSelector((state: RootState) => state.form);
    const SE = data.filter((item) => item.departmentName === 'Software Engineering' || item.departmentName === 'IT').length;
    const PM = data.filter((item) => item.departmentName === 'Project Management').length;
    const DE = data.filter((item) => item.departmentName === 'Design').length;
    const Sales = data.filter((item) => item.departmentName === 'Sales').length;
    const finance = data.filter((item) => item.departmentName === 'Finance').length;
    const DevOps = data.filter((item) => item.departmentName === 'DevOps').length;
    const hr = data.filter((item)=>item.departmentName === 'HR').length;
    
    return (
        <div className="scrollableChart">
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: SE, label: 'Software Engineering' },
                            { id: 2, value: DE, label: 'Designing' },
                            { id: 6, value: Sales, label: 'Sales' },
                            { id: 4, value: finance, label: 'Finance' },
                            { id: 5, value: hr, label: 'HR'},
                            
                        ],
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 5,
                        startAngle: -45,
                        endAngle: 360,
                        cx: 150,
                        cy: 150,
                    },
                ]}
                width={500}
                height={300}
                slotProps={{}}
            />
        </div>
    );
}

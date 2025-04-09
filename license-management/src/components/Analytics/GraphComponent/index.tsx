import { PieChart } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GraphComponent() {
    const Datafromredux = useSelector((state: RootState) => state.form);
    interface ExtendedFormData extends FormData {
        departmentName: string;
    }

    const [dummydata, setdummydata] = useState<ExtendedFormData[]>([]);
    
    useEffect(() => {
        if (dummydata.length === 0) {
            axios.get('http://localhost:3005/licenses')
                .then((response) => setdummydata(response.data))
                .catch((error) => console.error('Error fetching data:', error));
        }
    }, [Datafromredux]);
    
    const data = Datafromredux.length > 0 ? Datafromredux : dummydata;

    const [departments, setDepartments] = useState<string[]>([]);
    useEffect(() => {
        // Getting departments data from departments endpoint
        axios.get('http://localhost:3005/departments')
            .then((response) => {
                const departmentNames = response.data.map((item: { name: string }) => item.name);
                setDepartments(departmentNames);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // Creating department counts array dynamically
    const departmentCounts = departments.map((department) => {
        const count = data.filter((item) => item.departmentName === department).length;
        return { 
            id: department, 
            value: count, 
            label: department 
        };
    }).filter(item => item.value > 0); // including departments with counts > 0

    return (
        <div className="scrollableChart">
            {departmentCounts.length > 0 ? (
                <PieChart
                    series={[
                        {
                            data: departmentCounts,
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
                />
            ) : (
                <p>No data available for the chart</p>
            )}
        </div>
    );
}
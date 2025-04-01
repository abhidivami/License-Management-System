// // sample

// import { useSelector } from 'react-redux';
// import { RootState } from '../Redux/Store/index';

// export const ExampleComponent = () => {
//   const formValues = useSelector((state: RootState) => state.form);
//   console.log("Data from the example component is heyyyyyyyyyyyy :",formValues)

//   return (
//     <div>Heyyyy
//       {formValues.map((item, index) => (
//         <div key={index}>
//           <p>License Name: {item.licenseName}</p>
//           <p>License Type: {item.licenseType}</p>
//           <p>Modal Type: {item.modalType}</p>
//           <p>Subscription Type: {item.subscriptionType}</p>
//           <p>Subscription Model: {item.subscriptionModel}</p>
//           <p>Billing Email: {item.billingEmail}</p>
//           <p>Department Owner: {item.departmentOwner}</p>
//           <p>Department Name: {item.departmentName}</p>
//           <p>Employee Name: {item.employeeName}</p>
//           <p>Total Seats: {item.totalSeats}</p>
//           <p>Total Cost: {item.totalCost}</p>
//           <p>Purchase Date: {item.purchaseDate}</p>
//           <p>Expiration Date: {item.expirationDate}</p>
//           <p>Shelf Life: {item.shelfLife}</p>
//         </div>
//       ))}
//     </div>
//   );
// };
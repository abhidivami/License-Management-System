# License Management System

## Overview
The **License Management System** helps organizations efficiently manage software licenses by tracking their usage, expiration, and cost. It provides functionalities to issue, track, renew, and report on software licenses, as well as a dashboard for monitoring active licenses, expiration dates, and upcoming renewals.

## Features
- **License Management**: Create, edit, delete, and update software license details.
- **License Assignment**: Assign licenses to employees or departments.
- **Expiration Tracking & Notification**: Track licenses nearing expiration and send automatic email/dashboard alerts.
- **Cost Summarization**: Visualize total license costs and renewals with interactive charts.
- **Notifications & Profile Section**: Automatic notifications for license expirations and a profile section to display user details.

## Functional Requirements

### 1. License Management
- Create, edit, delete, and update licenses.
- Manage details like software name, license type, cost, total seats, purchase date, and expiration date.
- List licenses with pagination, sorting, and filtering capabilities.

### 2. License Assignment
- Assign licenses to employees or departments.
- Manage and filter licenses based on departments.

### 3. Expiration Tracking & Notification
- Track licenses approaching expiration (30, 60, 90 days).
- Send automatic email or dashboard notifications.
- Renew licenses directly from the dashboard with prefilled information.

### 4. Cost Summarization
- Calculate and display total license costs across the organization.
- Visualize the distribution of licenses by department, user, and license type.
- Provide insights into upcoming renewals and cost structure.

### 5. Notifications & Profile
- Automatically post notifications about expiring licenses.
- View a detailed breakdown of each notification.
- User profile section for managing personal and organizational information.

## Non-Functional Requirements
- **Performance**: The system should handle thousands of licenses efficiently.
- **Usability**: The interface should be intuitive and require minimal training.

## Technical Stack

### Frontend
- **Framework**: React.js
- **State Management**: Redux
- **Routing**: React Router
- **API Handling**: Axios
- **Styling**: SCSS

### Backend
- **Data Storage**: JSON Server

## Assumptions and Constraints
- Cost summarization does not account for complex licensing models (e.g., tiered pricing).
- Billing information needs manual updates.
- Expiration alerts and renewals depend on accurate manual data entry.

## Future Enhancements
- Integration with a payment gateway for automatic renewals.
- Customizable user dashboards.
- Integration with a more robust backend.
- Bulk license import/export functionality.

## Running the Application

To run the **License Management System** locally, follow the steps below:

### Prerequisites
- Ensure you have the following installed on your system:
  - **Node.js** (v14 or higher)
  - **npm** (Node Package Manager)

### Step 1: Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/your-username/license-management-system.git
cd license-management-system
```

### Step 2: Install Dependencies
```bash
npm i
```

### Step 3: Run the Application
```bash
npm run dev
```

### Step 4: Run the JOSN server
```bash
json-server --watch db.json --port 3005
```



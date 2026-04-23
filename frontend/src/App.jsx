import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import PrivateRoutes from "./utilities/PrivateRoutes.jsx";
import RollBaseRoutes from "./utilities/RollBaseRoutes.jsx";
import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import EmployeeDashboard from "./Pages/EmployeeDashboard.jsx";
import Department from "./components/department/Department.jsx";
import AddDepartment from "./components/department/AddDepartment.jsx";
import Edit from "./components/department/Edit.jsx";
import List from "./components/employee/List.jsx";
import Add from "./components/employee/Add.jsx";
import AddSalary from "./components/salary/Add.jsx";
import View from "./components/employee/View.jsx";
import ViewSalary from "./components/salary/ViewSalary.jsx";
import Summary from "./components/EmployeeDashboard/Summary.jsx";
import LeaveList from "./components/leave/List.jsx";
import LeaveAdd from "./components/leave/Add.jsx";
import Setting from "./components/EmployeeDashboard/Setting.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route → show Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTES (Protected + Role-based) */}
        <Route
          path="/admin-dashboard/*"
          element={
            <PrivateRoutes>
              <RollBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RollBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Admin nested routes */}
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<Department />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<Edit />} />
          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
                    <Route path="add-employee" element={<Add />} />
          <Route path="employee/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />
          <Route path="employees/salary/:id" element={<ViewSalary />} />
          <Route path="salary/add" element={<AddSalary />} />
        </Route>

        {/* Employee Dashboard */}
        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RollBaseRoutes requiredRole={["admin", "employee"]}>
            <EmployeeDashboard />
            </RollBaseRoutes>
            </PrivateRoutes>} />
           <Route index element={<Summary />} />
           <Route path="employee-dashboard/profile/:id" element={<View />} />
            <Route path="employee-dashboard/leaves" element={<LeaveList />} />
            <Route path="employee-dashboard/add-leave" element={<LeaveAdd />} />
            <Route path="employee-dashboard/salary/:id" element={<ViewSalary />} />
            <Route path="employee-dashboard/setting" element={<Setting/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;

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
import Table from "./components/leave/Table.jsx";
import LeaveDetail from "./components/leave/LeaveDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTES */}
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
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<Department />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<Edit />} />
          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="employee/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />
          <Route path="employees/salary/:id" element={<ViewSalary />} />
          <Route path="salary/add" element={<AddSalary />} />

          {/* ✅ FIXED (relative paths) */}
          <Route path="leaves" element={<Table />} />
          <Route path="leaves/:id" element={<LeaveDetail />} />
          <Route path="employees/leaves/:id" element={<LeaveList />} />
          <Route path="settings" element={<Setting />} />
        </Route>

        {/* EMPLOYEE ROUTES */}
        <Route
          path="/employee-dashboard/*"
          element={
            <PrivateRoutes>
              <RollBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RollBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* ✅ FIXED (proper nesting) */}
          <Route index element={<Summary />} />
          <Route path="profile/:id" element={<View />} />
          <Route path="leaves" element={<LeaveList />} />
          <Route path="add-leave" element={<LeaveAdd />} />
          <Route path="salary/:id" element={<ViewSalary />} />
          <Route path="setting" element={<Setting />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
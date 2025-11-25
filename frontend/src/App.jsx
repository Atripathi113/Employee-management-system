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


function App() {

  return (<>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard/*" element={
          <PrivateRoutes>
            <RollBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
              </RollBaseRoutes>
              </PrivateRoutes>} />
              <Route index element={<AdminSummary />} ></Route>
                            <Route path="/admin-dashboard/departments" element={<AdminSummary />} ></Route>

                <Route path="/employee-dashboard" element={<EmployeeDashboard />} ></Route>  
                <Route path="/admin-dashboard/departments" element={<Department />} ></Route>
                <Route path="/admin-dashboard/add-department" element={<AddDepartment />} ></Route>
              <Route path="/admin-dashboard/department/:id" element={<Edit />} ></Route>

              
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App

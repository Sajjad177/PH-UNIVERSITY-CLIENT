import MainLayout from "./Components/layout/MainLayout";
import ProtectedRoute from "./Components/layout/ProtectedRoute";

const App = () => {
  return (
    <div>
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    </div>
  );
};

export default App;

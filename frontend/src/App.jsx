import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-[Inter]">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;

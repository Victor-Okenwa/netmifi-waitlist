import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import { Toaster } from "@/components/ui/sonner";
import AppLoading from "./components/AppLoading";

const App = () => {
  return (
    <Router>
      <AppLoading />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="community" element={<Community />} />
        <Route path="*" element={<NotFound />} />
        <Route path="404" element={<NotFound />} />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "shadow-lg ",
        }}
        richColor
      />
    </Router>
  );
};

export default App;

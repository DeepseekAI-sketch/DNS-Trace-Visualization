import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import PingHistory from "./components/PingHistory";
import NetworkMap from "./components/NetworkMap";
import Analytics from "./components/Analytics";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<PingHistory />} />
          <Route path="/network-map" element={<NetworkMap />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;

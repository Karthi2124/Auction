import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
// import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import OTPVerification from "./pages/OTPVerification";
import Dashboard from "./pages/Dashboard";
import MyAuctions from "./pages/MyAuctions";
import JoinAuction from "./pages/JoinAuction";
import CreateAuction from "./pages/CreateAuction";
import AuctionPanel from "./pages/AuctionPanel";
import Profile from "./pages/Profile";
import TodayAuction from "./pages/TodayAuction";
import UpcomingAuction from "./pages/UpcomingAuction";
import VideoGallery from "./pages/VideoGallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
<Routes>

  {/* Default Landing */}
  <Route path="/" element={<SignIn />} />

  {/* Authentication */}
  <Route path="/sign-in" element={<SignIn />} />
  <Route path="/sign-up" element={<SignUp />} />
  <Route path="/otp-verification" element={<OTPVerification />} />

  {/* Dashboard & Main App */}
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/my-auctions" element={<MyAuctions />} />
  <Route path="/join-auction" element={<JoinAuction />} />
  <Route path="/create-auction" element={<CreateAuction />} />
  <Route path="/auction-panel/:id" element={<AuctionPanel />} />
  <Route path="/profile" element={<Profile />} />

  {/* Secondary Menu */}
  <Route path="/today-auction" element={<TodayAuction />} />
  <Route path="/upcoming-auction" element={<UpcomingAuction />} />
  <Route path="/video-gallery" element={<VideoGallery />} />

  {/* 404 */}
  <Route path="*" element={<NotFound />} />

</Routes>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

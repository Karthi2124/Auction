import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "@/components/Header";
import { Upload } from "lucide-react";

export default function CreateAuction() {

  const navigate = useNavigate();

  const [logoPreview, setLogoPreview] = useState("");
  const [formData, setFormData] = useState({
    logo: null as File | null,
    auctionName: "",
    sportType: "cricket",
    auctionDate: "",
    auctionTime: "",
    season: "",
    pointsPerTeam: "100",
    baseBid: "",
    bidIncreaseBy: "",
    minPlayers: "11",
    maxPlayers: "15"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogoChange = (e:any) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({...formData, logo:file});

    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const data = new FormData();
      if(formData.logo){
        data.append("logo", formData.logo);
      }

      Object.entries(formData).forEach(([key,value])=>{
        if(key !== "logo"){
          data.append(key, value);
        }
      });

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/auction/create",
        data,
        {
          headers:{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
          }
        }
      );

      alert("Auction Created Successfully");
      navigate("/my-auctions");

    } catch(err:any){
      setError(err?.response?.data?.msg || "Failed to create auction");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-4">

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded">{error}</p>
        )}

        {/* LOGO */}
        <label className="block">
          <input type="file" hidden onChange={handleLogoChange}/>
          <div className="border-dashed border-2 p-6 text-center cursor-pointer">
            {logoPreview ? (
              <img src={logoPreview} className="h-24 mx-auto"/>
            ) : (
              <>
                <Upload className="mx-auto"/>
                <p>Upload Logo</p>
              </>
            )}
          </div>
        </label>

        <input
          name="auctionName"
          placeholder="Auction Name"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <select
          name="sportType"
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="cricket">Cricket</option>
          <option value="football">Football</option>
          <option value="kabaddi">Kabaddi</option>
        </select>

        <input
          type="date"
          name="auctionDate"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="time"
          name="auctionTime"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <select
          name="season"
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Season</option>
          <option value="ipl">IPL</option>
          <option value="domestic">Domestic</option>
        </select>

        <input
          name="pointsPerTeam"
          placeholder="Points"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="baseBid"
          placeholder="Base Bid"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="bidIncreaseBy"
          placeholder="Bid Increase"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="minPlayers"
          placeholder="Min Players"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="maxPlayers"
          placeholder="Max Players"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white w-full py-3 rounded"
        >
          {loading ? "Creating..." : "Create Auction"}
        </button>

      </form>
    </div>
  );
}

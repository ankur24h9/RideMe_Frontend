import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
export default function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [originCoords, setOriginCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [open, setOpen] = useState(false);
   
const getCoordinates = async (address, type) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      if (type === "origin") setOriginCoords({ lat, lng });
      if (type === "destination") setDestCoords({ lat, lng });
      return { lat, lng };
    } else {
      console.error("Geocoding error:", data.status);
      return null;
    }
  } catch (error) {
    console.error("Geocoding fetch error:", error);
    return null;
  }
};





  const handleSeePrices = () => {
    if (!location || !destination) {
      alert("⚠️ Please enter both location and destination.");
      return;
    }
    navigate("/vehicle", {
      state: { origin: location, destination: destination },
    });
  };

const handleShowRoute = async () => {
  if (!location || !destination) return;

  const originLatLng = await getCoordinates(location, "origin");
  const destLatLng = await getCoordinates(destination, "destination");

  if (!originLatLng || !destLatLng) return;

  const directionsService = new window.google.maps.DirectionsService();

  directionsService.route(
    {
      origin: originLatLng,
      destination: destLatLng,
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK") {
        setDirections(result);
      } else {
        console.error("Directions request failed:", status);
      }
    }
  );
};


  return (
    <div className="bg-gray-100 text-center  ">

      <nav className=" fixed w-330 flex items-center justify-between px-6 mb-4 border-b bg-black ">
        <h1 className="text-2xl font-bold text-white font-serif">RideXperts</h1>
        <div className="flex space-x-3">
           <button
       onClick={() => setOpen(!open)}
        className="text-white hover:bg-green-400 px-6 py-5 cursor-pointer rounded-full"

      >
        My Profile
      </button>
       {open && (
          <div className=" rounded-2xl absolute right-0 mt-20 w-30 bg-slate-200 border  shadow-lg py-2 z-10 ">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700  hover:bg-green-500"
            >
            My Account
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700  hover:bg-green-500"
            > Ride history
              
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700  hover:bg-green-500"
            >
             Wallet
            </a>

              <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-green-500"
            >
            Coupons
            </a>

              <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-green-500"
            >
            Setting
            </a>
          </div>
        )}
      
          <button
            className="hover:bg-green-400 text-white px-6 py-2 cursor-pointer rounded-full"
            onClick={() => navigate("/login")}
          >
            LogOut
          </button>
        </div>
      </nav>

      {/* Inputs */}
      <div className="  text-teal-800  flex flex-col md:flex-row items-center justify-between m-0 w-full max-w-20xl p-5 mb-2">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Request a ride for now or later
          </h1>
          <p className="text-green-600 font-medium">
            Up to 50% off your first 5 Uber rides. T&Cs apply.*
          </p>
          <p className="text-sm text-gray-500">*Valid within 15 days of signup.</p>

          <div className="space-y-4 mt-0 pt-0">
            <div className="flex items-center border rounded-md p-3">
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full outline-none" 
              />
              <span className="ml-2">🌀</span>
            </div>
            <div className="flex items-center border rounded-md p-3">
              <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full outline-none"
              />
              <span className="ml-2">🏠</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 my-6">
            <button
              className={`px-6 py-3 rounded-md ${
                !location || !destination
                  ? "bg-black text-white cursor-not-allowed font-bold"
                  : "bg-gray-900 hover:bg-green-600 text-white font-bold"
              }`}
              disabled={!location || !destination}
              onClick={() => {
                handleSeePrices();
                handleShowRoute();
              }}
            >
              See prices
            </button>

            <button
              className={`px-6 py-3 rounded-md ${
                !location || !destination
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-500 hover:bg-green-600 text-white"
              }`}
              disabled={!location || !destination}
              onClick={handleShowRoute}
            >
              Schedule for later
            </button>
          </div>
           {originCoords && (
            <p className="text-sm text-gray-600">
              📍 Origin: {originCoords.lat}, {originCoords.lng}
            </p>
          )}
          {destCoords && (
            <p className="text-sm text-gray-600">
              🎯 Destination: {destCoords.lat}, {destCoords.lng}
            </p>
          )}
        </div>

        {/* Live Map */}
        <div className="justify-end mx-10 px-45 mt-20">
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMWFRUXGB0YGBcYFxgYGxYdGBodFxofFxcYHSggGB0lHRYXIjEhJSkrLi4uFyAzODMtNygtLisBCgoKDg0OGhAQGy0mHyU1LS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLf/AABEIARMAtwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EAEIQAAIBAwIDBAcFBgUEAgMAAAECEQADIRIxBEFRBSJhcQYTMoGR0fBCUqGxwQcUI2LS4TNygqLxFlOSshUkQ4OT/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QALBEAAgIBAwIFAwUBAQAAAAAAAAECEQMSITEEQRMiUXGxYaHwYoGR0eFCFP/aAAwDAQACEQMRAD8A9xxHAvcvrChgwCrLafVMpZmbBBMjTtnuRzpnBdi9oAkm+UPeIj1Z39WADgyB/FIwNxgbDb2GtwXLYuEMc58dB9/X4HlFdHtXgL9y9Ye3e0W0Yl1gGe6w/wBUkqIO0TvWGHGkvUSR57i+zuOtuALwCHUBCrIGtjMk+1pKn2YwR5n6R9lNxFsBZZ1HdDNCv/mlWWce0UMcomvQ9vqxTue1DR56SB+JFchPXaYwTnMrO5gZO8RnMfzc7kty0aezOzhatBNRYj7RJPwnYeAgDkBWvAHlv9eJrIiXtQJMAEgrK6SC6xHPCajJzq8MU0tBMGo7jCtZM/UmvLdoeh1l3dzass7uzC+2v1qSZEQYJXZT/KK9VZMnkD+H9j+HlQ3Bz+hHXxpp0ItFGnoPoVj7VsM9m5bQkM6lQVbSc47rkEA9DG8VqR48RRWTuPeef4GgDzF/szimtW0QhSrIzD1jSwW6WAOnCwsaow5xgDLX7Jueovqh03LtyVGtiFUMAoGcSiyQDksRXoWbwjwB/Q7/ABFUcfXWiwPl3pZ6KcRxV9+F4bi0LCyha1culZ1XL906EzAB9Uo3wc13/wBnXoy3BWGF0AXndtcZ06ToChuY7s/6jU9MP2bW+LuDixfe1caAQADMYBXmraY+Fel4Th1tIttfZRQonJwIyeZpZJVGhD5odVQ1BXOBc1AaqpQAQ60NE1DQwOZ6T8JcvcJftWTFx7ZVDOmCds8q+RL+z7tobXl//uflX3CpVxm48AeQ9AOzuL4C0TxzqbWS0H1mZAHfMaJ9YojM6GqV7FWipWiyrugL7P8A8W35n/0avQx4153stSLiZnvNn/S2Cetdbi+z/WOH9bdSI7qPpUwZyIzvFVgVRolGbt625CKhglo3K455EH4Vz7nDXFaDcmGB5jUJYmYOZDAAbd0TO1dftTdD0JP+01kOUB+7j3HI/GauTKQEzQqJpinly/LzoCw2H/P10rJumMp35Db8/rpTgZH5/Xw+I6UgrNWhjy5/kanfU0+BK7CcQau4Tjlz9/jVup3nbB92KAmasovc599Fat+saPefAfWKGNgMk8vyH6/DpWu63qUgHvtz6ePkKfuIR2lf1PA2XHv5/Db41koRVxWEpW7EQ1KgFSpAlWBVUy0OdABFRGayPxKh9HONXLbPjMd05iMgcxWu8e6T0BPwE1gv8QgEldUrOADMKTvPIMx8pq4qxsZ+9JMTzC7Hc7ZjxGeU0K8UhEhpmNg32iVHLEkH4Uq41sOAFcENCgaRMMVnfbut0MTVpxFsiNJiAPsjHeMETsMjTnmAK08NejEbKqhs8QHEgECdjHNQw2J5MKlYtVswFWLVtTqFwDTqJAaCSzQJKxsdYAnOthyrYHJGHf8A82P61muWFbcT7ziW1YzgyAZrQl0jx6dR5HcVfjR43J1oJl2ksSOrEx5SY99cLgvSy0z8QgNsi0SHTXpvAJkuqsNLjJwDPd690aO3u07NsW7TX1sNfJtozjCmJk5AjYbjLCvEein7OLvD8cbnFG3dW2A9tl7wuM5YBiD7JEEwZyffW0aaspH0xnHKY/PxP1ilkRWl01d5R/mXp4jwrm9qKxtNpkxBIWdTAMCyrBkEqGGOtYTi2/gmSs0NfVRLEDz+Fcm16VcM3GfuUut7o6MgmNUAtEkgzXzTtP0O4y/xt1rBZrNu9qs3Lrv3BOtdAfvd093/AE177tL0WPE9oWePuMLZtooNtcl2XVBL4gd7YA7DNbKCXL3LVnrmtYBJjlI7wPw51FtLMBgxOwhh+lRNeCgkmQQcKYjLe47+FNLC1OkamJMtyT+X+2/WmAbabMk964fr3CsXFvqck9Y9w+vxo3vEnMHrgfmMipxKjV5gH4ipmrWwGWpRusUFc4iVKlSgCU+3tSDVqYoBD5rPeukEiDpCyAFJ1HvSJGFiF331eFaFNVc2qouimc5rjNpJtYwckyP8MnGnqxOf+0fdacWxAItnIBHtAHDH7kiCFG328VqmrFVrXoSAGwDBEiYO4kc+lSjGcHapU8gMIB3+I+VA1sjxFeK9If2kWeEu3bL2bhuWsMBETAYZ5yCMivW8HxrGAyENIHcYMsG164EFtJPd1ct1rSWFSE4pnM9KvRCz2haHrSyMp/husSJ9qQd1wMdYrR6Mdg2+BsLYtksASSzbsT+QAgAdBW//AOTVgsW3yE0yIU63KAyBsW05xOrwqcLxF1vVuEX1bBC2ykFiwfLMQYGkwDII55A0jBpUNbIex0wSQsmFlgsnosnJ8q03rrAKDvBnkcnGfKub+4Dv6rjEOWwBnS8grqbw0ZgmUmeQ1OZJPXNDGTT0qNKjUUYgRJC6oBnvESCwEZAzTLFstIWJg5IJAx3ZAIJE8pG1YuGt3AzO7gM3tKoMHcRq1GQGClTuFJB5BTZK2A/hOKvC1pfSDqPeWO8u4I04EzvielXw76ZESp3HXx86WzTVTWDm27Eaot76zHTSZ+O1DcfUZ26DoOVZ5o7R5U3kY0VdblQUy4vOlxWYmSiWh00+ynwGT9fhVRjbAnqzuR/xSmWm6jM86K+2fLHv5/XhWsoqrGCgxRUKHFXXOUC1sUsqRT6gNMVCalMdBV0xUeS7W9BeE4riLnEXw7XLhl9LFEwoUQBnYDma9L2Vwa2VgEsRHeeGPdXQuYgQuPeetEop1veK1hOUk2yYuxYvMNjHlj8thQliedOFoTFC9qKxeOT7k6GUKjNAmrpvDpJHmAPPl8Mn3V0pGgwMbVuCe+wLHwyo90agKw6en15Vq4gFrjkggewCQcDGfLXmegpAMCemPf8A2yfOKmat/QRWjx9+493OPH8KtLZ6T5Z+vKrFOdCMQfHB/Pw+dChF7jEPbI5RUtCjVyOdAwMz/aonDugCuNSas1QrMTDQU5sCPef0+vGqtj4Ch38Sa6IqkMO3jPTbz+s0pzR3mjHT8Tz+vCkTUZJdgHWzR0lJptZDRc1VXUoGDc8KuoalFioGKYlxVpa8TcPRj4qtEeMcCdKR10gj4g1p4kWv8I1oWzqx3qwadw/GuzBQEyfu7Dnz6U272gQcQByxVQ0vzIaae5huXVVWd3VEUqCxnd20jbbJGfGtXC3kkn1in1YZjuI7xtkmRyNpx7vKk8W/rFIeCpKMRH3GDjnsSBIoOw+zvUq7K3d0aVBBJA1XLuWLZM3T7o862jQMLs64juoW6rOVFw91hqVgDMkRkOuN4YYpnEW4Zsbkn4maw8DwQsuHT2hbFoSJ7qqqjnP2BiYkkxJNbxxd37/4D5VEnH0AG2Iz0/Pl8/dQF451oucZcCA6sljmBsAPDxpH73dP2p9y/KoeRLbcWoiPO+fHY/Hn76jR4/XuNCeJ+8iH/TB+Iq10t7PcPQmQfJtwfOksieyDUgHH0f8AgVLYotBB7w91GsUkrkUWT3ffn9P1/GrTAn3D9T9daPTAxBnPWBywdqRcc9a1brcAHoTUqCudu9xFg09TWenptSGi6uqqUiiHepU8alAGV3nGw6DA+AxVo3jB69RSqO1bLEKNyfh41qkRRsQqiliMtIEdBuY23xiKzOurYz4bH4bH3E1fFmTj2R3V8h89/fSKqW2yD2JNdPgz/AceY+P/ACKwXc97r+fP5++tFhf4fEDyb/aP6TVY+QJViqq1Unb699UMLi0hR4MfxA+RoK0C4IhsgiCB8+opH7qfsMG8Nj8DUStO0rJ4AcSKV6o0xmZcMpHniq1zt/xWU9Enb5E9LCtXyBB7w5Kf0O4pyhSRnT4Nt7m+dZFbNPp4ZNrkIh3JByIPL+xpDtJpnrGUd32eYIlc+HyrPxBuEhrYXSFMphiWh4kHIWRbyDiauVSekq+wVEiTmgF+X0G2wOp1kSBCMQXgjCAG3mYJY9MuRgQCpkHY5/EHI99T4TQIhUVaVKuKHBLuUXNSqWrYxvWbVOhlgVKSbk42/OpVJCs4LdruTJCfA/OtfBdot6u9chRpUKMHJuNHXoD8ap+zh/2fctz+oVot9lMbBUI/euSRqQmFXHQRJPwr2ZPA1sl29P7POis6e7vn1/o5zdsOfsp8G/qqL2u3NFPlI/U0272MyjK3R/oDf+rGs54BdvWgHaGVk/8AatdHTPt9mZauoXf4NFvtqPsfBsHzBBmul2N2oly76srp9YhHmVkx/wCJblyrhN2dc5AMOqsDSVtXFYFVYODI7pkEbGKT6fA09HPuOOfNFrVx7HoG7TS2xtupDKdJkE+R32Ig++rHattvt/EED3Yoe0+E/erYv21K3VEXLZwTHSeY3B5g15oGs8XTYske99zXL1GTHLtXY9SOPtffWnowOQQR4ZryFdvs/hFKCIyMsD3gxgR4RIz/ACtIOKnN0kIK7Y8PVSm6pHaW8w546HI+Bqd1txoPVdvevyrm2rNwbXMYw6zEiYmRyyegoB2iy/4iGMd9ZKmehNczwN8b/n5wdHix/wClX59DpPZIyQI+8Mj+3vpF7er4Xjlb2Hz0/sd6nGG6SxUQMhVHqslR3SQxICszMDzhF2zXPkwtrTwy9pLYdfPdVdjGo+ZHP3fnWW5yFVxPGQxNy0VzJaYGnU3ezOFt22YjGwA3onuowJBCxp9shPbUOBJME6SPx6GJ8N22xpepFecMA46MJ338pGDQsWQWhaCi0o0lYGpmlQAxjdtRyIAgsSY01Ig5G3KnWxCMxzPcAOQZyZB3gD8anW4v6A3Qdq6GAI2PiDsSDBG4kGDsRBoiaBL4I0vtyYbr7uY8KtwUMHPQjY+VJOL8yGpWQtFLdpNUatR9dKnkdlqOnxqU1BAmAfA+4mfiPjUrSMLQCeFtljvAGWPQfOtF25J6AYA6D50bMsaRgdep8RWe9egEKJ/U9PKrbUVuxXQasRsSPI1i4j0gtpcW095NTYCMyFm8gc1809OvSDtFLlq3ZuH1d6yt1Tatw3elXQnJGkjzyK19v9gXu0OG7PdbQtcVbGi+zd2AsENInUZGoRPtGYpyW27oGfRW9WTmzbPiBoP4U3h/Ur9i4P8A9jsPgzVnjuqOcb9TtP4VUVzf+nItrtGNJO6NjONQa3cVWHJkMEdGI5e+kek3GWLHCXuKa1bd0TUQsGW233iTvFLil37CupVlDKRBVhII6EGqj1bXKKv1PDdidsM/Atx/FrbtWvW+rT1eoFs6SdBDTBxiPZY8q9D2Rbs8SA3DcVbdiJCzD43xMiMfGkdueiNniOGThQz2rdti9tUI0oxme6dx3mxOJxFI9C/RFuBlSodmvLdN/ugNbtg+rVBJZW1sSwI2kc67sfWSa2l/JDwYpdj0h7P4tZkaxERO8iDnBHuNDd4wqT61HRjuYBH1t/4gTGK9KONBgAZPI/oQCKXxzALLodPP7W5A5Z5/hV+Mnyl+23+fYPBa4b/ff8/k82Oz1eWAjV3gwPsk+yFA3zA258oyluKu2TDd9eRPPnhvf411bvZsS/DN4lfmu43O3wrnjjVClbg0kCCsEqfIAwTtvHmYit4z1/qXp3/PYxlHT+l+vZ/n1G8L2gHwCRO6nM9fAinlVYyZViCCyxMEQRDAgbkiIiT1M+bvMNRKggTjqPxrpcF2jPdc5+9y9/zqM/RyitWP+Aw9Um9M/wCToBtAYXbggkeqJliRoQsQqyUtqQwztknqdHFNnSNkwPE8z7zSbis6G2pAaQV1BWWQcAh1IAnMgTjFThrvrJBDalOnUw0m7AOptECDjVAmA6zDSo83KnKG37nXLglOsXo7rZU7jmPFehpRFVXHGTi7RBou29J6jBB6g7Gho7B1KV5rJXxH2h+oq0sk95jpXqefkOddKWpXE0TspLn1E1dMF2MII8T7R+XkKlaqO3JRnuPFLXrWluEnKnUOY+0Pdz91Z55RH1zrly6tXmMpXe5ns8HaVi620DndgoBOSd+kkmPE09qm29UTWbd8kljOOfKqIqgaLV1+VIAalWR0oraTTUW3SGlZLdufAdfl1NbrCgjTyyZ+6epPQ1S2ZUMTCgR8Pu/W9C7zgCFHL9WPM1248agaKNDLjFDpHvPM+XQfnVcPdOVOVPLp5VY73d+0PZJ5+Hh4V5rj/Szh7d8cOtxHuzpZQ4VgZjSsjSzTiCy7jfatPYo7fE2/Vh7oYgJbZ5SNR0CSIbExyNcjtzt/gQitxFw25JXWVUHUFRiCozI9YAcbowOwnqWLi3Ekey6lSGG4OCGB25g++vldjsA3LvHcZ2u727dkmLcx6wt7GgbFT3QNO7HcQauDp2uSXFNUz3HZicJxBs+quXWF7VoaLcdwsDMGR7BPvExyx8Rb0uy76WInyJH6Vi/Zl212eUFpB6lwxKB21FWYTjVOpZLQeWo9a73avZFxXY+1JLY3MmSQOe/Ku/puouTU2cPU9OkrghHA9oFMNJX8R5eHhXZ7rfxhaS9cRDoB+1JUjOkkNI6faz1HmDWjguMa0ZX3g7Hzq8/Rqb1w2f2Zjh6lw2lwegR9QnAYEqwBmCCRnJiQJ3MGRODVUHZvE2isBTEBYLd5FSQoXlpGo+c5NartqBqB1L12K+DDlXgZ8WmTX2O9NSVxL4Aw0xJAJA6kA0/iTJ1bgiR5GlcCO+vQSSfCMzV8MZtxzTPuPyNXhdRS9zSLKqVQFStix5XHdOTmOfh59fhVNcDYcT47MPfz99CSGzsfw93SrZjswn8/cedN7gLbhjEodY6cx5r+orPjyrcFgd05OehgbfXgKrUH9sSfvDB9/I1hPAnwQ4ehhIqgKtOISYnSS+hBMs8EIWZR7A1EZO0gETuYUuFKw4OxUhgT5risJYZR5RDQGr4c/H65V0BaCQWz0Xb/AMunlSraC30Z+vJfLqfGmLj2uf4HqflXTig4rc0iqK1k94nG3n4AdKplnYY5eHmetRlMy2PrkPoUSNOIhfy8Z61qUZe0uMXh7bXXYKqjLsdI6DJ9kTFfLeNsdjevezcTiDxpukm4HPqzdZtYIMxokg+ztX0j0q7DTjuGfh3YrqghlyQQZBA5+VfOk9A2F8X/AFr+uW4pFr92uFCVIVf/ALA7gBCg6uU04MD6rY4NbaqiCAo0gcsdK816a9kHiTbQtFoBtccO3EajiFKIZUbsGGxUZr0fBuSDOIdlSW1TEyoL95yukmT4gSBJcWnw69PClwwPn/ol6ELYe6FRiLzBVuuIe3aEMwW2w1K7MPaOywdxnL6P3e1799uJuOtrgrNxwyXGCoyoxUi2YkkZh5AkDlivo2rp8ev9vCvnn7Xexbl2xbezqgXAHsqTpuNdYKrLbGC2ojb7xNUnfIHte1uzBcQXbZ1AjUD1Hn89vy80RXV/Zre4mxYXheMUK6KGEOHZAzGFugToaIj3+Ndjt7sIMDctjPMcj9fXh3dN1Gjyy4+Dh6nptXmjz8nk0YggjBFdrs7tbOSFO08m85rispBg4IrTw/As8ZC6vZn7XLYbCYEnGRXT1OHHkjc9vR9zjwznGXlPS+uZhGFB30iJ+dP7Otd+DsQQfr3Vwuye0caDv9k9egNdDsbibgE3AZUxkQSD+FeS+kljdze6/Nj0seWM6ruPucxyB/tnqalUyydRHdJJX48/H651KzZ0CEuRWi1fHM45g5+vdSn4YikkVNtAdByDkY8D+h+dUWzDD5/399Zrd3rWm23XI6fLpVJ2BLygxOTgg/aWJg5BEgk4Mj41mHD6dJRn7oCYEsqd4sdIEXDOlQCpCjIFPYzmqqrChXBcWWYoUK3AoPIzghyAPZAZSpOc7Yg1o0xk53x5GDJHiDjfFWQGnmWXSSDpfTMwHHejJ2PM7VhHCvaUiyQUEAKQSQTcuMdQgwoFzdZJ0jYTT2YHQA1DPLbbPgB9flQb4GAPw8zTLlk7yIAEleR5wsnTmeceNU3eEjAG/wAzSAiMPZHuP6eANVcaD47eA+Z/ChnkvPnzPyFE8AA7tt4Yjfqc+WKQGfiVbNxWCtphmI1EIAzFkX7xwCeYAMEqKO05dZgiMGdHLBPcJWZwRyPgRRrvM89+p+t/OvnnpVa7Ru9pJwvAr6hfVh/WAAIq7NkghUB+wBJLZmaa32A+gAT9fUVLllWGkqHB67YM4943rL2XxwuBk1pcu2jouerPd1ACSMnrscjat7L8/wC1SBzez7KWLjW1CpqOFJkvJYK0yWJJZZLALN2BkZ6tjiWXbI5r08ulZOK41VBYer1YDMzD+GAVAZlLA4DNsZ9kc8Bw3HJcwsggAkFXXz06wCyziRV/UC+1+xxfHrLOHG6HE/I/hXH4binswtwFRGCRlc+BBjBHUSYIr0qPnEgxuNxyxgz8OVcv/wCLKpeVoW0pdlLDqzMumWknvmWJliRtBnpx59tE918HNkwb64bP5EcbwAujUpzAgiTqHKcAA5HMmOu9O4W/J9WzguBmOvMeJHP6icOvqwiNk8iw9kwG0x3tLAQcjlA8OXx1o2rgdYGTAAiCIkRnGevOOVaKHi+Rv2M5S8Pzpe56a3b1qUG8yv5H8PyqVn4HiNYDLifwPOpXC406Z2J2rQ7IxuD8D5ULWwRj4fI0UxgiR9ZBq0TIIzkefwpDMDrBrTYaR40F9KoW+Y3qFswNEDyq4jkCPw+PKpb7wHdOdiB+nOi9Uy8jB8DnzHzqwB0g7Y8D+h+dHcb7JExv1nz/AA91FatyZIKkbYME8sUuSN8jl/Y8qYEWQZU5+B+HOmm6uxwRzAwTzlefOl2gDJG/IHr4HnAz8KEt94fof7++gBr2yPYyD9qZ+PSkMZOPIfp8f1p1uVEqd/jHOR9c6ilSJI0nYEbePd+XWkAIiRB2x59SOs/HasPbfB+vtXLet7ZZGQOjFGXUI3GemPCtj2SBOCOoyPf099RDMfa8OfuP0KXcD5B6Cdg8bwV+7cDIqIxtaDLHiWEMFtIMiVyWOwOQQDH2G5cJHnMeFX+6or6yEFzbUAC5HSeQ8zRX3HtKu4JzkiNwBsv96bdgfGrXoxYtOL9jtdbnGKdRtLGst9oe2T3TkyPs0/8AZP25xF7jbh4l7t7VagPcZiFIYHSp2WZJ0iJ0eFZfR30Vvpxtvin9UbVy4xCreU3Iu6oDIMyNXe6Qa71ntftq7xFvh2sJa4e3dXW629KsiNM6yx9pVmABWjA+jm+YMd3/AC4/HeqtX+8AxJUEEg58RvzkA+EUlTJ6CmYGBt5VnYCuM7GtW+HfvwR/E9Y7b6ZIljiMn3sTzrldmX0vBdUlokh7ZlgCPY1iNMHJEAHc5rq9uWmfg7gVirDvIw3BUhxHvANfHv2f+kPE8Rxdz94uvfPqmE3DqCQyllA9lSwBxidI6CuiE3WkxnBbyPp3AH1Vw2iZUiQdsxP4jn4VKLiuHS6AdajmDpUQDnTuDznapW04Y8j1SlT77GMZzgtMY2u2515jDbfl4j6zVaYI/A9asGRB9x/SiCONpHka4TsIygMSciTid/htSHMCmXR3j5mlus0mAiy0GtZGJ6Y+X6j4Vke0RWjhnnHUR+o/EUo+gDHPMc8+/n8/fVu53BOc7n3/AIzQrkEe/wCf4flUGR5Z+OD+lUAx7zTMnOYkx4j4yKG45nckcvLlVIpYQASR06Hf9PjTfU47zAEchkx9E0wFG6eu3gPlTQpbLYH3jj/motwAdwQRzOTHUchS3Ytk5I/EUANUqhkEsfDA+Zqxe1Aj2OpXA/1D+9ItkbHb8qq4TtERyosDDxfa3D2X0PetqR1YAbA7nEwRjfIqXPSHhVtNcPEILakfxNUqpbGlmGFJxg15X089EOI4xUtL6tQt172otJPrFAgpHd2OZ93TFwHoXxVrsri+BQI9y9dW6Dq0gBTbkRkk/wAL8RTpAfQuDFi4BdtlHD5DWwG1A/zDGffTbh1SqwFEt/mgx+RrzPoPw37twy8IxBuW9eshlIHfhgADqXLiJAkTXpuEywjIyDHQiP1pVToBdWBTl4N+n5UY4SN3Ufj9bUqYFrBtuCJg7Z2OOVfL17Z7ZuXrfCfuyW7CXVDOtogMiPvrLEZCnAifCvqdgop9uZwcGDNRANFxQpIVpAJidmwRymatCPG9qcH6tpHsNlfCDBB8QRVV6jtC7PdRLePZ1Lq2OfLf86lehj6yo0/k8/J0fmtfBWdyP71RBnxP60ZX7xz03P8Aah4ni0Qd86Y0kgZbS7aAxG4UGZO0CvMo9EN0MDqMR+Xy+FIu3USNbhZmJ56Y1fDUCeccqqzdLgaQ9sqwYjOl1kKwa4BhlYONIYSUzINLt8DbAhgH7oSCoVSFBWWWSGYgiTsdK4EVVLuAfE3NJZNPeGiJfTqDlVJUhGEKXAOZ8BInRa4cK3trE9c/lUdoMjEgZgTA2BI3jb3Uie99fXOpdAaktqMlxz2BP6eNRCinct7oFLcQAOe/xj5fjQUWA65fYGBiOQx/zQNgyPMe+owkA9MH9Pw/Ko+RPuPhQBDggjb6kGocEEbcvlUt8xy3npHM+FKv3ivdVZbDCVw4yzLbb2S5VTEmJjfk0rAbok90b7eHUE0zXAwQWGNWAAP5dWCRtNVffdQIX8W/zT+VIuOqxrYLMkSckLBJC7kAEExyoAID+YfifxFWCodU1d8zGO6Cok6mmJAzpmecQDWb94ZgPV6BBOuSSyaWnS4iBrCssx3Tkaq027Kh2iYJ1BSSVVu8dSgkwSWO0CMQadVyAQFm22pEUsZ1Oftajqb/ADZHu5Ub8VdzBOOi4weseFIXw/AAf+tHdQzkchkkDkJ38ZpWwD4snUZOJ+9ODn2R8qUgEHI22API+IHKa8d2v+0ng7PEnh2FwlIR3CgqrLg85PLYV7S0BIAnOOm+PHrQwFGtfC8bb9ZoZxrcAFcmCASNRGFlcwYpPqxBlhI6Z8P1rFxZS2y3yVXT9pnVBOB3i86QVABKDUdIBMAURBmnilMmN5MVdV+827vftOro2QymRnP61Kd0JqwuIS4pHqinUsZwVIZV8nAZScxjestjsy2gTVNzT7MxC96SFEAxgYM8+pnapAxvPPkKEDdeYyP1+vClYwixBzkbe49B+NLK5ii3HiPy/wCfzqHIB6Y+Xy+FICnOAJmKXwabkj3deQ/E1Lx0+fT5/Km2ADv577YnpS7gATRerMx76YWyRABnpOffNRWJ7pJ8J69DTAFSB49en96C/dW0CzHuwOkkEgDcwMkZJAB50i/fIB9WA7ELBJBSbjFbexBYMVIkbSDnMBw3BMzFrpOp9QKTqlWYsqOSPs6iFMBgHYYqq9QItw3WA0BrMHWraSjq+UbUGJLQskFftCAMmt10GFkliojU0FuhMxg9Y3+NTVqxzkke/JEfX40yztJwB/u8P08jRYGDi3cALbU6mUsjd2CVMsg1YB0rgmctMQrEAvAqA3riry2oiJGorpaSYBU5aIxIAMItb2JOSYnECT7sYpAAOd1BxsNX57daVgFw7ZE+zgATAEY2zyqxcg7AR79vOagboB+J/tRXWOoxjyxvnlSAt1aSMxPkPlVMuBJAPx5zynrQXGk+4flH5g1VAHy/t/0m4a1xd3gm7N4a4WuQ19o1k3c6oNskkavvZgbV9PR4AMbAHJP6RXje1fQJbl67fe3cN8trW6LwCLn+HNvTkoAoIzMb5r2gaNo+En4mTVMAivegeIHvwPxivKftA7EtcTZtHib7cPw9t9VxwJwVIXB8YyQd69Y9w4zy32JyRk7muF6ZcGb3BcRbXLNbMeB3BMcgRJ8AaS5A5X7PbXBW1vWuBv3L1oMGJuCIciGCjSuIVDtuTUrB+zLsJ+CuuPX2L6ukubOpxbKmFGuADqlunsc5xKbW4Hvrzd1jzAJ84E/Glu+TpYkqYzAjSwU6iBncEQOXjWi5EEiCdj8wKB7IaCTgeJkGdRj3ifOkAkcQZBGnvYUZ7xOoR/KJUjnRWWYbd4Rk5kSAYMDJzgjwON6vRJOW0kAESSYE8+neOKN1dbbaZLD2cyRt7M/y/HFAGa6lwidPMD7WZAO0fdM+YitaWyAcHb9R+lc93vmyxXXr1JpLIQcuNYKme7G589ooV7Q4gSxttpa4CoNtu4ncWJAwcsx1fzDEUaQOn6skbGR4bj+31tTtGnJGphy5e/qfCuRa7VvkoVQ6Ss4t3Bqn1cAE+xGpxqODp84dw/aN4sk2iAT3m0OuiQp2bfJK/jsDToB9vg1WSqQQSRgd0EBYTHdEDMbzTGtkiYM8/Hx+vCs9q5eN6CGC6jEp3NPI6zz8Of4VlftK4jZ1k6ypVkJQA3FtqbekA3MNsCZgzBiihHXS1PeM+XNiOn6+VC5LbiOkDA8P71zk7R4h2A9VEwJKPgEqNXgMsdBII05PRP75xBIMOC2kkG2xVB3NUrpGr7eQ05IIxNFDOmQT3SDHOBM+A/U9POrKuNp923w5eVc49o8QP/w8gfZfu6tz4xzXBMYjFAON4rUG0EjPcFthMpbC948w7MeUANO1FAdUBjuB7x8qjrJ9k9MfDmDXJTtS+gVXUmNKs5tv7TPbWe7hhDtgRlaZx3G8QDZNu2TqWHGhioLXbSAkDvLCtcbSSMAztgoDpPa2Gfhjcncef4Uy1YIGru6vsgmPfkV58du8SCoaxlhqChLksQEJQfdy5BY4EZp3/wApxZZZsCWEgabgGdcBnOE06FkGJ9YI2yUB2OH4d5OMFTzBk7jnvP50I4ZvAebD9K5XAdq8S923PDMiMNUsjgqJfTqMQrAKkqY/xPDONu0ONU3f4ZYAsFAtMp9u9pKb6sLazkd4dclAekax3d5IOwkzMc6ltRI7hPmfjiPA4rmcP2lxBW/Nk6rcer7lwB5LCJIBYgAEkCMjfesfFdt8Wiv/APWLsoldNu6dUNe7sA4kWkIOY9cMHElAdezwxSfYYFRptqDbbDMZJLMW9tj/AM1dY+wePvcRduHSFVZCsFYDu3HtkZA1khAxIbGAeVShqxHiE9J+K/7vI/Yt9P8ALVp6TcVn+Ly+5b/pqVKBl3PSfisD1uIB9i3/AE0216UcXH+L/st/0+NSpTQg19KOLJH8X/Zb8f5fAVG9KuLM/wAX/Zb6gfd6GrqUwBHpRxWP4vOPYt8/9NEnpTxYSfW5jfRb/pqVKACt+lHFne7P+hP6az2vSji9Tj1uNY3RDyHValSgA/8Aqni4/wAX/Zb/AKah9KeLk/xeZ+xb5bfZq6lICf8AVPF/93/Zb8f5aJPSji8/xeX3Lf8ATUqUwFj0q4uP8X/Zb5RH2aI+lHF5/i/7Lf8ATV1KQBP6U8Xj+Ly+5b8P5aUfSji/+7/st/01KlDAr/qfiv8AuD/wt/00f/VHFwP4vP7lvpP3aupQgCT0o4rJ9bz+5b/ppbelPFwf4vL7lv8ApqVKYDf+pOJPdNwEQDBt2/H+WpUqU0I//9k=" alt="" srcset=""  className="w-100 h-100 mb-6" />
        </div>
      </div>
      <h1 className="text-4xl text-teal-800 p-4 w-full text-start  font-bold">What Says Our Users</h1>
     <div className="bg-slate-700">
<div class="flex gap-6 justify-center p-6 bg-gray-100 cursor-pointer">
  

  <div class="bg-teal-300 rounded-xl shadow-md hover:shadow-xl transition p-5 max-w-xs">
    <div class="flex items-center gap-3 mb-3">
      <img src="https://randomuser.me/api/portraits/men/32.jpg" 
           alt="Ankit Sharma" 
           class="w-12 h-12 rounded-full border-2 border-white shadow-md" />
      <div>
        <h3 class="font-semibold text-gray-800">Ankit Sharma</h3>
       
      </div>
    </div>
    <p class="text-gray-800">
      "This platform is super easy to use! I was able to get started within minutes and the support team was very responsive."
    </p>
  </div>

  
  <div class="bg-teal-300 rounded-xl shadow-md hover:shadow-xl transition p-5 max-w-xs">
    <div class="flex items-center gap-3 mb-3">
      <img src="https://randomuser.me/api/portraits/women/45.jpg" 
           alt="Priya Verma" 
           class="w-12 h-12 rounded-full border-2 border-white shadow-md" />
      <div>
        <h3 class="font-semibold text-gray-800">Priya Verma</h3>
       
      </div>
    </div>
    <p class="text-gray-800">
      "I love the clean design and smooth performance. It has really improved my daily workflow."
    </p>
  </div>

  
  <div class="bg-teal-300 rounded-xl shadow-md hover:shadow-xl transition p-5 max-w-xs">
    <div class="flex items-center gap-3 mb-3">
      <img src="https://randomuser.me/api/portraits/men/55.jpg" 
           alt="Rahul Mehta" 
           class="w-12 h-12 rounded-full border-2 border-white shadow-md" />
      <div>
        <h3 class="font-semibold text-gray-800">Rahul Mehta</h3>
        
      </div>
    </div>
    <p class="text-gray-800">
      "At first I wasn’t sure, but after using it for a week I can say it’s worth it. Very reliable and user-friendly."
    </p>
  </div>

   <div class="bg-teal-300 rounded-xl shadow-md hover:shadow-xl transition p-5 max-w-xs">
    <div class="flex items-center gap-3 mb-3">
      <img src="https://randomuser.me/api/portraits/men/32.jpg" 
           alt="Ankit Sharma" 
           class="w-12 h-12 rounded-full border-2 border-white shadow-md" />
      <div>
        <h3 class="font-semibold text-gray-800">Ankit Sharma</h3>
    
      </div>
    </div>
    <p class="text-gray-800">
      "This platform is super easy to use! I was able to get started within minutes and the support team was very responsive."
    </p>
  </div>


</div>

<div class="flex gap-6 justify-center p-6 bg-gray-100">
  

  <div class="bg-teal-300 rounded-xl shadow-md hover:shadow-xl transition p-5 max-w-xs">
    <div class="flex items-center gap-3 mb-3">
      <img src="https://randomuser.me/api/portraits/men/32.jpg" 
           alt="Ankit Sharma" 
           class="w-12 h-12 rounded-full border-2 border-white shadow-md" />
      <div>
        <h3 class="font-semibold text-gray-800">Ankit Sharma</h3>
      
      </div>
    </div>
    <p class="text-gray-800">
      "This platform is super easy to use! I was able to get started within minutes and the support team was very responsive."
    </p>
  </div>

  
  <div class="bg-teal-300 rounded-xl shadow-md hover:shadow-xl transition p-5 max-w-xs">
    <div class="flex items-center gap-3 mb-3">
      <img src="https://randomuser.me/api/portraits/women/45.jpg" 
           alt="Priya Verma" 
           class="w-12 h-12 rounded-full border-2 border-white shadow-md" />
      <div>
        <h3 class="font-semibold text-gray-800">Priya Verma</h3>
       
      </div>
    </div>
    <p class="text-gray-800">
      "I love the clean design and smooth performance. It has really improved my daily workflow."
    </p>
  </div>

  
  <div class="bg-teal-300 rounded-xl shadow-md hover:shadow-xl transition p-5 max-w-xs">
    <div class="flex items-center gap-3 mb-3">
      <img src="https://randomuser.me/api/portraits/men/55.jpg" 
           alt="Rahul Mehta" 
           class="w-12 h-12 rounded-full border-2 border-white shadow-md" />
      <div>
        <h3 class="font-semibold text-gray-800">Rahul Mehta</h3>
       
      </div>
    </div>
    <p class="text-gray-800">
      "At first I wasn’t sure, but after using it for a week I can say it’s worth it. Very reliable and user-friendly."
    </p>
  </div>

   <div class="bg-teal-400 rounded-xl shadow-md hover:shadow-xl transition p-5 max-w-xs">
    <div class="flex items-center gap-3 mb-3">
      <img src="https://randomuser.me/api/portraits/men/32.jpg" 
           alt="Ankit Sharma" 
           class="w-12 h-12 rounded-full border-2 border-white shadow-md" />
      <div>
        <h3 class="font-semibold text-gray-800">Ankit Sharma</h3>
      
      </div>
    </div>
    <p class="text-gray-800">
      "This platform is super easy to use! I was able to get started within minutes and the support team was very responsive."
    </p>
  </div>
</div>

</div>
      

<footer class="bg-black text-white py-10">
  <div class="max-w-7xl mx-auto px-6">
    
    <div class="mb-8">
      <h2 class="text-2xl font-bold">RideXperts</h2>
      <a href="#" class="text-gray-400 hover:text-white text-sm">Visit Help Center</a>
    </div>

   
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
  
      <div>
        <h3 class="font-semibold mb-3">Company</h3>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="#" class="hover:text-white">About us</a></li>
          <li><a href="#" class="hover:text-white">Our offerings</a></li>
          <li><a href="#" class="hover:text-white">Newsroom</a></li>
          <li><a href="#" class="hover:text-white">Investors</a></li>
          <li><a href="#" class="hover:text-white">Blog</a></li>
          <li><a href="#" class="hover:text-white">Careers</a></li>
        </ul>
      </div>

      
      <div>
        <h3 class="font-semibold mb-3">Products</h3>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="#" class="hover:text-white">Ride</a></li>
          <li><a href="#" class="hover:text-white">Drive</a></li>
          <li><a href="#" class="hover:text-white">Eat</a></li>
          <li><a href="#" class="hover:text-white">Uber for Business</a></li>
          <li><a href="#" class="hover:text-white">Uber Freight</a></li>
          <li><a href="#" class="hover:text-white">Gift cards</a></li>
          <li><a href="#" class="hover:text-white">Uber Health</a></li>
        </ul>
      </div>

      
      <div>
        <h3 class="font-semibold mb-3">Global citizenship</h3>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="#" class="hover:text-white">Safety</a></li>
          <li><a href="#" class="hover:text-white">Sustainability</a></li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold mb-3">Travel</h3>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="#" class="hover:text-white">Reserve</a></li>
          <li><a href="#" class="hover:text-white">Airports</a></li>
          <li><a href="#" class="hover:text-white">Cities</a></li>
        </ul>
      </div>
    </div>

    <div class="flex flex-col md:flex-row md:items-center md:justify-between border-t border-gray-800 pt-6">
    
      <div class="flex space-x-6 mb-4 md:mb-0">
        <a href="#" class="hover:text-gray-400"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="hover:text-gray-400"><i class="fab fa-x-twitter"></i></a>
        <a href="#" class="hover:text-gray-400"><i class="fab fa-youtube"></i></a>
        <a href="#" class="hover:text-gray-400"><i class="fab fa-linkedin-in"></i></a>
        <a href="#" class="hover:text-gray-400"><i class="fab fa-instagram"></i></a>
      </div>

     
      <div class="flex space-x-6 text-gray-400 text-sm">
        <a href="#" class="flex items-center gap-2 hover:text-white">
          <i class="fas fa-globe"></i> English
        </a>
        <a href="#" class="flex items-center gap-2 hover:text-white">
          <i class="fas fa-map-marker-alt"></i> Indore
        </a>
      </div>
    </div>

  </div>
</footer>


    
    </div>
    
  );
}




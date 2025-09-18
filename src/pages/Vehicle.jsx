import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import getTripDistance from "../utils/getTripDistance"; 

export default function Vehicle() {
  const navigate = useNavigate();
  const locationState = useLocation();
  const { origin, destination } = locationState.state || {}; 

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [tripDistance, setTripDistance] = useState(null);

  const vehicles = [
    { id: 1, name: "🛵Bike", capacity: 1, baseFare: 50, perKm: 2 },
    { id: 2, name: "🛺Auto", capacity: 4, baseFare: 80, perKm: 8 },
    { id: 3, name: "🚔Car", capacity: 4, baseFare: 120, perKm: 10 },
    { id: 4, name: "🚖 Premium Car", capacity: 6, baseFare: 200, perKm:12 },
  ];

  const handleSeePrice = async (vehicle) => {
    if (!origin || !destination) {
      alert("⚠️ Missing trip details.");
      return;
    }
console.log("Origin:", origin, "Destination:", destination);

    const distance =  await getTripDistance(origin, destination);

    if (distance) {
      setTripDistance(distance);
      setSelectedVehicle(vehicle);
    } else {
      alert("⚠️ Unable to fetch distance. Please try again.");
    }
  };

  const calculatePrice = (vehicle) => {
    if (!tripDistance) return 0;
    return vehicle.baseFare + vehicle.perKm * tripDistance.distance;
  };

  const handlePayment = async () => {
  const res = await fetch("http://localhost:5000/api/payments/create-payment-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: 234, 
      name: "Ankur Kumar",
      email: "ankur@example.com",
      contact: "9876543210",
    }),
  });

  const data = await res.json();
  window.location.href = data.url; 
};


  return (
    <div className="m-20 w-120 px-0 mx-4 text-center h-30 mt-0">

      <h1 className="text-2xl font-bold mb-6 text-dark-500">
        Please Choose Your Ride
      </h1>

      <div className="grid md:grid-rows-4 gap-4 ">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition text-center"
          >
            <h2 className="p-6 text-xl font-semibold">{vehicle.name}</h2>
            <p className="text-gray-600 mb-2">
              Capacity: {vehicle.capacity} people <br />
              
            </p>

          

            <button
              className="mx-0 mt-4 bg-gray-800 text-white hover:bg-green-600 px-4 py-2 rounded-md font-semibold"
             onClick={() => handleSeePrice(vehicle)}
            
            >
             See Fare
            </button>

             <button
              className="mx-3 mt-4 bg-gray-800 text-white hover:bg-green-600 
              px-4 py-2 rounded-md font-semibold" onClick={()=>handlePayment()}
            
            
            >
        Confirm Riding
            </button>

            {selectedVehicle?.id === vehicle.id && tripDistance && (
              <div className="mt-3 p-3 bg-amber-200 rounded">
                <p>
                  Estimated Price:{" "}
                  <span className="font-bold">₹{calculatePrice(vehicle)}</span>
                </p>
                
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

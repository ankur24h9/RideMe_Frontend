import { useState } from "react";
import { createRide } from "../api/rideApi";

export default function RideForm() {
  const [pickup, setPickup] = useState("");
  const [pickupLat, setPickupLat] = useState("");
  const [pickupLng, setPickupLng] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationLat, setDestinationLat] = useState("");
  const [destinationLng, setDestinationLng] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rideData = {
      user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11", 
      pickup,
      pickup_lat: parseFloat(pickupLat),
      pickup_lng: parseFloat(pickupLng),
      destination,
      destination_lat: parseFloat(destinationLat),
      destination_lng: parseFloat(destinationLng),
      price: parseFloat(price),
    };

    const response = await createRide(rideData);
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2 bg-gray-100 rounded shadow">
      <input value={pickup} onChange={e => setPickup(e.target.value)} placeholder="Pickup" className="input" />
      <input value={pickupLat} onChange={e => setPickupLat(e.target.value)} placeholder="Pickup Latitude" className="input" />
      <input value={pickupLng} onChange={e => setPickupLng(e.target.value)} placeholder="Pickup Longitude" className="input" />
      <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destination" className="input" />
      <input value={destinationLat} onChange={e => setDestinationLat(e.target.value)} placeholder="Destination Latitude" className="input" />
      <input value={destinationLng} onChange={e => setDestinationLng(e.target.value)} placeholder="Destination Longitude" className="input" />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" className="input" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>handleSubmit(e)}>Create Ride</button>
    </form>
  );
}

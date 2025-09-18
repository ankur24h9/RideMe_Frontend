import { useEffect, useState } from "react";
import { getRidesByUser } from "../api/rideApi";

export default function RideList() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      const res = await getRidesByUser("a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"); 
      setRides(res.rides || []);
    };
    fetchRides();
  }, []);

  return (
    <div className="space-y-2">
      {rides.map(ride => (
        <div key={ride.id} className="p-2 border rounded">
          <p><strong>Pickup:</strong> {ride.pickup}</p>
          <p><strong>Destination:</strong> {ride.destination}</p>
          <p><strong>Price:</strong> {ride.price}</p>
          <p><strong>Status:</strong> {ride.status}</p>
        </div>
      ))}
    </div>
  );
}

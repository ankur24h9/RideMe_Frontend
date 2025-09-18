const getTripDistance = async (origin, destination) => {
  try {
    const response = await fetch("http://localhost:5000/api/distance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin, destination }),
    });

    const data = await response.json();

    if (data.success) {
      return {
        distance: data.distance,
        duration: data.duration,
        fare: data.fare,
      };
    } else {
      console.error("Distance API error:", data);
      return null;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    
    return null;
  }
};

export default getTripDistance;

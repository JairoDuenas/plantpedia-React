import { useState, useEffect } from "react";
import { plantService } from "../services/plantService";

export const usePlants = (initialQuery = "") => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlants = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await plantService.searchPlants(
        query || "plantas populares",
      );
      setPlants(data);
    } catch (err) {
      setError("Error al cargar las plantas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants(initialQuery);
  }, []);

  return { plants, loading, error, search: fetchPlants };
};

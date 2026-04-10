import { useState, useEffect } from "react";
import { plantService } from "../services/plantService";

export const usePlants = (initialQuery = "") => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlants = async (query, filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      // Si el query es vacío, pasamos string vacío para obtener la lista general
      const data = await plantService.searchPlants(query || "", filters);
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

import axios from "axios";

type VinylRecord = {
  title: string;
  artist: string;
  year: number | undefined;
  genre: string | undefined;
  condition: string | undefined;
};

export const conditionOptions: { label: string; value: string; color: string }[] = [
  { label: "Mint", value: "M", color: "info" },
  { label: "Near Mint", value: "NM", color: "info" },
  { label: "Excellent", value: "E", color: "info" },
  { label: "Very Good++", value: "VGP2", color: "success" },
  { label: "Very Good+", value: "VGP", color: "success" },
  { label: "Very Good", value: "VG", color: "success" },
  { label: "Good++", value: "GP2", color: "warning" },
  { label: "Good+", value: "GP", color: "warning" },
  { label: "Good", value: "G", color: "warning" },
  { label: "Fair", value: "F", color: "error" },
  { label: "Poor", value: "P", color: "error" },
];

export const fetchAll = () => axios.get(`/api/vinyl-records`);

export const add = (record: VinylRecord) => axios.post(`/api/vinyl-record`, record);

export const findByID = (id: string) => axios.get(`/api/vinyl-record/${id}`);

export const editByID = (id: string, record: VinylRecord) => axios.put(`/api/vinyl-record/${id}`, record);

export const deleteByID = (id: string) => axios.delete(`/api/vinyl-record/${id}`);

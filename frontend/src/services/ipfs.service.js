import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/`,
});

export const getMetadataInfoService = (id) => {
  return service.get(`/metadata/${id}`);
};

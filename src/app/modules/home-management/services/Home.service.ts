import request from "@/shared/ultils/request";

export const getListUser = async () => {
  try {
    return await request.get("/user?page=1&size=10");
  } catch (error) {
    throw Error;
  }
};

export const fetchData = async () => {
  try {
    return await request.get("https://data.unicef.org/api/v1/indicators/1388.json");
  } catch (error) {
    throw Error;
  }
};

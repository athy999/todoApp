import axiosClient from "./axiosAPI";

const GroceryApi = {
    getAll: (params = null) => {
      const url = "/GroceryList";
      console.log(params);
      return axiosClient.get(url, { params });
    },
    PostItem: (data, params = null) => {
      const url = "/GroceryList";
      return axiosClient.post(url, data, {});
    },
    getById: (id) => {
      const url = `/GroceryList/${id}`;
      return axiosClient.get(url);
    },
    PutItem: (data) => {
      const url = `/GroceryList`;
      return axiosClient.put(url, data);
    },
    DeleteItem: (id) => {
      const url = `/GroceryList/${id}`;
      return axiosClient.delete(url);
    },
  };
  
  export default GroceryApi;
import axios from "axios";

const base_url = "http://localhost:3001";
// const base_url = "";

export const login = async ({ mobile_no, password }) => {
  try {
    var data = JSON.stringify({
      mobile_no,
      password,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: base_url + "/api/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const result = await axios(config);
    return { error: null, data: result.data };
  } catch (error) {
    return {
      error: error?.response?.data || "Something got wrong",
      data: null,
    };
  }
};

export const signup = async ({ mobile_no, password, name, role }) => {
  try {
    var data = JSON.stringify({
      mobile_no,
      password,
      name,
      ...(role && { role }),
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: base_url + "/api/auth/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const result = await axios(config);
    return { error: null, data: result.data };
  } catch (error) {
    return {
      error: error?.response?.data || "Something got wrong",
      data: null,
    };
  }
};

export const saveForm = async ({
  selectedFiles,
  shop_name,
  address,
  phone_no,
  gst,
  name,
  token,
}) => {
  try {
    const formData = new FormData();

    formData.append("shop_name", shop_name);
    formData.append("address", address);
    formData.append("phone_no", phone_no);
    formData.append("gst", gst);
    formData.append("name", name);

    selectedFiles.forEach((res) => {
      formData.append("uploadedFile", res.file);
      formData.append("width", res.width);
      formData.append("height", res.height);
      formData.append("quantity", res.quantity);
      formData.append("requirment_type", res.requirment_type);
    });

    const result = await axios({
      url: base_url + "/api/user/save-form",
      data: formData,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return { error: null, data: result.data };
  } catch (error) {
    return {
      error: error?.response?.data || "Something got wrong",
      data: null,
    };
  }
};

export const getFormPpt = async ({ id, token, updateLoading }) => {
  try {
    axios({
      url: base_url + `/api/user/download-ppt/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/octet-stream",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "your-file.pptx";
        link.click();
        setTimeout(() => updateLoading(false), "5000");
      })
      .catch((err) => {
        updateLoading(false);
        alert("Something went wrong");
      });
  } catch (error) {
    updateLoading(false);
    return {
      error: error?.response?.data || "Something got wrong",
      data: null,
    };
  }
};

export const getAllForms = async ({ search, skip, limit, token }) => {
  try {
    var data = JSON.stringify({
      search,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url:
        base_url +
        `/api/user/get-all-form?skip=${skip || 0}&limit=${limit || 10}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const result = await axios(config);
    return { error: null, data: result.data };
  } catch (error) {
    return {
      error: error?.response?.data || "Something got wrong",
      data: null,
    };
  }
};

export const getAllEmployeeForms = async ({ search, skip, limit, token }) => {
  try {
    var data = JSON.stringify({
      search,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url:
        base_url +
        `/api/user/get-all-form-employee?skip=${skip || 0}&limit=${
          limit || 10
        }`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const result = await axios(config);
    return { error: null, data: result.data };
  } catch (error) {
    return {
      error: error?.response?.data || "Something got wrong",
      data: null,
    };
  }
};

import { useContext, useState } from "react";
import FileInput from "../components/createForm/FileInput";
import { saveForm } from "../api";
import { AuthContext } from "../context";
import { alertBox } from "../utils/AlertDailog";
import { useNavigate } from "react-router-dom";

function CreateForm() {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [shop_name, set_shop_name] = useState("");
  const [name, set_name] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [address, set_address] = useState("");
  const [phone_no, set_phone_no] = useState("");
  const [gst, set_gst] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([
    {
      file: null,
      height: "",
      width: "",
      quantity: "",
      requirment_type: "",
    },
  ]);

  const handleSubmit = async (event) => {
    setisLoading(true);
    event.preventDefault();
    const { error, data } = await saveForm({
      selectedFiles,
      shop_name,
      address,
      phone_no,
      gst,
      name,
      token,
    });
    setisLoading(false);

    if (error?.message) {
      alertBox({ error, data });
    } else {
      alertBox({ error, data }).then((e) => {
        if (user?.role !== "admin") {
          window.location.reload();
        } else navigate("/listForm");
      });
    }
  };

  return (
    <div className="scrollDiv">
      <form
        onSubmit={handleSubmit}
        className="md:max-w-2xl md:mx-auto md:flex md:flex-col md:justify-center md:w-auto space-y-2 flex flex-col mx-10 "
      >
        <label className="font-bold" htmlFor="shop_name">
          Shop Name
        </label>
        <input
          type="text"
          id="shop_name"
          onChange={(ev) => set_shop_name(ev.target.value)}
          value={shop_name}
          required
        />

        <label className="font-bold" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          onChange={(ev) => set_address(ev.target.value)}
          value={address}
          required
        />

        <label className="font-bold" htmlFor="phone_no">
          Phone No
        </label>
        <input
          type="text"
          id="phone_no"
          onChange={(ev) => set_phone_no(ev.target.value)}
          value={phone_no}
          required
        />

        <label className="font-bold" htmlFor="gst">
          GST
        </label>
        <input
          type="text"
          id="gst"
          onChange={(ev) => set_gst(ev.target.value)}
          value={gst}
          required
        />

        <label className="font-bold" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          onChange={(ev) => set_name(ev.target.value)}
          value={name}
          required
        />

        <FileInput
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}

export default CreateForm;

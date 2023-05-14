import { useEffect, useState } from "react";
import { handleChangeImage, blobToBase64 } from "../helpers/changeHandlers";
import { toast } from "react-toastify";
import DynamicSelect from "./DynamicSelect";
import { useDispatch, useSelector } from "react-redux";
import { addToList } from "../redux/productSlice";

import { postRequest } from "../helpers/requests";
function AddProductForm({ setFormPop }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState({
    preview:
      "https://www.pngitem.com/pimgs/m/72-722791_gallery-icon-png-circle-clipart-png-download-gallery.png",
    raw: null,
  });

  const [vat, setVat] = useState(10);
  const [net, setNet] = useState(0);

  function calculateVat(value) {
    return value - vat / 100;
  }
  useEffect(() => {
    if (document.getElementById("grossval").value) {
      setNet(
        calculateVat(parseFloat(document.getElementById("grossval").value))
      );
    }
  }, [vat]);

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    var url = "products";
    if (!file.raw) {
      return toast.error("No image uploaded!");
    }

    var formData = {
      vat: `${vat}%`,
      netPrice: Math.abs(net),
      productImg: file.blob,
    };

    Array.from(e.currentTarget.elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });

    const productData = await postRequest(url, formData);

    if (productData.value) {
      toast.success(productData.data.message);
      dispatch(addToList(productData.data.data));
      setFormPop(false);
      setLoading(false);
    } else {
      toast.error(productData.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl flex flex-col px-3 py-2">
      <form type="POST" onSubmit={addProduct}>
        <div className="my-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none"
            placeholder="Product Name"
            required
          />
        </div>

        <div className="my-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Product Image
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-24 py-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
            >
              <div className="flex flex-col items-center justify-center ">
                <img className="h-14 w-14" src={file.preview} />
                <p className=" text-sm text-gray-500 ">
                  {file.raw ? null : (
                    <span className="font-semibold">Click to upload image</span>
                  )}
                </p>
              </div>
              <input
                onChange={(e) => {
                  var change = handleChangeImage(e);
                  if (change.value) {
                    blobToBase64(change.raw).then((val) => {
                      setFile({ ...change, blob: val });
                    });
                  } else {
                    toast.error(change.message);
                  }
                }}
                id="dropzone-file"
                accept="image/*"
                type="file"
                className="hidden"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="my-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Gross Price ($)
              </label>
              <input
                id="grossval"
                type="number"
                name="grossPrice"
                onInput={(e) => (e.target.value = Math.abs(e.target.value))}
                onChange={(e) =>
                  setNet(calculateVat(parseFloat(e.target.value)))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none"
                placeholder="Gross Price"
                required
              />
            </div>
            <div className="my-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Vat (%)
              </label>
              <DynamicSelect
                changeHandler={setVat}
                data={[
                  { label: "10%", value: 10 },
                  { label: "15%", value: 15 },
                  { label: "25%", value: 25 },
                ]}
                multi={false}
                holder={"Select Vat(%)"}
              />
            </div>

            <div className="my-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                min={1}
                onInput={(e) => (e.target.value = Math.abs(e.target.value))}
                defaultValue={1}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none"
                placeholder="Quantity"
                required
              />
            </div>

            <div className="my-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Net Price ($)
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none"
                placeholder="Net Price"
                value={Math.abs(net)}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-between px-3 py-2 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
          <button
            onClick={() => setFormPop(false)}
            className="font-semibold text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`w-fit text-white text-sm font-semibold ${
              loading ? "bg-gray-700" : "bg-blue-500"
            } cursor-pointer rounded-md py-2 px-4`}
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;

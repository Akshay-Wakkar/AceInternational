import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function ProductTable({ productList, loading }) {
  return (
    <div className="p-3">
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Name</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Gross Price ($)</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Vat %</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-center">Quantity</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-center">Net Price ($)</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-center">Actions</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {productList &&
              productList.map((product) => {
                return (
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                          <img
                            className="rounded-full"
                            src={product.productImg}
                            width="40"
                            height="40"
                            alt="Alex Shatov"
                          />
                        </div>
                        <div className="font-medium text-gray-800">
                          {product.productName}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium">
                        $ {product.grossPrice}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium ">
                        {product.vat}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-md text-center font-medium">
                        {product.quantity}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-md text-center font-medium">
                        $ {product.netPrice}
                      </div>
                    </td>
                    <td className="flex p-2 mt-3  text-xl font-semibold space-x-2 justify-center items-center">
                      <div className="text-left">
                        <FiEdit />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {productList.length == 0 && loading ? (
          <div className="flex h-full mt-2 flex-col w-full justify-center items-center px-3">
            <p className="text-center font-semibold text-gray-600 font-md">
              Fetching Data! Please Wait...
            </p>
          </div>
        ) : null}
        {productList.length == 0 && !loading ? (
          <div className="flex h-full mt-2 flex-col w-full justify-center items-center px-3">
            <p className="text-center font-semibold text-gray-600 font-md">
              Inventory is empty try adding some products!
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductTable;

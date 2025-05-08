import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetchProducts from "../../../hooks/useFetchProducts";

const ManageProductTable = () => {

    useFetchProducts();
    const products = useSelector((store) => store.products.allProducts);
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2">S.No.</th>
                        <th className="px-4 py-2">Item Code</th>
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Purchase Price</th>
                        <th className="px-4 py-2">Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((p, index) => (
                        <tr key={p._id}className="odd:bg-white even:bg-gray-100">
                            <td rowSpan={p.length} className="border px-4 py-2">{index + 1}</td>
                            <td rowSpan={p.length} className="border px-4 py-2">
                                <Link to={`/account/update/${p._id}`} className="text-blue-500 hover:underline">
                                    {p.itemCode}
                                </Link>
                            </td>
                            <td rowSpan={p.length} className="border px-4 py-2">
                                <Link to={`/account/update/${p._id}`} className="text-blue-500 hover:underline">
                                    {p.productName}
                                </Link>
                            </td>
                            <td rowSpan={p.length} className="border px-4 py-2">
                                {p.stockQuantity}
                            </td>
                            <td rowSpan={p.length} className="border px-4 py-2">
                                {p.purchasePrice}
                            </td>
                            <td rowSpan={p.length} className="border px-4 py-2">
                                {p.salePrice}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default ManageProductTable;

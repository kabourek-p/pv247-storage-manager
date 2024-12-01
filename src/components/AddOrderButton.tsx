'use client'


import {addRandomOrder} from "@/server-actions/mock";

const AddOrderButton = () => {

    const handleClick = async () => {
        await addRandomOrder();
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleClick}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
            >
                Add Order
            </button>

        </div>
    );

}

export default AddOrderButton;
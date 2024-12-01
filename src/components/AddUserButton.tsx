'use client'

import {addRandomUser} from "@/server-actions/mock";

const AddUserButton = () => {

    const handleClick = async () => {
        await addRandomUser();
    };

    return (
        <div className="flex flex-col items-center">
        <button
            onClick={handleClick}
    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
        >
        Add User
    </button>

    </div>
);

}

export default AddUserButton;
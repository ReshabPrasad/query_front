import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Card({ userId, title, description, date, questionId }) {
    const [name, setName] = useState("");
    const userstate = useSelector((state) => state.auth);

    useEffect(() => {
        userstate.users.forEach((user) => {
            if (user._id === userId) {
                setName(user.name);
            }
        });
    }, [userstate.users, userId]);

    return (
        <div className="w-[35rem] p-6 my-2 break-inside hover:shadow-2xl bg-[#176a7d] rounded-lg shadow">
            <div className="flex gap-3">
                <img
                    className="h-14 rounded-full"
                    src="https://cdn5.vectorstock.com/i/1000x1000/43/04/avatar-social-media-isolated-icon-design-vector-10704304.jpg"
                    alt="User Avatar"
                />
                <div>
                    <div className="flex gap-2 items-center">
                        <h1 className="text-lg font-semibold">{name}</h1>
                        <h2 className="text-[#9FC131] cursor-pointer">Follow</h2>
                    </div>
                    <h2 className="text-sm text-gray-400">{date?.split('T')[0].split('-').reverse().join("-")}</h2>
                </div>
            </div>
            <div className="w-full">
                <h5 className="mb-2 text-2xl font-semibold text-gray-300">{title}</h5>
                <p className="text-gray-400 mb-3 break-words">{description}</p>
            </div>
        </div>
    );
}

export default Card;

import { useSelector } from "react-redux";


function UserCard({name,profession}) {

    const userState = useSelector((state) => state.auth);

    return (
        <div className="card w-[35rem] shadow-xl bg-[#176a7d] py-2 px-4 mb-4">
            <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <img className="h-14 w-14 object-cover rounded-full" src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"></img>
                        <div>
                            <h2 className="card-title text-lg font-bold">{name}</h2>
                            <p className="text-sm text-gray-500">{profession}</p>
                        </div>
                    </div>
                    <button className="btn btn-info btn-sm">Follow</button>
            </div>
        </div>
    );
}

export default UserCard;

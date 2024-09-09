

function UserCard() {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="card-title text-lg font-bold">Name</h2>
                        <p className="text-sm text-gray-500">profession</p>
                    </div>
                    <button className="btn btn-primary btn-sm">Follow</button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;

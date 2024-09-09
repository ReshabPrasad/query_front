import Navbar from "./Navbar";



function HomeLayout({children}){
    return (
        <div className="bg-[#012E40] w-full min-h-screen max-h-max">
            <Navbar/>
            {children}
        </div>
    )
}

export default HomeLayout
import Navbar from "./Navbar"

type WithNavbarType = {
    children : React.ReactNode
}

const WithNavbar = ({ children } : WithNavbarType)=>{
    return(
        <div className="flex flex-row">
            <Navbar />
            <div className="w-1/5" />
            {children}
        </div>
    )
}

export default WithNavbar
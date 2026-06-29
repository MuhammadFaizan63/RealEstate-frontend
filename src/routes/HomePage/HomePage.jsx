import { useContext } from "react"
import SearchBar from "../../components/SearchBar/SearchBar"
import "./HomePage.scss"
import { AuthContext } from "../../context/AuthContext"

export default function HomePage() {

    const {currentUser} = useContext(AuthContext)

    return (
        <div className="homePage">
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className="tittle">
                        Find Real Estate & Get Your Dream Place
                    </h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At illum quidem eveniet? Sunt labore possimus, molestiae odio consequuntur voluptatibus ut quasi cupiditate laborum dolor quaerat tenetur maxime vero aliquid quisquam?
                    </p>
                    <SearchBar />
                    <div className="boxes">
                        <div className="box">
                            <h1>
                                16+
                            </h1>
                            <h2>
                                Years of Experience
                            </h2>
                        </div>
                        <div className="box">
                            <h1>
                                200
                            </h1>
                            <h2>
                                Award Gained
                            </h2>
                        </div><div className="box">
                            <h1>
                                2000+
                            </h1>
                            <h2>
                                Property Ready
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>

        </div>
    )
}
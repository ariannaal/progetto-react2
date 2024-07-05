

import FormComponent from "./FormComponent";
import MyFooter from "./MyFooter";


const Homepage = () => (

    <>
        <div className="container-forecast">

            <h2 className="text-center pt-5 text">Your weather, wherever you are.</h2>
            <FormComponent />
            <MyFooter />
        </div>
    </>



)

export default Homepage;
import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

// Global app component

// Content of global app component
// Destructuring of props passed
const AppComponent = ({ Component, pageProps, currentUser }) => {
    return <div className="container">
        <Header currentUser={currentUser}/>
        <Component {...pageProps} />
    </div>
};
//

AppComponent.getInitialProps = async (appContext) => {
    // Generating independent props from getInitialProps above for all pages
    const client = await buildClient(appContext.ctx);
    const { data } = await client.get("/api/users/currentuser");

    // Props specifically from the current page (Here, another getInitialProps is executed from the current page and other props are generated as a result)
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    console.log("Independent props ");
    console.log(data)
    console.log("Props from current page ");
    console.log(pageProps);
    // Pass all newly generated props to the current page
    return {
        pageProps,
        ...data
    }
};


export default AppComponent;

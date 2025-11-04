import {Contact, Features, Footer, Gallery, Header, Hero, Specs} from "./components";


export default function Page() {
    return (
        <>
            <Header/>
            <main>
                <Hero/>
                <Specs/>
                <Features/>
                <Gallery/>
                <Contact/>
            </main>
            <Footer/>
        </>
    );
}

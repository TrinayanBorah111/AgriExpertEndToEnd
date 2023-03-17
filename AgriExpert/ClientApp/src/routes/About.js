import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import AboutImg from "../assets/4.jpg";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";

function About() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg= {AboutImg}
        title="About Us"
        btnClass="hide"
      />
      <AboutUs />
      <Footer />
    </>
  );
}

export default About;

import React from 'react';
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/navbar";

function Home() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg="https://images.unsplash.com/photo-1620200423727-8127f75d7f53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGFncmljdWx0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        title="We make crops ''healthy''"
        text="Agricultural Solution Agency"
        buttonText="Ask a question"
        url="/signup"
        btnClass="show"
      />
      <Footer />
    </>
  );
}

export default Home;

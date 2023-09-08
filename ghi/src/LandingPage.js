import React, { useState, useEffect } from "react";
import "./LandingPage.css";
// import Nav from "./Nav"; // Import the Nav component
import Testimonials from "./Testimonials"; // Import the Testimonials component

function LandingPage() {
  const [isTextVisible, setIsTextVisible] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the speed (time between slides) in milliseconds
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const revealThreshold = 200; // Adjust this value as needed

      if (scrollPosition > revealThreshold) {
        setIsTextVisible(true);
      } else {
        setIsTextVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="landing-page">
      <div id="video-container">
        <video id="video-background" autoPlay loop muted>
          <source src="/VideoBanner.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={`content ${isTextVisible ? "reveal-text" : ""}`}>
        <h1 className="hidden-text">RoomieO</h1>
        <p className="hidden-text">Find your perfect roomie!</p>
      </div>
      <div className="application-info">
        <h2>We're glad you're here!</h2>
        <p>
          Welcome to RoomieO, the ultimate platform for finding the perfect
          roommate! Our application makes it easy for you to connect with
          potential roommates who share your interests and preferences. Whether
          you're looking for a roommate in a new city or just want to find a
          compatible housemate, RoomieO has you covered.
        </p>
        <p>
          With RoomieO, you can create a profile, browse through listings, and
          chat with potential roommates to make the best decision for your
          shared living situation. Say goodbye to the hassle of finding a
          compatible roommate – RoomieO is here to simplify your search.
        </p>
        <p>
          Join our community today and start your journey to finding the perfect
          roomie. Sign up now or log in to your account to get started!
        </p>
      </div>
      <Testimonials sliderSettings={sliderSettings} />
    </div>
  );
}

export default LandingPage;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonials({ sliderSettings }) {
  const testimonials = [
    {
      author: "Alyn",
      text: "I found my ideal roommate on RoomieO, and we get along great! She is now my wife!",
      image: "alyn.png",
    },
    {
      author: "Rosheen",
      text: "RoomieO made the roommate search process so much easier and stress-free. Highly recommended!",
      image: "rosheen.jpg",
    },
    {
      author: "Zach",
      text: "The features on RoomieO are fantastic, and the user interface is user-friendly. 5 stars!",
      image: "zach.jpg",
    },
    {
      author: "Jaci",
      text: "RoomieO helped me find a roommate who shares my love for cooking. We now host weekly dinner parties together!",
      image: "jaci.jpg",
    },
    {
      author: "Aurora",
      text: "I was skeptical at first, but RoomieO exceeded my expectations. I found a reliable roommate quickly, and we've been great friends ever since!",
      image: "aurora.jpg",
    },
    {
      author: "Paul",
      text: "Thanks to RoomieO, I found a roommate who is not only compatible but also a perfect study buddy. Highly recommend this platform!",
      image: "paul.jpg",
    },
  ];

  return (
    <div className="testimonials">
      <h2>Testimonials</h2>
      <Slider {...sliderSettings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-content">
              <div className="testimonial-image-container">
                <img
                  src={`/images/${testimonial.image}`}
                  alt={`${testimonial.author}'s photo`}
                  className="testimonial-image"
                />
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-author">- {testimonial.author}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Testimonials;

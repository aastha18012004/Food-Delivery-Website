import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
        <div className="header-contents">
      <h2>Order your favourite food here</h2>
      <p>
        Discover a world of delicious cuisines and mouth-watering dishes at your
        fingertips. Whether you're craving a hearty meal, a light snack, or
        something sweet, we have something to satisfy every palate. With an
        easy-to-navigate interface and quick, reliable delivery, you can enjoy
        your favorite foods from the comfort of your home. Order now and
        experience the convenience of great food delivered right to your door!
      </p>
      <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;

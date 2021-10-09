import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center p-3">
        <h4>If you got any questions feel free to reach out</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container text-center">
        <span className="text-muted ">
          An Amazing <span className="text-white">MERN</span> Bootcamp
        </span>
      </div>
    </footer>
  );
};

export default Footer;

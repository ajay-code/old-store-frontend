import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

type BasePropsTypes = {
  title?: string;
  description?: string;
  className?: string;
};

const Base: React.FC<BasePropsTypes> = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <NavBar />
      </header>
      <main className="container-fluid bg-dark flex-grow-1">
        <div className="container-fluid py-5  text-white text-center ">
          <h2 className="display-5 fw-bold">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Base;

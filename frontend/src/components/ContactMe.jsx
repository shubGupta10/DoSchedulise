import React from 'react';
import Navbar from './Navbar';
import './ContactMe.css'; // Import CSS file

const ContactMe = () => {
  return (
    <>
      {/* <Navbar />  */}
      <button>Back</button>
      <section id="contactMe" >
        <div className="textcont container">
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi rem adipisci consectetur quam! Voluptate aliquid ea natus consequuntur et nam magnam omnis quibusdam ipsam provident, eius doloribus nihil impedit exercitationem.</span>
        </div>
        <div className="container">
          <h2 className="text-center mb-4 fs-15">Contact Me</h2>
          <form className="row g-3  min-vh-80 container" action="https://formspree.io/f/mleqwkjy" method="POST" id="myForm">
            <div className="col-12">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstName" name="firstName" required />
            </div>
            <div className="col-12">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastName" name="lastName" required />
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" required />
            </div>
            <div className="col-12">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" name="message" rows="5" required></textarea>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactMe;

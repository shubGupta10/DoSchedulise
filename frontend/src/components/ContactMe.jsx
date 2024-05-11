import React from 'react';

const ContactMe = () => {
  return (
    <>
      <section id="contactMe" style={{ padding: 'auto' }}>
        <div className="container goodlook justify-content-center" style={{ margin: 'auto', marginTop: '40px', maxWidth: 'auto', marginBottom: '50px' }}>
          <h2 className="text-center mb-4 fs-15 goodlook">Contact Me</h2>
          <form className="row g-3 goodlook" action="https://formspree.io/f/mleqwkjy" method="POST" id="myForm">
            <div className="col-12">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstName" name="firstName" required style={{ backgroundColor: '#132537', color: 'white' }} />
            </div>
            <div className="col-12">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastName" name="lastName" required style={{ backgroundColor: '#132537', color: 'white' }} />
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" required style={{ backgroundColor: '#132537', color: 'white' }} />
            </div>
            <div className="col-12">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" name="message" rows="5" required style={{ backgroundColor: '#132537', color: 'white' }}></textarea>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary btn-lg" style={{ transition: 'all 0.3s ease' }}>Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactMe;

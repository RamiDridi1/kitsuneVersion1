import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar2 from './Navbar2';
import * as Yup from 'yup';
import './Home.css'; 
import family from './family.jpg';
import AAB from './AAB.jpg';
import af from './af.png';
import medina from './medina.jpg';
import orange from './orange.webp';
import pathé from './pathé.jpg';
import selecta from './selecta.jpg';

const ContactUsSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
});

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send form data to the server
      const response = await fetch('http://localhost:3000/submit-contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the request was successful
      if (response.ok) {
        console.log('Form submitted successfully');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };

  return (
    
    <div>
      
      <section id='1'>
        <h1>Kitsune Cosplay Club</h1>
        <p>
          Kitsune Cosplay Club is a recently launched affiliation of AAB. It brings together cosplayers from all over Tunisia.
          Our goal is to enhance the conditions within our community through events showcasing cosplayers, as well as workshops and tutorials to introduce or refine their skills.
        </p>
        <img src={family} alt='kitsune members' className='back'/>
        
      </section>

      <section id='2'>
        <div>
          <h1 className='valeurs'>Our Values</h1>
          <div className='exc'>
            <h1>Excellence</h1>
            <p>Promote quality in the creation of cosplay projects and events.</p>
          </div>
          <div className='ful'>
            <h1>Fulfillment</h1>
            <p>Foster the personal and collective development of our members.</p>
          </div>
          <div className='rec'>
            <h1>Recognition</h1>
            <p>Work towards the national recognition of cosplay as an art and profession.</p>
          </div>
        </div>
      </section>

      
      <section id='3'>
        <h1>Previous Collaborations </h1>
        <div className='scrolling-section'>
      
          <div className='profile'>
            <img src={AAB} alt='Company1' className='comp'/>
            <p>AAB</p>
          </div>

          <div className='profile'>
            <img src={medina} alt='Company2' className='comp' />
            <p>medina</p>
          </div>

          <div className='profile'>
            <img src={af} alt='Company3'className='comp' />
            <p>Alliance Francaise</p>
          </div>

          <div className='profile'>
            <img src={orange} alt='Company4' className='comp' />
            <p>Orange</p>
          </div>

          <div className='profile'>
            <img src={pathé} alt='Company5' className='comp' />
            <p>Pathé</p>
          </div>

          <div className='profile'>
            <img src={selecta} alt='Company6' className='comp' />
            <p>Selecta</p>
          </div>
       
        </div>
      </section>

        {/* Contact Us Section */}
      <section id='4'>
        <h1>Contact Us</h1>
        <form onSubmit={handleFormSubmit}>
          {/* ... form input fields ... */}
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='message'>Message:</label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>

          <button type='submit'>Submit</button>
        </form>
      </section>







     


      <footer>  
        <p>&copy; 2024 Kitsune Cosplay Club. All rights reserved.</p>
      </footer>
      <script src="path/to/scrollEffect.js"></script>
    </div>
  );
}

export default Home;

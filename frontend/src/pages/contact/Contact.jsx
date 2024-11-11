import { useState } from "react";
import axios from 'axios';
import "./contact.css";
import { baseUrl } from "../../constants";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    option: "",
    message: "",
    checkbox: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(baseUrl + '/send-email', { name: formState.name, email: formState.email });
        alert('Email sent successfully!');
    } catch (error) {
        alert('Error sending email: ' + error.message);
    }
  };

    return (
    <section id="contact" class="contact-form-section">
        <h2>CONTACT US</h2>
        <div class="container_parent">
          <img
            class="bg-video__content"
            src="./assets/avacado.svg"
            alt="avocado-svg"
          />
          <form class="form" onSubmit={handleSubmit}>
            <div class="entry">
              <div class="entry-text">Name</div>
              <input type="text" name="Name" onInput={(e) => setFormState({ ...formState, name: e.target.value })} value={formState.name} placeholder="Your Name" required />
            </div>
            <div class="entry">
              <div class="entry-text">Email</div>
              <input type="email" name="email" onInput={(e) => setFormState({ ...formState, email: e.target.value })} value={formState.email} placeholder="Your Email" />
            </div>
            <div class="entry">
              <div class="entry-text">How did you find us</div>
              <select name="" id="" onChange={(e) => setFormState({ ...formState, option: e.target.value })}>
                <option value="friends">friends</option>
                <option value="search">search</option>
                <option value="advertsiment">advertsiment</option>
                <option value="other">other</option>
              </select>
            </div>
            <div class="entry">
              <div class="entry-text">Drop us a line</div>
              <textarea name="" id="" onInput={(e) => setFormState({ ...formState, message: e.target.value })} value={formState.message} placeholder="Your Message"></textarea>
            </div>
            <div class="entry">
              <input type="checkbox" onChange={(e) => setFormState({ ...formState, checkbox: e.target.checked })} checked={formState.checkbox} class="checkbox" />
              <span class="checkbox-conditions"
                >I have read and agree with all the Privacy Policy and Terms
                Conditions</span
              >
            </div>
            <div class="btn-parent">
              <button type="submit" class="btn btn-full form-button">SEND MESSAGE</button>
            </div>
          </form>
        </div>
    </section>
    )
};

export default Contact;
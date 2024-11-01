import "./about.css";

const About = () => {
    return (
        <section id="features" class="features">
            <h2>Features</h2>

            <div class="container-parent">
            <div class="container">
                <i class="fa-solid fa-star fa-2xl icon"></i>
                <h3>Good quality</h3>
                <p class="feature-para">
                Never cook again! We really mean that. The food we deliver are prepared using orgainc ingrediants without any added preservatives.
                </p>
            </div>
            <div class="container">
                <i class="fa-solid fa-clock fa-2xl icon"></i>
                <h3>On Time</h3>
                <p class="feature-para">
                We deliver food in 15 minutes within a 10 km radius. So you dont have to wait a long time for your favourite meal. Start ordering now.
                </p>
            </div>
            <div class="container">
                <i class="fa-solid fa-phone fa-2xl icon"></i>                
                <h3>24 hour support</h3>
                <p class="feature-para">
                We have 24 hours support. You can contact us anytime for any queries or complaints.You can call us or use the contact us form and we'll call you back.
                </p>
            </div>
            </div>
        </section>
    )
}

export default About;
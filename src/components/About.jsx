function About() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">About Our Notes Application</h1>
      <p className="lead text-center">
        Welcome to our Notes Application! This project is a modern, efficient,
        and user-friendly notes management tool designed to help you organize
        your thoughts, ideas, and important information in one place.
      </p>
      <div className="row">
        <div className="col-md-6">
          <div className="bg-mission">
            <h3>Our Mission</h3>
            <p>
              Our mission is to provide a seamless and intuitive platform for users to
              create, edit, and manage their notes efficiently. Whether you're a
              student, professional, or just someone who loves to stay organized, our
              application is designed to meet your needs.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="bg-features">
            <h3>Key Features</h3>
            <ul>
              <li>Easy Note Creation: Quickly create notes with a simple and intuitive interface.</li>
              <li>Edit and Update: Easily edit and update your notes anytime.</li>
              <li>Search Functionality: Quickly find the notes you need with our powerful search feature.</li>
              <li>Secure Storage: Your notes are securely stored and only accessible to you.</li>
              <li>Responsive Design: Access your notes from any device, whether it's a desktop, tablet, or smartphone.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-12">
          <div className="bg-tech">
            <h3>Technologies Used</h3>
            <p>
              This notes application is built using the MERN stack, a popular and
              powerful combination of technologies for full-stack development:
            </p>
            <ul>
              <li>MongoDB: A NoSQL database for storing notes securely.</li>
              <li>Express.js: A web application framework for handling HTTP requests and building APIs.</li>
              <li>React.js: A JavaScript library for building dynamic and responsive user interfaces.</li>
              <li>Node.js: A JavaScript runtime for building the server-side of the application.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-12">
          <div className="bg-why-choose">
            <h3>Why Choose Our Notes Application?</h3>
            <ul>
              <li>User-Friendly: Designed with simplicity and ease of use in mind.</li>
              <li>Fast and Efficient: Built with modern technologies to ensure quick performance and responsiveness.</li>
              <li>Secure: Your data privacy and security are our top priorities.</li>
              <li>Open Source: This project is open source, and we welcome contributions from the developer community to make it even better.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-12">
          <div className="bg-get-in-touch">
            <h3>Get in Touch</h3>
            <p>
              We are continuously working on improving our notes application and
              adding new features. If you have any suggestions, feedback, or
              questions, feel free to contact us. We'd love to hear from you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

import React from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import driveImg from "../assets/all-images/drive.jpg";
import OurMembers from "../components/UI/OurMembers";
import '../styles/about.css';

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="About Us" />
      <AboutSection aboutClass = "aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                  We are commited to provide safe ride solutions
                </h2>
                <p className="section__description">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Culpa, laudantium reiciendis? Ut, id corporis? Amet, inventore
                  facere placeat ducimus odio optio. Assumenda totam temporibus
                  suscipit quam harum vero, veniam incidunt!
                </p>
                <p className="section__description">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Culpa, laudantium reiciendis? Ut, id corporis? Amet, inventore
                  facere placeat ducimus odio optio. Assumenda totam temporibus
                  suscipit quam harum vero, veniam incidunt!
                </p>

                <div className="d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4"><i class="ri-phone-line"></i></span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4>+382654987</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <BecomeDriverSection />

      <section>
        <Container>
          <Row>
            <Col lg='12' className="mb-5 text-center">
            <h6 className="section__subtitle">Experts</h6>
            <h2 className="section__title">Our Members</h2>
            </Col>
            <OurMembers />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default About;

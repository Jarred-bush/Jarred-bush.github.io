import React, { useState, useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Resume.css";

const Resume = (props) => {
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState({});

  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };
  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  const ResumeHeading = (props) => {
    return (
      <div className="resume-heading">
        <div className="resume-main-heading">
          <div className="heading-bullet"></div>
          <span>{props.heading ? props.heading : ""}</span>
          {props.fromDate && props.toDate ? (
            <div className="heading-date">
              {props.fromDate + "-" + props.toDate}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="resume-sub-heading">
          <span>{props.subHeading ? props.subHeading : ""}</span>
        </div>
        <div className="resume-heading-description">
          <span>{props.description ? props.description : ""}</span>
        </div>
      </div>
    );
  };

  const resumeBullets = [
    { label: "Education", logoSrc: "education.svg" },
    { label: "Work History", logoSrc: "work-history.svg" },
    { label: "Programming Skills", logoSrc: "programming-skills.svg" },
    { label: "Projects", logoSrc: "projects.svg" },
    { label: "Interests", logoSrc: "interests.svg" },
  ];
  const programmingSkillsDetails = [
    { skill: "JavaScript", ratingPercentage: 45 },
    { skill: "HTML", ratingPercentage: 50 },
    { skill: "CSS", ratingPercentage: 50 },
    { skill: "React JS", ratingPercentage: 50 },
    { skill: "React Native", ratingPercentage: 25 },
    { skill: "PHP", ratingPercentage: 5 },
    { skill: "Node JS", ratingPercentage: 25 },
  ];

  const projectDetails = [
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "2022", toDate: "2022" },
      descricption:
        "A Personal Portfolio website to showcase all my details and projects at one place.",
      subHeading: "Technologies used: React JS, Bootstrap",
    },
    {
      title: "Simple TODO App",
      duration: { fromDate: "2022", toDate: "2022" },
      descricption: "For my first project I made a simple TODO app.",
      subHeading: "Technologies used: React JS",
    },
  ];

  const resumeDetails = [
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={"Somerset Comuunity Technical College London, Kentucky"}
        subHeading={"Associates Information Technology"}
        fromDate={"2014"}
        toDate={"2017"}
      />
    </div>,
    <div className="resume-screen-container" key="work-experience">
      <div className="experience-container">
        <ResumeHeading
          heading={"Toyota Motor Manufacturing Kentucky"}
          subHeading={"Production Team Leader"}
          fromDate={"2016"}
          toDate={"2022"}
        />
        <div className="experience-description">
          <span className="resume-description-text">
            A production team leader consist of assisting team members in their
            day to day work making sure they have everything they need to ensure
            good quality work flow,
          </span>
        </div>
        <div className="experience-description">
          <span className="resume-description-text">
            - Work along with Team Members line side to ensure they have
            everything they need to ensure great workflow.
          </span>
          <br />
          <span className="resume-description-text">
            - Use Communication skills and Team Work skills and abilities to
            work with other Team Leaders to problem solve any issues we may
            encounter online.
          </span>
          <br />
        </div>
      </div>
    </div>,
    <div
      className="resume-screen-container programming-skills-container"
      key="programming-skills"
    >
      {programmingSkillsDetails.map((skill, index) => (
        <div className="skill-parent" key={index}>
          <div className="heading-bullet"></div>
          <span>{skill.skill}</span>
          <div className="skill-percentage">
            <div
              style={{ width: skill.ratingPercentage + "%" }}
              className="active-percentage-bar"
            ></div>
          </div>
        </div>
      ))}
    </div>,
    <div className="resume-screen-container" key="projects">
      {projectDetails.map((projectDetails, index) => (
        <ResumeHeading
          key={index}
          heading={projectDetails.title}
          subHeading={projectDetails.subHeading}
          descricption={projectDetails.descricption}
          fromDate={projectDetails.duration.fromDate}
          toDate={projectDetails.duration.toDate}
        />
      ))}
    </div>,
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading="Off-roading"
        descricption="Getting out and seeing the world and using roads less travel has always been one of my most favorite hobbies."
      />
      <ResumeHeading
        heading="Outdoors"
        descricption="I love being outdoors, Hunting, Fishing, Camping, literally anything to do with being outside!"
      />
      <ResumeHeading
        heading="Video Games"
        descricption="When not outside I love playing PC Video games, I have loved playing video games since I was a little kid."
      />
      <ResumeHeading
        heading="Spending time with family"
        descricption="There is nothing more greater than spending time with my beautiful family, In November of 2021 we grew our framily of 2 to 3 with a beautiful little girl."
      />
    </div>,
  ];

  const handleCarousal = (index) => {
    let offsetHeight = 360;

    let newCarousalOffset = {
      style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
    };

    setCarousalOffsetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };
  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={
          index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
        }
        key={index}
      >
        <img
          className="bullet-logo"
          src={require(`../../../src/assets/Resume/${bullet.logoSrc}`).default}
          alt="B"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  const getResumeScreens = () => {
    return (
      <div
        style={carousalOffsetStyle.style}
        className="resume-details-carousal"
      >
        {resumeDetails.map((ResumeDetail) => ResumeDetail)}
      </div>
    );
  };

  useEffect(() => {
    return () => {
      /* UNSUBSCRIBE THE SUBSCRIPTIONS */
      fadeInSubscription.unsubscribe();
    };
  }, [fadeInSubscription]);

  return (
    <div
      className="resume-container screen-container fade-in"
      id={props.id || ""}
    >
      <div className="resume-content">
        <ScreenHeading title={"Resume"} subHeading={"My Formal Bio Details"} />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>
          <div className="resume-bullet-details">{getResumeScreens()}</div>
        </div>
      </div>
    </div>
  );
};
export default Resume;

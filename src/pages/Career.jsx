import React, { useState } from 'react';
import Navigation from '../components/header/Navigation';
import Footer from '../components/footer/Footer';
import CareerHeader from '../components/carrier/CareerHeader';
import CareerOpening from '../components/carrier/CareerOpening';
import CareerForm from '../components/carrier/CareerForm';

const Career = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  // Actual job openings data
  const jobOpenings = [
    {
      id: 1,
      title: "JAVA Programmer",
      department: "Development",
      location: "Pune, Mumbai, Maharashtra",
      type: "Full-time",
      experience: "0-2 years",
      positions: 4,
      description: "We are looking for Java Application Developer - Core Java, JSP, Servlet, Struts, Spring etc with 0 - 2 years of experience",
      requirements: [
        "Strong in Java knowledge or hands on",
        "Presentable having excellent communication, interpersonal, organizational"
      ],
      responsibilities: [
        "Java Development using Core Java, JSP, Servlet, Struts, Spring etc."
      ],
      skills: ["Core Java", "JSP", "Servlet", "Struts", "Spring"],
      salary: "As per Industry standard, basis person's capability and experience",
      education: "Bachelor and Master's in computer or IT engineering"
    },
    {
      id: 2,
      title: "UI Developer",
      department: "Development",
      location: "Pune, Maharashtra", 
      type: "Full-time",
      experience: "0-2 years",
      positions: 2,
      description: "We are looking for a skilled UI Developer with experience in modern web technologies",
      requirements: [
        "Bachelor's Degree in CS/Information Technology discipline",
        "0 to 2 years of Responsive Web application development experience",
        "In depth understanding of JavaScript frameworks/libraries"
      ],
      skills: [
        "HTML5", 
        "CSS3", 
        "SASS", 
        "Bootstrap", 
        "Angular 4+", 
        "Typescript",
        "JavaScript frameworks/libraries",
        "Bootstrap",
        "Angular 2+"
      ],
      concepts: [
        "Conceptual understanding of Angular, Ng-template, Ng-content, Ng-container",
        "Dynamic Component Loading",
        "Deep understanding on components and modules"
      ],
      salary: "As per Industry standard, basis person's capability and experience",
      education: "Bachelor and Master's in computer or IT engineering and other stream"
    },
    {
      id: 3,
      title: "Marketing Executive",
      department: "Marketing & Business Development",
      location: "Panvel, Mumbai, Maharashtra",
      type: "Full-time",
      experience: "0-1 year",
      positions: 2,
      description: "Business development / Commercial Executives / Managers having skills in managing relationships to create growth and new business",
      requirements: [
        "Confident",
        "Fluent in English", 
        "Presentable having excellent communication, interpersonal, organizational, and selling skills"
      ],
      responsibilities: [
        "Evaluate the market for opportunities and focus on areas which could benefit the company",
        "Generate new leads for the company",
        "Develop basic business opportunities / plan",
        "Understand client's business needs and create marketing proposals",
        "Close new business deals by coordinating with clients",
        "Develop and negotiate contracts",
        "Implement requirements according to finalized business model",
        "Ensure customer satisfaction and business continuity"
      ],
      experienceAreas: [
        "Sales: 0-1 year",
        "Marketing: 0-1 year", 
        "Business Development: 0-1 year",
        "Healthcare Sales Services: 1 year"
      ],
      salary: "As per Industry standard, basis person's capability and experience",
      education: "Bachelor and Master's",
      languages: ["English"]
    }
  ];

  const handleApplyClick = (jobId) => {
    setSelectedJob(jobId);
  };

  const handleFormClose = () => {
    setSelectedJob(null);
  };

  const handleFormSubmit = (formData) => {
    // Handle form submission logic here
    console.log('Form submitted for:', formData.jobTitle);
    console.log('Applicant data:', formData);
    setSelectedJob(null); // Close form after submission
    // Add your API call or form processing logic here
  };

  return (
    <>
      <Navigation />
      <CareerHeader />
      
      {/* Job Openings Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <CareerOpening
                key={job.id}
                job={job}
                isSelected={selectedJob === job.id}
                onApply={() => handleApplyClick(job.id)}
                onClose={handleFormClose}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Global Form Modal - Renders when any job is selected */}
      {selectedJob && (
        <CareerForm
          job={jobOpenings.find(job => job.id === selectedJob)}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
      
      <Footer />
    </>
  );
};

export default Career;
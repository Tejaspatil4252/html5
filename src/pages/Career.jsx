import React, { useState, useEffect } from 'react';
import Navigation from '../components/header/Navigation';
import Footer from '../components/footer/Footer';
import CareerHeader from '../components/carrier/CareerHeader';
import CareerOpening from '../components/carrier/CareerOpening';
import CareerForm from '../components/carrier/CareerForm';
import { motion } from 'framer-motion';

const Career = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job openings from API
useEffect(() => {
  const fetchJobOpenings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/careers/openings');
      
      if (!response.ok) {
        throw new Error('Failed to fetch job openings');
      }
      
      const data = await response.json();
      
      // Parse JSON strings into actual arrays
      const parsedData = data.map(job => ({
        ...job,
        requirements: job.requirements ? JSON.parse(job.requirements) : null,
        responsibilities: job.responsibilities ? JSON.parse(job.responsibilities) : null,
        skills: job.skills ? JSON.parse(job.skills) : null,
        concepts: job.concepts ? JSON.parse(job.concepts) : null,
        experienceAreas: job.experienceAreas ? JSON.parse(job.experienceAreas) : null,
        languages: job.languages ? JSON.parse(job.languages) : null,
      }));
      
      setJobOpenings(parsedData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching job openings:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchJobOpenings();
}, []);

  const handleApplyClick = (jobId) => {
    setSelectedJob(jobId);
  };

  const handleFormClose = () => {
    setSelectedJob(null);
  };

  const handleFormSubmit = (formData) => {
    // Handle form submission logic here

    

  };

  // Loading state
  if (loading) {
    return (
      <>
        <Navigation />
        <CareerHeader />
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="text-red-600 text-xl">Loading job openings...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
       
        <CareerHeader />
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="text-red-600 text-xl">Error loading job openings</div>
            <p className="text-gray-600 mt-2">{error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
     
      <CareerHeader />
      
{/* Job Openings Section */}
<div className="bg-gray-50 py-16">
  <div className="container mx-auto px-6 max-w-4xl">
    {/* Error State */}
    {error ? (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-12 max-w-2xl mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to Load Openings
          </h3>
          <p className="text-gray-600 text-lg mb-6">
            We're having trouble loading our current job openings. Please try again later or contact us directly.
          </p>
          <div className="text-sm text-gray-500">
            <p>Error: {error}</p>
            <p className="mt-2">Email: careers@rapptorsoft.com</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    ) : jobOpenings.length === 0 ? (
      // No Openings State
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-12 max-w-2xl mx-auto">
          <div className="text-red-500 text-6xl mb-4">💼</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Currently No Openings
          </h3>
          <p className="text-gray-600 text-lg mb-6">
            We don't have any open positions at the moment, but we're always looking for talented people. 
            Please check back later for new opportunities!
          </p>
          <div className="text-sm text-gray-500">
            <p>Want to send us your resume anyway?</p>
            <p>Email us at: careers@rapptorsoft.com</p>
          </div>
        </div>
      </motion.div>
    ) : (
      // Has Openings - Your existing code
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
    )}
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
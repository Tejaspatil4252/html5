// src/components/home/HomeSection4Services.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaMobile,
  FaChartBar,
  FaUsers,
  FaServer,
  FaHeadset,
  FaRobot,
  FaShieldAlt,
  FaCloud,
  FaCogs,
  FaBrain,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeSection4Services = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const services = [
    {
      icon: FaRobot,
      title: "AI & Machine Learning",
      description:
        "Build intelligent systems that learn and adapt. We develop custom AI solutions including predictive analytics, computer vision, and natural language processing that automate complex processes, uncover hidden insights, and drive autonomous decision-making for your business.",
      color: "from-red-800 to-red-900",
    },
    {
      icon: FaCloud,
      title: "Cloud & DevOps Automation",
      description:
        "Accelerate digital transformation with automated cloud infrastructure and CI/CD pipelines. We implement scalable cloud architectures with intelligent monitoring, automated deployments, and self-healing systems that ensure 99.9% uptime and optimal performance.",
      color: "from-red-900 to-red-950",
    },
    {
      icon: FaCogs,
      title: "AI Automation",
      description:
        "Transform manual processes into intelligent automated workflows. Our AI automation solutions learn from your operations, automate repetitive tasks, and continuously optimize for maximum efficiency, accuracy, and cost savings across your entire organization.",
      color: "from-red-950 to-red-900",
    },
    {
      icon: FaCode,
      title: "Software Development",
      description:
        "The development of reliable and scalable software solutions for any OS, browser and device. We bring together deep industry expertise and the latest IT advancements to deliver custom solutions and products that perfectly fit the needs and behaviour of their users.",
      color: "from-red-500 to-red-600",
    },


    {
      icon: FaMobile,
      title: "Application Services",
      description:
        "The full set of services around development and maintenance of complex business-critical applications. Our experts build, test, deploy, protect, manage, migrate and optimize enterprise-scale digital solutions ensuring they're always up and running and achieve the optimal TCO.",
      color: "from-red-600 to-red-700",
    },
        {
      icon: FaChartBar,
      title: "Data Analytics",
      description:
        "We support businesses in achieving fact-based decision-making by converting their historical and real-time, traditional and big data into actionable insights. Our services are tailored to make the raw data and the environment ready, as well as strengthen the business with advanced analytics capabilities.",
      color: "from-red-500 to-red-600",
    },
  ];

  const toggleViewMore = () => {
    setVisibleCount(visibleCount === 3 ? services.length : 3);
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-red-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Professional Services
          </motion.h2>

          <motion.p
            className="text-lg text-gray-700 max-w-3xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Rapportsoft Suite of Products are built on J2EE platform.
            Rapportsoft services for the products built on advanced technologies
            include the following -
          </motion.p>

          {/* Animated Underline */}
          <motion.div
            className="w-24 h-1 bg-red-600 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, visibleCount).map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Gradient Header */}
              <div
                className={`bg-gradient-to-r ${service.color} h-2 w-full`}
              ></div>

              <div className="p-6 flex-grow">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 mb-4 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <service.icon className="text-2xl text-red-600" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  {service.description}
                </p>
              </div>

              {/* Read More Button */}
              <div className="px-6 pb-6">
                <Link to="/services">
                  <motion.button
                    href="/services"
                    className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors duration-300 group/btn"
                    whileHover={{ x: 5 }}
                  >
                    Read More
                    <motion.svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </motion.svg>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        {services.length > 3 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={toggleViewMore}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 border-2 border-red-600 hover:border-red-700 flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {visibleCount === 3 ? "View More Services" : "View Less"}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HomeSection4Services;

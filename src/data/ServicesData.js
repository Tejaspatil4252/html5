import appService from '../assets/serviceIMG/application-serv.jpg';
import consult from '../assets/serviceIMG/consult.jpg';
import customSofDev from '../assets/serviceIMG/customSofDev.jpg'
import dataAnalytics from '../assets/serviceIMG/data-analytics.jpg'
import helpDesk from '../assets/serviceIMG/help-desk.jpg'
import infra from '../assets/serviceIMG/infrastructure.jpg'
import itConsult from '../assets/serviceIMG/it-consulting.jpg'
import qa from '../assets/serviceIMG/testing-QA.jpg'
import softwareProDev from '../assets/serviceIMG/software-product-dev.jpg'
import aiMl from '../assets/serviceIMG/ai-ml.jpg'
import cloudDevOps from '../assets/serviceIMG/cloud-devops.jpg'
import cyberSecurity from '../assets/serviceIMG/cyber-secure.jpg'









const servicesData = [
  {
    id: 1,
    title: "Software Consulting",
    description: "Software consulting services are aimed at maximizing the ROI of a software development initiative through effective planning, execution and management of new software development project, or setting to rights an ongoing project. Providing all-round software consulting, Rapportsoft helps clients from 14 industries keep end-to-end software development fast and economically sound and deliver high-quality software solutions.",
    image: consult,
    icon: "💼",
    services: [],
  },
  {
    id: 2,
    title: "Custom Software Development",
    description: "Custom software development is the process of designing, building, integrating, scaling, and upgrading software solutions to address the pressing needs or achieve objectives of your specific business. Rapportsoft delivers high-grade custom software to a wide range of clients – from High-sized to mid-sized businesses. Distilling 11 years of experience in IT, expertise across various technology stacks and in 14 industries, we can help you to solve complex challenges with reliable and agile digital solutions.",
    image: customSofDev,
    icon: "⚙️",
    services: [],
  },
  {
    id: 3,
    title: "Software Product Development",
    description: "With software product development outsourced, you free up your resources and get access to the tech expertise of a third-party vendor that handles the development and evolution of your app. Relying on 11-year experience in IT, Rapportsoft offers all-round self-managed outsourced product development services that help you combine fast product evolution and stability.",
    image: softwareProDev,
    icon: "🚀",
    services: [],
  },
  {
    id: 4,
    title: "Testing & QA",
    description: "We offer full-range QA and testing outsourcing services, can help to develop your QA or enhance the existing one and evolution. We perform end-to-end testing of mobile, web and desktop application at each stage of the development lifecycle.",
    image: qa,
    icon: "🔍",
    services: [
      "QA outsourcing",
      "QA consulting",
      "Security testing",
      "Functional testing",
      "Usability testing",
      "Performance testing",
      "Test automation"
    ]
  },
  {
    id: 5,
    title: "Application Services",
    description: "The full set of services around development and maintenance of complex business-critical applications. Our experts build, test, deploy, protect, manage, migrate and optimize enterprise-scale digital solutions ensuring they're always up and running and achieve the optimal TCO.",
    image: appService,
    icon: "📱",
    services: [
      "Application management",
      "Application modernization",
      "Application integration",
      "Application security services",
      "Application development",
      "Application testing",
      "Application maintenance and support"
    ]
  },
{
  id: 6,
  title: "AI & Machine Learning",
  description: "Build intelligent systems that learn and adapt. We develop custom AI solutions including predictive analytics, computer vision, and natural language processing that automate complex processes, uncover hidden insights, and drive autonomous decision-making for your business.",
  image: aiMl,
  icon: "🤖",
  services: [
    "Predictive Analytics Solutions",
    "Computer Vision Systems",
    "Natural Language Processing",
    "Machine Learning Model Development",
    "Intelligent Process Automation",
    "AI-powered Decision Support Systems",
    "Custom AI Solution Development"
  ]
},
  {
    id: 7,
    title: "Data Analytics",
    description: "We support businesses in achieving fact-based decision-making by converting their historical and real-time, traditional and big data into actionable insights. Our services are tailored to make the raw data and the environment ready, as well as strengthen the business with advanced analytics capabilities.",
    image: dataAnalytics,
    icon: "📊",
    services: [
      "BI consulting and implementation",
      "Big data consulting and implementation",
      "Machine and deep learning",
      "Data Analytics as a Service",
      "Data quality management"
    ]
  },
 {
  id: 8,
  title: "Cloud & DevOps Automation",
  description: "Accelerate digital transformation with automated cloud infrastructure and CI/CD pipelines. We implement scalable cloud architectures with intelligent monitoring, automated deployments, and self-healing systems that ensure 99.9% uptime and optimal performance.",
  image: cloudDevOps,
  icon: "☁️",
  services: [
    "Automated Cloud Infrastructure",
    "CI/CD Pipeline Implementation",
    "Intelligent System Monitoring",
    "Self-healing Architecture",
    "Scalable Cloud Solutions",
    "DevOps Automation",
    "Performance Optimization"
  ]
},
{
  id: 9,
  title: "Cybersecurity & AI Protection",
  description: "Protect your digital assets with AI-powered security solutions. Our advanced threat detection systems use machine learning to identify anomalies, predict potential breaches, and automate responses to security incidents in real-time, ensuring comprehensive protection.",
  image: cyberSecurity  ,
  icon: "🛡️",
  services: [
    "AI-powered Threat Detection",
    "Anomaly Detection Systems",
    "Predictive Security Analytics",
    "Automated Incident Response",
    "Machine Learning Security",
    "Real-time Threat Monitoring",
    "Comprehensive Digital Protection"
  ]
}
];

export default servicesData;
// src/data/productsData.js
// src/data/ProductsData.js
import cfsNavImage from '../assets/productImages/cfs-nav-system.jpg';
import icdImage from '../assets/productImages/icd-management-system.jpg';
import bondedWarehouseImage from '../assets/productImages/Bonded-warehouse-system.jpg';
import generalWarehouseImage from '../assets/productImages/general-warehouse-system.jpg';
import emptyYardImage from '../assets/productImages/empty-yard-depot-system.jpg';
import eCustodianImage from '../assets/productImages/e-custodian-air-cargo.jpg';
import moowrImage from '../assets/productImages/moowr-bonded-software.jpg';
import domesticImportImage from '../assets/productImages/Domestic-import-export-software.jpg';
import transportationImage from '../assets/productImages/Transportation-management-system.jpg';
import bulkDigiSignImage from '../assets/productImages/bulk-digi-sign-software.jpg';
import shippingEgmImage from '../assets/productImages/shipping-line-egm-merge.jpg';
import shippingManifestImage from '../assets/productImages/Shipping-line-import-export-manifest.jpg';
import stoneCrusherImage from '../assets/productImages/stone-crusher.jpg';
import storeMaintenance from "../assets/productImages/storage-maintenance.jpg";
import apiIntegration from "../assets/productImages/api.jpg";
import tallyRfidSap from "../assets/productImages/sap.jpg";
import { s } from 'framer-motion/client';

   



export const productsData = [
      {
    id: 1,
    name: "CFS NAV Management System", // Different product
    image: cfsNavImage,
    description: null, // No description yet
    highlights: [], // Empty array = won't show highlights section
    features: null, // Null = won't show features section
    benefits: null, // Null = won't show benefits section
    support: null // Null = won't show support section
  },
  // Add other 10 products with basic structure
  {
    id: 2,
    name: "ICD Management System",
    image: icdImage, // Using our naming convention
    description: "This is Vision ICD Software has represented quality, reliability and affordability of Software solution for the Inland Container Depot(ICD). Vision ICD software products offer reliable control over Container Fright Station operations, yet are easy for growing Container Fright Station companies to implement, integrate and afford. The Vision ICD system supports all container fright station processes like Import, Export, Bond and Auction.",
    highlights: [
      "Software Installation", 
      "Import Operation", 
      "Export Operation", 
      "Bond Operation", 
      "Auction Operation",
      "Shipping Line",
      "Invoice Generator",
      "Message Reporting",
      "Automized Operations",
      "Tracking Solutions",
      "E-Invoice Provider",
      "API integration",
      "Auto Mail & Auction",
      "ICD Modules",
      "EDI Message Exchange",
      "Container Tracking",
      "EYMS",
      "Integrate with Weigh"
    ],
    features: {
      title: "Product Features",
      description: "Vision ICD Software has represented quality, reliability and affordability of Software solution for the Inland Container Depot (ICD) and Warehouse Management.",
      items: [
        "Web Based ICD Management System",
        "Complete suite of ICD operations like Import, Export, Bond, Auction.",
        "User Friendly Input Screens",
        "Support Single Office to Large Multi-office Solutions",
        "Full Easy-to-Use Navigation",
        "Built-in automated e-mail alert system",
        "Customized Reports to Analyze Business",
        "Seamlessly integrates with other existing applications",
        "Embedded Security",
        "User profile based roles and rights",
        "Online Tracking System"
      ]
    },
    benefits: {
      title: "Benefits", 
      items: [
        "Comprehensive user-friendly system for all ICD operations",
        "Support Single Office to Large Multi-office Solutions.",
        "Increase Cash Flow and Profitability",
        "On Site Traning",
        "Onsite/Online Technical Support",
        "Real Time availability of Data",
        "Provides Better Services to Your Customers",
        "Scalability for additional functional requirements in future",
        "Scalability for additional locations",
        "Modular architecture for ease of upgrades and add-ons",
        "A secure platform which gives access to customers"
      ]
    },
    support: {
      title: "Support",
      items: [
        "Onsite Support",
        "Through Email, Chat, Telephone"
      ]
    }
  },
      {
    id: 3,
    name: "Bonded Warehouse System",
    image: bondedWarehouseImage,
    description: null,
    highlights: [],
    features: null,
    benefits: null,
    support: null
  },
   
    {
    id: 4,
    name: "General Warehouse System",
    image: generalWarehouseImage,
    description: null,
    highlights: [],
    features: null,
    benefits: null,
    support: null
  },
   {
    id: 5,
    name: "Empty Yard Depot System",
    image: emptyYardImage, 
    description: "EYMS system deals with managing and tracking of the container inventory within the yard. It brings visibility into In and Out container movements per day. It helps Shipping Lines to manage their inventory by FIFO method based on the daily reports. EYMS (Empty Yard Management system) contains all operation related to Empty Yard. It Contains following process.",
    highlights: [
      "Empty Container Gate In",
      "Gate In Container Survey", 
      "MNR Activity",
      "Partywise Tariff",
      "Storage & Handling",
      "Gate Out Survey",
      "Container Gate Out",
      "EYMS Transaction"
    ],
    features: {
      title: "Product Features",
      description: "EYMS Software has represented quality, reliability and affordability of Software solution for the Empty Yard Management System (EYMS) and Warehouse Management.",
      items: [
        "Web Based EYMS Management System",
        "Complete suite of EYMS operations like Import, Export, Bond, Auction.",
        "User Friendly Input Screens",
        "Support Single Office to Large Multi-office Solutions",
        "Full Easy-to-Use Navigation",
        "Built-in automated e-mail alert system",
        "Customized Reports to Analyze Business",
        "Seamlessly integrates with other existing applications",
        "Embedded Security",
        "User profile based roles and rights",
        "Online Tracking System"
      ]
    },
    benefits: {
      title: "Benefits", 
      items: [
        "Comprehensive user-friendly system for all EYMS operations",
        "Support Single Office to Large Multi-office Solutions.",
        "Increase Cash Flow and Profitability",
        "On Site Traning",
        "Onsite/Online Technical Support",
        "Real Time availability of Data",
        "Provides Better Services to Your Customers",
        "Scalability for additional functional requirements in future",
        "Scalability for additional locations",
        "Modular architecture for ease of upgrades and add-ons",
        "A secure platform which gives access to customers"
      ]
    },
    support: {
      title: "Support",
      items: [
        "Onsite Support",
        "Through Email, Chat, Telephone"
      ]
    }
  },
  {
    id: 6,
    name: "E-Custodian Air Cargo System", 
    image: eCustodianImage ,
    description: null,
    highlights: [],
    features: null,
    benefits: null,
    support: null
  },
 
{
  id: 7,
  name: "MOOWR Bonded Software",
  image: moowrImage,
  description: "Warehouse Management System (WMS) is a software solution to control and manage the regular warehouse operations from the time the goods enter the warehouse until they move out. It offers inventory visibility and manages the supply chain fulfilment operations from the distribution centre to the Shelves of the Store. WMS (MOOWR Bonded, General and Cold Storage Warehouse) contains all operation related to MOOWR Bonded, General and Cold Storage. We can offer WMS process on Normal Cargo, Oil, Offshore Process, Manufacturing Unit, Deemed Export etc. WMS Contains All process of MOOWR Bonded, General and Cold Storage Operation with Billing and Reports.",
  highlights: [
    "MOOWR Bonded Software Highlights"
  ],
  features: {
    title: "Product Features",
    description: "Warehouse Management System Software has represented quality, reliability and affordability of Software solution for the WMS and Warehouse Management.",
    items: [
      "Web Based Warehouse Management System",
      "Complete suite of WMS operations like Import, Export, Bond, Auction.",
      "User Friendly Input Screens",
      "Support Single Office to Large Multi-office Solutions",
      "Full Easy-to-Use Navigation",
      "Built-in automated e-mail alert system",
      "Customized Reports to Analyze Business",
      "Seamlessly integrates with other existing applications",
      "Embedded Security",
      "User profile based roles and rights",
      "Online Tracking System"
    ]
  },
  benefits: {
    title: "Benefits",
    items: [
      "Comprehensive user-friendly system for all WMS operations",
      "Support Single Office to Large Multi-office Solutions.",
      "Increase Cash Flow and Profitability",
      "On Site Traning",
      "Onsite/Online Technical Support",
      "Real Time availability of Data",
      "Provides Better Services to Your Customers",
      "Scalability for additional functional requirements in future",
      "Scalability for additional locations",
      "Modular architecture for ease of upgrades and add-ons",
      "A secure platform which gives access to customers"
    ]
  },
  support: {
    title: "Support",
    items: [
      "Onsite Support",
      "Through Email, Chat, Telephone"
    ]
  }
},
 {
    id: 8,
    name: "Domestic Import Export Software", 
    image: domesticImportImage ,
    description: null,
    highlights: [],
    features: null,
    benefits: null,
    support: null
  },

  {
    id: 9,
    name: "Transportation Management System", 
    image: transportationImage,
    description: null,
    highlights: [],
    features: null,
    benefits: null,
    support: null
  },
  {
  id: 10,
  name: "Bulk Digi-sign Software",
  image: bulkDigiSignImage,
  description: "Digi-Signer is an automated, unattended server-side file signing solution that runs on servers to sign thousands of files automatically at specified intervals without user intervention. Supports PDF format with digital signature embedding, certificate-based signing, time stamping, and comprehensive signing logs.",
  highlights: [
    "Automatic Server-side Bulk Signing",
    "No Manual Interaction Required", 
    "PDF Format File Signing",
    "Digital Signature Embedding in PDF",
    "Certificate-based Machine Signing",
    "Local Machine Time Stamping",
    "Comprehensive Signing Logs Generation",
    "Unattended Server Operation",
    "High-volume Batch Processing",
    "Scheduled Interval Signing"
  ],
  features: {
    title: "Product Features",
    description: "Automated digital signature solution for bulk document processing with enterprise-grade security and integration capabilities.",
    items: [
      "User Friendly Input Screens",
      "Support Single Office to Large Multi-office Solutions",
      "Full Easy-to-Use Navigation",
      "Built-in automated e-mail alert system", 
      "Seamlessly integrates with other existing applications",
      "Embedded Security",
      "User profile based roles and rights"
    ]
  },
  benefits: {
    title: "Benefits",
    items: [
      "Comprehensive user-friendly system for all operations",
      "Support Single Office to Large Multi-office Solutions.",
      "Increase Cash Flow and Profitability",
      "On Site Traning", 
      "Onsite/Online Technical Support",
      "Real Time availability of Data",
      "Provides Better Services to Your Customers",
      "Scalability for additional functional requirements in future",
      "Scalability for additional locations",
      "Modular architecture for ease of upgrades and add-ons",
      "A secure platform which gives access to customers"
    ]
  },
  support: {
    title: "Support", 
    items: [
      "Onsite Support",
      "Through Email, Chat, Telephone"
    ]
  }
},
  {
    id: 11,
    name: "Shipping Line EGM Merge", 
    image: shippingEgmImage,
    description: null,
    highlights: [],
    features: null,
    benefits: null,
    support: null
  },
  {
  id: 12,
  name: "Shipping Line Import/Export Manifest",
  image: shippingManifestImage,
  description: "Streamlined import and export management solution that handles complete shipping documentation including IFTMIN file processing, manifest generation, container tracking, and EGM merge system for efficient customs compliance and vessel operations.",
  highlights: [
    "IFTMIN File Upload & Processing",
    "Automated Manifest Generation", 
    "Discharge List Creation",
    "Real-time Container Movement Tracking",
    "Booking Information Management",
    "CRO (Container Release Order) Generation",
    "Upper Gulf Manifest & Discharge Lists",
    "Port & Location Master Data Management",
    "Vessel & Voyage Entry System",
    "Excel-based Onboard List Upload",
    "EAL Sheet Processing & Upload",
    "Master File Generation",
    "Agent-wise EGM Upload Workflow",
    "Error File Generation & Handling",
    "ICD/LOCAL/HUB Multi-location Support",
    "Auto Category Tracking & Updates",
    "MCD Format Report Creation",
    "Vessel & Voyage Analytics Reports"
  ],
  features: {
    title: "Product Features",
    description: "The Import Export Manifest, EGM (Export General Manifest) Merge System has represented quality, reliability and affordability of Software solution.",
    items: [
      "User Friendly Input Screens",
      "Support Single Office to Large Multi-office Solutions",
      "Full Easy-to-Use Navigation", 
      "Built-in automated e-mail alert system",
      "Seamlessly integrates with other existing applications",
      "Embedded Security",
      "User profile based roles and rights"
    ]
  },
  benefits: {
    title: "Benefits",
    items: [
      "Comprehensive user-friendly system for all operations",
      "Support Single Office to Large Multi-office Solutions.",
      "Increase Cash Flow and Profitability", 
      "On Site Traning",
      "Onsite/Online Technical Support",
      "Real Time availability of Data",
      "Provides Better Services to Your Customers",
      "Scalability for additional functional requirements in future",
      "Scalability for additional locations",
      "Modular architecture for ease of upgrades and add-ons",
      "A secure platform which gives access to customers"
    ]
  },
  support: {
    title: "Support",
    items: [
      "Onsite Support",
      "Through Email, Chat, Telephone"
    ]
  }
},
      {
    id: 13,
    name:"Stone Crusher Software", // Different product
    image: stoneCrusherImage,
    description: null, // No description yet
    highlights: [], // Empty array = won't show highlights section
    features: null, // Null = won't show features section
    benefits: null, // Null = won't show benefits section
    support: null // Null = won't show support section
  },
        {
    id: 14,
    name:" Third Party API Integration",// Different product
    image: apiIntegration,
    description: null, // No description yet
    highlights: [], // Empty array = won't show highlights section
    features: null, // Null = won't show features section
    benefits: null, // Null = won't show benefits section
    support: null // Null = won't show support section
  },
        {
    id: 15,
    name:  "Tally, RFID, SAP System Integration", 
    image: tallyRfidSap ,
    description: null, // No description yet
    highlights: [], // Empty array = won't show highlights section
    features: null, // Null = won't show features section
    benefits: null, // Null = won't show benefits section
    support: null // Null = won't show support section
  },
        {
    id: 16,
    name: "Store and Maintenance System", // Different product
    image: storeMaintenance,
    description: null, // No description yet
    highlights: [], // Empty array = won't show highlights section
    features: null, // Null = won't show features section
    benefits: null, // Null = won't show benefits section
    support: null // Null = won't show support section
  },



];
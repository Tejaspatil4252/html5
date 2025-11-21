// src/pages/Pricing.jsx
import React from 'react'
import Navigation from '../components/header/Navigation'
import Footer from '../components/footer/Footer'
import Price from '../components/price/PricingCards'
import PriceHeader from '../components/price/PriceHeader'
import FeatureComparisonTable from '../components/price/FeatureComparisonTable'

const Pricing = () => {
  return (
    <>
     
      <PriceHeader />
      <FeatureComparisonTable />
      <Price />
      <Footer />
    </>
  );
};

export default Pricing;
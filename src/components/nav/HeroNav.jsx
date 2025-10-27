import { Link } from 'react-router-dom';
import { getHeroImage } from './utils';
import PageTitle from './PageTitle';
import { FaUserPlus } from 'react-icons/fa';
import InteractiveAnimation from './InteractiveAnimation';

const HeroNav = ({ navItems, hoveredItem, setHoveredItem, currentPage }) => {
  const pageTitles = {
    '/': 'Innovate. Create. Elevate.',
    '/about': 'Our Story & Mission',
    '/products': 'Innovative Solutions',
    '/services': 'Expert Services', 
    '/clients': 'Our Partners',
    '/career': 'Join Our Team',
    '/news': 'Latest Updates',
    '/blogs': 'Insights & Stories',
    '/contact': 'Get In Touch',
    '/pricing': "Invest in Excellence"
  };

  const currentTitle = pageTitles[currentPage] || 'RapportSoft';

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${getHeroImage(currentPage)})`,
        }}
      />
      
      {/* Simple Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Grid Animation */}
      <InteractiveAnimation />

      {/* Main Content */}
      <div className="relative h-full flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex flex-col justify-center">
          
          {/* Navigation Row */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div>
              <Link to="/" className="relative">
                <span className="text-3xl font-bold text-white drop-shadow-2xl">
                  RapportSoft
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 font-medium transition-colors duration-300 ${
                      item.active 
                        ? 'text-white' 
                        : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    {item.name}
                    
                    {/* Active Indicator */}
                    {(item.active || hoveredItem === item.name) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                    )}
                  </Link>
                </div>
              ))}
              
              {/* Get Started Button */}
{/* Single Professional Button */}
<div className="ml-4">
  <Link
    to="/registration"
    className="bg-white text-gray-900 px-6 py-2.5 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2"
  >
    <FaUserPlus className="text-sm" />
    Get Started
  </Link>
</div>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-white">
              <div className="w-6 h-6 flex flex-col justify-between">
                <div className="w-full h-0.5 bg-white rounded"></div>
                <div className="w-full h-0.5 bg-white rounded"></div>
                <div className="w-full h-0.5 bg-white rounded"></div>
              </div>
            </button>
          </div>

          {/* Page Title */}
          <div className="mt-6">
            <PageTitle title={currentTitle} />
          </div>

          {/* Subtitle */}
          <p className="text-white/80 text-center text-lg mt-4">
            Transforming ideas into digital reality
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroNav;
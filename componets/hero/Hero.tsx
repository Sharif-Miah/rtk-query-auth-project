'use client';
import React, { useState } from 'react';
import { Play, Check, ChevronDown, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

// Types
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

interface ProgressItemProps {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

// Components
const Header = () => (
  <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="text-white text-2xl font-bold">Prosper.</div>
      <div className="hidden md:flex items-center gap-8 text-white text-sm">
        <a href="#" className="hover:text-gray-300 transition">Home</a>
        <a href="#" className="hover:text-gray-300 transition">About</a>
        <a href="#" className="hover:text-gray-300 transition">Services</a>
        <a href="#" className="hover:text-gray-300 transition">Project</a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative h-screen bg-gray-900">
    <div className="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop" 
        alt="Modern House" 
        className="w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
    </div>
    
    <div className="relative h-full flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-white text-6xl md:text-7xl font-bold mb-4">Get Ready.</h1>
        <h1 className="text-white text-6xl md:text-7xl font-bold mb-16">We're finishing!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20">
          <InfoCard
            icon={<MapPin className="w-6 h-6" />}
            title="Modern & safe Living"
            description="Discover comfort and privacy in the most modern area available"
            link="Learn more"
          />
          <InfoCard
            icon={<MapPin className="w-6 h-6" />}
            title="Absolute Location"
            description="Strategic location which makes it easier to reach"
            link="See map"
          />
          <InfoCard
            icon={<MapPin className="w-6 h-6" />}
            title="Great Sporting Areas"
            description="Get a great lifestyle near your home with premium sport facilities"
            link="Read more"
          />
        </div>
      </div>
    </div>
  </section>
);

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, link }) => (
  <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
    <div className="text-white mb-3">{icon}</div>
    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-4">{description}</p>
    <button className="text-white text-sm border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
      {link}
    </button>
  </div>
);

const AboutSection = () => (
  <section className="py-20 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-16">About the project.</h2>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h3 className="text-2xl font-bold mb-4">Here we're and we're proud</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Modern and safe architecture with high quality materials</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Strategic location near shopping centers and schools</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Premium facilities including gym, pool, and park</span>
            </li>
          </ul>
        </div>
        
        <div className="relative">
          <h4 className="text-sm font-semibold mb-3">Video presentation</h4>
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop" 
              alt="Video Preview" 
              className="w-full h-64 object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <Play className="w-6 h-6 text-gray-900 ml-1" />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        <ProgressItem icon={<Check className="w-6 h-6" />} title="Planning" isActive />
        <ProgressItem icon={<Check className="w-6 h-6" />} title="Building" isActive />
        <ProgressItem icon={<Check className="w-6 h-6" />} title="Finishing works" isActive />
        <ProgressItem icon={<div className="w-6 h-6 border-2 border-gray-300 rounded-full" />} title="Project close" />
      </div>
    </div>
  </section>
);

const ProgressItem: React.FC<ProgressItemProps> = ({ icon, title, isActive }) => (
  <div className="flex items-center gap-3">
    <div className={isActive ? "text-black" : "text-gray-300"}>{icon}</div>
    <span className={`text-sm font-medium ${isActive ? "text-black" : "text-gray-400"}`}>{title}</span>
  </div>
);

const ArchitectureSection = () => (
  <section className="py-20 px-6 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Architecture & Design.</h2>
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop" 
            alt="Architecture" 
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3">01. Garage & Garden</h3>
            <p className="text-gray-600 leading-relaxed">
              Spacious garage for two cars with beautiful landscaped garden area. Perfect for family gatherings and outdoor activities.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">02. Vertical living</h3>
            <p className="text-gray-600 leading-relaxed">
              Modern vertical architecture maximizing space utilization while maintaining aesthetic appeal and functionality.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-6">Home & Living Shelter.</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Experience luxury living with our thoughtfully designed interiors. Every detail is crafted to provide maximum comfort and style for modern families.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From spacious living areas to state-of-the-art kitchens, our homes are built with your lifestyle in mind.
          </p>
        </div>
        
        <div className="order-1 md:order-2">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop" 
            alt="Interior" 
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section className="py-20 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-12">Gallery.</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <img 
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=800&fit=crop" 
            alt="Gallery 1" 
            className="w-full h-96 object-cover rounded-lg"
          />
          <p className="text-center mt-4 font-medium">Front View</p>
        </div>
        <div className="md:col-span-2">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop" 
            alt="Gallery 2" 
            className="w-full h-96 object-cover rounded-lg"
          />
          <p className="text-center mt-4 font-medium">Side View</p>
        </div>
        <div className="md:col-span-2">
          <img 
            src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=600&fit=crop" 
            alt="Gallery 3" 
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="md:col-span-1">
          <img 
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=600&fit=crop" 
            alt="Gallery 4" 
            className="w-full h-64 object-cover rounded-lg"
          />
          <p className="text-center mt-4 font-medium">Design</p>
        </div>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section className="py-20 px-6 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-12">Pricing.</h2>
      
      <div className="grid md:grid-cols-4 gap-6">
        <PricingCard
          title="Choose your apartment"
          price="Contact us"
          period="for pricing"
          features={[
            "Choose layout",
            "Select a floor",
            "Choose exposure",
            "Choose an apartment with a terrace",
            "Availability in the property"
          ]}
        />
        <PricingCard
          title="2 Room Apartment"
          price="$175,000"
          period="Total Price"
          features={[
            "Living Room",
            "Bedroom",
            "Kitchen",
            "Bathroom",
            "Balcony"
          ]}
        />
        <PricingCard
          title="3 Room Apartment"
          price="$250,000"
          period="Total Price"
          features={[
            "Living Room",
            "2 Bedrooms",
            "Kitchen",
            "2 Bathrooms",
            "Balcony"
          ]}
          isPopular
        />
        <PricingCard
          title="4 Room Apartment"
          price="$375,000"
          period="Total Price"
          features={[
            "Living Room",
            "3 Bedrooms",
            "Kitchen",
            "2 Bathrooms",
            "Large Balcony"
          ]}
        />
      </div>
    </div>
  </section>
);

const PricingCard: React.FC<PricingCardProps> = ({ title, price, period, features, isPopular }) => (
  <div className={`bg-white rounded-lg p-8 ${isPopular ? 'ring-2 ring-green-500 relative' : ''}`}>
    {isPopular && (
      <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
        Popular
      </span>
    )}
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <div className="mb-6">
      <div className="text-3xl font-bold">{price}</div>
      <div className="text-gray-500 text-sm">{period}</div>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
    <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition">
      Choose plan
    </button>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItemProps[] = [
    {
      question: "Can I get information about the IFRS 16 standard?",
      answer: "IFRS 16 is an International Financial Reporting Standard promulgated by the International Accounting Standards Board providing guidance on accounting for leases."
    },
    {
      question: "Is someone on the availability of the IFRS team from questions?",
      answer: "Yes, our IFRS team is available to answer your questions during business hours. You can reach them via email or phone."
    },
    {
      question: "Can I request demos of your IFRS team and ask in-depth questions?",
      answer: "Absolutely! We offer comprehensive demos and consultation sessions. Contact us to schedule a meeting with our team."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">FAQ.</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left py-4"
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <p className="text-gray-600 pb-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
)}

const CTA = () => (
  <section className="py-20 px-6 bg-gray-900 text-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Sed ut ipsum mi volutpat duis ut diam rhoncus amet amet et quis. Vestibulum quis varius cursus ut rhoncus vitae.
      </h2>
      <p className="text-gray-400 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
      </p>
    </div>
  </section>
);

const Contact = () => (
  <section className="py-20 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-12">Contact.</h2>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="font-bold text-xl mb-6">Form</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            <textarea
              placeholder="Your message"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
            />
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
              Send message
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-xl mb-6">Contact form</h3>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <MapPin className="w-12 h-12 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 mt-12">
        <div>
          <h3 className="font-bold text-xl mb-6">Address</h3>
          <p className="text-gray-600 mb-4">
            123 Business Street<br />
            New York, NY 10001<br />
            United States
          </p>
        </div>
        
        <div>
          <h3 className="font-bold text-xl mb-6">Reach us</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5" />
              <span>info@prosper.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Facebook className="w-5 h-5" />
              <span>Facebook</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div className="flex flex-col items-center">
          <img src="https://via.placeholder.com/60" alt="Brand 1" className="h-12 mb-2 opacity-60" />
        </div>
        <div className="flex flex-col items-center">
          <img src="https://via.placeholder.com/60" alt="Brand 2" className="h-12 mb-2 opacity-60" />
        </div>
        <div className="flex flex-col items-center">
          <img src="https://via.placeholder.com/60" alt="Brand 3" className="h-12 mb-2 opacity-60" />
        </div>
        <div className="flex flex-col items-center">
          <img src="https://via.placeholder.com/60" alt="Brand 4" className="h-12 mb-2 opacity-60" />
        </div>
        <div className="flex flex-col items-center">
          <img src="https://via.placeholder.com/60" alt="Brand 5" className="h-12 mb-2 opacity-60" />
        </div>
      </div>
      
      <div className="relative h-64 rounded-lg overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=400&fit=crop" 
          alt="Footer" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Prosper.</h3>
            <p className="text-gray-300 max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-4xl font-bold mb-2">50k</div>
          <div className="text-gray-400 text-sm">Rental members</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">21</div>
          <div className="text-gray-400 text-sm">Properties</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">143</div>
          <div className="text-gray-400 text-sm">Housing units</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">17</div>
          <div className="text-gray-400 text-sm">Years experience</div>
        </div>
      </div>
    </div>
  </footer>
);

// Main App
const HeroSection = () => {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <AboutSection />
      <ArchitectureSection />
      <Gallery />
      <Pricing />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
};

export default HeroSection
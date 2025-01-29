import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  Home, 
  Scissors, 
  Users, 
  Heart, 
  HelpCircle, 
  Mail, 
  LogIn, 
  Menu, 
  X,
  ArrowRight,
  Sparkles,
  GraduationCap,
  HandHeart,
  Clock,
  CheckCircle2
} from 'lucide-react';
import NavBar from './Navbar'; // Importing NavBar component

const JoinUsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/apply-now');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavBar />
      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Rural tailors working"
            className="w-full h-[600px] object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Empowering Rural Artisans, One Stitch at a Time</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in bringing fashion to the world while uplifting communities through craftsmanship
          </p>
          <button onClick={handleNavigation} className="inline-flex items-center px-8 py-3 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors">
            Join the Movement
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          
        </div>
      </div>

      {/* Why Join Us Section */}
      <section className="py-16 bg-white text-center z-20">
        <h2 className="text-3xl font-bold text-rose-600 mb-6">Why Join Us?</h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="text-gray-600">
            <h3 className="text-2xl font-semibold mb-4">Fair Pay</h3>
            <p>Earn directly for your hard work, ensuring fair compensation without intermediaries taking a cut.</p>
          </div>
          <div className="text-gray-600">
            <h3 className="text-2xl font-semibold mb-4">Skill Development</h3>
            <p>Take part in workshops and training to enhance your craft and expand your skills.</p>
          </div>
          <div className="text-gray-600">
            <h3 className="text-2xl font-semibold mb-4">Flexible Work Hours</h3>
            <p>Work at your own pace, set your schedule, and choose the projects that fit your skills and availability.</p>
          </div>
          <div className="text-gray-600">
            <h3 className="text-2xl font-semibold mb-4">Supportive Community</h3>
            <p>Join a network of artisans who support each other’s growth and share knowledge to help each other thrive.</p>
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-rose-600 mb-6">Social Impact</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          By joining Stitchvastra, you are not just creating beautiful clothes, you are part of a movement that empowers rural communities and reduces the reliance on exploitative practices.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-gray-600">
            <Sparkles className="mx-auto mb-4 text-rose-600 w-16 h-16" />
            <h3 className="text-xl font-semibold">Empowering Communities</h3>
            <p>We provide opportunities for artisans to thrive, reducing poverty and inequality.</p>
          </div>
          <div className="text-gray-600">
            <HandHeart className="mx-auto mb-4 text-rose-600 w-16 h-16" />
            <h3 className="text-xl font-semibold">Sustainable Fashion</h3>
            <p>Our platform promotes sustainable practices, supporting environmentally conscious fashion choices.</p>
          </div>
          <div className="text-gray-600">
            <Clock className="mx-auto mb-4 text-rose-600 w-16 h-16" />
            <h3 className="text-xl font-semibold">Timeless Craftsmanship</h3>
            <p>Celebrate traditional tailoring skills that are passed down through generations.</p>
          </div>
        </div>
      </section>

      {/* Equality Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-rose-600 mb-6">Equality & Empowerment</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          We believe in providing equal opportunities for all. Whether you're a woman tailor or a man artisan, Stitchvastra stands by you, promoting inclusivity and fairness across all aspects of our platform.
        </p>
        <div className="flex justify-center">
          <CheckCircle2 className="w-10 h-10 text-rose-600 mx-4" />
          <CheckCircle2 className="w-10 h-10 text-rose-600 mx-4" />
          <CheckCircle2 className="w-10 h-10 text-rose-600 mx-4" />
        </div>
        <p className="mt-6 text-lg text-gray-600">
          Join us and be a part of a community that embraces diversity, supports growth, and believes in equality for all artisans.
        </p>
      </section>

      {/* Benefits of Joining Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-rose-600 mb-6">Benefits of Joining</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-gray-600">
            <GraduationCap className="mx-auto mb-4 text-rose-600 w-16 h-16" />
            <h3 className="text-xl font-semibold">Grow Your Skills</h3>
            <p>Take part in workshops and earn certifications to boost your credibility and craftsmanship.</p>
          </div>
          <div className="text-gray-600">
            <Users className="mx-auto mb-4 text-rose-600 w-16 h-16" />
            <h3 className="text-xl font-semibold">Be Part of a Network</h3>
            <p>Connect with fellow tailors, share tips, and collaborate on larger projects.</p>
          </div>
          <div className="text-gray-600">
            <Heart className="mx-auto mb-4 text-rose-600 w-16 h-16" />
            <h3 className="text-xl font-semibold">Make a Difference</h3>
            <p>Your work helps empower communities, providing fair wages and opportunities for growth.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-rose-600 mb-6">Ready to Join the Vastrakar Revolution?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Become a part of a movement that’s changing lives and shaping the future of fashion.
        </p>
        <button onClick={handleNavigation} className="inline-flex items-center px-8 py-3 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors">
          Join Us Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Scissors className="h-8 w-8 text-rose-500" />
                <span className="ml-2 text-xl font-bold">StitchVastra</span>
              </div>
              <p className="text-gray-400">Empowering rural artisans through sustainable fashion</p>
            </div>
            {/* Other footer content remains unchanged */}
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StitchVastra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default JoinUsPage;
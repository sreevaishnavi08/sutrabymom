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
import NavBar from './Navbar';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const JoinUsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    
    const handleNavigation = () => {
        navigate('/apply-now');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <NavBar />
            
            {/* Carousel Section */}
            <Carousel showThumbs={false} autoPlay infiniteLoop className="w-full h-screen relative">
                <div className="relative">
                    <img className="w-full h-screen object-cover" src="https://media.istockphoto.com/id/1279929429/photo/textile-workers-standing-together-in-solidarity.jpg?s=612x612&w=0&k=20&c=0ammy7JB_2Q9Y44mqOmrwIps9hGTmduUWrc17gLBQ_A=" alt="Artisans working" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button onClick={handleNavigation} className="bg-rose-600 text-white font-semibold text-lg px-6 py-3 rounded-lg hover:bg-rose-700 transition flex items-center">
                            Join the Movement <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <img className="w-full h-screen object-cover" src="https://media.istockphoto.com/id/1070163056/photo/mother-with-daughter-holding-piggy-bank.jpg?s=612x612&w=0&k=20&c=zW0RI03vZcd8zBmnxKPUw4zOi8IQn_NpAHk3C7Lt2uw=" alt="Tailor stitching" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button onClick={handleNavigation} className="bg-rose-600 text-white font-semibold text-lg px-6 py-3 rounded-lg hover:bg-rose-700 transition flex items-center">
                            Join the Movement <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="relative">
    <img 
        className="w-full h-screen object-cover" 
        src="https://media.istockphoto.com/id/1614203798/photo/rural-indian-woman-using-sewing-machine-while-her-young-daughter-studying-behind-her.jpg?s=612x612&w=0&k=20&c=TTxU5H7HA55fHcy0OoKzfhrQ9Y_pWyVE83T3FEAnrSw=" 
        alt="Mother tailor stitching while her daughter studies behind her" 
    />
    <div className="absolute inset-0 flex items-center justify-center">
        <button 
            onClick={handleNavigation} 
            className="bg-rose-600 text-white font-semibold text-lg px-6 py-3 rounded-lg hover:bg-rose-700 transition flex items-center"
        >
            Join the Movement <ArrowRight className="ml-2 w-5 h-5" />
        </button>
    </div>
</div>

            </Carousel>

            {/* Why Join Us Section */}
            <section className="py-16 bg-white text-center z-20 mt-24">
                <h2 className="text-3xl font-bold text-rose-600 mb-6">Why Join Us?</h2>
                <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10">
                    <div className="text-gray-600">
                        <h3 className="text-2xl font-semibold mb-4">Fair Pay</h3>
                        <p>Earn directly for your hard work, ensuring fair compensation.</p>
                    </div>
                    <div className="text-gray-600">
                        <h3 className="text-2xl font-semibold mb-4">Skill Development</h3>
                        <p>Participate in training to enhance your craft and expand your skills.</p>
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
            <p>2024 StitchVastra. All rights reserved.</p>
          </div>
        </div>
      </footer>
        </div>
    );
};

export default JoinUsPage;
import React, { useState } from 'react';


const roles = [
  { id: 1, title: 'Tailor', description: 'Expert in stitching and designing custom clothes.' },
  { id: 2, title: 'Maggam Work Specialist', description: 'Skilled in hand embroidery and maggam designs.' },
  { id: 3, title: 'Tassel Worker', description: 'Creates intricate tassels for garments.' },
  { id: 4, title: 'Embroidery Artist', description: 'Expert in embroidery with unique patterns.' },
];

const ApplyNow = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [applicant, setApplicant] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleApply = (role: string) => {
    setSelectedRole(role);
    setIsSubmitted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application Submitted:', { ...applicant, role: selectedRole });
    setIsSubmitted(true);
    setApplicant({ name: '', email: '', phone: '', skills: '' });
    setSelectedRole(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Join Our Team</h1>
      <p className="text-gray-600 mb-4">We are looking for skilled professionals to join our growing team.</p>

      {/* Role List */}
      <ul className="space-y-4">
        {roles.map((role) => (
          <li key={role.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{role.title}</h3>
                <p className="text-gray-600">{role.description}</p>
              </div>
              <button
                onClick={() => handleApply(role.title)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Apply
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Application Form */}
      {selectedRole && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Apply for {selectedRole}</h2>
          {isSubmitted ? (
            <p className="text-green-600">Thank you for applying! We will contact you soon.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  value={applicant.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="p-3 border border-gray-300 rounded-lg w-full"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={applicant.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="p-3 border border-gray-300 rounded-lg w-full"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={applicant.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  className="p-3 border border-gray-300 rounded-lg w-full"
                  required
                />
                <textarea
                  name="skills"
                  value={applicant.skills}
                  onChange={handleChange}
                  placeholder="Describe your skills and experience"
                  className="p-3 border border-gray-300 rounded-lg w-full"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};


export default ApplyNow;
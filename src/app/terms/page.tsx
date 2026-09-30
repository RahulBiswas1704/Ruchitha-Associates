export const metadata = {
  title: "Terms & Conditions | Ruchitha Associates",
};

export default function TermsPage() {
  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-brand-blue mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <p>
            Welcome to Ruchitha Associates. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="text-2xl font-bold text-brand-blue mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By using our services, enrolling in our training programs, or using our placement assistance, you accept these terms in full. If you disagree with these terms, you must not use our website or services.</p>

          <h2 className="text-2xl font-bold text-brand-blue mt-8 mb-4">2. Services Provided</h2>
          <p>Ruchitha Associates provides skill development training, placement assistance, and manpower recruitment services. While we strive for 100% placement assistance, we do not guarantee employment, as hiring decisions are ultimately made by the employers based on candidates' performance and eligibility.</p>

          <h2 className="text-2xl font-bold text-brand-blue mt-8 mb-4">3. User Obligations</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Candidates:</strong> You agree to provide accurate and truthful information regarding your education, skills, and experience. Falsifying information may result in termination of services.</li>
            <li><strong>Employers:</strong> You agree to use candidate data solely for recruitment purposes and maintain the confidentiality of the provided profiles.</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-blue mt-8 mb-4">4. Intellectual Property</h2>
          <p>Unless otherwise stated, Ruchitha Associates and/or its licensors own the intellectual property rights in the website and material on the website. All these intellectual property rights are reserved.</p>

          <h2 className="text-2xl font-bold text-brand-blue mt-8 mb-4">5. Limitation of Liability</h2>
          <p>In no event shall Ruchitha Associates, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this website or our services.</p>

          <h2 className="text-2xl font-bold text-brand-blue mt-8 mb-4">6. Governing Law</h2>
          <p>These terms will be governed by and interpreted in accordance with the laws of the State of Telangana, India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Telangana for the resolution of any disputes.</p>
        </div>
      </div>
    </div>
  );
}

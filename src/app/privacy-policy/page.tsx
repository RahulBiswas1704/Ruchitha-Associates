export const metadata = {
  title: "Privacy Policy | Ruchitha Associates",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-brand-blue mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <p>
            Ruchitha Associates ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-bold text-brand-blue mt-8 mb-4">1. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our services. The personal information we collect may include the following:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Details:</strong> Name, email address, phone number, and physical address.</li>
            <li><strong>Professional Details:</strong> Resume/CV, educational qualifications, skill sets, and employment history (specifically for candidates applying for jobs or courses).</li>
            <li><strong>Employer Details:</strong> Company name, contact person, and job requirement details (for employers requesting talent).</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-blue mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect or receive for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To facilitate account creation and logon process.</li>
            <li>To match candidates with potential employers and training programs.</li>
            <li>To send administrative information to you.</li>
            <li>To fulfill and manage your requests for services.</li>
            <li>To communicate with you regarding updates, offers, and services.</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-blue mt-8 mb-4">3. Sharing Your Information</h2>
          <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. For instance, candidate profiles and resumes will be shared with prospective employers as part of our placement services.</p>

          <h2 className="text-2xl font-bold text-brand-blue mt-8 mb-4">4. Data Security</h2>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. However, please be aware that no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

          <h2 className="text-2xl font-bold text-brand-blue mt-8 mb-4">5. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <p className="mt-4">
            <strong>Ruchitha Associates</strong><br/>
            Email: Hr.ruchithaassociates@gmail.com<br/>
            Phone: +91 7674074055
          </p>
        </div>
      </div>
    </div>
  );
}

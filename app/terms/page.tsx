import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Aurlink',
  description: 'Read the Aurlink Terms of Service governing your use of our platform, services, and website.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-300">
            Last updated: December 2024
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <p className="text-gray-300 mb-6">
              Welcome to Aurlink. These Terms of Service govern your use of our website, services, and platform. By accessing or using our services, you agree to be bound by these terms.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-6">
              By accessing and using Aurlink's services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Use License</h2>
            <p className="text-gray-300 mb-4">
              Permission is granted to temporarily use Aurlink's services for personal or commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mb-6">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or public display</li>
              <li>Attempt to reverse engineer any software contained on Aurlink</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Account Registration</h2>
            <p className="text-gray-300 mb-6">
              You may be required to register with our service. You agree to keep your password confidential and will be responsible for all use of your account and password.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Intellectual Property</h2>
            <p className="text-gray-300 mb-6">
              The Service and its original content, features, and functionality are and will remain the exclusive property of Aurlink and its licensors.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Termination</h2>
            <p className="text-gray-300 mb-6">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Governing Law</h2>
            <p className="text-gray-300 mb-6">
              These Terms shall be governed and construed in accordance with the laws of the jurisdiction where Aurlink Foundation is established, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Changes to Terms</h2>
            <p className="text-gray-300 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Contact Information</h2>
            <p className="text-gray-300">
              If you have any questions about these Terms, please contact us at:{' '}
              <span className="text-[#00F5FF]">legal@aurlink.io</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Aurlink',
  description: 'Learn how Aurlink collects, uses, and protects your personal information in accordance with privacy laws and best practices.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-300">
            Last updated: December 2024
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <p className="text-gray-300 mb-6">
              At Aurlink, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect information that you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mb-6">
              <li>Contact information (name, email address)</li>
              <li>Account credentials</li>
              <li>Transaction data</li>
              <li>Communication preferences</li>
              <li>Technical information about your device</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mb-6">
              <li>Provide and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Improve our services and develop new features</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Security</h2>
            <p className="text-gray-300 mb-6">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Your Rights</h2>
            <p className="text-gray-300 mb-4">
              You have the right to:
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mb-6">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify or update your personal data</li>
              <li>Delete your personal data</li>
              <li>Restrict or object to our processing of your data</li>
              <li>Data portability</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-2">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-[#00F5FF]">
              privacy@aurlink.io
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
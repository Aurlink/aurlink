import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Aurlink',
  description: 'Learn about how Aurlink uses cookies and similar technologies to enhance your experience on our platform.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-300">
            Last updated: December 2024
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <p className="text-gray-300 mb-6">
              This Cookie Policy explains how Aurlink uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">What are cookies?</h2>
            <p className="text-gray-300 mb-6">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Why do we use cookies?</h2>
            <p className="text-gray-300 mb-4">
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Essential Cookies</h3>
            <p className="text-gray-300 mb-4">
              These cookies are necessary for the website to function and cannot be switched off in our systems.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Performance Cookies</h3>
            <p className="text-gray-300 mb-4">
              These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Functional Cookies</h3>
            <p className="text-gray-300 mb-4">
              These cookies enable the website to provide enhanced functionality and personalization.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Targeting Cookies</h3>
            <p className="text-gray-300 mb-6">
              These cookies may be set through our site by our advertising partners to build a profile of your interests.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">How can I control cookies?</h2>
            <p className="text-gray-300 mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mb-6">
              <li>Modifying your browser settings to refuse cookies</li>
              <li>Using our cookie preference center</li>
              <li>Opting out of specific third-party cookies</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Updates to This Policy</h2>
            <p className="text-gray-300 mb-6">
              We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about our use of cookies, please contact us at:{' '}
              <span className="text-[#00F5FF]">privacy@aurlink.io</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
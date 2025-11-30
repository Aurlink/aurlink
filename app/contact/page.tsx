import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Get in Touch with Aurlink',
  description: 'Get in touch with the Aurlink team. We\'re here to answer your questions and discuss opportunities.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get in <span className="text-[#00F5FF]">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about Aurlink? We'd love to hear from you. 
            Reach out and our team will get back to you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'General Inquiries',
                  email: 'info@aurlink.io',
                  description: 'For general questions and information',
                },
                {
                  title: 'Partnerships',
                  email: 'partners@aurlink.io',
                  description: 'For business development and partnerships',
                },
                {
                  title: 'Careers',
                  email: 'careers@aurlink.io',
                  description: 'For job applications and career opportunities',
                },
                {
                  title: 'Technical Support',
                  email: 'support@aurlink.io',
                  description: 'For technical questions and developer support',
                },
              ].map((contact, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-2">{contact.title}</h3>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-[#00F5FF] hover:underline block mb-2"
                  >
                    {contact.email}
                  </a>
                  <p className="text-gray-300 text-sm">{contact.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00F5FF] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00F5FF] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00F5FF] transition-colors"
                  placeholder="What is this regarding?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00F5FF] transition-colors"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#00F5FF] text-[#0A0F2C] font-semibold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
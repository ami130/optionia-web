import { Mail, Phone, MapPin } from "lucide-react";
import PageHeader from "@/shared/components/PageHeader";

export default function ContactPage() {
  return (
    <div className="px-4 lg:px-0">
      {/* Page Header */}
      <PageHeader
        text="Let’s Build the Future of Voice Together"
        subtitle="Have a project, partnership idea, or want to learn more about Giga’s AI voice agents? 
        Get in touch with our team — we’d love to hear from you."
        title="hello"
      />

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Contact Info */}
        <div
          data-aos="fade-up"
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-baseColor/20 p-8 space-y-6"
        >
          <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
            Contact Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Reach out to our team via email, phone, or visit our office. We’ll
            respond as soon as possible.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Mail className="text-baseColor" size={20} />
              <span>contact@giga.ai</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Phone className="text-baseColor" size={20} />
              <span>+1 (555) 123-4567</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <MapPin className="text-baseColor" size={20} />
              <span>123 Innovation Drive, San Francisco, CA</span>
            </div>
          </div>

          {/* Optional: Map */}
          <div className="mt-8">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.165225!2d-122.401!3d37.785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f1bb1b9f%3A0xe4d3a5d58d41b53!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1697050000000!5m2!1sen!2sus"
              className="w-full h-64 rounded-xl border border-baseColor/20"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-baseColor/20 p-8 space-y-6"
        >
          <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
            Send Us a Message
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className="border border-gray-300 dark:border-gray-700 bg-transparent rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-baseColor"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="border border-gray-300 dark:border-gray-700 bg-transparent rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-baseColor"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="border border-gray-300 dark:border-gray-700 bg-transparent rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-baseColor"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              placeholder="Write your message..."
              rows={5}
              className="border border-gray-300 dark:border-gray-700 bg-transparent rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-baseColor resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-baseColor text-white font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 w-full sm:w-auto"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Bottom Divider */}
      <div className="border border-baseColor max-w-4xl mx-auto my-16"></div>
    </div>
  );
}

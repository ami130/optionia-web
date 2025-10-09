"use client";
import React from "react";
import Image from "next/image";
import { CalendarDays, User } from "lucide-react";

export default function BlogDetails() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-16">
      {/* Blog Header */}
      <div
        data-aos="fade-up"
        className="max-w-4xl mx-auto text-center space-y-4 mb-10"
      >
        <h1 className="text-3xl md:text-5xl font-serif font-semibold tracking-wide">
          Engineering Toward a Trillion Enterprise Interactions
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>By John Doe</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays size={16} />
            <span>October 5, 2025</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div
        data-aos="zoom-in"
        className="relative max-w-5xl mx-auto w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg"
      >
        <Image
          src="/images/blog-cover.jpg" // 👈 replace with your actual image
          alt="Blog Featured Image"
          fill
          className="object-cover"
        />
      </div>

      {/* Blog Content */}
      <article
        data-aos="fade-up"
        data-aos-delay="100"
        className="max-w-3xl mx-auto mt-10 text-gray-700 leading-relaxed space-y-6 text-sm sm:text-base"
      >
        <p>
          Artificial intelligence is transforming how enterprises interact with
          customers. By blending frontier research with scalable systems, we are
          designing AI agents that communicate naturally, reliably, and
          securely. Our goal: enable a trillion meaningful enterprise
          interactions across voice and digital channels.
        </p>

        <h2 className="text-xl font-serif font-semibold mt-8">
          Voice as the Future of Enterprise AI
        </h2>
        <p>
          Voice remains the most intuitive interface for human communication.
          The next wave of AI agents will harness speech understanding and
          synthesis to build human-like empathy and responsiveness in enterprise
          contexts. This evolution requires innovations in real-time inference,
          multimodal learning, and context-aware reasoning.
        </p>

        <blockquote className="border-l-4 border-base pl-4 italic text-gray-600">
          “AI should amplify human capability, not replace it. The best systems
          feel natural, trustworthy, and deeply contextual.”
        </blockquote>

        <h2 className="text-xl font-serif font-semibold mt-8">
          The Challenge of Scale
        </h2>
        <p>
          Building AI that can handle billions of voice interactions requires
          more than accuracy—it demands resilience, low latency, and seamless
          integration with enterprise infrastructure. At Giga, we deploy models
          optimized for production-grade throughput, enabling reliable
          large-scale deployment without compromising quality.
        </p>

        <p>
          As enterprises embrace conversational AI, the focus is shifting from
          proof-of-concept to impact—reducing support costs, improving customer
          satisfaction, and automating routine workflows while maintaining a
          personal touch.
        </p>
      </article>

      {/* Author Box */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="max-w-3xl mx-auto mt-16 bg-gray-50 dark:bg-neutral-900 border border-base/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6"
      >
        <Image
          src="/images/author.jpg" // 👈 replace with author image
          alt="Author"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <div className="text-center sm:text-left space-y-2">
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-sm text-gray-500">
            Senior AI Engineer at Giga. Passionate about language models,
            multimodal systems, and building human-like digital experiences.
          </p>
        </div>
      </div>
    </section>
  );
}

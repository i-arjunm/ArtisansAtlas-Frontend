import React from 'react';

const faqs = [
  {
    question: "What makes ArtisansAtlas different?",
    answer: "We directly connect you with skilled artisans worldwide, ensuring fair compensation and authentic handcrafted pieces. Every purchase supports traditional craftsmanship and sustainable practices."
  },
  {
    question: "How do you ensure product quality?",
    answer: "Each artisan undergoes a rigorous vetting process, and we personally review all products for quality and authenticity. We also collect detailed customer feedback to maintain our high standards."
  },
  {
    question: "Do you support fair trade practices?",
    answer: "Absolutely! We ensure artisans receive fair compensation for their work, typically 60-70% of the sale price. We also invest in artisan communities through education and infrastructure programs."
  },
  {
    question: "How do you support artisan communities?",
    answer: "Beyond fair compensation, we provide artisans with business training, marketing support, and access to global markets. We also reinvest in their communities through various social impact initiatives."
  }
];

function WhyArtisansAtlas() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-text-primary mb-8 text-center">Why Choose ArtisansAtlas?</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-display font-semibold text-primary mb-6">Our Commitment to Artisans</h2>
          <p className="text-text-muted mb-4">At ArtisansAtlas, we believe in preserving traditional craftsmanship while empowering artisans to thrive in the modern world. Our platform bridges the gap between skilled craftspeople and conscious consumers who value authentic, handmade goods.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-sand p-6 rounded-lg">
            <h3 className="text-xl font-display font-semibold text-primary mb-3">Fair Compensation</h3>
            <p className="text-text-muted">We ensure artisans receive the majority of each sale, supporting sustainable livelihoods and traditional craft preservation.</p>
          </div>
          <div className="bg-sand p-6 rounded-lg">
            <h3 className="text-xl font-display font-semibold text-primary mb-3">Quality Assurance</h3>
            <p className="text-text-muted">Each product is carefully vetted for quality and authenticity, ensuring you receive genuine handcrafted pieces.</p>
          </div>
          <div className="bg-sand p-6 rounded-lg">
            <h3 className="text-xl font-display font-semibold text-primary mb-3">Community Impact</h3>
            <p className="text-text-muted">We invest in artisan communities through education, infrastructure, and sustainable development programs.</p>
          </div>
          <div className="bg-sand p-6 rounded-lg">
            <h3 className="text-xl font-display font-semibold text-primary mb-3">Global Reach</h3>
            <p className="text-text-muted">We connect artisans with customers worldwide, helping preserve and promote traditional craftsmanship.</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-display font-semibold text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2">{faq.question}</h3>
                <p className="text-text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyArtisansAtlas;
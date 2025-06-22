import React from "react";

const About = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Locale Michigan</h1>
        <p className="text-lg text-gray-600">
          Locale Michigan was born out of a simple belief: every town, city, and
          community in the Great Lakes State has a story worth sharing. We're
          here to make that story accessible, insightful, and beautifully
          mapped.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p>
          We blend public data, local culture, and thoughtful design to offer an
          engaging, information-rich platform for exploring Michigan
          municipalities—from population trends to civic connections.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>📊 City Profiles with Demographics</li>
          <li>📍 Interactive Maps and Coordinates</li>
          <li>🤝 Sister City and Cultural Ties</li>
          <li>🌦️ Live Local Weather Integrations</li>
          <li>🔗 Official Sites and Social Links</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Built for Everyone</h2>
        <p>
          Whether you're a resident, researcher, traveler, or just
          Michigan-curious, Locale Michigan gives you quick access to the data
          and context that matter.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p>
          Have suggestions or spot something we missed? Reach us anytime at{" "}
          <a
            href="mailto:hello@localemichigan.com"
            className="link link-primary"
          >
            contact@localemichigan.com
          </a>
          . We'd love to hear from you!
        </p>
      </section>
    </main>
  );
};

export default About;

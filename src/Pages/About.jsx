import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About ShopEase</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#5141E4FF]">Our Story</h2>
          <p className="text-gray-600">
            ShopEase is your one-stop destination for all your shopping needs.
            We started with a simple mission: to make online shopping easy,
            enjoyable, and accessible to everyone.
          </p>
          <p className="text-gray-600">
            Our platform offers a wide range of products from various
            categories, ensuring that you find exactly what you're looking for.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#5141E4FF]">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Wide selection of quality products</li>
            <li>Secure and easy payment options</li>
            <li>Fast and reliable delivery</li>
            <li>Excellent customer service</li>
            <li>User-friendly shopping experience</li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-[#5141E4FF] mb-4">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Easy Shopping</h3>
            <p className="text-gray-600">
              Browse through our extensive collection of products with ease.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Shop with confidence using our secure payment system.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our customer support team is always ready to help you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

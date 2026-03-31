"use client";

import { title } from "@/components/primitives";
import { Card, CardBody } from "@heroui/card";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-[80vw] flex flex-col gap-12 py-12 md:py-20">
      <div className="text-center">
        <h1 className={title({ size: "xl", color: "red", class: "text-4xl md:text-6xl lg:text-7xl mb-4" })}>
          Contact Us!
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-default-500 font-medium max-w-3xl mx-auto">
          Whether you're a student looking to join or an industry partner interested in our project, we'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Contact Info and Map */}
        <Card className="border-none bg-default-50 dark:bg-default-100/50 shadow-none p-4">
          <CardBody className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 text-center items-center">
              <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-default-800">
                <svg
                  className="text-[#EE3124] flex-shrink-0"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Kerr Hall North KHN 3F, 350 Victoria St., Toronto ON M5B 2K3</span>
              </div>
            </div>
            
            <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-divider">
              <iframe
                src="https://maps.google.com/maps?q=Kerr%20Hall&z=16&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Baja SAE Team Location"
              ></iframe>
            </div>
          </CardBody>
        </Card>

        {/* Call to Action Section */}
        <div className="flex flex-col gap-8 text-left">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-black italic tracking-tight uppercase">
              VISIT OUR <span className="text-[#EE3124]">WORKSHOP</span>
            </h2>
            <p className="text-default-600 leading-relaxed text-lg">
              Our team operates out of Kerr Hall at Toronto Metropolitan University. If you want to see our car in person or discuss technical details, feel free to drop by during our meeting hours.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold uppercase tracking-widest text-[#EE3124]">Direct Contact</h3>
            <div className="flex flex-col gap-3">
              <p className="text-default-700 font-bold text-xl md:text-2xl flex items-center gap-3">
                <span className="text-[#EE3124]">Email:</span> bajasae@torontomu.ca
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

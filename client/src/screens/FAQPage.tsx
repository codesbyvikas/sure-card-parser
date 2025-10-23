import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Which banks are supported?",
    answer: "We currently support Kotak Mahindra Bank, Flipkart Axis Bank, and HDFC Bank.",
  },
  {
    question: "Can I upload locked PDFs?",
    answer: "No, only unlocked PDFs are supported. Locked PDFs cannot be parsed.",
  },
  {
    question: "How long does parsing take?",
    answer: "Parsing usually completes in a few seconds depending on the file size.",
  },
  {
    question: "Is my data stored?",
    answer: "No, your data is processed securely and never stored on our servers.",
  },
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-background-dark min-h-screen font-display px-4 py-10 sm:px-6 md:px-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
        Frequently Asked Questions
      </h1>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#1A1F26] rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-200 hover:bg-[#222832]"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex justify-between items-center">
              <p className="text-white font-semibold text-sm sm:text-base">{faq.question}</p>
              {openIndex === index ? (
                <ChevronUp className="text-white" size={20} />
              ) : (
                <ChevronDown className="text-white" size={20} />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-300 text-xs sm:text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;

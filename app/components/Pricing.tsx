import React from "react";
import styles from "./Pricing.module.css"; // Custom CSS module

interface PricingPlan {
  name: string;
  description: string[];
  buttonText: string;
  className: string; // For custom styling
}

interface PricingProps {
  plans: PricingPlan[];
}

const Pricing: React.FC<PricingProps> = ({ plans }) => {
  return (
    <div className="text-center py-12 bg-gray-50">
      <h2 className={styles.subheading}>Pricing</h2>
      <h1 className={styles.heading}>Our Offers</h1>

      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            className={`relative p-6 w-full sm:w-1/2 md:w-1/4 bg-white shadow-lg rounded-xl transition-transform duration-300 transform hover:scale-105 ${plan.className}`}
            key={plan.name}
          >

            <h3
              className={`${styles.planHeading} text-black text-2xl font-semibold text-center mb-4 py-2 rounded-t-xl`}
            >
              {plan.name}
            </h3>
            <ul className="space-y-3 mb-6">
              {plan.description.map((feature) => (
                <li key={feature} className="flex items-center text-gray-700">
                  <span className="mr-2 text-green-500">✔</span> {feature}
                </li>
              ))}
            </ul>
            <button className={`${styles.customButton} mx-auto block`}>
              {plan.buttonText}
            </button>
            <p className="text-center text-gray-500 mt-4">
              Choose your {plan.name} plan!
            </p>
            {plan.name === "Custom" && (
              <span className={`${styles.ribbon} absolute`}>YOU DESIGN</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;

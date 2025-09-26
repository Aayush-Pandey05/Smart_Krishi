import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Heart, Leaf, Shield, Users, Award, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const valuesData = [
  {
    icon: Target,
    title: 'Innovation',
    description: 'Leveraging cutting-edge AI technology to solve real farming challenges.',
  },
  {
    icon: Heart,
    title: 'Farmer-First',
    description: 'Every feature is designed with farmers\' needs and practical use in mind.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Promoting eco-friendly farming practices for a greener future.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'Providing accurate, trustworthy information farmers can depend on.',
  },
];

const impactData = [
  {
    icon: Users,
    endValue: 10000,
    label: 'Active Farmers',
    suffix: '+',
  },
  {
    icon: Award,
    endValue: 95,
    label: 'Accuracy Rate',
    suffix: '%',
  },
  {
    icon: Leaf,
    endValue: 50,
    label: 'Crop Types',
    suffix: '+',
  },
  {
    icon: Globe,
    endValue: 25,
    label: 'Countries',
    suffix: '+',
  },
];

const ValuesAndImpact = () => {
  const componentRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // ✅ SIMPLIFIED ANIMATION FOR "OUR VALUES"
      // This now targets the entire grid and applies a simple fade-in.
      gsap.from(".values-grid", {
        opacity: 0,
        duration: 1.5, // A longer duration for a smoother effect
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: ".values-grid",
          start: "top 80%",
        },
      });

      // Animation for "Our Impact" stats (remains unchanged)
      gsap.from(".impact-stat", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ".impact-grid",
          start: "top 80%",
        },
        immediateRender: false,
      });
      
      // Animation for number counters (remains unchanged)
      gsap.utils.toArray(".impact-number").forEach(elem => {
        const end = parseFloat(elem.getAttribute('data-end'));
        const suffix = elem.getAttribute('data-suffix') || '';
        
        gsap.to(elem, {
          textContent: end,
          duration: 2,
          ease: "power1.inOut",
          snap: { textContent: 1 },
          modifiers: {
            textContent: value => Math.ceil(value).toLocaleString() + suffix
          },
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
          }
        });
      });

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} className="font-sans">
      {/* Our Values Section */}
      <section className="py-12 bg-green-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-16">
            The principles that guide everything we do at AgriAI Assistant.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 values-grid">
            {valuesData.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm value-card">
                  <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            Numbers that reflect our commitment to helping farmers succeed worldwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 impact-grid">
            {impactData.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="impact-stat">
                  <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10" />
                  </div>
                  <span
                    className="block text-4xl font-bold text-gray-800 impact-number"
                    data-end={stat.endValue}
                    data-suffix={stat.suffix}
                  >
                    0{stat.suffix}
                  </span>
                  <p className="text-gray-600 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ValuesAndImpact;
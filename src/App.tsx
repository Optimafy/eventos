/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Differentials } from './components/Differentials';
import { EventTypes } from './components/EventTypes';
import { InteractiveTour } from './components/InteractiveTour';
import { Gallery } from './components/Gallery';
import { BudgetCalculator } from './components/BudgetCalculator';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  const [selectedEventTypeForBudget, setSelectedEventTypeForBudget] = useState<string>('casamentos');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectEventType = (typeId: string) => {
    setSelectedEventTypeForBudget(typeId);
    scrollTo('calculadora');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* Top Bar with One-Row 3-Zone Contract */}
      <Header onOpenBudgetModal={() => scrollTo('orcamento')} />

      {/* Hero Section with Parallax & Pulsing CTA */}
      <Hero
        onCheckAvailability={() => scrollTo('orcamento')}
        onExploreTour={() => scrollTo('ambientes')}
      />

      {/* Differentials with Stagger Scroll Animations */}
      <Differentials />

      {/* Event Types Segmentation with Interactive Reveal */}
      <EventTypes onSelectEventType={handleSelectEventType} />

      {/* Interactive Tour of Venue Spaces */}
      <InteractiveTour onBookVisit={() => scrollTo('orcamento')} />

      {/* Masonry Photo Gallery with Lightbox */}
      <Gallery />

      {/* Interactive Budget Estimator & Dream Calculator */}
      <BudgetCalculator initialEventType={selectedEventTypeForBudget} />

      {/* Social Proof & Emotional Testimonials Carousel */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Final Budget Inquiry Form & Direct Contact */}
      <ContactSection />

      {/* Quiet Footer */}
      <Footer />

      {/* Permanent Floating WhatsApp CTA */}
      <WhatsAppButton />
    </div>
  );
}

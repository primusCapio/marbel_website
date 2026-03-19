import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about our products, ordering process, and delivery.",
};

const faqs = [
    {
        question: "What types of stone do you specialize in?",
        answer: "We specialize in premium quality Marble, Granite, and Kota Stone, sourced from the best quarries in India and around the world."
    },
    {
        question: "How do I calculate the amount of stone I need?",
        answer: "On each product page, we provide a price calculator. Simply enter the area you need to cover in square feet (sq.ft.), and it will automatically calculate the total price for you. For complex projects, we recommend consulting with your contractor or architect."
    },
    {
        question: "Do you deliver all over India?",
        answer: "Yes, we have a robust delivery network that allows us to deliver our products to almost any location across India. Delivery charges are calculated at checkout based on your location."
    },
    {
        question: "What are the payment options?",
        answer: "We offer multiple payment options for your convenience, including Cash on Delivery (COD) and Online Payments (UPI, Credit/Debit Cards, Net Banking)."
    },
    {
        question: "Can I get a quote for a bulk order?",
        answer: "Absolutely. We offer competitive pricing for bulk orders for contractors and architects. Please contact us via our contact page or use the 'Get Quote on WhatsApp' button on any product page to discuss your requirements."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order is dispatched, you will receive a tracking link via email and SMS. You can also contact our customer service for an update on your order status."
    }
]

export default function FAQPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-12">
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                 <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}

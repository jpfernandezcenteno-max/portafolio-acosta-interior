import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { ContactSection } from "@/components/ContactSection";

export default function ContactoPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="pt-16">
        <ContactSection />
      </main>
    </>
  );
}

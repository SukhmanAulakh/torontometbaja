import { Metadata} from "next";

export const metadata: Metadata = {
  title: "Sponsorships",
  description: "Toronto Metropolitan University's Baja SAE's Sponsors and Sponsorship Information",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function SponsorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center">
        {children}
      </div>
    </section>
  );
}

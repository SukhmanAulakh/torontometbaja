import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Toronto Metropolitan University's Baja SAE's Video and Photo Gallery",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full text-center justify-center">
        {children}
      </div>
    </section>
  );
}

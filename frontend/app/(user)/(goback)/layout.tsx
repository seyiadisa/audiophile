import GoBackButton from "@/components/layout/go-back";

export default function GoBackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container_ mt-4 space-y-6 md:mt-8 md:space-y-4 lg:mt-20 lg:space-y-9">
      <GoBackButton />
      {children}
    </div>
  );
}

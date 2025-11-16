interface Partner {
  id: null | number;
  name: string;
  logo: string;
}

const partnersList = async (): Promise<Partner[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/partner/list`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
};

export default async function AssociatedSection() {
  const partners = await partnersList();
  return (
    <>
      <section className="relative py-10 px-6 bg-linear-to-br from-blue-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="px-6 lg:px-8 relative container mx-auto text-center text-black">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center">
            {partners.map((item, i) => (
              <div key={i} className="hover:scale-105 transition-transform duration-300 ">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="mx-auto h-12 object-contain grayscale-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

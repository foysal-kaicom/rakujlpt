export default function AssociatedSection() {
  const brands = [
    {
      name: "JPT",
      img: "/assets/brands/jpt.png",
    },
    {
      name: "JLPT",
      img: "/assets/brands/jlpt.png",
    },
    {
      name: "NAT",
      img: "/assets/brands/nat.png",
    },
    {
      name: "Dhaka University",
      img: "/assets/brands/du.png",
    },

    {
      name: "Kaicom",
      img: "/assets/brands/kaicom.png",
    },
  ];
  return (
    <>
      <section className="relative py-10 px-6 bg-linear-to-br from-blue-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="px-6 lg:px-8 relative container mx-auto text-center text-black">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center">
            {brands.map((item, i) => (
              <div key={i} className="hover:scale-105 transition-transform duration-300 ">
                <img
                  src={item.img}
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

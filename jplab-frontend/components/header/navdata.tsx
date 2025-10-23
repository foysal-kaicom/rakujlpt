const navdata = [
  {
    id: "home",
    label: "Home",
    to: "/",
    links: "",
  },
  {
    id: "packages",
    label: "Subcription Plan",
    to: "/packages",
    links: "",
  },
  {
    id: "aboutJpt",
    label: "Information",
    to: "/about_jpt",
    links: [
      {
        to: "/sample_question",
        label: "About JPLAB",
      },
      {
        to: "/sample_question",
        label: "Why Choose Us",
      },
      {
        to: "/question_composition",
        label: "Question Composition",
      },
      {
        to: "/measurement_content",
        label: "Measurement Content",
      },
      {
        to: "/sample_question",
        label: "FAQ",
      },
      {
        to: "/sample_question",
        label: "Blog",
      },
    ],
  },
];

export { navdata };

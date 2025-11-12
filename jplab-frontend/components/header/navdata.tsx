const navdata = [
  {
    id: "home",
    label: "Home",
    to: "/",
    links: "",
  },
  {
    id: "packages",
    label: "Pricing",
    to: "/packages",
    links: "",
  },
  {
    id: "test",
    label: "Test",
    to: "/mock_test_select",
    links: [
      {
        to: "/mock_test_select",
        label: "Mock Test",
      },
      {
        to: "/practice",
        label: "Practice",
      }
    ],
  },
  {
    id: "aboutJpt",
    label: "About",
    to: "/about_jpt",
    links: [
      {
        to: "/about_jpt",
        label: "About JPLAB",
      },
      {
        to: "/question_composition",
        label: "Question Composition",
      },
      {
        to: "/faq",
        label: "FAQ",
      },
      {
        to: "/news",
        label: "Blog",
      },
    ],
  },
];

export { navdata };

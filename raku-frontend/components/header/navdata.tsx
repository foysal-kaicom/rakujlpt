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
      },
      // {
      //   to: "/certificate",
      //   label: "Verify Certificate",
      // }
    ],
  },
  {
    id: "aboutUs",
    label: "About",
    to: "/about_us",
    links: [
      {
        to: "/about_us",
        label: "About Raku",
      },
      {
        to: "/our_team",
        label: "Our Team",
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

export const navdata = [
  {
    id: "home",
    labelKey: "nav.home",
    to: "/",
    links: "",
  },
  {
    id: "packages",
    labelKey: "nav.pricing",
    to: "/packages",
    links: "",
  },
  {
    id: "test",
    labelKey: "nav.test",
    to: "/mock_test_select",
    links: [
      {
        to: "/mock_test_select",
        labelKey: "nav.mockTest",
      },
      {
        to: "/practice",
        labelKey: "nav.practice",
      },
      {
        to: "/certificate",
        labelKey: "nav.verifyCertificate",
      },
    ],
  },
  {
    id: "aboutUs",
    labelKey: "nav.about",
    to: "/about_us",
    links: [
      {
        to: "/about_us",
        labelKey: "nav.aboutRaku",
      },
      {
        to: "/our_team",
        labelKey: "nav.ourTeam",
      },
      {
        to: "/question_composition",
        labelKey: "nav.questionComposition",
      },
      {
        to: "/faq",
        labelKey: "nav.faq",
      },
      {
        to: "/news",
        labelKey: "nav.blog",
      },
    ],
  },
];

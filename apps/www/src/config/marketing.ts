import type { MarketingConfig } from "@/types";

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Docs",
      href: "https://docs.dingify.io/",
    },
    {
      title: "Pricing",
      href: "/pricing",
      disabled: true,
    },
    {
      title: "Blog",
      href: "/blog",
      disabled: true,
    },
    // {
    //   title: "Documentation",
    //   href: "/docs",
    //   disabled: true,
    // },
  ],
};

import {
  FaSpotify,
  FaAmazon,
  FaYoutube,
  FaPlaystation,
  FaXbox,
  FaMoneyCheckAlt,
  FaAudible,
  FaItunesNote,
} from "react-icons/fa";

import { RiNetflixFill, RiAppleFill } from "react-icons/ri";

import { TbBrandDisney } from "react-icons/tb";

export default function SubscriptionLogo({ subscriptionName }) {
  const defaultIcon = <FaMoneyCheckAlt />;

  const icons = [
    { name: "Spotify", tags: ["spotify", "spot"], icon: <FaSpotify /> },
    { name: "Amazon Prime", tags: ["amazon", "prime"], icon: <FaAmazon /> },
    {
      name: "YouTube Premium",
      tags: ["youtube", "yt", "premium"],
      icon: <FaYoutube />,
    },
    {
      name: "Xbox Gamepass",
      tags: ["xbox", "gamepass", "game pass", "gold"],
      icon: <FaXbox />,
    },
    {
      name: "PlayStation+",
      tags: ["playstation", "psn", "ps+"],
      icon: <FaPlaystation />,
    },
    {
      name: "Audible",
      tags: ["audible"],
      icon: <FaAudible />,
    },
    {
      name: "Netflix",
      tags: ["netflix"],
      icon: <RiNetflixFill />,
    },
    {
      name: "Apple Music",
      tags: ["apple music", "itunes"],
      icon: <FaItunesNote />,
    },
    {
      name: "Apple One",
      tags: ["apple one"],
      icon: <RiAppleFill />,
    },
    {
      name: "Disney+",
      tags: ["disney"],
      icon: <TbBrandDisney />,
    },
  ];

  // try matching our icon list with the name of th subscription
  function tryMatchIcon() {
    const nameTokens = subscriptionName.toLowerCase().split(/\s+/);

    const bestMatch = icons.reduce(
      (bestMatch, icons) => {
        const overlap = icons.tags.filter((tag) =>
          nameTokens.includes(tag),
        ).length;
        return overlap > bestMatch.overlap
          ? { overlap, icon: icons.icon }
          : bestMatch;
      },
      { overlap: 0, icon: defaultIcon },
    );

    return bestMatch.icon;
  }

  return tryMatchIcon();
}

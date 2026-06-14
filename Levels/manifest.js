window.SVEN_LEVEL_MANIFEST = {
  levels: [
    {
      id: "LVL-0001",
      title: "Sven en de Runenpoort",
      subtitle: "Een Vikingtempel vol runen en keersommen.",
      script: "Levels/LVL-0001/level.js",
      menu: {
        illustration: "Levels/LVL-0001/assets/level-1-wide-world.png",
        badge: "Eerste avontuur",
        detail: "Bos, tempel en drie magische runen"
      }
    },
    {
      id: "LVL-0002",
      title: "De Tempelzaal",
      subtitle: "Binnen in de Vikingtempel wachten oude proeven.",
      script: "Levels/LVL-0002/level.js",
      hiddenFromMenu: true,
      connectedFrom: "LVL-0001",
      menu: {
        illustration: "Levels/LVL-0002/assets/temple-interior.png",
        badge: "Verbonden gebied",
        detail: "Tempelzaal, vuur en oude Vikingtekens"
      }
    },
    {
      id: "LVL-0003",
      title: "De Vikinghaven",
      subtitle: "De havenpoort opent pas als het schip klaar is.",
      script: "Levels/LVL-0003/level.js",
      hiddenFromMenu: true,
      connectedFrom: "LVL-0002",
      menu: {
        illustration: "Levels/LVL-0003/assets/viking-harbor.png",
        badge: "Verbonden gebied",
        detail: "Haven, kompas en vertrek naar zee"
      }
    }
  ]
};

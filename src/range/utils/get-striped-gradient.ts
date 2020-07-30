// Types

import Direction from "@type/Direction.type";

export default (direction: Direction, colors: Array<string>, stopPercentages: Array<number>): string => {
  const filteredPercentages = stopPercentages.filter(Boolean);

  const stop = filteredPercentages[0]
  const parts = colors
    .map((color, idx) => {
      const firstPercentage = filteredPercentages[0];
      const secondPercentage = filteredPercentages[1];

      if (filteredPercentages.length === 2) {
        if (idx === 0 && idx === colors.length - 1) {
          return `transparent 0%,
            transparent ${ firstPercentage }%,
            ${ color } ${ firstPercentage }%,
            ${ color } ${ secondPercentage }%,
            transparent ${ secondPercentage }%`
        }

        if (idx === 0 ) {
          return `transparent 0%,
            transparent ${ firstPercentage }%,
            ${ color } ${ firstPercentage }%`
        }

        if (idx === colors.length - 1) {
          return `${ color } ${ secondPercentage }%,
            transparent ${ secondPercentage }%`
        }

        const percentagesDifference = (secondPercentage - firstPercentage);
        const middleColorPercentage = percentagesDifference / (colors.length - 1) * idx;

        return `${ color } ${ firstPercentage + middleColorPercentage }%`;
      }

      if (idx === 0 && colors.length > 1) {
        return `${ color } 0%`;
      }

      if (idx === colors.length - 1) {
        return `${ color } ${ stop }%, transparent ${ stop }%`;
      }

      return `${ color } ${ stop }%`;
    })
    .join(", ");

  return `linear-gradient(${ direction }, ${ parts })`.replace(/\s+/g, " ").trim();
};

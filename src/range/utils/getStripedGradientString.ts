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
            ${ color } ${ filteredPercentages[1] }%,
            transparent ${ filteredPercentages[1] }%`
        }

        if (idx === 0 ) {
          return `transparent 0%,
            transparent ${ firstPercentage }%,
            ${ color } ${ firstPercentage }%`
        }

        if (idx === colors.length - 1) {
          return `${ color } ${ filteredPercentages[1] }%,
            transparent ${ filteredPercentages[1] }%`
        }

        const percentagesDifference = (secondPercentage - firstPercentage);
        const stopsNumber = filteredPercentages.length - 1;
        const middleColorPercentage =  percentagesDifference / (stopsNumber * idx);

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

  return `
    linear-gradient(${ direction }, ${ parts });
  `.replace(/\s+/g, " ").trim();
};

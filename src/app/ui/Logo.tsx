import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    height={100}
    width={250}
    viewBox="0 0 1250 500"
    {...props}
  >
    <path
      d="M0 .837h1230.05v500H0z"
      style={{
        fill: "none",
      }}
    />
    <path
      d="M62.888 379.67V261.64h260v118.03h-60.384v-72.333H123.272v72.333H62.888ZM248.48 237.701H137.296V119.67H248.48v118.031ZM276.318 119.556h46.57v118.031h-46.57zM62.888 119.67h46.57v118.031h-46.57z"
      style={{
        fill: "currentColor",
      }}
    />
    <path
      d="M62.888 382.117V264.086h260v118.031h-60.384v-72.333H123.272v72.333H62.888ZM248.48 240.147H137.296v-118.03H248.48v118.03ZM276.318 122.003h46.57v118.031h-46.57zM62.888 122.117h46.57v118.031h-46.57z"
      style={{
        fill: "currentColor",
      }}
    />
    <text
      x={386.473}
      y={238.761}
      style={{
        fontFamily: "&quot",
        fontWeight: 275,
        fontSize: 159,
        fill: "currentColor",
      }}
    >
      {"Handcraft"}
    </text>
    <text
      x={386.473}
      y={380.845}
      style={{
        fontFamily: "&quot",
        fontWeight: 275,
        fontSize: 159,
        fill: "currentColor",
      }}
    >
      {"Haven"}
    </text>
  </svg>
)
export { SvgComponent as Logo }

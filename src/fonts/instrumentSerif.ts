import "@fontsource/instrument-serif/400.css";
import "@/fonts/otf/PaperMono-Regular.otf";
import "@/fonts/ttf/PaperMono-Regular.ttf";
import "@/fonts/webfonts/PaperMono-Regular.woff2";

export function Instrument_Serif(_: {
  subsets: string[];
  weight: string[];
  display: string;
}) {
  return {
    className: "font-instrument",
  };
}

export function Paper_Mono(_: {
  subsets: string[];
  weight: string[];
  display: string;
}) {
  return {
    className: "font-paper-mono",
  };
}

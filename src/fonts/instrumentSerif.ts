import "@fontsource/instrument-serif/400.css";
import "@/fonts/otf/PaperMono-Regular.otf";
import "@/fonts/ttf/PaperMono-Regular.ttf";
import "@/fonts/webfonts/PaperMono-Regular.woff2";
import "@/fonts/webfonts/Favorit Light.woff2";
import "@/fonts/webfonts/Favorit Regular.woff2";
import "@/fonts/webfonts/Favorit Medium.woff2";

export function Instrument_Serif(_: {
  subsets: string[];
  weight: string[];
  display: string;
}) {
  return {
    className: "font-instrument",
  };
}

export function Favorit(_: {
  subsets: string[];
  weight: string[];
  display: string;
}) {
  return {
    className: "font-favorit",
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

import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pavan Kalyan — Video Editor & Motion Graphics Designer",
    short_name: "Pavan Kalyan Portfolio",
    description: "Award-winning portfolio of Pavan Kalyan",
    start_url: "/",
    display: "standalone",
    background_color: "#072e27",
    theme_color: "#072e27",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

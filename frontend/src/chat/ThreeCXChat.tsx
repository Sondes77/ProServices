import { useEffect, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "call-us-selector": any;
      "call-us": any;
    }
  }
}

export default function ThreeCXChat() {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    // Empêcher double insertion du script
    if (document.getElementById("tcx-callus-js")) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://downloads-global.3cx.com/downloads/livechatandtalk/v1/callus.js";
    script.defer = true;
    script.id = "tcx-callus-js";
    script.crossOrigin = "anonymous";

    script.onload = () => {
      console.log("3CX script loaded.");
      setLoaded(true);
    };

    script.onerror = (err) => {
      console.error("Erreur de chargement script 3CX :", err);
    };

    document.body.appendChild(script);

    return () => {};
  }, []);

  // Attendre que le script 3CX soit chargé avant de rendre le composant
  if (!isLoaded) return null;

  return (
    <call-us-selector phonesystem-url="https://1540.3cx.cloud" party="LiveChat284744"></call-us-selector>
  );
}

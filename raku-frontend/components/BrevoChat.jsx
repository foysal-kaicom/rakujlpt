'use client'

import { useEffect } from "react";

export default function BrevoChat() {
  useEffect(() => {
    // Guard: don't load twice
    if (window.BrevoConversationsID) return;

    window.BrevoConversationsID = "691e97854750c3b9370549d2";

    window.BrevoConversations =
      window.BrevoConversations ||
      function () {
        (window.BrevoConversations.q =
          window.BrevoConversations.q || []).push(arguments);
      };

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://conversations-widget.brevo.com/brevo-conversations.js";

    document.head.appendChild(script);
  }, []);

  return null;
}

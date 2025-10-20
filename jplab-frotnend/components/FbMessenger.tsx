"use client"; // important!

import { useEffect } from "react";

interface MessengerChatProps {
  pageId: string;
}

export default function FbMessenger({ pageId }: MessengerChatProps) {
  useEffect(() => {
    // Add fb-root
    if (!document.getElementById("fb-root")) {
      const fbRoot = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.appendChild(fbRoot);
    }

    // Load FB SDK script
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src =
        "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Initialize SDK
    (window as any).fbAsyncInit = function () {
      (window as any).FB.init({
        xfbml: true,
        version: "v18.0",
      });
    };
  }, []);

  return (
    <div
      id="fb-customer-chat"
      className="fb-customerchat"
      data-attribution="setup_tool"
      data-page_id={pageId}
      data-theme_color="#0084FF"
      data-logged_in_greeting="Hi! How can we help you?"
      data-logged_out_greeting="Hi! Please log into Facebook to chat with us."
    />
  );
}

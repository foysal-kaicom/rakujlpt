"use client";

import FbMessenger from "../FbMessenger";

setTimeout(() => {
  (window as any).FB?.XFBML?.parse();
}, 1000);

export default function MessengerWrapper() {
  return <FbMessenger pageId="151181225450092" />;
}

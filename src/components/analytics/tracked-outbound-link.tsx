"use client";

import React from "react";
import { trackEvent, GAEventName, GAEventParams } from "@/lib/analytics";

interface TrackedOutboundLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  eventName: GAEventName;
  placement: string;
  eventParams?: Omit<GAEventParams, "placement">;
  children: React.ReactNode;
}

/**
 * Lightweight client link wrapper that fires GA4 conversion events on click
 * before allowing normal browser navigation. Suitable for server components.
 */
export function TrackedOutboundLink({
  href,
  eventName,
  placement,
  eventParams,
  onClick,
  children,
  ...props
}: TrackedOutboundLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventName, {
      placement,
      ...eventParams,
    });

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

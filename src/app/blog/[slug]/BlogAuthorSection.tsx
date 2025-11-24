"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { img } from "@/shared/constant/imgExport";
import { ENV_CONFIG } from "@/shared/constant/app.constant";

type Author = {
  id: number;
  username: string;
  email?: string;
  profileImage?: string | null;
};

export default function BlogAuthorSection({ authors }: { authors: Author[] }) {
  const [copied, setCopied] = useState(false);

  console.log("first", authors);

  // Avatar sizing & overlap
  const AVATAR_SIZE = 48; // px
  const overlap = AVATAR_SIZE / 2; // 50% overlap

  // compute container width so overlap fits
  const avatarsWidth = useMemo(() => {
    if (!authors || authors.length === 0) return AVATAR_SIZE;
    return AVATAR_SIZE + (authors.length - 1) * overlap;
  }, [authors]);

  // get current page url (use when handlers run on client)
  const getCurrentUrl = () => {
    if (typeof window !== "undefined") return window.location.href;
    return "";
  };

  const handleCopyLink = async () => {
    const url = getCurrentUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // fallback
      alert("Could not copy to clipboard — please copy manually: " + url);
    }
  };

  const openShareWindow = (shareUrl: string) => {
    // popup window options
    const opts = "noopener,noreferrer,width=900,height=600";
    window.open(shareUrl, "_blank", opts);
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(getCurrentUrl());
    const fb = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    openShareWindow(fb);
  };

  const handleShareX = () => {
    const url = encodeURIComponent(getCurrentUrl());
    const text = encodeURIComponent(document.title || "");
    const x = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    openShareWindow(x);
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(getCurrentUrl());
    const ln = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    openShareWindow(ln);
  };

  // fallback avatar
  const getAvatarSrc = (a: Author) => {
    if (a.profileImage && !a.profileImage.includes("undefined")) {
      return `${ENV_CONFIG?.baseApi}${a.profileImage}`;
    }
    return img.aboutImg2; // Fallback image
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* left: avatars + authors */}
        <div className="flex items-center gap-4">
          {/* Avatar stack */}
          <div
            className="relative"
            style={{ width: avatarsWidth, height: AVATAR_SIZE }}
            aria-hidden
          >
            {authors?.map((a, i) => {
              const left = i * overlap;
              return (
                <div
                  key={a.id}
                  // wrapper must be relative for Image fill, rounded and overflow-hidden
                  style={{
                    position: "absolute",
                    left: `${left}px`,
                    top: 0,
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                  }}
                >
                  <div
                    className="relative rounded-full overflow-hidden ring-2 ring-white"
                    style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
                  >
                    <Image
                      src={getAvatarSrc(a)}
                      alt={a.username || "author"}
                      // next/image fill requires parent .relative and will cover the box
                      fill
                      sizes={`${AVATAR_SIZE}px`}
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Author names and update */}
          <div>
            <p className="text-[#111927] text-[16px]">
              Written by{" "}
              {authors?.length > 0 &&
                authors?.map((data: Author, index: number) => (
                  <span key={data.id}>
                    <Link
                      href={`/author/${data?.username}`}
                      className="text-[#111927] font-medium hover:underline hover:cursor-pointer"
                    >
                      {data.username}
                    </Link>
                    {index < (authors?.length ?? 0) - 1 && ", "}
                  </span>
                ))}
            </p>

            {/* Update date — you can pass real date via props if needed */}
            <p className="text-[#6C737F] text-sm">Updated on Nov 26, 2025</p>
          </div>
        </div>

        {/* right: share actions */}
        <div className="space-y-1">
          <p className="text-[#0D121C] text-[16px] font-medium">
            Share Article
          </p>

          <div className="flex items-center gap-4">
            {/* Share link (copy) */}
            <button
              onClick={handleCopyLink}
              aria-label="Copy link"
              className="p-1 rounded hover:bg-gray-100"
              title="Copy link"
            >
              <Image
                src={img.shareLink}
                alt="copy link"
                width={20}
                height={20}
              />
            </button>

            {/* Facebook */}
            <button
              onClick={handleShareFacebook}
              aria-label="Share on Facebook"
              className="p-1 rounded hover:bg-gray-100"
              title="Share on Facebook"
            >
              <Image src={img.fb} alt="facebook" width={20} height={20} />
            </button>

            {/* X / Twitter */}
            <button
              onClick={handleShareX}
              aria-label="Share on X"
              className="p-1 rounded hover:bg-gray-100"
              title="Share on X"
            >
              <Image src={img.x} alt="x/twitter" width={20} height={20} />
            </button>

            {/* LinkedIn */}
            <button
              onClick={handleShareLinkedIn}
              aria-label="Share on LinkedIn"
              className="p-1 rounded hover:bg-gray-100"
              title="Share on LinkedIn"
            >
              <Image src={img.linkedin} alt="linkedin" width={20} height={20} />
            </button>
          </div>

          {/* Copied feedback */}
          {copied && (
            <div className="text-sm text-green-600 mt-1">
              Link copied to clipboard
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function AboutPurposeSection() {
  return (
    <div className="max-w-3xl mx-auto py-10 lg:grid grid-cols-2 gap-16 space-y-5 llg:space-y-0">
      <div className="space-y-4">
        <h1 className="uppercase font-semibold tracking-widest">Our Purpose</h1>
        <p className="text-4xl tracking-wider">
          A better future starts with better tools
        </p>
      </div>
      <div className="space-y-10 text-justify">
        <p>
          That means finding a new way to do things. Creating a product actually
          built for the people held back by a system that wasn't designed for
          them. One that thinks differently, embraces technology, works for
          everyone, and costs less.
        </p>
        <p>
          Because a banking system that's more affordable, accessible, and
          innovative is a better one. Simple as that. The world is changing, so
          we think it's time banking did too.
        </p>
      </div>
    </div>
  );
}

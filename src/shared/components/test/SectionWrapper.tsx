"use client";

interface SectionWrapperProps {
  children: React.ReactNode;
  contentAlignment?: "left" | "center" | "right";
  backgroundColor?: string;
  backgroundImage?: string;
  textColor?: string;
}

export function SectionWrapper({
  children,
  contentAlignment = "left",
  backgroundColor = "transparent",
  backgroundImage,
  textColor = "#1f2937",
}: SectionWrapperProps) {
  const sectionStyle = {
    backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: textColor,
  };

  return (
    <section className="w-full py-16 px-4" style={sectionStyle}>
      <div
        className="max-w-7xl mx-auto"
        style={{ textAlign: contentAlignment }}
      >
        {children}
      </div>
    </section>
  );
}

// "use client";

// interface SectionWrapperProps {
//   children: React.ReactNode;
//   contentAlignment?: "left" | "center" | "right";
//   backgroundColor?: string;
//   backgroundImage?: string;
//   textColor?: string;
// }

// export function SectionWrapper({
//   children,
//   contentAlignment = "left",
//   backgroundColor = "transparent",
//   backgroundImage,
//   textColor = "#1f2937"
// }: SectionWrapperProps) {
//   const sectionStyle = {
//     backgroundColor,
//     backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     color: textColor,
//   };

//   return (
//     <section className="w-full py-16 px-4" style={sectionStyle}>
//       <div
//         className="max-w-7xl mx-auto"
//         style={{
//           textAlign: contentAlignment,
//         }}
//       >
//         {children}
//       </div>
//     </section>
//   );
// }

import Image from "next/image";

export function CommonPrimaryButton({
  text,
  img,
  className = "",
}: {
  text: string;
  img: any;
  className?: string;
}) {
  return (
    <button
      className={`
        cursor-pointer
        group relative px-5 py-2
        flex items-center justify-center gap-1.5
        rounded-[10px]
        bg-[linear-gradient(123deg,#F197FE_-22.87%,#8838E0_63.14%)]
        shadow-[0_0_0_1px_#6D1FD8]
        text-white font-medium
        overflow-hidden
        transition-all duration-500 ease-in-out
        bg-[length:200%_200%]
        hover:bg-[position:right_center]
        hover:scale-[1.03]
        active:scale-[0.98]
        w-full
        ${className}
      `}
    >
      <span className="z-10">{text}</span>
      <span
        className="
          flex items-center justify-center
          transition-transform duration-500 ease-in-out
          group-hover:translate-x-1
        "
      >
        <Image
          src={img}
          alt="shopify"
          width={20}
          height={20}
          className="object-contain"
        />
      </span>
    </button>
  );
}

export function CommonSecondaryButton({
  text,
  img,
}: {
  text: string;
  img: any;
}) {
  return (
    <button
      className="
      cursor-pointer
        group relative px-5 py-2
        flex items-center justify-center gap-2
        rounded-[10px]
        border border-[#6D1FD8]
        text-baseColor font-medium
        overflow-hidden
        transition-all duration-500 ease-in-out
        hover:bg-secondaryColor
        hover:scale-[1.03]
        active:scale-[0.98]
      "
    >
      <span className="z-10">{text}</span>
      <span
        className="
          flex items-center justify-center
          transition-transform duration-500 ease-in-out
          group-hover:translate-x-1
        "
      >
        <Image
          src={img}
          alt="shopify"
          width={20}
          height={20}
          className="object-contain"
        />
      </span>
    </button>
  );
}

// import Image from "next/image";
// import React from "react";
// import { img } from "../constant/imgExport";

// export function CommonPrimaryButton({ text }: { text: string }) {
//   return (
//     <button
//       className="
//         group relative px-5 py-1
//         flex items-center justify-center gap-2
//         rounded-[10px]
//         bg-[linear-gradient(123deg,#F197FE_-22.87%,#8838E0_63.14%)]
//         shadow-[0_0_0_1px_#6D1FD8]
//         text-white font-medium
//         overflow-hidden
//         transition-all duration-500 ease-in-out
//         bg-[length:200%_200%]
//         hover:bg-[position:right_center]
//         hover:scale-[1.03]
//         active:scale-[0.98]
//       "
//     >
//       <span className="z-10">{text}</span>
//       <span
//         className="
//           flex items-center justify-center
//           transition-transform duration-500 ease-in-out
//           group-hover:translate-x-1
//         "
//       >
//         <Image
//           src={img.shopifyIcon}
//           alt="shopify"
//           width={20}
//           height={20}
//           className="object-contain"
//         />
//       </span>
//     </button>
//   );
// }

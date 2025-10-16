export default function SectionHeaderPortion({ text }: { text?: string }) {
  return (
    <div className="text-sm border text-secondaryTextColor rounded-full px-[14px] py-1 text-center border-primaryColor bg-secondaryColor ">
      {text}
    </div>
  );
}

import BlogCardList from "@/shared/components/globalComponents/blog/BlogCardList";
import SectionHeaderPortion from "@/shared/components/SectionHeaderPortion";
import { ENV_CONFIG } from "@/shared/constant/app.constant";
import { img } from "@/shared/constant/imgExport";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

export default function AuthorInformationSection({ info }: { info: any }) {
  const {
    username,
    designation,
    bio,
    expertise = [],
    blogs = [],
    linkedinProfile,
    profileImage,
  } = info || {};

  // Fallback image if profileImage is not available
  const getProfileImage = () => {
    if (profileImage && !profileImage.includes("undefined")) {
      return `${ENV_CONFIG?.baseApi}${profileImage}`;
    }
    return img.inja;
  };

  // Format LinkedIn URL
  const getLinkedInUrl = () => {
    if (!linkedinProfile) return "#";
    if (linkedinProfile.startsWith("http")) {
      return linkedinProfile;
    }
    return `https://${linkedinProfile}`;
  };

  return (
    <div>
      <div className="py-12 lg:grid grid-cols-3 gap-6 space-y-3 lg:space-y-0">
        {/* Author Profile Card */}
        <div className="border col-span-1 bg-[#360C5F] rounded-2xl text-white p-6 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <Image
                src={getProfileImage()}
                alt={`${username}'s profile`}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <p className="text-[32px] font-semibold">
                {username || "Unknown Author"}
              </p>
              <p className="text-[#D2D6DB]">{designation || "Author"}</p>
            </div>
          </div>
          <hr className="my-5 border-[#6428A1]" />
          <div className="flex items-center justify-center space-x-2">
            <p className="text-[#D2D6DB]">Follow me on:</p>
            <Link
              href={getLinkedInUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FaLinkedin size={20} />
            </Link>
          </div>
        </div>

        {/* Author Details */}
        <div className="col-span-2 p-9 space-y-9 bg-[#FAF6FE] rounded-2xl">
          {/* About Section */}
          <div className="space-y-4">
            <p className="text-[#360C5F] text-2xl font-medium">
              About {username || "the Author"}
            </p>
            <p className="text-[#111927] text-[18px] font-normal leading-relaxed">
              {bio || "No biography available for this author."}
            </p>
          </div>

          {/* Expertise Section */}
          <div className="space-y-4">
            <p className="text-[#360C5F] text-2xl font-medium">
              Areas of Expertise
            </p>
            <div className="flex flex-wrap gap-2">
              {expertise && expertise.length > 0 ? (
                expertise.map((skill: string, index: number) => (
                  <SectionHeaderPortion key={index} text={skill} />
                ))
              ) : (
                <div className="flex flex-wrap gap-2">
                  <SectionHeaderPortion text="No expertise listed" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      {blogs && blogs.length > 0 ? (
        <div className="border-t py-20 w-full space-y-12">
          <h2 className="text-[#2C076E] text-5xl font-medium">
            Blogs by {username}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any, index: number) => (
              <BlogCardList key={blog.id || index} blog={blog} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="border-t py-20 w-full space-y-12">
          <h2 className="text-[#2C076E] text-5xl font-medium">
            Blogs by {username}
          </h2>
          <div className="text-center py-12">
            <p className="text-[#6B7280] text-lg">
              No blogs published by this author yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

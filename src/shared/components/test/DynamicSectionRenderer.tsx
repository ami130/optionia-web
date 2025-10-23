"use client";

import SectionHeader from "../SectionHeader";
import { SectionWrapper } from "./SectionWrapper";

interface Icon {
  id: string;
  icon: string;
  text: string;
  color: string;
  bgColor: string;
}

interface Button {
  link: string;
  text: string;
  bgColor: string;
  textColor: string;
}

interface Content {
  title: string;
  backgroundColor: string;
  subtitle: string | null;
  description: string;
  icons: Icon[];
  images: string[];
  buttons: Button[];
  order: number;
  isActive: boolean;
  contentLayout?: "text-left" | "text-right" | "centered";
  gridColumns?: number;
  imagePosition?: "below" | "aside" | "grid" | "left" | "right";
}

interface Section {
  id: string;
  name: string;
  title?: string; // Made optional
  subtitle?: string | null; // Made optional
  description?: string; // Made optional
  contentAlignment: "left" | "center" | "right";
  isVisible: boolean;
  order: number;
  contents: Content[];
  backgroundColor?: string;
  backgroundImage?: string;
  textColor?: string;
  layout?:
    | "split-grid"
    | "header-grid"
    | "centered"
    | "default"
    | "image-gallery";
  image?: string;
}

interface DynamicSectionRendererProps {
  section: Section;
}

export function DynamicSectionRenderer({
  section,
}: DynamicSectionRendererProps) {
  if (!section.isVisible) return null;

  // Get icon component
  const getIcon = (iconName: string) => {
    const icons: Record<string, string> = {
      star: "⭐",
      "shield-check": "🛡️",
      zap: "⚡",
      check: "✅",
      heart: "❤️",
      trophy: "🏆",
      rocket: "🚀",
      users: "👥",
      clock: "⏰",
      globe: "🌐",
      award: "🏅",
      trend: "📈",
      support: "💬",
      phone: "📞",
      email: "📧",
      location: "📍",
      calendar: "📅",
      document: "📄",
      download: "📥",
      upload: "📤",
      settings: "⚙️",
    };
    return icons[iconName] || "📌";
  };

  // Render content based on layout
  const renderContent = (content: Content, contentIndex: number) => {
    const {
      title,
      subtitle,
      description,
      icons,
      images,
      buttons,
      contentLayout = "centered",
      gridColumns = 1,
      backgroundColor,
      imagePosition = "below",
    } = content;

    // Split Grid Layout (Left-Right)
    if (section.layout === "split-grid" && images.length > 0) {
      const textSide = contentLayout === "text-left" ? "left" : "right";

      return (
        <div
          key={contentIndex}
          className={``}
          style={{ color: backgroundColor }}
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
              textSide === "right" ? "md:grid-flow-dense" : ""
            }`}
          >
            {/* Text Content */}
            <div className={textSide === "right" ? "md:col-start-2" : ""}>
              {/* Only show content header if title exists */}
              {(title || subtitle || description) && (
                <div className="mb-6">
                  <SectionHeader
                    text={subtitle || undefined}
                    title={title || "Section Title"}
                    subtitle={
                      description
                        ? description.replace(/<[^>]*>/g, "")
                        : "Description"
                    }
                  />
                </div>
              )}

              {/* Icons */}
              {icons && icons.length > 0 && (
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {icons.map((icon) => (
                    <div
                      key={icon.id}
                      className="flex items-center gap-3 p-3 rounded-lg border"
                      style={{
                        backgroundColor: icon.bgColor,
                        borderColor: `${icon.color}20`,
                      }}
                    >
                      <span className="text-xl">{getIcon(icon.icon)}</span>
                      <span
                        className="font-semibold text-sm"
                        style={{ color: icon.color }}
                      >
                        {icon.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Buttons */}
              {buttons && buttons.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {buttons.map((button, buttonIndex) => (
                    <a
                      key={buttonIndex}
                      href={button.link}
                      className="px-5 py-2.5 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{
                        backgroundColor: button.bgColor,
                        color: button.textColor,
                      }}
                    >
                      {button.text}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Image Content */}
            <div
              className={
                textSide === "right" ? "md:col-start-1 md:row-start-1" : ""
              }
            >
              {images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image}
                  alt={`${title || "Section"} image ${imageIndex + 1}`}
                  className="w-full h-auto rounded-xl shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Header Grid Layout (Header + Image Grid)
    if (section.layout === "header-grid") {
      return (
        <div
          key={contentIndex}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          {/* Header - Only show if content has title/description */}
          {(title || subtitle || description) && (
            <div className="mb-8 text-center">
              <SectionHeader
                text={subtitle || undefined}
                title={title || "Section Title"}
                subtitle={
                  description
                    ? description.replace(/<[^>]*>/g, "")
                    : "Description"
                }
              />
            </div>
          )}

          {/* Icons */}
          {icons && icons.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {icons.map((icon) => (
                <div
                  key={icon.id}
                  className="flex items-center gap-3 p-4 rounded-xl border"
                  style={{
                    backgroundColor: icon.bgColor,
                    borderColor: `${icon.color}20`,
                  }}
                >
                  <span className="text-2xl">{getIcon(icon.icon)}</span>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: icon.color }}
                  >
                    {icon.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Image Grid */}
          {images && images.length > 0 && (
            <div
              className={`grid gap-6 ${
                gridColumns === 1
                  ? "grid-cols-1"
                  : gridColumns === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : gridColumns === 3
                  ? "grid-cols-1 md:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-4"
              }`}
            >
              {images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image}
                  alt={`${title || "Section"} image ${imageIndex + 1}`}
                  className="w-full h-auto rounded-xl shadow-md"
                />
              ))}
            </div>
          )}

          {/* Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex gap-4 flex-wrap justify-center mt-8">
              {buttons.map((button, buttonIndex) => (
                <a
                  key={buttonIndex}
                  href={button.link}
                  className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: button.bgColor,
                    color: button.textColor,
                  }}
                >
                  {button.text}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Image Gallery Layout
    if (section.layout === "image-gallery") {
      return (
        <div
          key={contentIndex}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          {/* Header - Only show if content has title/description */}
          {(title || subtitle || description) && (
            <div className="mb-8 text-center">
              <SectionHeader
                text={subtitle || undefined}
                title={title || "Gallery"}
                subtitle={
                  description
                    ? description.replace(/<[^>]*>/g, "")
                    : "Image gallery"
                }
              />
            </div>
          )}

          {/* Image Grid */}
          {images && images.length > 0 && (
            <div
              className={`grid gap-6 ${
                gridColumns === 1
                  ? "grid-cols-1"
                  : gridColumns === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : gridColumns === 3
                  ? "grid-cols-1 md:grid-cols-3"
                  : gridColumns === 4
                  ? "grid-cols-1 md:grid-cols-4"
                  : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {images.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    src={image}
                    alt={`${title || "Gallery"} image ${imageIndex + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex gap-4 flex-wrap justify-center mt-8">
              {buttons.map((button, buttonIndex) => (
                <a
                  key={buttonIndex}
                  href={button.link}
                  className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: button.bgColor,
                    color: button.textColor,
                  }}
                >
                  {button.text}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Centered Layout
    if (section.layout === "centered") {
      return (
        <div
          key={contentIndex}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center"
        >
          {/* Header - Only show if content has title/description */}
          {(title || subtitle || description) && (
            <div className="mb-8">
              <SectionHeader
                text={subtitle || undefined}
                title={title || "Section Title"}
                subtitle={
                  description
                    ? description.replace(/<[^>]*>/g, "")
                    : "Description"
                }
              />
            </div>
          )}

          {/* Icons */}
          {icons && icons.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 justify-center">
              {icons.map((icon) => (
                <div
                  key={icon.id}
                  className="flex items-center gap-3 p-4 rounded-xl border mx-auto"
                  style={{
                    backgroundColor: icon.bgColor,
                    borderColor: `${icon.color}20`,
                    maxWidth: "300px",
                  }}
                >
                  <span className="text-2xl">{getIcon(icon.icon)}</span>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: icon.color }}
                  >
                    {icon.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Images */}
          {images && images.length > 0 && imagePosition === "below" && (
            <div className="mb-8">
              {images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image}
                  alt={`${title || "Section"} image ${imageIndex + 1}`}
                  className="w-full max-w-2xl mx-auto h-auto rounded-xl shadow-md"
                />
              ))}
            </div>
          )}

          {/* Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex gap-4 flex-wrap justify-center">
              {buttons.map((button, buttonIndex) => (
                <a
                  key={buttonIndex}
                  href={button.link}
                  className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: button.bgColor,
                    color: button.textColor,
                  }}
                >
                  {button.text}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Default Layout
    return (
      <div
        key={contentIndex}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8"
      >
        {/* Content Header - Only show if content has title/description */}
        {(title || subtitle || description) && (
          <div className="mb-8">
            <SectionHeader
              text={subtitle || undefined}
              title={title || "Section Title"}
              subtitle={
                description
                  ? description.replace(/<[^>]*>/g, "")
                  : "Description"
              }
            />
          </div>
        )}

        {/* Icons Grid */}
        {icons && icons.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {icons.map((icon) => (
              <div
                key={icon.id}
                className="flex items-center gap-3 p-4 rounded-xl border"
                style={{
                  backgroundColor: icon.bgColor,
                  borderColor: `${icon.color}20`,
                }}
              >
                <span className="text-2xl">{getIcon(icon.icon)}</span>
                <span
                  className="font-semibold text-sm"
                  style={{ color: icon.color }}
                >
                  {icon.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        {buttons && buttons.length > 0 && (
          <div
            className={`flex gap-4 flex-wrap mb-8 ${
              section.contentAlignment === "center"
                ? "justify-center"
                : section.contentAlignment === "right"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {buttons.map((button, buttonIndex) => (
              <a
                key={buttonIndex}
                href={button.link}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: button.bgColor,
                  color: button.textColor,
                }}
              >
                {button.text}
              </a>
            ))}
          </div>
        )}

        {/* Images Grid */}
        {images && images.length > 0 && (
          <div
            className={`grid gap-6 ${
              images.length === 1
                ? "grid-cols-1"
                : images.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-3"
            }`}
          >
            {images.map((image, imageIndex) => (
              <img
                key={imageIndex}
                src={image}
                alt={`${title || "Section"} image ${imageIndex + 1}`}
                className="w-full h-auto rounded-xl shadow-md"
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <SectionWrapper
      contentAlignment={section.contentAlignment}
      backgroundColor={section.backgroundColor}
      backgroundImage={section.backgroundImage}
      textColor={section.textColor}
    >
      {/* Section Header - Only show if section has title/description */}
      {(section.title || section.description) && (
        <div className="mb-12">
          <SectionHeader
            text={section.name}
            title={section.title || "Section Title"}
            subtitle={section.description || "Section description"}
          />
        </div>
      )}

      {/* Section Image (if exists) */}
      {section.image && (
        <div className="mb-8 text-center">
          <img
            src={section.image}
            alt={section.title || section.name}
            className="w-full max-w-4xl mx-auto h-auto rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* Contents with Layout */}
      {section.contents
        .filter((content) => content.isActive)
        .sort((a, b) => a.order - b.order)
        .map((content, contentIndex) => renderContent(content, contentIndex))}
    </SectionWrapper>
  );
}

// src/TypedContent.tsx

import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

interface TypedContentProps {
  content: string;
  booking_button_name: string;
  booking_button_redirection: string;
}

interface Section {
  content: string;
  shouldHaveButton: boolean;
}

const TypedContent: React.FC<TypedContentProps> = ({
  content,
  booking_button_name,
  booking_button_redirection,
}) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const typedRefs = useRef<Array<HTMLDivElement | null>>([]);
  const typedInstances = useRef<Array<Typed | null>>([]);

  useEffect(() => {
    if (content) {
      const processedSections = enhanceContent(content);
      setSections(processedSections);
    }
  }, [content]);

  useEffect(() => {
    if (sections.length > 0) {
      // Start typing the first section
      startTyping(1);
    }

    // Cleanup function
    return () => {
      typedInstances.current.forEach(
        (instance) => instance && instance.destroy()
      );
      typedInstances.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  const startTyping = (index: number) => {
    if (index >= sections.length) {
      return; // All sections have been typed
    }

    setCurrentIndex(index);

    const typedRef = typedRefs.current[index];

    if (typedRef) {
      typedRef.innerHTML = ""; // Clear previous content if any

      // Find the header and content elements for the current section
      const contentBox = typedRef.closest(".content-box");
      const header = contentBox?.querySelector(".section-header");
      const content = contentBox?.querySelector(".section-content");

      const typedInstance = new Typed(typedRef, {
        strings: [sections[index].content],
        typeSpeed: 0,
        showCursor: false,
        contentType: "html",
        onStart: () => {
          // When content starts typing, adjust the widths
          if (header) {
            header.classList.add("reduced-width");
          }
          if (content) {
            content.classList.add("expanded-width");
          }
        },
        onComplete: () => {
          // After typing is complete for this section
          // Find the demo button within the current section
          const demoButton = contentBox?.querySelector(".new-demo-button");

          // Add the 'visible' class to the demo button if it exists
          if (demoButton) {
            demoButton.classList.add("visible");
          }

          // Add a class to indicate typing is complete for this section
          contentBox?.classList.add("typing-complete");

          // Start typing the next section
          startTyping(index + 1);
        },
      });

      // Store the typed instance for cleanup or future use
      typedInstances.current[index] = typedInstance;
    }
  };
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  function getFirstH1Content(htmlString: string): string | null {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const h1 = doc.querySelector("h1");
    return h1 ? h1.textContent?.trim() || null : null;
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage =
        docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(scrollPercentage);
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    const observer = new ResizeObserver(() => {
      updateProgress();
    });

    observer.observe(document.documentElement);
    updateProgress();

    // Handle window resize for switching between scaleX / scaleY
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        ref={progressRef}
        className="progress-bar"
        style={{
          transform: isMobile
            ? `scaleX(${progress / 100})`
            : `scaleY(${progress / 100})`,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div id="typed-output">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="result-header content-header text-center">
              <h1 className="text-center">
                {getFirstH1Content(sections?.[0]?.content)}
              </h1>
            </div>
          </div>
        </div>
        {sections.map((section, index) => {
          if (index === 0) return;
          return (
            <div
              className={`content-box content-container ${
                index <= currentIndex ? "visible" : "hidden"
              } `}
              key={index}
              style={{ display: index <= currentIndex ? "" : "none" }}
            >
              <div className="content-box-inner">
                <div ref={(el) => (typedRefs.current[index] = el)}></div>
              </div>
              {section.shouldHaveButton && (
                <div className="button-container text-center mt-3">
                  <button
                    type="button"
                    className="new-demo-button content-btn"
                    onClick={(e) => {
                      // window.location.href = booking_button_redirection;
                      // setTimeout(() => e.currentTarget.blur(), 500); // 0.5s delay before unfocus
                    }}
                  >
                    {booking_button_name}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

const enhanceContent = (content: string): Section[] => {
  // Check if the content is a plain string (no HTML tags)
  const isPlainString = !/<[^>]+>/g.test(content);

  if (isPlainString) {
    // If it's a plain string, wrap it in a centered, bold, black-styled div
    const formattedContent = `
       <div style="text-align: center; color: black; font-weight: bold; margin: 1rem">
         ${content}
       </div>
     `;

    // Return a single section with the formatted content
    return [
      {
        content: formattedContent,
        shouldHaveButton: false, // No button for plain strings
      },
    ];
  }

  // Split content into sections based on h2 headers (handling attributes)
  const sections = content.split(/(?=<h2\b[^>]*>)/i);

  // Process each section
  const processedSections = sections.map((section, index) => {
    let processedSection = section;

    // Normalize bold and italic text
    processedSection = processedSection.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );
    processedSection = processedSection.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Replace double line breaks with paragraph tags
    processedSection = processedSection
      .split(/\n\n+/)
      .map((block) => {
        block = block.trim();
        if (block) {
          return `<p>${block}</p>`;
        }
        return ""; // Skip empty blocks
      })
      .join("");

    // Remove redundant <br> tags after paragraphs
    processedSection = processedSection.replace(
      /<\/p>\s*<br>\s*<br>\s*<p>/g,
      "</p><p>"
    );

    // Handle lists (remove <br> tags and ensure proper nesting)
    processedSection = processedSection.replace(/<br>\s*<li>/g, "<li>");
    processedSection = processedSection.replace(/<\/li>\s*<br>/g, "</li>");

    // Remove empty paragraphs (including whitespace-only)
    processedSection = processedSection.replace(/<p>\s*<\/p>/g, "");

    // Extract the headers and the rest of the content
    const headerMatch = processedSection.match(
      /<h[1-2]\b[^>]*>(.*?)<\/h[1-2]>/i
    );
    const header = headerMatch ? headerMatch[0] : "";
    const contentWithoutHeader = processedSection
      .replace(/<h[1-2]\b[^>]*>(.*?)<\/h[1-2]>/i, "")
      .trim();

    // Wrap the header and content in a container
    const sectionHTML = `
      <div class="section-container">
        <img class="typed-image" src="https://how.clients.ai/assets/images/image06.jpg?v=65128ef7" />
        <div>
          <div class="section-header">${header}</div>
          <div class="section-content">${contentWithoutHeader}</div>
        </div>
      </div>
    `;

    // Determine if this section should have a button (configurable logic)
    const shouldHaveButton = index >= sections.length - 3;

    return { content: sectionHTML, shouldHaveButton };
  });

  return processedSections;
};

export default TypedContent;

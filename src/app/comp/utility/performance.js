// Performance monitoring utility
export const measurePerformance = () => {
  if (typeof window === "undefined") return;

  // Measure Largest Contentful Paint (LCP)
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

    if (lastEntry) {
      console.log("LCP:", lastEntry.startTime);

      // Send to analytics if needed
      if (window.gtag) {
        window.gtag("event", "LCP", {
          value: Math.round(lastEntry.startTime),
          event_category: "Web Vitals",
        });
      }
    }
  });

  observer.observe({ entryTypes: ["largest-contentful-paint"] });

  // Measure First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log("FID:", entry.processingStart - entry.startTime);

      if (window.gtag) {
        window.gtag("event", "FID", {
          value: Math.round(entry.processingStart - entry.startTime),
          event_category: "Web Vitals",
        });
      }
    });
  });

  fidObserver.observe({ entryTypes: ["first-input"] });

  // Measure Cumulative Layout Shift (CLS)
  let clsValue = 0;
  let clsEntries = [];

  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push(entry);
      }
    }

    console.log("CLS:", clsValue);

    if (window.gtag) {
      window.gtag("event", "CLS", {
        value: Math.round(clsValue * 1000) / 1000,
        event_category: "Web Vitals",
      });
    }
  });

  clsObserver.observe({ entryTypes: ["layout-shift"] });

  // Measure Time to First Byte (TTFB)
  const navigationEntry = performance.getEntriesByType("navigation")[0];
  if (navigationEntry) {
    const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    console.log("TTFB:", ttfb);

    if (window.gtag) {
      window.gtag("event", "TTFB", {
        value: Math.round(ttfb),
        event_category: "Web Vitals",
      });
    }
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === "undefined") return;

  // Preload critical fonts
  const fontLinks = [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  ];

  fontLinks.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "style";
    link.href = href;
    document.head.appendChild(link);
  });

  // Preload critical images
  const criticalImages = ["/logo.png", "/icon.png"];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
};

// Optimize images
export const optimizeImages = () => {
  if (typeof window === "undefined") return;

  // Lazy load images
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === "undefined") return;

  // Wait for page to load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      measurePerformance();
      preloadCriticalResources();
      optimizeImages();
    });
  } else {
    measurePerformance();
    preloadCriticalResources();
    optimizeImages();
  }
};

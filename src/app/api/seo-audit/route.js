import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const auditResults = {
      timestamp: new Date().toISOString(),
      issues: [],
      recommendations: [],
      status: "success",
    };

    // Check for common SEO issues
    const issues = [];

    // 1. Check if sitemap exists
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    if (!fs.existsSync(sitemapPath)) {
      issues.push({
        type: "critical",
        issue: "Missing sitemap.xml",
        description: "Sitemap is required for proper search engine crawling",
        fix: "Generate and submit sitemap to Google Search Console",
      });
    }

    // 2. Check if robots.txt exists
    const robotsPath = path.join(process.cwd(), "public", "robots.txt");
    if (!fs.existsSync(robotsPath)) {
      issues.push({
        type: "critical",
        issue: "Missing robots.txt",
        description: "Robots.txt is required for search engine guidance",
        fix: "Create robots.txt with proper directives",
      });
    }

    // 3. Check data files for potential issues
    const dataDir = path.join(process.cwd(), "public", "data");
    if (fs.existsSync(dataDir)) {
      const dataFiles = fs.readdirSync(dataDir);
      dataFiles.forEach((file) => {
        if (file.endsWith(".json")) {
          const filePath = path.join(dataDir, file);
          const stats = fs.statSync(filePath);
          const fileSizeMB = stats.size / (1024 * 1024);

          if (fileSizeMB > 5) {
            issues.push({
              type: "warning",
              issue: `Large data file: ${file}`,
              description: `File size is ${fileSizeMB.toFixed(
                2
              )}MB, which may slow down page loading`,
              fix: "Consider splitting large data files or implementing pagination",
            });
          }
        }
      });
    }

    // 4. Check for common redirect patterns
    const redirectIssues = [
      {
        pattern: "www.localemichigan.com",
        issue: "WWW vs non-WWW inconsistency",
        fix: "Choose one version and redirect the other",
      },
      {
        pattern: "trailing slashes",
        issue: "Inconsistent URL endings",
        fix: "Standardize on one format and redirect others",
      },
    ];

    redirectIssues.forEach((item) => {
      issues.push({
        type: "info",
        issue: item.issue,
        description: `Check for ${item.pattern} inconsistencies`,
        fix: item.fix,
      });
    });

    // 5. Performance recommendations
    const recommendations = [
      {
        category: "Performance",
        title: "Implement image optimization",
        description: "Use Next.js Image component and WebP format",
        priority: "high",
      },
      {
        category: "SEO",
        title: "Add structured data",
        description: "Implement JSON-LD schema markup for cities, parks, lakes",
        priority: "medium",
      },
      {
        category: "User Experience",
        title: "Add breadcrumbs",
        description:
          "Implement breadcrumb navigation for better user experience",
        priority: "medium",
      },
      {
        category: "Technical SEO",
        title: "Implement hreflang",
        description:
          "Add hreflang tags if you plan to support multiple languages",
        priority: "low",
      },
    ];

    auditResults.issues = issues;
    auditResults.recommendations = recommendations;

    return NextResponse.json(auditResults);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to perform SEO audit",
        message: error.message,
        status: "error",
      },
      { status: 500 }
    );
  }
}

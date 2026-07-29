"use client";

import { useEffect } from "react";

interface BlogViewTrackerProps {
  blogId: string;
}

export default function BlogViewTracker({ blogId }: { blogId: string }) {
  useEffect(() => {
    // Increment view counter client-side on load to support server response cookie-writing rules
    fetch(`/api/blogs/${blogId}/view`, {
      method: "POST",
    }).catch((err) => console.error("Failed to post view increment:", err));
  }, [blogId]);

  return null;
}

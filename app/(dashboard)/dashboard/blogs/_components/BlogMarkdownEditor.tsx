"use client";

import React, { useMemo, useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import "easymde/dist/easymde.min.css";

// Dynamically import SimpleMdeEditor with SSR disabled since it uses window/document
const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface BlogMarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function BlogMarkdownEditor({
  value,
  onChange,
  placeholder = "Write your blog post content using markdown here...",
}: BlogMarkdownEditorProps) {
  const mdeRef = useRef<any>(null);
  const [linkDialog, setLinkDialog] = useState<{
    text: string;
    url: string;
    from: { line: number; ch: number };
    to: { line: number; ch: number };
  } | null>(null);

  useEffect(() => {
    const handlePreviewClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (
        anchor &&
        (anchor.closest(".editor-preview") ||
          anchor.closest(".editor-preview-active") ||
          anchor.closest(".editor-preview-active-side"))
      ) {
        e.preventDefault();
        let href = anchor.getAttribute("href");
        if (href) {
          // Auto prepend https:// if it's external and missing
          if (!/^https?:\/\//i.test(href) && !href.startsWith("/") && !href.startsWith("#")) {
            href = "https://" + href;
          }
          window.open(href, "_blank", "noopener,noreferrer");
        }
      }
    };

    document.addEventListener("click", handlePreviewClick);
    return () => {
      document.removeEventListener("click", handlePreviewClick);
    };
  }, []);

  const handleInsertLink = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!linkDialog || !mdeRef.current) return;

    let finalUrl = linkDialog.url.trim();
    if (!finalUrl) {
      toast.error("Please enter a valid link URL");
      return;
    }

    // Auto prepend https:// if missing
    if (!/^https?:\/\//i.test(finalUrl) && !finalUrl.startsWith("/") && !finalUrl.startsWith("#")) {
      finalUrl = "https://" + finalUrl;
    }

    const finalLabel = linkDialog.text.trim() || "Link";
    const cm = mdeRef.current.codemirror;
    
    // Manually replace the exact selection range to prevent duplicate text issues when focus shifts
    cm.replaceRange(`[${finalLabel}](${finalUrl})`, linkDialog.from, linkDialog.to);
    cm.focus(); // Restore cursor focus back to the editor
    
    setLinkDialog(null);
    toast.success("Link inserted successfully!");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInsertLink();
    }
  };

  const options = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
      placeholder: placeholder,
      minHeight: "350px",
      maxHeight: "450px",
      uploadImage: true,
      renderingConfig: {
        markedOptions: {
          sanitize: false,
        },
      },
      imageUploadFunction: async (file: File, onSuccess: (url: string) => void, onError: (err: string) => void) => {
        if (!file.type.startsWith("image/")) {
          toast.error("Please select a valid image file");
          onError("Invalid file type");
          return;
        }

        const toastId = toast.loading(`Uploading ${file.name}...`);
        try {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) throw new Error("Upload failed");

          const data = await res.json();
          // Pass the clean URL so EasyMDE detects the image extension (.png, .jpg, etc.) correctly
          onSuccess(data.url);
          toast.success("Image uploaded successfully!", { id: toastId });
        } catch (error) {
          console.error(error);
          onError("Upload failed");
          toast.error("Failed to upload image", { id: toastId });
        }
      },
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "code",
        "unordered-list",
        "ordered-list",
        "|",
        {
          name: "custom-link",
          action: (editor: any) => {
            const cm = editor.codemirror;
            const selectedText = (cm.getSelection() || "").trim();
            const from = cm.getCursor("from");
            const to = cm.getCursor("to");
            
            // Check if selectedText is already a URL
            const isUrl = /^https?:\/\//i.test(selectedText) || 
                          /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(selectedText);
            
            if (isUrl) {
              setLinkDialog({
                text: "Link",
                url: selectedText,
                from,
                to,
              });
            } else {
              setLinkDialog({
                text: selectedText,
                url: "",
                from,
                to,
              });
            }
          },
          className: "fa fa-link",
          title: "Insert Link",
        },
        "upload-image",
        "|",
        {
          name: "align-left",
          action: (editor: any) => {
            const cm = editor.codemirror;
            const selectedText = cm.getSelection();
            if (!selectedText) {
              toast.warning("Please select some text first to align left");
              return;
            }
            cm.replaceSelection(`<p align="left">${selectedText}</p>`);
          },
          className: "fa fa-align-left",
          title: "Align Left",
        },
        {
          name: "align-center",
          action: (editor: any) => {
            const cm = editor.codemirror;
            const selectedText = cm.getSelection();
            if (!selectedText) {
              toast.warning("Please select some text first to align center");
              return;
            }
            cm.replaceSelection(`<p align="center">${selectedText}</p>`);
          },
          className: "fa fa-align-center",
          title: "Align Center",
        },
        {
          name: "align-right",
          action: (editor: any) => {
            const cm = editor.codemirror;
            const selectedText = cm.getSelection();
            if (!selectedText) {
              toast.warning("Please select some text first to align right");
              return;
            }
            cm.replaceSelection(`<p align="right">${selectedText}</p>`);
          },
          className: "fa fa-align-right",
          title: "Align Right",
        },
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
      ],
    };
  }, [placeholder]);

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-950/40 simplemde-dark-container relative">
      {/* Scope CSS styling for Dark Mode compatibility */}
      <style jsx global>{`
        .simplemde-dark-container .editor-toolbar {
          background-color: #18181b !important;
          border-color: #27272a !important;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          padding: 8px 12px;
        }
        .simplemde-dark-container .editor-toolbar button {
          color: #a1a1aa !important;
          border-radius: 6px;
          margin-right: 2px;
          transition: all 0.2s;
        }
        .simplemde-dark-container .editor-toolbar button:hover,
        .simplemde-dark-container .editor-toolbar button.active {
          background-color: #27272a !important;
          color: #ffffff !important;
        }
        .simplemde-dark-container .editor-toolbar .separator {
          border-left: 1px solid #27272a !important;
          border-right: 0 !important;
          margin: 0 6px;
        }
        .simplemde-dark-container .CodeMirror-cursor {
          border-left: 2px solid var(--theme-color, #10b981) !important;
        }
        .simplemde-dark-container .CodeMirror {
          background-color: #09090b !important;
          color: #f4f4f5 !important;
          border-color: #27272a !important;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          font-family: Menlo, Monaco, Consolas, "Fira Code", monospace;
          font-size: 13px;
          line-height: 1.6;
        }
        .simplemde-dark-container .CodeMirror-scroll {
          min-height: 350px;
          max-height: 450px;
        }
        .simplemde-dark-container .editor-preview-active,
        .simplemde-dark-container .editor-preview-active-side,
        .simplemde-dark-container .editor-preview {
          background-color: #09090b !important;
          color: #d4d4d8 !important;
          border-color: #27272a !important;
          font-family: ui-sans-serif, system-ui, sans-serif !important;
        }
        .simplemde-dark-container .editor-preview h1,
        .simplemde-dark-container .editor-preview-active h1 {
          font-size: 1.8rem !important;
          font-weight: 800 !important;
          color: #ffffff !important;
          margin-top: 1.5rem !important;
          margin-bottom: 1rem !important;
          line-height: 1.3 !important;
        }
        .simplemde-dark-container .editor-preview h2,
        .simplemde-dark-container .editor-preview-active h2 {
          font-size: 1.4rem !important;
          font-weight: 700 !important;
          color: #ffffff !important;
          margin-top: 1.5rem !important;
          margin-bottom: 0.75rem !important;
        }
        .simplemde-dark-container .editor-preview h3,
        .simplemde-dark-container .editor-preview-active h3 {
          font-size: 1.2rem !important;
          font-weight: 600 !important;
          color: #ffffff !important;
          margin-top: 1.2rem !important;
          margin-bottom: 0.5rem !important;
        }
        .simplemde-dark-container .editor-preview p,
        .simplemde-dark-container .editor-preview-active p {
          font-size: 14px !important;
          line-height: 1.7 !important;
          color: #d4d4d8 !important;
          margin-bottom: 1.25rem !important;
        }
        .simplemde-dark-container .editor-preview a,
        .simplemde-dark-container .editor-preview-active a {
          color: var(--theme-color, #10b981) !important;
          text-decoration: underline !important;
        }
        .simplemde-dark-container .editor-preview pre,
        .simplemde-dark-container .editor-preview-active pre {
          background-color: #1a1a1a !important;
          padding: 1.25rem !important;
          border-radius: 8px !important;
          overflow-x: auto !important;
          margin: 1.5rem 0 !important;
          border-left: 4px solid var(--theme-color, #10b981) !important;
        }
        .simplemde-dark-container .editor-preview code,
        .simplemde-dark-container .editor-preview-active code {
          font-family: Menlo, Monaco, Consolas, monospace !important;
          font-size: 13px !important;
        }
        .simplemde-dark-container .editor-preview ul,
        .simplemde-dark-container .editor-preview-active ul {
          list-style-type: disc !important;
          padding-left: 1.5rem !important;
          margin-bottom: 1.25rem !important;
        }
        .simplemde-dark-container .editor-preview ol,
        .simplemde-dark-container .editor-preview-active ol {
          list-style-type: decimal !important;
          padding-left: 1.5rem !important;
          margin-bottom: 1.25rem !important;
        }
        .simplemde-dark-container .editor-preview li,
        .simplemde-dark-container .editor-preview-active li {
          margin-bottom: 0.5rem !important;
          color: #d4d4d8 !important;
        }
        .simplemde-dark-container .editor-preview blockquote,
        .simplemde-dark-container .editor-preview-active blockquote {
          border-left: 4px solid var(--theme-color, #10b981) !important;
          padding-left: 1.25rem !important;
          font-style: italic !important;
          color: #a1a1aa !important;
          margin: 1.5rem 0 !important;
        }
        .simplemde-dark-container .editor-preview-active-side img,
        .simplemde-dark-container .editor-preview-active img,
        .simplemde-dark-container .editor-preview img {
          border-radius: 12px !important;
          max-width: 100% !important;
          max-height: 350px !important;
          height: auto !important;
          display: block !important;
          margin: 1.5rem auto !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3) !important;
        }
      `}</style>

      {/* Link Dialog Modal Overlay */}
      {linkDialog !== null && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-40 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="text-center">
              <h3 className="text-sm font-bold text-white">Insert Link</h3>
              <p className="text-[11px] text-zinc-400 mt-1">Add text and URL for the hyperlink</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Link Text</label>
                <input
                  type="text"
                  value={linkDialog.text}
                  onChange={(e) => setLinkDialog({ ...linkDialog, text: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. Google Search"
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--theme-color)] transition"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Link URL</label>
                <input
                  type="text"
                  value={linkDialog.url}
                  onChange={(e) => setLinkDialog({ ...linkDialog, url: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. google.com"
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-[var(--theme-color)] transition"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setLinkDialog(null);
                  if (mdeRef.current) mdeRef.current.codemirror.focus();
                }}
                className="py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleInsertLink()}
                className="py-2 bg-[var(--theme-color)] hover:bg-[var(--theme-color)]/95 text-white font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      <SimpleMdeEditor 
        value={value} 
        onChange={onChange} 
        options={options as any} 
        getMdeInstance={(instance) => {
          mdeRef.current = instance;
        }}
      />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ProjectsHeader from "./_components/ProjectsHeader";
import ProjectsTable from "./_components/ProjectsTable";
import ProjectModal from "./_components/ProjectModal";
import { Project } from "./_components/types";

export default function DashboardProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("WEB DESIGNING");
  const [image, setImage] = useState("");
  const [altText, setAltText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch projects from Neon DB via API
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data || []);
    } catch (e) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle Drag & Drop file upload preview (converts file to DataURL)
  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WebP)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setImage(reader.result as string);
        toast.success("Image uploaded & preview ready!");
      }
    };
    reader.readAsDataURL(file);
  };

  const openModalForCreate = () => {
    setEditingProject(null);
    setTitle("");
    setSubtitle("");
    setCategory("WEB DESIGNING");
    setImage("");
    setAltText("");
    setModalOpen(true);
  };

  const openModalForEdit = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title);
    setSubtitle(project.subtitle || "");
    setCategory(project.category);
    setImage(project.image);
    setAltText(project.altText || `${project.title} preview image`);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please provide or drop an image for the project");
      return;
    }
    setIsSaving(true);

    try {
      if (editingProject) {
        // UPDATE Existing Project
        const res = await fetch("/api/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingProject.id,
            title,
            subtitle,
            category,
            image,
            altText: altText || `${title} preview image`,
          }),
        });

        if (res.ok) {
          toast.success("Project updated successfully!");
          setModalOpen(false);
          fetchProjects();
        } else {
          toast.error("Failed to update project");
        }
      } else {
        // ADD New Project
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            subtitle,
            category,
            image,
            altText: altText || `${title} preview image`,
          }),
        });

        if (res.ok) {
          toast.success("New project added successfully!");
          setModalOpen(false);
          fetchProjects();
        } else {
          toast.error("Failed to add project");
        }
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Project deleted successfully!");
        setProjects(projects.filter((p) => p.id !== id));
      } else {
        toast.error("Failed to delete project");
      }
    } catch (err) {
      toast.error("Error deleting project");
    }
  };

  return (
    <div className="space-y-8">
      <ProjectsHeader onAddNew={openModalForCreate} />

      <ProjectsTable
        projects={projects}
        loading={loading}
        onEdit={openModalForEdit}
        onDelete={handleDelete}
      />

      <ProjectModal
        isOpen={modalOpen}
        editingProject={editingProject}
        title={title}
        setTitle={setTitle}
        subtitle={subtitle}
        setSubtitle={setSubtitle}
        category={category}
        setCategory={setCategory}
        image={image}
        setImage={setImage}
        altText={altText}
        setAltText={setAltText}
        isSaving={isSaving}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onFileSelect={handleFile}
      />
    </div>
  );
}

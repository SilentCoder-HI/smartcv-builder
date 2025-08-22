"use client";

import { CVData } from "@/types/cv-types";
import { CanvasTemplateMeta } from "@/types/template-types";
import { useEffect, useRef, useState, useCallback } from "react";

interface CanvasRendererProps {
  template: CanvasTemplateMeta;
  cvData: CVData;
  width?: number;
  height?: number;
  onTextClick?: (path: string, value: string) => void;
}

type DraggableText = {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  path: string;
};

function aoin(template: any, ot: any): DraggableText[] {
  const his = template?.styles?.header ?? {};
  const fi: DraggableText[] = [];

  if (ot?.personalInfo?.fullName) {
    fi.push({
      id: "fullName",
      text: ot.personalInfo.fullName,
      x: 32,
      y: 48,
      fontSize: his?.h1?.fontSize ?? 28,
      color: his?.h1?.color ?? "#fff",
      path: "personalInfo.fullName",
    });
  }

  if (ot?.personalInfo?.jobTitle) {
    fi.push({
      id: "jobTitle",
      text: ot.personalInfo.jobTitle,
      x: 32,
      y: 88,
      fontSize: his?.jobTitle?.fontSize ?? 18,
      color: his?.jobTitle?.color ?? "#e5e5e5",
      path: "personalInfo.jobTitle",
    });
  }

  return fi;
}

export default function ity({
  template,
  cvData,
  width = 800,
  height = 1100,
  onTextClick,
}: CanvasRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [texts, setTexts] = useState<DraggableText[]>(() => aoin(template, cvData));
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Update texts when template or cvData changes
  useEffect(() => {
    setTexts(aoin(template, cvData));
  }, [template, cvData]);

  // Redraw everything
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = template?.styles?.root?.backgroundColor ?? "#fff";
    ctx.fillRect(0, 0, width, height);

    // Header
    ctx.fillStyle = template?.styles?.header?.backgroundColor ?? "#1e1e1e";
    ctx.fillRect(
      template?.styles?.header?.x ?? 0,
      template?.styles?.header?.y ?? 0,
      template?.styles?.header?.width ?? width,
      template?.styles?.header?.height ?? 120
    );

    // Render texts
    texts.forEach((t) => {
      ctx.save();
      ctx.font = `${t.fontSize}px ${template?.styles?.root?.fontFamily || "Arial"}`;
      ctx.fillStyle = t.color;
      ctx.textBaseline = "top";
      ctx.fillText(t.text, t.x, t.y - t.fontSize * 0.2);
      ctx.restore();
    });
  }, [texts, template, width, height]);

  // Detect clicked text
  const getClickedText = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      for (let i = texts.length - 1; i >= 0; i--) {
        const t = texts[i];
        ctx.font = `${t.fontSize}px ${template?.styles?.root?.fontFamily || "Arial"}`;
        const metrics = ctx.measureText(t.text);
        const textWidth = metrics.width;
        const textHeight = t.fontSize;

        // Adjust for textBaseline "top"
        const textTop = t.y - t.fontSize * 0.2;
        const textBottom = textTop + textHeight;

        if (
          x >= t.x &&
          x <= t.x + textWidth &&
          y >= textTop &&
          y <= textBottom
        ) {
          return t;
        }
      }
      return null;
    },
    [texts, template]
  );

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const clicked = getClickedText(x, y);
      if (clicked) {
        setDraggingId(clicked.id);
        setOffset({ x: x - clicked.x, y: y - clicked.y });
        if (onTextClick) onTextClick(clicked.path, clicked.text);
      }
    },
    [getClickedText, onTextClick]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!draggingId) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setTexts((prev) =>
        prev.map((t) =>
          t.id === draggingId
            ? { ...t, x: Math.max(0, x - offset.x), y: Math.max(0, y - offset.y) }
            : t
        )
      );
    },
    [draggingId, offset]
  );

  const handleMouseUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  // Touch support for mobile
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const clicked = getClickedText(x, y);
      if (clicked) {
        setDraggingId(clicked.id);
        setOffset({ x: x - clicked.x, y: y - clicked.y });
        if (onTextClick) onTextClick(clicked.path, clicked.text);
      }
    },
    [getClickedText, onTextClick]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!draggingId) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      setTexts((prev) =>
        prev.map((t) =>
          t.id === draggingId
            ? { ...t, x: Math.max(0, x - offset.x), y: Math.max(0, y - offset.y) }
            : t
        )
      );
    },
    [draggingId, offset]
  );

  const handleTouchEnd = useCallback(() => {
    setDraggingId(null);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border border-gray-400 bg-white rounded shadow"
      style={{
        maxWidth: "100%",
        height: "auto",
        display: "block",
        background: template?.styles?.root?.backgroundColor ?? "#fff",
        fontFamily: template?.styles?.root?.fontFamily || "Arial",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      aria-label="CV Canvas"
      draggable={false}
    />
  );
}

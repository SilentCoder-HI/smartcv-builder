import { CanvasTemplateMeta, TemplateMeta } from "@/types/template-types"

// --- HTML-based templates ---
import classicBlack from "./Templets/classic/classic-black.json"
import classicBlue from "./Templets/classic/classic-blue.json"
import corporateFormal from "./Templets/corporate/CorporateFormal.json"
import corporateModern from "./Templets/corporate/CorporateModern.json"

// --- Canvas-based templates ---
import classicCanvas from "./Templets/Canva-based/Classic/classic.json"

export type PlanType = "free" | "pro" | "proPlus"
export type TextAlign = "left" | "center" | "right" | string;

// All templates list (no distinction in export)
export const htmltemplates: TemplateMeta[] = [
    // @ts-expect-error - textAlign type mismatch from raw JSON
    classicBlack,
    // @ts-expect-error - textAlign type mismatch from raw JSON
    classicBlue,
    // @ts-expect-error - textAlign type mismatch from raw JSON
    corporateFormal,
    // @ts-expect-error - textAlign type mismatch from raw JSON
    corporateModern,
]
export const Canvatemplates: CanvasTemplateMeta[] = [
    // @ts-expect-error - canvas-based template, may not match TemplateMeta exactly
    classicCanvas,
]
import { TemplateMeta } from "@/types/template-types"
import classicBlack from "./Templets/classic/classic-black.json"
import classicBlue from "./Templets/classic/classic-blue.json"
import corporateFormal from "./Templets/corporate/CorporateFormal.json"
import corporateModern from "./Templets/corporate/CorporateModern.json"

export type PlanType = "free" | "pro" | "proPlus"
export type TextAlign = "left" | "center" | "right" | string;

// 1. All templates list
export const templates: TemplateMeta[] = [
    // @ts-expect-error - textAlign type mismatch from raw JSON
    classicBlack,
    // @ts-expect-error - textAlign type mismatch from raw JSON
    classicBlue,
    // @ts-expect-error - textAlign type mismatch from raw JSON
    corporateFormal,
    // @ts-expect-error - textAlign type mismatch from raw JSON
    corporateModern,
]

// 2. Get templates by plan
export function getTemplatesByPlan(plan: PlanType): TemplateMeta[] {
    return templates.filter((t) => t.plan === plan)
}

// 3. Get templates with demo = true
export function getTemplatesWithDemo(): TemplateMeta[] {
    return templates.filter((t) => t.demo === true)
}

// 4. Get single template by ID
export function getTemplateById(templateId: string): TemplateMeta | undefined {
    return templates.find((t) => t.templateId === templateId)
}

// 5. Search by name (case insensitive)
export function searchTemplatesByName(keyword: string): TemplateMeta[] {
    return templates.filter((t) =>
        t.templateName.toLowerCase().includes(keyword.toLowerCase())
    )
}

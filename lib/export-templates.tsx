// /lib/export-templates.ts
import ClassicBlack from "@/components/cv-templates/Classic/ClassicBlack"
import ClassicBlue from "@/components/cv-templates/Classic/ClassicBlue"
import { CorporateModern } from "@/components/cv-templates/Corporate/CorporateModern"
import { CorporateFormal } from "@/components/cv-templates/Corporate/CorporateFormal"
import { CreativeColorful } from "@/components/cv-templates/Creative/CreativeColorful"
import { CreativePortfolio } from "@/components/cv-templates/Creative/CreativePortfolio"
import { ElegantContrast } from "@/components/cv-templates/Elegant/ElegantContrast"
import { ElegantSerif } from "@/components/cv-templates/Elegant/ElegantSerif"
import MinimalSerif from "@/components/cv-templates/Minimal/MinimalSerif"
import MinimalWhite from "@/components/cv-templates/Minimal/MinimalWhite"
import ModernGrid from "@/components/cv-templates/Modern/ModernGrid"
import ModernDark from "@/components/cv-templates/Modern/ModernDark"
import ModernLight from "@/components/cv-templates/Modern/ModernLight"

// ... import others

// @ts-ignore
export const templates: Record<string, (props: { data: any }) => JSX.Element> = {
  "classic-black": ({ data }) => <ClassicBlack data={data} />,
  "classic-blue": ({ data }) => <ClassicBlue data={data} />,
  "corporate-modern": ({ data }) => <CorporateModern data={data} />,
  "corporate-formal": ({ data }) => <CorporateFormal data={data} />,
  "creative-colorful": ({ data }) => <CreativeColorful data={data} />,
  "creative-portfolio": ({ data }) => <CreativePortfolio data={data} />,
  "elegant-contrast": ({ data }) => <ElegantContrast data={data} />,
  "elegant-serif": ({ data }) => <ElegantSerif data={data} />,
  "minimal-serif": ({ data }) => <MinimalSerif data={data} />,
  "minimal-white": ({ data }) => <MinimalWhite data={data} />,
  "modern-grid": ({ data }) => <ModernGrid data={data} />,
  "modern-dark": ({ data }) => <ModernDark data={data} />,
  "modern-light": ({ data }) => <ModernLight data={data} />,
  // Add others similarly...
}

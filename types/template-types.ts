// HTML-based template meta (original)
export interface TemplateMeta {
    templateId: string;
    templateName: string;
    description: string;
    version: string;
    plan: string;
    templateType: string;
    renderType: "html";
    demo: boolean;
    styles: {
      root: React.CSSProperties;
      header: {
        wrapper?: React.CSSProperties;
        h1: React.CSSProperties;
        jobTitle: React.CSSProperties;
        contact: {
          container: React.CSSProperties;
          item: React.CSSProperties;
          icon: React.CSSProperties;
          [key: string]: React.CSSProperties;
        };
        [key: string]: any;
      };
      summary: {
        sectionTitle: React.CSSProperties;
        summaryText: React.CSSProperties;
      };
      layout: {
        twoColumn: React.CSSProperties;
        leftColumn: React.CSSProperties;
        rightColumn: React.CSSProperties;
        experienceList: React.CSSProperties;
        educationList: React.CSSProperties;
        skillsList: React.CSSProperties;
        skillsContainer: React.CSSProperties;
      };
      experience: {
        h3: React.CSSProperties;
        h4: React.CSSProperties;
        dateText: React.CSSProperties;
        summaryText: React.CSSProperties;
        sectionTitle: React.CSSProperties;
      };
      education: {
        h3: React.CSSProperties;
        h4: React.CSSProperties;
        dateText: React.CSSProperties;
        gpaText: React.CSSProperties;
        sectionTitle: React.CSSProperties;
      };
      skills: {
        skillCategory: React.CSSProperties;
        skillItem: React.CSSProperties;
        container: React.CSSProperties;
        sectionTitle: React.CSSProperties;
      };
      certifications: {
        sectionTitle: React.CSSProperties;
        list: React.CSSProperties;
      };
      languages: {
        sectionTitle: React.CSSProperties;
        list: React.CSSProperties;
      };
      hobbies: {
        sectionTitle: React.CSSProperties;
        list: React.CSSProperties;
      };
    };
    structure: {
      layout: string;
      sections: {
        id: string;
        title: string;
        fields: string[];
      }[];
    };
}

// Canvas-based template meta (new)
export interface CanvasTemplateMeta {
  templateId: string;
  templateName: string;
  description: string;
  version: string;
  plan: string;
  templateType: string;
  category: string;
  author: string;
  renderType: "canva";
  styles: {
    root: {
      backgroundColor: string;
      width: number;
      height: number;
      fontFamily: string;
      [key: string]: any;
    };
    header: {
      backgroundColor: string;
      height: number;
      x: number;
      y: number;
      width: number;
      h1: {
        color: string;
        fontSize: number;
        fontWeight: string;
        [key: string]: any;
      };
      jobTitle: {
        color: string;
        fontSize: number;
        [key: string]: any;
      };
      contact: {
        color: string;
        fontSize: number;
        [key: string]: any;
      };
      [key: string]: any;
    };
    layout: {
      leftColumn: {
        x: number;
        y: number;
        width: number;
        [key: string]: any;
      };
      rightColumn: {
        x: number;
        y: number;
        width: number;
        [key: string]: any;
      };
      sectionGap: number;
      [key: string]: any;
    };
    sectionTitle: {
      fontSize: number;
      color: string;
      fontStyle: string;
      marginBottom: number;
      [key: string]: any;
    };
    text: {
      fontSize: number;
      color: string;
      lineHeight: number;
      [key: string]: any;
    };
    skillItem: {
      backgroundColor: string;
      color: string;
      padding: number;
      borderRadius: number;
      marginRight: number;
      marginBottom: number;
      [key: string]: any;
    };
    [key: string]: any;
  };
  sections: {
    id: string;
    title: string;
    column: string;
  }[];
}
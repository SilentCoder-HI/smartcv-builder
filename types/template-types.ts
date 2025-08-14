export interface TemplateMeta {
    templateId: string;
    templateName: string;
    description: string;
    version: string;
    plan: string;
    templateType: string;
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
  
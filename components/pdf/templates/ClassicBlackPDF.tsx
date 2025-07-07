// components/pdf/templates/ClassicBlackPDF.tsx
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
  } from "@react-pdf/renderer";
  import type { CVData } from "@/types/cv-types";
  
  Font.register({ family: "Helvetica", src: "https://fonts.gstatic.com/s/helvetica/v15/o-0IIpQlx3QUlC5A4PNb4j5Ba_2c7A.woff2" });
  
  const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: "Helvetica", fontSize: 10, color: "#111" },
    section: { marginBottom: 24 },
    heading: { fontSize: 12, marginBottom: 6, fontWeight: "bold", borderBottom: "1 solid #ccc", paddingBottom: 4 },
    subheading: { fontSize: 10, margin: 466, fontStyle: "italic", color: "#666" },
    text: { fontSize: 10, marginBottom: 4, lineHeight: 1.4 },
    listItem: { marginLeft: 10, marginBottom: 2 },
  });
  
  interface Props {
    data: CVData;
  }
  
  export default function ClassicBlackPDF({ data }: Props) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.section}>
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>{data.personalInfo.fullName}</Text>
            <Text style={{ fontSize: 12, fontStyle: "italic", textAlign: "center", marginBottom: 4 }}>{data.personalInfo.jobTitle}</Text>
            <Text style={{ fontSize: 9, textAlign: "center", color: "#555" }}>
              {[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.address].filter(Boolean).join(" | ")}
            </Text>
          </View>
  
          {/* Summary */}
          {data.personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.heading}>Professional Summary</Text>
              <Text style={styles.text}>{data.personalInfo.summary}</Text>
            </View>
          )}
  
          {/* Experience */}
          {data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>{exp.position}</Text>
                  <Text style={styles.subheading}>{exp.company}</Text>
                  <Text style={{ fontSize: 9, color: "#777" }}>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</Text>
                  {exp.description && <Text style={styles.text}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          )}
  
          {/* Education */}
          {data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontWeight: "bold" }}>{edu.degree} {edu.field && `in ${edu.field}`}</Text>
                  <Text style={styles.subheading}>{edu.institution}</Text>
                  <Text style={{ fontSize: 9, color: "#777" }}>{edu.startDate} – {edu.endDate}</Text>
                  {edu.gpa && <Text style={{ fontSize: 9, color: "#555" }}>GPA: {edu.gpa}</Text>}
                </View>
              ))}
            </View>
          )}
  
          {/* Skills */}
          {data.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Skills</Text>
              {data.skills.map((cat, i) => (
                <View key={i} style={{ marginBottom: 4 }}>
                  <Text style={{ fontWeight: "bold" }}>{cat.category}</Text>
                  <Text>{cat.items.join(", ")}</Text>
                </View>
              ))}
            </View>
          )}
  
          {/* Certifications */}
          {data.certifications?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Certifications</Text>
              {data.certifications.map((cert, i) => (
                <Text key={i} style={styles.listItem}>• {cert}</Text>
              ))}
            </View>
          )}
  
          {/* Languages */}
          {(data.languages?.length ?? 0) > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Languages</Text>
              {data.languages?.map((lang, i) => (
                <Text key={i} style={styles.listItem}>
                  • {lang.language}{lang.proficiency ? ` – ${lang.proficiency}` : ""}
                </Text>
              ))}
            </View>
          )}
  
          {/* Hobbies */}
          {data.hobbies?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Hobbies</Text>
              {data.hobbies.map((hobby, i) => (
                <Text key={i} style={styles.listItem}>• {hobby}</Text>
              ))}
            </View>
          )}
        </Page>
      </Document>
    );
  }
  
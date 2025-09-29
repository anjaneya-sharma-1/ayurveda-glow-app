import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { WeeklyDietPlan, DietItem } from '@/data/priyaSharmaDietPlan';

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: string;
  prakriti: string;
  lastConsultation: string;
  doshaBalance: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  height: number;
  weight: number;
  bmi: number;
  riskFlags?: Array<{
    condition: string;
    level: 'high' | 'medium' | 'low';
    description: string;
  }>;
  wearableData?: {
    steps: number;
    heartRate: number;
    sleep: number;
    stress: number;
  };
}

export class PDFExportService {
  private readonly COLORS = {
    primary: '#22C55E',
    secondary: '#059669',
    vata: '#10B981',
    pitta: '#F59E0B',
    kapha: '#3B82F6',
    accent: '#8B5CF6',
    text: '#1F2937',
    muted: '#6B7280',
    light: '#F9FAFB',
    white: '#FFFFFF',
    border: '#E5E7EB'
  };

  private readonly FONTS = {
    heading: 'helvetica',
    body: 'helvetica',
    bold: 'helvetica-bold'
  };

  private async loadImageAsBase64(imagePath: string): Promise<string | null> {
    try {
      const response = await fetch(imagePath);
      if (!response.ok) return null;
      
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.warn('Failed to load image:', imagePath);
      return null;
    }
  }

  async exportPatientReport(
    patient: PatientData,
    dietPlan: WeeklyDietPlan,
    language: 'en' | 'hi' = 'en'
  ): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // Page 1: Patient Overview
    await this.createPatientOverviewPage(pdf, patient, pageWidth, pageHeight, margin, contentWidth, language);
    
    // Page 2: Dosha Analysis
    pdf.addPage();
    await this.createDoshaAnalysisPage(pdf, patient, pageWidth, pageHeight, margin, contentWidth, language);
    
    // Pages 3-4: Diet Plan
    pdf.addPage();
    await this.createDietPlanPages(pdf, patient, dietPlan, pageWidth, pageHeight, margin, contentWidth, language);

    // Save the PDF
    const fileName = `${patient.name.replace(/\s+/g, '_')}_Ayurveda_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  }

  private async createPatientOverviewPage(
    pdf: jsPDF,
    patient: PatientData,
    pageWidth: number,
    pageHeight: number,
    margin: number,
    contentWidth: number,
    language: 'en' | 'hi'
  ): Promise<void> {
    const text = this.getTexts(language);
    let yPos = margin;

    // Header with gradient background (simulated with rectangles)
    pdf.setFillColor(34, 197, 94); // primary color
    pdf.rect(0, 0, pageWidth, 60, 'F');
    
    // Logo/Icon area
    pdf.setFillColor(255, 255, 255);
    pdf.circle(30, 30, 15, 'F');
    
    // Add logo image
    try {
      const iconBase64 = await this.loadImageAsBase64('/ayurveda-icon.png');
      if (iconBase64) {
        // Remove the "data:image/png;base64," prefix if present
        const base64Data = iconBase64.replace(/^data:image\/[a-z]+;base64,/, '');
        pdf.addImage(base64Data, 'PNG', 15, 15, 30, 30);
      } else {
        // Fallback if image fails to load
        pdf.setTextColor(34, 197, 94);
        pdf.setFontSize(16);
        pdf.setFont(this.FONTS.bold);
        pdf.text('🌿', 24, 37);
      }
    } catch (error) {
      // Fallback if image loading fails
      pdf.setTextColor(34, 197, 94);
      pdf.setFontSize(16);
      pdf.setFont(this.FONTS.bold);
      pdf.text('🌿', 24, 37);
    }

    // Main title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont(this.FONTS.bold);
    pdf.text(text.reportTitle, 60, 25);
    
    // Subtitle
    pdf.setFontSize(14);
    pdf.setFont(this.FONTS.body);
    pdf.text(text.comprehensive, 60, 35);
    
    // Date
    pdf.setFontSize(10);
    pdf.text(`${text.generatedOn}: ${new Date().toLocaleDateString()}`, 60, 45);

    yPos = 80;

    // Patient Information Card
    pdf.setFillColor(249, 250, 251); // light background
    pdf.roundedRect(margin, yPos, contentWidth, 85, 5, 5, 'F');
    
    // Patient name and basic info
    pdf.setTextColor(31, 41, 55); // text color
    pdf.setFontSize(22);
    pdf.setFont(this.FONTS.bold);
    pdf.text(patient.name, margin + 15, yPos + 25);
    
    pdf.setFontSize(12);
    pdf.setFont(this.FONTS.body);
    pdf.setTextColor(107, 114, 128); // muted color
    pdf.text(`${patient.age} ${text.years}, ${patient.gender}`, margin + 15, yPos + 40);
    pdf.text(`${text.prakriti}: ${patient.prakriti}`, margin + 15, yPos + 52);
    pdf.text(`${text.lastConsultation}: ${patient.lastConsultation}`, margin + 15, yPos + 64);

    // Physical Stats Box
    const statsX = margin + contentWidth/2 + 15;
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(statsX, yPos + 10, (contentWidth/2) - 25, 65, 3, 3, 'F');
    pdf.setDrawColor(229, 231, 235);
    pdf.roundedRect(statsX, yPos + 10, (contentWidth/2) - 25, 65, 3, 3, 'S');
    
    pdf.setTextColor(31, 41, 55);
    pdf.setFontSize(14);
    pdf.setFont(this.FONTS.bold);
    pdf.text(text.physicalStats, statsX + 10, yPos + 25);
    
    pdf.setFontSize(11);
    pdf.setFont(this.FONTS.body);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`${text.height}: ${patient.height} cm`, statsX + 10, yPos + 40);
    pdf.text(`${text.weight}: ${patient.weight} kg`, statsX + 10, yPos + 52);
    pdf.text(`${text.bmi}: ${patient.bmi}`, statsX + 10, yPos + 64);

    yPos += 105;

    // Dosha Balance Overview
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(margin, yPos, contentWidth, 70, 5, 5, 'F');
    pdf.setDrawColor(229, 231, 235);
    pdf.roundedRect(margin, yPos, contentWidth, 70, 5, 5, 'S');

    pdf.setTextColor(31, 41, 55);
    pdf.setFontSize(16);
    pdf.setFont(this.FONTS.bold);
    pdf.text(text.doshaBalance, margin + 10, yPos + 20);

    // Dosha bars with proper sizing
    const barWidth = (contentWidth - 60) / 3;
    const barHeight = 12;
    const barY = yPos + 35;
    const barSpacing = 15;

    // Vata bar
    pdf.setFillColor(229, 231, 235); // background bar
    pdf.rect(margin + 10, barY, barWidth, barHeight, 'F');
    pdf.setFillColor(16, 185, 129); // vata color
    pdf.rect(margin + 10, barY, (barWidth * patient.doshaBalance.vata) / 100, barHeight, 'F');
    pdf.setDrawColor(16, 185, 129);
    pdf.rect(margin + 10, barY, barWidth, barHeight, 'S');
    
    pdf.setFontSize(11);
    pdf.setTextColor(31, 41, 55);
    pdf.setFont(this.FONTS.bold);
    pdf.text(`Vata: ${patient.doshaBalance.vata}%`, margin + 10, barY + barHeight + 8);

    // Pitta bar
    const pittaX = margin + 10 + barWidth + barSpacing;
    pdf.setFillColor(229, 231, 235); // background bar
    pdf.rect(pittaX, barY, barWidth, barHeight, 'F');
    pdf.setFillColor(245, 158, 11); // pitta color
    pdf.rect(pittaX, barY, (barWidth * patient.doshaBalance.pitta) / 100, barHeight, 'F');
    pdf.setDrawColor(245, 158, 11);
    pdf.rect(pittaX, barY, barWidth, barHeight, 'S');
    pdf.text(`Pitta: ${patient.doshaBalance.pitta}%`, pittaX, barY + barHeight + 8);

    // Kapha bar
    const kaphaX = margin + 10 + (barWidth * 2) + (barSpacing * 2);
    pdf.setFillColor(229, 231, 235); // background bar
    pdf.rect(kaphaX, barY, barWidth, barHeight, 'F');
    pdf.setFillColor(59, 130, 246); // kapha color
    pdf.rect(kaphaX, barY, (barWidth * patient.doshaBalance.kapha) / 100, barHeight, 'F');
    pdf.setDrawColor(59, 130, 246);
    pdf.rect(kaphaX, barY, barWidth, barHeight, 'S');
    pdf.text(`Kapha: ${patient.doshaBalance.kapha}%`, kaphaX, barY + barHeight + 8);

    yPos += 90;

    // Footer
    pdf.setTextColor(107, 114, 128);
    pdf.setFontSize(8);
    pdf.setFont(this.FONTS.body);
    pdf.text(text.confidential, margin, pageHeight - 10);
    pdf.text(`${text.page} 1`, pageWidth - margin - 20, pageHeight - 10);
  }

  private async createDoshaAnalysisPage(
    pdf: jsPDF,
    patient: PatientData,
    pageWidth: number,
    pageHeight: number,
    margin: number,
    contentWidth: number,
    language: 'en' | 'hi'
  ): Promise<void> {
    const text = this.getTexts(language);
    let yPos = margin;

    // Page header
    pdf.setFillColor(249, 250, 251);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(31, 41, 55);
    pdf.setFontSize(18);
    pdf.setFont(this.FONTS.bold);
    pdf.text(text.doshaAnalysis, margin, 25);

    yPos = 60;

    // Constitution Analysis
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(margin, yPos, contentWidth, 60, 5, 5, 'F');
    pdf.setDrawColor(229, 231, 235);
    pdf.roundedRect(margin, yPos, contentWidth, 60, 5, 5, 'S');

    pdf.setTextColor(31, 41, 55);
    pdf.setFontSize(14);
    pdf.setFont(this.FONTS.bold);
    pdf.text(text.constitutionAnalysis, margin + 10, yPos + 15);

    pdf.setFontSize(11);
    pdf.setFont(this.FONTS.body);
    pdf.setTextColor(107, 114, 128);
    
    const analysis = this.getDoshaAnalysis(patient.doshaBalance, language);
    const lines = pdf.splitTextToSize(analysis, contentWidth - 20);
    pdf.text(lines, margin + 10, yPos + 30);

    yPos += 80;

    // Recommendations
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(margin, yPos, contentWidth, 80, 5, 5, 'F');
    pdf.setDrawColor(229, 231, 235);
    pdf.roundedRect(margin, yPos, contentWidth, 80, 5, 5, 'S');

    pdf.setTextColor(31, 41, 55);
    pdf.setFontSize(14);
    pdf.setFont(this.FONTS.bold);
    pdf.text(text.recommendations, margin + 10, yPos + 15);

    const recommendations = this.getDoshaRecommendations(patient.doshaBalance, language);
    pdf.setFontSize(10);
    pdf.setFont(this.FONTS.body);
    pdf.setTextColor(107, 114, 128);
    
    let recY = yPos + 30;
    recommendations.forEach(rec => {
      pdf.text(`• ${rec}`, margin + 15, recY);
      recY += 12;
    });

    // Footer
    pdf.setTextColor(107, 114, 128);
    pdf.setFontSize(8);
    pdf.text(`${text.page} 2`, pageWidth - margin - 20, pageHeight - 10);
  }

  private async createDietPlanPages(
    pdf: jsPDF,
    patient: PatientData,
    dietPlan: WeeklyDietPlan,
    pageWidth: number,
    pageHeight: number,
    margin: number,
    contentWidth: number,
    language: 'en' | 'hi'
  ): Promise<void> {
    const text = this.getTexts(language);
    let yPos = margin;

    // Page header
    pdf.setFillColor(249, 250, 251);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(31, 41, 55);
    pdf.setFontSize(18);
    pdf.setFont(this.FONTS.bold);
    pdf.text(`${text.weeklyDietPlan} - ${patient.name}`, margin, 25);

    yPos = 60;

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealTimes = [
      { key: "earlyMorning", label: text.earlyMorning },
      { key: "breakfast", label: text.breakfast },
      { key: "midMorning", label: text.midMorning },
      { key: "lunch", label: text.lunch },
      { key: "evening", label: text.evening },
      { key: "dinner", label: text.dinner },
      { key: "bedtime", label: text.bedtime }
    ];

    // Create diet plan table for each day
    daysOfWeek.forEach((day, dayIndex) => {
      if (yPos > pageHeight - 60) {
        pdf.addPage();
        yPos = margin;
      }

      // Day header
      pdf.setFillColor(34, 197, 94);
      pdf.roundedRect(margin, yPos, contentWidth, 15, 3, 3, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont(this.FONTS.bold);
      pdf.text(day, margin + 5, yPos + 10);

      yPos += 20;

      // Meals for this day
      const dayPlan = dietPlan[day];
      if (dayPlan) {
        mealTimes.forEach(meal => {
          const mealItems = dayPlan[meal.key as keyof typeof dayPlan] || [];
          
          if (mealItems.length > 0) {
            // Meal time header
            pdf.setFillColor(249, 250, 251);
            pdf.rect(margin, yPos, contentWidth, 12, 'F');
            pdf.setTextColor(31, 41, 55);
            pdf.setFontSize(10);
            pdf.setFont(this.FONTS.bold);
            pdf.text(meal.label, margin + 5, yPos + 8);

            yPos += 15;

            // Meal items
            mealItems.forEach(item => {
              pdf.setFontSize(9);
              pdf.setFont(this.FONTS.body);
              pdf.setTextColor(107, 114, 128);
              pdf.text(`• ${item.food.name} - ${item.quantity}`, margin + 10, yPos);
              if (item.notes) {
                pdf.setTextColor(139, 92, 246);
                pdf.text(`(${item.notes})`, margin + 80, yPos);
              }
              yPos += 8;
            });

            yPos += 5;
          }
        });
      }

      yPos += 10; // Space between days
    });

    // Nutritional Summary
    if (yPos > pageHeight - 80) {
      pdf.addPage();
      yPos = margin;
    }

    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(margin, yPos, contentWidth, 60, 5, 5, 'F');
    pdf.setDrawColor(34, 197, 94);
    pdf.roundedRect(margin, yPos, contentWidth, 60, 5, 5, 'S');

    pdf.setTextColor(31, 41, 55);
    pdf.setFontSize(14);
    pdf.setFont(this.FONTS.bold);
    pdf.text(text.nutritionalGuidelines, margin + 10, yPos + 15);

    const guidelines = this.getNutritionalGuidelines(language);
    pdf.setFontSize(9);
    pdf.setFont(this.FONTS.body);
    pdf.setTextColor(107, 114, 128);
    
    let guideY = yPos + 25;
    guidelines.forEach(guideline => {
      pdf.text(`• ${guideline}`, margin + 15, guideY);
      guideY += 8;
    });

    // Footer
    pdf.setTextColor(107, 114, 128);
    pdf.setFontSize(8);
    pdf.text(`${text.page} 3-4`, pageWidth - margin - 20, pageHeight - 10);
  }

  private getDoshaAnalysis(doshaBalance: { vata: number; pitta: number; kapha: number }, language: 'en' | 'hi'): string {
    const dominant = Object.entries(doshaBalance).reduce((a, b) => doshaBalance[a[0] as keyof typeof doshaBalance] > doshaBalance[b[0] as keyof typeof doshaBalance] ? a : b);
    
    if (language === 'hi') {
      return `आपका प्रमुख दोष ${dominant[0]} है (${dominant[1]}%)। यह आपके स्वाभाविक संविधान और वर्तमान स्थिति को दर्शाता है।`;
    }

    return `Your dominant dosha is ${dominant[0]} at ${dominant[1]}%. This reflects your natural constitution and current state of balance. Understanding your dosha helps in making appropriate lifestyle and dietary choices.`;
  }

  private getDoshaRecommendations(doshaBalance: { vata: number; pitta: number; kapha: number }, language: 'en' | 'hi'): string[] {
    const dominant = Object.entries(doshaBalance).reduce((a, b) => doshaBalance[a[0] as keyof typeof doshaBalance] > doshaBalance[b[0] as keyof typeof doshaBalance] ? a : b);
    
    if (language === 'hi') {
      return [
        'नियमित भोजन का समय बनाए रखें',
        'अपने प्रमुख दोष के अनुसार भोजन का चयन करें',
        'तनाव कम करने के लिए योग और ध्यान करें',
        'पर्याप्त नींद लें और नियमित दिनचर्या अपनाएं'
      ];
    }

    const recommendations: { [key: string]: string[] } = {
      vata: [
        'Maintain regular meal times and warm, cooked foods',
        'Practice grounding activities like yoga and meditation',
        'Ensure adequate rest and avoid overstimulation',
        'Include healthy fats and sweet, sour, salty tastes'
      ],
      pitta: [
        'Choose cooling foods and avoid excessive heat',
        'Practice moderation and avoid overexertion', 
        'Include sweet, bitter, and astringent tastes',
        'Maintain calm environment and regular relaxation'
      ],
      kapha: [
        'Engage in regular physical activity',
        'Choose light, warm, and spicy foods',
        'Include pungent, bitter, and astringent tastes',
        'Maintain active lifestyle and avoid excessive sleep'
      ]
    };

    return recommendations[dominant[0]] || recommendations.vata;
  }

  private getNutritionalGuidelines(language: 'en' | 'hi'): string[] {
    if (language === 'hi') {
      return [
        'भोजन को धीरे-धीरे और शांति से खाएं',
        'पानी भोजन के दौरान कम मात्रा में पिएं',
        'ताजा और मौसमी खाद्य पदार्थों को प्राथमिकता दें',
        'भोजन के बाद थोड़ी देर आराम करें'
      ];
    }

    return [
      'Eat meals slowly and mindfully in a calm environment',
      'Drink minimal water during meals, more between meals',
      'Prioritize fresh, seasonal, and locally sourced foods',
      'Allow time for rest and digestion after eating',
      'Follow the principle of eating until 75% full',
      'Maintain consistent meal timing throughout the week'
    ];
  }

  private getTexts(language: 'en' | 'hi') {
    return language === 'hi' ? {
      reportTitle: 'आयुर्वेदिक स्वास्थ्य रिपोर्ट',
      comprehensive: 'व्यापक रोगी विश्लेषण और आहार योजना',
      generatedOn: 'तैयार किया गया',
      years: 'वर्ष',
      prakriti: 'प्रकृति',
      lastConsultation: 'अंतिम परामर्श',
      physicalStats: 'शारीरिक आंकड़े',
      height: 'ऊंचाई',
      weight: 'वजन',
      bmi: 'बीएमआई',
      doshaBalance: 'दोष संतुलन',
      healthInsights: 'स्वास्थ्य अंतर्दृष्टि',
      page: 'पृष्ठ',
      confidential: 'गोपनीय चिकित्सा रिपोर्ट',
      doshaAnalysis: 'दोष विश्लेषण',
      constitutionAnalysis: 'संविधान विश्लेषण',
      recommendations: 'सुझाव',
      weeklyDietPlan: 'साप्ताहिक आहार योजना',
      earlyMorning: 'प्रातःकाल',
      breakfast: 'नाश्ता',
      midMorning: 'मध्य सुबह',
      lunch: 'दोपहर का भोजन',
      evening: 'शाम',
      dinner: 'रात का खाना',
      bedtime: 'सोने से पहले',
      nutritionalGuidelines: 'पोषण संबंधी दिशानिर्देश'
    } : {
      reportTitle: 'Ayurvedic Health Report',
      comprehensive: 'Comprehensive Patient Analysis & Diet Plan',
      generatedOn: 'Generated on',
      years: 'years',
      prakriti: 'Prakriti',
      lastConsultation: 'Last Consultation',
      physicalStats: 'Physical Stats',
      height: 'Height',
      weight: 'Weight',
      bmi: 'BMI',
      doshaBalance: 'Dosha Balance',
      healthInsights: 'Health Insights',
      page: 'Page',
      confidential: 'Confidential Medical Report',
      doshaAnalysis: 'Dosha Analysis',
      constitutionAnalysis: 'Constitution Analysis',
      recommendations: 'Recommendations',
      weeklyDietPlan: 'Weekly Diet Plan',
      earlyMorning: 'Early Morning',
      breakfast: 'Breakfast',
      midMorning: 'Mid Morning',
      lunch: 'Lunch',
      evening: 'Evening',
      dinner: 'Dinner',
      bedtime: 'Bedtime',
      nutritionalGuidelines: 'Nutritional Guidelines'
    };
  }
}

export const pdfExportService = new PDFExportService();
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates a PDF from study notes content
 * @param {Object} studyNotes - The study notes object
 * @param {Array} generatedImages - Array of generated diagram images
 * @returns {Promise<void>}
 */
export async function generateStudyNotesPDF(studyNotes, generatedImages = []) {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Helper function to add new page if needed
    const checkNewPage = (height) => {
      if (yPosition + height > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
    };

    // Title
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Study Notes: ${studyNotes.topic}`, margin, yPosition);
    yPosition += 15;

    // Subtitle
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Education Level: ${studyNotes.educationLevel}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 15;

    // Table of Contents
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    checkNewPage(10);
    pdf.text('Table of Contents', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    studyNotes.sections?.forEach((section, index) => {
      checkNewPage(8);
      pdf.text(`${index + 1}. ${section.title}`, margin + 5, yPosition);
      yPosition += 8;
    });

    if (generatedImages.length > 0) {
      checkNewPage(8);
      pdf.text(`${studyNotes.sections?.length + 1}. Visual Diagrams`, margin + 5, yPosition);
      yPosition += 8;
    }

    yPosition += 10;

    // Content sections
    studyNotes.sections?.forEach((section, index) => {
      checkNewPage(20);
      
      // Section title
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${index + 1}. ${section.title}`, margin, yPosition);
      yPosition += 12;

      // Section content
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      
      const contentLines = section.content.split('\n');
      contentLines.forEach(line => {
        if (line.trim() === '') {
          yPosition += 5;
          return;
        }

        // Handle bold text
        if (line.startsWith('**') && line.endsWith('**')) {
          checkNewPage(8);
          pdf.setFont('helvetica', 'bold');
          const cleanLine = line.replace(/\*\*/g, '');
          pdf.text(cleanLine, margin, yPosition);
          pdf.setFont('helvetica', 'normal');
          yPosition += 8;
          return;
        }

        // Handle bullet points
        if (line.startsWith('•') || line.startsWith('*')) {
          checkNewPage(8);
          const cleanLine = line.substring(1).trim();
          pdf.text('• ' + cleanLine, margin + 5, yPosition);
          yPosition += 8;
          return;
        }

        // Handle regular text with word wrapping
        checkNewPage(8);
        const words = line.split(' ');
        let currentLine = '';
        
        words.forEach(word => {
          const testLine = currentLine + (currentLine ? ' ' : '') + word;
          const textWidth = pdf.getTextWidth(testLine);
          
          if (textWidth > contentWidth - 10) {
            if (currentLine) {
              pdf.text(currentLine, margin, yPosition);
              yPosition += 6;
              checkNewPage(6);
            }
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        });
        
        if (currentLine) {
          pdf.text(currentLine, margin, yPosition);
          yPosition += 6;
        }
      });

      yPosition += 10;
    });

    // Add generated images
    if (generatedImages.length > 0) {
      checkNewPage(20);
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Visual Diagrams', margin, yPosition);
      yPosition += 15;

      for (let i = 0; i < generatedImages.length; i++) {
        const image = generatedImages[i];
        checkNewPage(80);

        // Image title
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(image.title, margin, yPosition);
        yPosition += 10;

        // Add image
        try {
          const imgData = `data:image/png;base64,${image.data}`;
          const imgWidth = contentWidth * 0.8;
          const imgHeight = (imgWidth * 3) / 4; // 4:3 aspect ratio
          
          pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
          yPosition += imgHeight + 5;

          // Image caption
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'italic');
          pdf.text(image.caption || 'Educational diagram', margin, yPosition);
          yPosition += 15;
        } catch (error) {
          console.error('Error adding image to PDF:', error);
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.text('Image could not be loaded', margin, yPosition);
          yPosition += 10;
        }
      }
    }

    // Footer on each page
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Page ${i} of ${pageCount}`, pageWidth - 30, pageHeight - 10);
      pdf.text('Generated by StudyNotes AI', margin, pageHeight - 10);
    }

    // Save the PDF
    const fileName = `${studyNotes.topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}-study-notes.pdf`;
    pdf.save(fileName);
    
    return fileName;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
}

/**
 * Generates a PDF from HTML content
 * @param {string} htmlContent - The HTML content to convert
 * @param {string} filename - The filename for the PDF
 * @returns {Promise<void>}
 */
export async function generatePDFFromHTML(htmlContent, filename) {
  try {
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    element.style.width = '800px';
    element.style.padding = '20px';
    element.style.fontFamily = 'Arial, sans-serif';
    element.style.lineHeight = '1.6';
    element.style.color = '#333';
    
    document.body.appendChild(element);

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false
    });

    document.body.removeChild(element);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF from HTML:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
}

/**
 * Quick PDF generation for basic text content
 * @param {string} title - The title of the document
 * @param {string} content - The text content
 * @param {string} filename - The filename for the PDF
 * @returns {Promise<void>}
 */
export async function generateQuickPDF(title, content, filename) {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Helper function to add new page if needed
    const checkNewPage = (height) => {
      if (yPosition + height > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
    };

    // Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, margin, yPosition);
    yPosition += 15;

    // Date
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 15;

    // Content
    pdf.setFontSize(12);
    const lines = content.split('\n');
    
    lines.forEach(line => {
      if (line.trim() === '') {
        yPosition += 5;
        return;
      }

      checkNewPage(8);
      
      // Handle word wrapping
      const words = line.split(' ');
      let currentLine = '';
      
      words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const textWidth = pdf.getTextWidth(testLine);
        
        if (textWidth > contentWidth) {
          if (currentLine) {
            pdf.text(currentLine, margin, yPosition);
            yPosition += 6;
            checkNewPage(6);
          }
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      
      if (currentLine) {
        pdf.text(currentLine, margin, yPosition);
        yPosition += 6;
      }
    });

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating quick PDF:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
}
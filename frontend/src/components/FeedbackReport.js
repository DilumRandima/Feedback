import jspdf from "jspdf";
import "jspdf-autotable";

export const generateFeedbackPDF = (filteredCustomers) => {
    const doc = new jspdf();
    const tableColumn = [
        "No",
        "Name",
        "Phone Number",
        "Email",
        "Message",
        "Employee Name",
    ];
    const tableRows = [];

    // Fill the rows with feedback data
    filteredCustomers.forEach((feedbackItem, index) => {
        const data = [
            index + 1,
            feedbackItem.name,
            feedbackItem.phone_number,
            feedbackItem.email,
            feedbackItem.message,
            feedbackItem.employee_name,
        ];
        tableRows.push(data);
    });

    const date = new Date().toLocaleDateString();
    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor("red");
    doc.text("Peacock corridor Holiday House", 40, 15);
    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Customers Feedback Details Report", 50, 25);
    doc.setFont("times", "normal").setFontSize(15).setTextColor(100, 100, 100);
    doc.text(`Report Generated Date: ${date}`, 65, 35);

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 50,
        styles: { fontSize: 9 },
        headStyles: {
            fillColor: [31, 41, 55],
            textColor: [255, 255, 255],
            fontStyle: "bold",
        },
    });

    doc.save(`Feedback-Details-Report_${date}.pdf`);
};

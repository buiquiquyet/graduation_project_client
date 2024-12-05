import { ToastMessage, ToastStatus } from "../libraries/message-log-component/MessageLog";

export const downloadExcelFile = async (data: any, fileName: string = "Donates.xlsx") => {
    if (!data) return null;
  
    try {
      const file = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
  
      // Create a link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file); // Create an object URL for the Blob
      link.download = fileName; // File name for the download
  
      // Append the link to the document and trigger a click event
      document.body.appendChild(link);
      link.click();
  
      // Remove the link after triggering the download
      document.body.removeChild(link);
  
      // If no errors occur, consider the download as successful
      ToastMessage.show(ToastStatus.success, 'Xuất file thành công')
    } catch (error) {
        ToastMessage.show(ToastStatus.error, 'Xuất file thất bại')

      return false; // Indicate failure
    }
  
    return true; // Indicate success
  };
  
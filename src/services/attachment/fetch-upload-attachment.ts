import { env } from "@/env";
import { showToast } from "@/utils/toast-message";
import { ATTACHMENT_ERRORS_TRANSLATE } from "@/utils/translations/attachment-erros-translate";

export const fetchUploadAttachment = async (file: File) => {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await fetch(
      `${env.NEXT_PUBLIC_API_BASE_URL}/upload`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      },
    );

    const data = await uploadResponse.json();

    if (!uploadResponse.ok) {
      showToast({
        type: "error",
        content: ATTACHMENT_ERRORS_TRANSLATE[data?.message],
      });

      return null;
    }

    return data;
  }
};

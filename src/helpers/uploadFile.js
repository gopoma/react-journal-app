export const uploadFile = async (file) => {
    if(!file) throw new Error("A file is required");

    const cloudUrl = "https://api.cloudinary.com/v1_1/gopoma/upload";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "react-journal");

    try {
        const response = await fetch(cloudUrl, {
            method: "POST",
            body: formData
        });

        if(!response.ok) throw new Error("Cannot upload that file");
        
        const cloudResponse = await response.json();

        return cloudResponse.secure_url;
    } catch(error) {
        console.log(error);
        throw new Error(error.message);
    }
};
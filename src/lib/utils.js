import FormData from "form-data";

export const toFormData = obj => {
    const formData  = new FormData();

	for(var name in obj) {
	  formData.append(name, obj[name]);
    }
    
    return formData;
};
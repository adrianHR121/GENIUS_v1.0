import verificationService from "./verificationService";

const getEmailVerification = async (token) => {
    //console.log(body);
    try {
        const response = await verificationService(token);
        const responseJson = await response.json(); 
        console.log(responseJson);
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default getEmailVerification;
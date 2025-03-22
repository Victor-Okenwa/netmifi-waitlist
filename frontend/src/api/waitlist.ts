import instance from "./instance";
const timeout = 3 * 60 * 1000; //3 minutes in milliseconds

export const waitlist = async (credentials: { email: string; name: string }) => {
    const response = await instance.post("/waitlist/", credentials, {
        timeout,
    });
    return response.data;
};
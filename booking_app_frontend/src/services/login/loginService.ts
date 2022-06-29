import Client from "../Client";
import { LoginDto } from "./dto";

const login = async (dto: LoginDto): Promise<any> => {
    return Client.post(`/auth/login`, dto)
};

export default {
    login
}
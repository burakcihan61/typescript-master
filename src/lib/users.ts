import axios from "axios";
import { requestHandler } from "./index";

export interface Root {
    userId: number
    id: number
    title: string
    body: string
}

interface GetUsersParams {
    limit?: number;
    page?: number;
}

export const getUsers = requestHandler<GetUsersParams, Root[]>((params) =>
    axios.get("https://jsonplaceholder.typicode.com/posts", { params })
);
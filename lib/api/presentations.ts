import apiClient from "@/lib/api-client";

export async function getPresentations() {
    const { data } = await apiClient.get("/presentations");
    return data;
}

export async function getPresentationDetail(id: string) {
    const { data } = await apiClient.get(`/presentations/${id}`);
    return data;
}

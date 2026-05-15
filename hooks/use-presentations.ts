import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPresentations, getPresentationDetail } from "@/lib/api/presentations";
import { 
    createPresentationAction, 
    updatePresentationAction, 
    deletePresentationAction, 
    regeneratePresentationAction 
} from "@/lib/actions/presentations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SlideStyle, SlideTone, SlideLayout } from "@/lib/constants";

export function usePresentations() {
    return useQuery({
        queryKey: ["presentations"],
        queryFn: getPresentations,
    });
}

type SettingsForm = {
    title: string
    prompt: string
    slideCount: number
    style: SlideStyle
    tone: SlideTone
    layout: SlideLayout
}

export function usePresentationDetail(id: string, opts?: { onDeleted?: () => void }) {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["presentations", id],
        queryFn: () => getPresentationDetail(id),
        refetchInterval: (q) => 
            q.state.data?.status === "GENERATING" ? 3000 : false,
    });

    const [form, setForm] = useState<SettingsForm>({
        title: '',
        prompt: '',
        slideCount: 8,
        style: 'minimal',
        tone: 'formal',
        layout: 'balanced',
    });

    useEffect(() => {
        if (!query.data) return;
        setForm({
            title: query.data.title,
            prompt: query.data.prompt,
            slideCount: query.data.slideCount,
            style: query.data.style,
            tone: query.data.tone,
            layout: query.data.layout,
        });
    }, [query.data]);

    const updateMut = useMutation({
        mutationFn: () => updatePresentationAction({
            id,
            ...form
        }),
        onSuccess: () => {
            toast.success("Presentation updated!");
            queryClient.invalidateQueries({ queryKey: ["presentations", id] });
            queryClient.invalidateQueries({ queryKey: ["presentations"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update presentation");
        },
    });

    const regenerateMut = useMutation({
        mutationFn: () => regeneratePresentationAction(id),
        onSuccess: () => {
            toast.success("Regeneration started!");
            queryClient.invalidateQueries({ queryKey: ["presentations", id] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to regenerate presentation");
        },
    });

    const deleteMut = useMutation({
        mutationFn: () => deletePresentationAction(id),
        onSuccess: () => {
            toast.success("Presentation deleted!");
            queryClient.invalidateQueries({ queryKey: ["presentations"] });
            opts?.onDeleted?.();
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete presentation");
        },
    });

    const slides = query.data?.slides ?? [];
    const isGenerating = query.data?.status === "GENERATING";

    const updatedLabel = useMemo(() => {
        if (!query.data?.updatedAt) return "";
        return new Date(query.data.updatedAt).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
        });
    }, [query.data?.updatedAt]);

    return {
        query,
        slides,
        isGenerating,
        updatedLabel,
        form,
        setForm,
        updateMut,
        regenerateMut,
        deleteMut,
    };
}

// Removed redundant hooks here since they are now integrated into usePresentationDetail or kept separate as needed

export function useCreatePresentation() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: createPresentationAction,
        onSuccess: (data) => {
            toast.success("Presentation created!");
            queryClient.invalidateQueries({ queryKey: ["presentations"] });
            router.push(`/presentations/${data._id}`);
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create presentation");
        },
    });
}

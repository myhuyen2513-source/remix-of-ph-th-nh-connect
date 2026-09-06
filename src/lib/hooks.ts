import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "./api";
import type {
  Category,
  Contact,
  EventItem,
  HonorSlide,
  MediaDocument,
  MediaImage,
  MediaVideo,
  PollOption,
  Post,
  PublicService,
  SystemSettings,
  Thematic,
} from "./types";

// ── Settings ──────────────────────────────────────────────────
export function useSettings() {
  return useQuery({ queryKey: ["settings"], queryFn: api.getSettings });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<Omit<SystemSettings, "id">>) => api.updateSettings(patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
}

// ── Categories ────────────────────────────────────────────────
export function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: api.getCategories });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Category, "id">) => api.createCategory(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Omit<Category, "id">> }) =>
      api.updateCategory(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

// ── Posts ─────────────────────────────────────────────────────
export function usePosts() {
  return useQuery({ queryKey: ["posts"], queryFn: api.getPosts });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["posts", slug],
    queryFn: () => api.getPost(slug),
    enabled: !!slug,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Post, "id" | "created_at">) => api.createPost(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Omit<Post, "id" | "created_at">> }) =>
      api.updatePost(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deletePost(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

// ── Events ────────────────────────────────────────────────────
export function useEvents() {
  return useQuery({ queryKey: ["events"], queryFn: api.getEvents });
}

export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<EventItem, "id">) => api.createEvent(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useUpdateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Omit<EventItem, "id">> }) =>
      api.updateEvent(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteEvent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

// ── Honor Slides ──────────────────────────────────────────────
export function useHonorSlides() {
  return useQuery({ queryKey: ["honorSlides"], queryFn: api.getHonorSlides });
}

export function useCreateHonorSlide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<HonorSlide, "id">) => api.createHonorSlide(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["honorSlides"] }),
  });
}

export function useUpdateHonorSlide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Omit<HonorSlide, "id">> }) =>
      api.updateHonorSlide(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["honorSlides"] }),
  });
}

export function useDeleteHonorSlide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteHonorSlide(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["honorSlides"] }),
  });
}

// ── Public Services ──────────────────────────────────────────
export function usePublicServices() {
  return useQuery({ queryKey: ["publicServices"], queryFn: api.getPublicServices });
}

export function useCreatePublicService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<PublicService, "id">) => api.createPublicService(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["publicServices"] }),
  });
}

export function useUpdatePublicService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Omit<PublicService, "id">> }) =>
      api.updatePublicService(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["publicServices"] }),
  });
}

export function useDeletePublicService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deletePublicService(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["publicServices"] }),
  });
}

// ── Thematics ─────────────────────────────────────────────────
export function useThematics() {
  return useQuery({ queryKey: ["thematics"], queryFn: api.getThematics });
}

export function useCreateThematic() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Thematic, "id">) => api.createThematic(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["thematics"] }),
  });
}

export function useUpdateThematic() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Omit<Thematic, "id">> }) =>
      api.updateThematic(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["thematics"] }),
  });
}

export function useDeleteThematic() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteThematic(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["thematics"] }),
  });
}

// ── Media Images ──────────────────────────────────────────────
export function useMediaImages() {
  return useQuery({ queryKey: ["mediaImages"], queryFn: api.getMediaImages });
}

export function useCreateMediaImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<MediaImage, "id">) => api.createMediaImage(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mediaImages"] }),
  });
}

export function useUpdateMediaImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Omit<MediaImage, "id">> }) =>
      api.updateMediaImage(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mediaImages"] }),
  });
}

export function useDeleteMediaImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteMediaImage(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mediaImages"] }),
  });
}

// ── Media Videos ──────────────────────────────────────────────
export function useMediaVideos() {
  return useQuery({ queryKey: ["mediaVideos"], queryFn: api.getMediaVideos });
}

export function useCreateMediaVideo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<MediaVideo, "id">) => api.createMediaVideo(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mediaVideos"] }),
  });
}

export function useUpdateMediaVideo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Omit<MediaVideo, "id">> }) =>
      api.updateMediaVideo(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mediaVideos"] }),
  });
}

export function useDeleteMediaVideo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteMediaVideo(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mediaVideos"] }),
  });
}

// ── Media Documents ──────────────────────────────────────────
export function useMediaDocuments() {
  return useQuery({ queryKey: ["mediaDocuments"], queryFn: api.getMediaDocuments });
}

export function useCreateMediaDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<MediaDocument, "id">) => api.createMediaDocument(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mediaDocuments"] }),
  });
}

export function useUpdateMediaDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Omit<MediaDocument, "id">> }) =>
      api.updateMediaDocument(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mediaDocuments"] }),
  });
}

export function useDeleteMediaDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteMediaDocument(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mediaDocuments"] }),
  });
}

// ── Poll Options ──────────────────────────────────────────────
export function usePollOptions() {
  return useQuery({ queryKey: ["pollOptions"], queryFn: api.getPollOptions });
}

export function useVotePoll() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.votePoll(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pollOptions"] }),
  });
}

export function useCreatePollOption() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<PollOption, "id">) => api.createPollOption(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pollOptions"] }),
  });
}

export function useUpdatePollOption() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Omit<PollOption, "id">> }) =>
      api.updatePollOption(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pollOptions"] }),
  });
}

export function useDeletePollOption() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deletePollOption(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pollOptions"] }),
  });
}

// ── Contacts ──────────────────────────────────────────────────
export function useContacts() {
  return useQuery({ queryKey: ["contacts"], queryFn: api.getContacts });
}

export function useCreateContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Contact, "id" | "created_at">) => api.createContact(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

export function useDeleteContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteContact(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

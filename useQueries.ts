import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Review } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      reviewer: string;
      rating: bigint;
      reviewText: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.submitReview(
        params.reviewer,
        params.rating,
        params.reviewText,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      phone: string;
      date: string;
      time: string;
      guests: bigint;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.submitBooking(
        params.name,
        params.phone,
        params.date,
        params.time,
        params.guests,
      );
    },
  });
}

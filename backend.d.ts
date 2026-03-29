import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    status: BookingStatus;
    date: string;
    name: string;
    time: string;
    timestamp: Time;
    phone: string;
    guests: bigint;
}
export type Time = bigint;
export interface Review {
    reviewText: string;
    timestamp: Time;
    rating: bigint;
    reviewer: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export interface backendInterface {
    getAllBookings(): Promise<Array<Booking>>;
    getAllReviews(): Promise<Array<Review>>;
    getBooking(id: bigint): Promise<Booking>;
    submitBooking(name: string, phone: string, date: string, time: string, guests: bigint): Promise<bigint>;
    submitReview(reviewer: string, rating: bigint, reviewText: string): Promise<void>;
}

import { EventType } from "@/shared/types";
import { createEvent, createStore } from "effector";

export const setClusters = createEvent<EventType[][]>()

export const $clusters = createStore<EventType[][]>([])
    .on(setClusters, (_, clusters) => clusters)

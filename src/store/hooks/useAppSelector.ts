import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../typings/types";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
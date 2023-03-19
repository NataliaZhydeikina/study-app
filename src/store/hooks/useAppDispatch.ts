import { useDispatch } from "react-redux";
import type { AppDispatch } from "../typings/types";

export const useAppDispatch: () => AppDispatch = useDispatch;

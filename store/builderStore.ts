import { create } from "zustand"
import { AppRecord, RuntimeSchema } from "@/types/app"

type BuilderState = {
  app: AppRecord | null
  loading: boolean
  setApp: (app: AppRecord | null) => void
  setLoading: (loading: boolean) => void
  updateFromSchema: (schema: RuntimeSchema, version: number) => void
}

export const useBuilderStore = create<BuilderState>((set) => ({
  app: null,
  loading: false,
  setApp: (app) => set({ app }),
  setLoading: (loading) => set({ loading }),
  updateFromSchema: (schema, version) =>
    set((state) =>
      state.app
        ? {
            app: {
              ...state.app,
              schema,
              version
            }
          }
        : state
    )
}))

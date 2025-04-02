import { ReactNode } from "react";

export interface LayoutProps {
    children: ReactNode;
    isLoading?: boolean;
    showFooter?: boolean;
    title?: string;
}

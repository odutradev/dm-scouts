import { ReactNode } from "react";

export interface LayoutProps {
    showSimpleMenu?: boolean;
    showFooter?: boolean;
    children: ReactNode;
    isLoading?: boolean;
    title?: string;
}

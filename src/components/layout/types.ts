import { ReactNode } from "react";

export interface LayoutProps {
    disableGetUser?: boolean;
    showSimpleMenu?: boolean;
    showFooter?: boolean;
    children: ReactNode;
    isLoading?: boolean;
    title?: string;
}

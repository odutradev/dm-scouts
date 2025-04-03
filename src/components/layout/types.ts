import { ReactNode } from "react";

export interface LayoutProps {
    disableGetConfig?: boolean;
    disableGetUser?: boolean;
    showSimpleMenu?: boolean;
    showFooter?: boolean;
    children: ReactNode;
    isLoading?: boolean;
    title?: string;
}

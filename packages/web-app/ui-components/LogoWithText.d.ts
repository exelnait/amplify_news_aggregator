/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { IconProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LogoWithTextOverridesProps = {
    LogoWithText?: PrimitiveOverrideProps<ViewProps>;
    logo?: PrimitiveOverrideProps<ViewProps>;
    Union?: PrimitiveOverrideProps<IconProps>;
    Vector39193044?: PrimitiveOverrideProps<IconProps>;
    Vector39193045?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type LogoWithTextProps = React.PropsWithChildren<Partial<ViewProps> & {
    color?: "brand" | "neutral";
} & {
    overrides?: LogoWithTextOverridesProps | undefined | null;
}>;
export default function LogoWithText(props: LogoWithTextProps): React.ReactElement;

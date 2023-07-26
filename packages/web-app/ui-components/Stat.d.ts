/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { BadgeProps, FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StatOverridesProps = {
    Stat?: PrimitiveOverrideProps<FlexProps>;
    Sales?: PrimitiveOverrideProps<TextProps>;
    "Frame 424"?: PrimitiveOverrideProps<FlexProps>;
    "8,260"?: PrimitiveOverrideProps<TextProps>;
    Badge?: PrimitiveOverrideProps<BadgeProps>;
} & EscapeHatchProps;
export declare type StatProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: StatOverridesProps | undefined | null;
}>;
export default function Stat(props: StatProps): React.ReactElement;

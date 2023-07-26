/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, TextFieldProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CTASectionOverridesProps = {
    CTASection?: PrimitiveOverrideProps<FlexProps>;
    "Type Lock Up"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 436"?: PrimitiveOverrideProps<FlexProps>;
    Newsletter?: PrimitiveOverrideProps<TextProps>;
    "Stay in touch and never miss an update"?: PrimitiveOverrideProps<TextProps>;
    "Keep up to date on the latest and greatest in the frontend and fullstack community"?: PrimitiveOverrideProps<TextProps>;
    Form?: PrimitiveOverrideProps<FlexProps>;
    TextField?: PrimitiveOverrideProps<TextFieldProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type CTASectionProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: CTASectionOverridesProps | undefined | null;
}>;
export default function CTASection(props: CTASectionProps): React.ReactElement;

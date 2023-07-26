/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, CheckboxFieldProps, FlexProps, TextAreaFieldProps, TextFieldProps, TextProps } from "@aws-amplify/ui-react";
import { MyIconProps } from "./MyIcon";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ContactUsOverridesProps = {
    ContactUs?: PrimitiveOverrideProps<FlexProps>;
    "Frame 428"?: PrimitiveOverrideProps<FlexProps>;
    TextField29766936?: PrimitiveOverrideProps<TextFieldProps>;
    TextField29766938?: PrimitiveOverrideProps<TextFieldProps>;
    TextField29766939?: PrimitiveOverrideProps<TextFieldProps>;
    TextAreaField?: PrimitiveOverrideProps<TextAreaFieldProps>;
    CheckboxField?: PrimitiveOverrideProps<CheckboxFieldProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
    "Frame 2829766941"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 2829766942"?: PrimitiveOverrideProps<FlexProps>;
    MyIcon39193120?: MyIconProps;
    Instagram?: PrimitiveOverrideProps<TextProps>;
    "Frame 30"?: PrimitiveOverrideProps<FlexProps>;
    MyIcon39193123?: MyIconProps;
    Twitter?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type ContactUsProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: ContactUsOverridesProps | undefined | null;
}>;
export default function ContactUs(props: ContactUsProps): React.ReactElement;

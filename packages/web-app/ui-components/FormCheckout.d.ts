/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, ImageProps, PhoneNumberFieldProps, SelectFieldProps, TextFieldProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FormCheckoutOverridesProps = {
    FormCheckout?: PrimitiveOverrideProps<FlexProps>;
    "Frame 41129767005"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 313"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 406"?: PrimitiveOverrideProps<FlexProps>;
    "Shipping information"?: PrimitiveOverrideProps<TextProps>;
    "Frame 426"?: PrimitiveOverrideProps<FlexProps>;
    TextField29767009?: PrimitiveOverrideProps<TextFieldProps>;
    TextField29767010?: PrimitiveOverrideProps<TextFieldProps>;
    "Frame 409"?: PrimitiveOverrideProps<FlexProps>;
    TextField29767014?: PrimitiveOverrideProps<TextFieldProps>;
    "Frame 425"?: PrimitiveOverrideProps<FlexProps>;
    TextField29767015?: PrimitiveOverrideProps<TextFieldProps>;
    TextField39343126?: PrimitiveOverrideProps<TextFieldProps>;
    SelectField?: PrimitiveOverrideProps<SelectFieldProps>;
    "Frame 410"?: PrimitiveOverrideProps<FlexProps>;
    TextField39343134?: PrimitiveOverrideProps<TextFieldProps>;
    PhoneNumberField?: PrimitiveOverrideProps<PhoneNumberFieldProps>;
    "Frame 41139343187"?: PrimitiveOverrideProps<FlexProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
    image?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type FormCheckoutProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: FormCheckoutOverridesProps | undefined | null;
}>;
export default function FormCheckout(props: FormCheckoutProps): React.ReactElement;

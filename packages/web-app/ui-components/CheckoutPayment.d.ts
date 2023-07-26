/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, DividerProps, FlexProps, ImageProps, TextFieldProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CheckoutPaymentOverridesProps = {
    CheckoutPayment?: PrimitiveOverrideProps<FlexProps>;
    "Frame 41139343305"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 313"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 406"?: PrimitiveOverrideProps<FlexProps>;
    "Payment information"?: PrimitiveOverrideProps<TextProps>;
    "Frame 409"?: PrimitiveOverrideProps<FlexProps>;
    TextField39343313?: PrimitiveOverrideProps<TextFieldProps>;
    "Frame 425"?: PrimitiveOverrideProps<FlexProps>;
    TextField39343315?: PrimitiveOverrideProps<TextFieldProps>;
    TextField39343316?: PrimitiveOverrideProps<TextFieldProps>;
    "Frame 410"?: PrimitiveOverrideProps<FlexProps>;
    TextField39343319?: PrimitiveOverrideProps<TextFieldProps>;
    "Frame 41139343321"?: PrimitiveOverrideProps<FlexProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
    "Frame 427"?: PrimitiveOverrideProps<FlexProps>;
    "Your order"?: PrimitiveOverrideProps<TextProps>;
    image?: PrimitiveOverrideProps<ImageProps>;
    "Frame 316"?: PrimitiveOverrideProps<FlexProps>;
    Subtotal?: PrimitiveOverrideProps<TextProps>;
    "$320.00"?: PrimitiveOverrideProps<TextProps>;
    "Frame 317"?: PrimitiveOverrideProps<FlexProps>;
    Shipping?: PrimitiveOverrideProps<TextProps>;
    "$15.00"?: PrimitiveOverrideProps<TextProps>;
    "Frame 318"?: PrimitiveOverrideProps<FlexProps>;
    Taxes?: PrimitiveOverrideProps<TextProps>;
    "$26.80"?: PrimitiveOverrideProps<TextProps>;
    Divider?: PrimitiveOverrideProps<DividerProps>;
    "Frame 319"?: PrimitiveOverrideProps<FlexProps>;
    Total?: PrimitiveOverrideProps<TextProps>;
    "$361.80"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type CheckoutPaymentProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: CheckoutPaymentOverridesProps | undefined | null;
}>;
export default function CheckoutPayment(props: CheckoutPaymentProps): React.ReactElement;

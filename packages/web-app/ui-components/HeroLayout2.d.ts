/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HeroLayout2OverridesProps = {
    HeroLayout2?: PrimitiveOverrideProps<FlexProps>;
    "Type Lock Up"?: PrimitiveOverrideProps<FlexProps>;
    "Full stack"?: PrimitiveOverrideProps<TextProps>;
    "Main Body"?: PrimitiveOverrideProps<FlexProps>;
    "Build full-stack web and mobile apps in hours. Easy to start, easy to scale"?: PrimitiveOverrideProps<TextProps>;
    "AWS Amplify is a complete solution that lets frontend web and mobile developers easily build, ship, and host full-stack applications on AWS, with the flexibility to leverage the breadth of AWS services as use cases evolve. No cloud expertise needed."?: PrimitiveOverrideProps<TextProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type HeroLayout2Props = React.PropsWithChildren<Partial<FlexProps> & {
    colorMode?: "Default" | "dark";
} & {
    overrides?: HeroLayout2OverridesProps | undefined | null;
}>;
export default function HeroLayout2(props: HeroLayout2Props): React.ReactElement;

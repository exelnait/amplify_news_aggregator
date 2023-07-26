/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CreatePublisherInputValues = {
    Field1?: string;
    Field4?: string;
    Field0?: string[];
};
export declare type CreatePublisherValidationValues = {
    Field1?: ValidationFunction<string>;
    Field4?: ValidationFunction<string>;
    Field0?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CreatePublisherOverridesProps = {
    CreatePublisherGrid?: PrimitiveOverrideProps<GridProps>;
    Field1?: PrimitiveOverrideProps<TextFieldProps>;
    Field4?: PrimitiveOverrideProps<TextFieldProps>;
    Field0?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CreatePublisherProps = React.PropsWithChildren<{
    overrides?: CreatePublisherOverridesProps | undefined | null;
} & {
    onSubmit: (fields: CreatePublisherInputValues) => void;
    onCancel?: () => void;
    onChange?: (fields: CreatePublisherInputValues) => CreatePublisherInputValues;
    onValidate?: CreatePublisherValidationValues;
} & React.CSSProperties>;
export default function CreatePublisher(props: CreatePublisherProps): React.ReactElement;

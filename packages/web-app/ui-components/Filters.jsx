/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, SelectField } from "@aws-amplify/ui-react";
export default function Filters(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="16px"
      direction="row"
      width="unset"
      height="unset"
      justifyContent="center"
      alignItems="flex-end"
      overflow="hidden"
      position="relative"
      padding="16px 16px 16px 16px"
      {...getOverrideProps(overrides, "Filters")}
      {...rest}
    >
      <SelectField
        width="240px"
        height="unset"
        label="Status"
        placeholder="All"
        shrink="0"
        size="small"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "SelectField38963527")}
      ></SelectField>
      <SelectField
        width="240px"
        height="unset"
        label="Channel"
        placeholder="All"
        shrink="0"
        size="small"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "SelectField38963544")}
      ></SelectField>
      <Button
        width="unset"
        height="unset"
        shrink="0"
        size="small"
        isDisabled={false}
        variation="default"
        children="Clear"
        {...getOverrideProps(overrides, "Button")}
      ></Button>
    </Flex>
  );
}

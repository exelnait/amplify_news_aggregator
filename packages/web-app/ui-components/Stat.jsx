/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Badge, Flex, Text } from "@aws-amplify/ui-react";
export default function Stat(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="16px"
      direction="column"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflow="hidden"
      position="relative"
      padding="32px 32px 32px 32px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "Stat")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="400"
        color="rgba(92,102,112,1)"
        lineHeight="19.363636016845703px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Sales"
        {...getOverrideProps(overrides, "Sales")}
      ></Text>
      <Flex
        gap="10px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 424")}
      >
        <Text
          fontFamily="Inter"
          fontSize="24px"
          fontWeight="400"
          color="rgba(13,26,38,1)"
          lineHeight="29.045454025268555px"
          textAlign="center"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="8,260"
          {...getOverrideProps(overrides, "8,260")}
        ></Text>
        <Badge
          width="unset"
          height="unset"
          shrink="0"
          size="default"
          variation="success"
          children="+17%"
          {...getOverrideProps(overrides, "Badge")}
        ></Badge>
      </Flex>
    </Flex>
  );
}

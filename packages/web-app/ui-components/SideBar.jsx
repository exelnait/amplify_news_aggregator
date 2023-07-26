/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import MyIcon from "./MyIcon";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function SideBar(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="row"
      width="385px"
      height="762px"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="32px 0px 32px 0px"
      {...getOverrideProps(overrides, "SideBar")}
      {...rest}
    >
      <Flex
        gap="32px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        grow="1"
        shrink="1"
        basis="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 32139493355")}
      >
        <Flex
          gap="32px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          grow="1"
          shrink="1"
          basis="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 32px 0px 32px"
          {...getOverrideProps(overrides, "Frame 32139493356")}
        >
          <Flex
            gap="16px"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Frame 414")}
          >
            <Flex
              gap="8px"
              direction="row"
              width="unset"
              height="unset"
              justifyContent="flex-start"
              alignItems="center"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "Frame 322")}
            >
              <Flex
                gap="0"
                direction="row"
                width="unset"
                height="unset"
                justifyContent="flex-start"
                alignItems="flex-start"
                shrink="0"
                position="relative"
                borderRadius="4px"
                padding="6px 6px 6px 6px"
                backgroundColor="rgba(233,249,252,1)"
                {...getOverrideProps(overrides, "icon39493360")}
              >
                <MyIcon
                  width="18px"
                  height="18px"
                  display="block"
                  gap="unset"
                  alignItems="unset"
                  justifyContent="unset"
                  overflow="hidden"
                  shrink="0"
                  position="relative"
                  padding="0px 0px 0px 0px"
                  type="home"
                  {...getOverrideProps(overrides, "MyIcon39493361")}
                ></MyIcon>
              </Flex>
              <Text
                fontFamily="Inter"
                fontSize="16px"
                fontWeight="400"
                color="rgba(4,125,149,1)"
                lineHeight="24px"
                textAlign="left"
                display="block"
                direction="column"
                justifyContent="unset"
                letterSpacing="0.01px"
                width="unset"
                height="unset"
                gap="unset"
                alignItems="unset"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                whiteSpace="pre-wrap"
                children="Home"
                {...getOverrideProps(overrides, "label39493362")}
              ></Text>
            </Flex>
          </Flex>
          <Flex
            gap="16px"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Section39493363")}
          >
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="600"
              color="rgba(92,102,112,1)"
              lineHeight="24px"
              textAlign="left"
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
              children="Manage"
              {...getOverrideProps(overrides, "label39493364")}
            ></Text>
            <Flex
              gap="8px"
              direction="row"
              width="unset"
              height="unset"
              justifyContent="flex-start"
              alignItems="center"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "link39493365")}
            >
              <Flex
                gap="0"
                direction="row"
                width="unset"
                height="unset"
                justifyContent="flex-start"
                alignItems="flex-start"
                shrink="0"
                position="relative"
                borderRadius="4px"
                padding="6px 6px 6px 6px"
                backgroundColor="rgba(233,249,252,1)"
                {...getOverrideProps(overrides, "icon39493366")}
              >
                <MyIcon
                  width="18px"
                  height="18px"
                  display="block"
                  gap="unset"
                  alignItems="unset"
                  justifyContent="unset"
                  overflow="hidden"
                  shrink="0"
                  position="relative"
                  padding="0px 0px 0px 0px"
                  type="content"
                  {...getOverrideProps(overrides, "MyIcon39493367")}
                ></MyIcon>
              </Flex>
              <Text
                fontFamily="Inter"
                fontSize="16px"
                fontWeight="400"
                color="rgba(4,125,149,1)"
                lineHeight="24px"
                textAlign="left"
                display="block"
                direction="column"
                justifyContent="unset"
                letterSpacing="0.01px"
                width="unset"
                height="unset"
                gap="unset"
                alignItems="unset"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                whiteSpace="pre-wrap"
                children="Content"
                {...getOverrideProps(overrides, "label39493368")}
              ></Text>
            </Flex>
            <Flex
              gap="8px"
              direction="row"
              width="unset"
              height="unset"
              justifyContent="flex-start"
              alignItems="center"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "link39493369")}
            >
              <Flex
                gap="0"
                direction="row"
                width="unset"
                height="unset"
                justifyContent="flex-start"
                alignItems="flex-start"
                shrink="0"
                position="relative"
                borderRadius="4px"
                padding="6px 6px 6px 6px"
                backgroundColor="rgba(233,249,252,1)"
                {...getOverrideProps(overrides, "icon39493370")}
              >
                <MyIcon
                  width="18px"
                  height="18px"
                  display="block"
                  gap="unset"
                  alignItems="unset"
                  justifyContent="unset"
                  overflow="hidden"
                  shrink="0"
                  position="relative"
                  padding="0px 0px 0px 0px"
                  type="group"
                  {...getOverrideProps(overrides, "MyIcon39493371")}
                ></MyIcon>
              </Flex>
              <Text
                fontFamily="Inter"
                fontSize="16px"
                fontWeight="400"
                color="rgba(4,125,149,1)"
                lineHeight="24px"
                textAlign="left"
                display="block"
                direction="column"
                justifyContent="unset"
                letterSpacing="0.01px"
                width="100px"
                height="unset"
                gap="unset"
                alignItems="unset"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                whiteSpace="pre-wrap"
                children="Users"
                {...getOverrideProps(overrides, "label39493372")}
              ></Text>
            </Flex>
            <Flex
              gap="8px"
              direction="row"
              width="unset"
              height="unset"
              justifyContent="flex-start"
              alignItems="center"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "link39493373")}
            >
              <Flex
                gap="0"
                direction="row"
                width="unset"
                height="unset"
                justifyContent="flex-start"
                alignItems="flex-start"
                shrink="0"
                position="relative"
                borderRadius="4px"
                padding="6px 6px 6px 6px"
                backgroundColor="rgba(233,249,252,1)"
                {...getOverrideProps(overrides, "icon39493374")}
              >
                <MyIcon
                  width="18px"
                  height="18px"
                  display="block"
                  gap="unset"
                  alignItems="unset"
                  justifyContent="unset"
                  overflow="hidden"
                  shrink="0"
                  position="relative"
                  padding="0px 0px 0px 0px"
                  type="file"
                  {...getOverrideProps(overrides, "MyIcon39493375")}
                ></MyIcon>
              </Flex>
              <Text
                fontFamily="Inter"
                fontSize="16px"
                fontWeight="400"
                color="rgba(4,125,149,1)"
                lineHeight="24px"
                textAlign="left"
                display="block"
                direction="column"
                justifyContent="unset"
                letterSpacing="0.01px"
                width="unset"
                height="unset"
                gap="unset"
                alignItems="unset"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                whiteSpace="pre-wrap"
                children="Files"
                {...getOverrideProps(overrides, "label39493376")}
              ></Text>
            </Flex>
          </Flex>
          <Flex
            gap="16px"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Section39493377")}
          >
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="600"
              color="rgba(92,102,112,1)"
              lineHeight="24px"
              textAlign="left"
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
              children="Set up"
              {...getOverrideProps(overrides, "label39493378")}
            ></Text>
            <Flex
              gap="8px"
              direction="row"
              width="unset"
              height="unset"
              justifyContent="flex-start"
              alignItems="center"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "link39493379")}
            >
              <Flex
                gap="0"
                direction="row"
                width="unset"
                height="unset"
                justifyContent="flex-start"
                alignItems="flex-start"
                shrink="0"
                position="relative"
                borderRadius="4px"
                padding="6px 6px 6px 6px"
                backgroundColor="rgba(233,249,252,1)"
                {...getOverrideProps(overrides, "icon39493380")}
              >
                <MyIcon
                  width="18px"
                  height="18px"
                  display="block"
                  gap="unset"
                  alignItems="unset"
                  justifyContent="unset"
                  overflow="hidden"
                  shrink="0"
                  position="relative"
                  padding="0px 0px 0px 0px"
                  type="data"
                  {...getOverrideProps(overrides, "MyIcon39493381")}
                ></MyIcon>
              </Flex>
              <Text
                fontFamily="Inter"
                fontSize="16px"
                fontWeight="400"
                color="rgba(4,125,149,1)"
                lineHeight="24px"
                textAlign="left"
                display="block"
                direction="column"
                justifyContent="unset"
                letterSpacing="0.01px"
                width="unset"
                height="unset"
                gap="unset"
                alignItems="unset"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                whiteSpace="pre-wrap"
                children="Data"
                {...getOverrideProps(overrides, "label39493382")}
              ></Text>
            </Flex>
            <Flex
              gap="8px"
              direction="row"
              width="unset"
              height="unset"
              justifyContent="flex-start"
              alignItems="center"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "link39493383")}
            >
              <Flex
                gap="0"
                direction="row"
                width="unset"
                height="unset"
                justifyContent="flex-start"
                alignItems="flex-start"
                shrink="0"
                position="relative"
                borderRadius="4px"
                padding="6px 6px 6px 6px"
                backgroundColor="rgba(233,249,252,1)"
                {...getOverrideProps(overrides, "icon39493384")}
              >
                <MyIcon
                  width="18px"
                  height="18px"
                  display="block"
                  gap="unset"
                  alignItems="unset"
                  justifyContent="unset"
                  overflow="hidden"
                  shrink="0"
                  position="relative"
                  padding="0px 0px 0px 0px"
                  type="storage"
                  {...getOverrideProps(overrides, "MyIcon39493385")}
                ></MyIcon>
              </Flex>
              <Text
                fontFamily="Inter"
                fontSize="16px"
                fontWeight="400"
                color="rgba(4,125,149,1)"
                lineHeight="24px"
                textAlign="left"
                display="block"
                direction="column"
                justifyContent="unset"
                letterSpacing="0.01px"
                width="100px"
                height="unset"
                gap="unset"
                alignItems="unset"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                whiteSpace="pre-wrap"
                children="Storage"
                {...getOverrideProps(overrides, "label39493386")}
              ></Text>
            </Flex>
            <Flex
              gap="8px"
              direction="row"
              width="unset"
              height="unset"
              justifyContent="flex-start"
              alignItems="center"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "link39493387")}
            >
              <Flex
                gap="0"
                direction="row"
                width="unset"
                height="unset"
                justifyContent="flex-start"
                alignItems="flex-start"
                shrink="0"
                position="relative"
                borderRadius="4px"
                padding="6px 6px 6px 6px"
                backgroundColor="rgba(233,249,252,1)"
                {...getOverrideProps(overrides, "icon39493388")}
              >
                <MyIcon
                  width="18px"
                  height="18px"
                  display="block"
                  gap="unset"
                  alignItems="unset"
                  justifyContent="unset"
                  overflow="hidden"
                  shrink="0"
                  position="relative"
                  padding="0px 0px 0px 0px"
                  type="authentication"
                  {...getOverrideProps(overrides, "MyIcon39493389")}
                ></MyIcon>
              </Flex>
              <Text
                fontFamily="Inter"
                fontSize="16px"
                fontWeight="400"
                color="rgba(4,125,149,1)"
                lineHeight="24px"
                textAlign="left"
                display="block"
                direction="column"
                justifyContent="unset"
                letterSpacing="0.01px"
                width="unset"
                height="unset"
                gap="unset"
                alignItems="unset"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                whiteSpace="pre-wrap"
                children="Authentication"
                {...getOverrideProps(overrides, "label39493390")}
              ></Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

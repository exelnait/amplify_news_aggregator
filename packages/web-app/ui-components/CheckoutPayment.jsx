/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Divider,
  Flex,
  Image,
  Text,
  TextField,
} from "@aws-amplify/ui-react";
export default function CheckoutPayment(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="48px"
      direction="row"
      width="1160px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "CheckoutPayment")}
      {...rest}
    >
      <Flex
        gap="48px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="32px 0px 32px 0px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Frame 41139343305")}
      >
        <Flex
          gap="32px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="center"
          grow="1"
          shrink="1"
          basis="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 313")}
        >
          <Flex
            gap="24px"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 32px 0px 32px"
            {...getOverrideProps(overrides, "Frame 406")}
          >
            <Text
              fontFamily="Inter"
              fontSize="20px"
              fontWeight="600"
              color="rgba(13,26,38,1)"
              lineHeight="30px"
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
              children="Payment information"
              {...getOverrideProps(overrides, "Payment information")}
            ></Text>
          </Flex>
          <Flex
            gap="24px"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 32px 0px 32px"
            {...getOverrideProps(overrides, "Frame 409")}
          >
            <TextField
              width="unset"
              height="unset"
              label="Credit card number"
              shrink="0"
              alignSelf="stretch"
              placeholder=""
              size="default"
              isDisabled={false}
              labelHidden={false}
              variation="default"
              {...getOverrideProps(overrides, "TextField39343313")}
            ></TextField>
            <Flex
              gap="24px"
              direction="row"
              width="unset"
              height="unset"
              justifyContent="flex-start"
              alignItems="flex-start"
              shrink="0"
              alignSelf="stretch"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "Frame 425")}
            >
              <TextField
                width="unset"
                height="unset"
                label="Expiration"
                grow="1"
                shrink="1"
                basis="0"
                placeholder=""
                size="default"
                isDisabled={false}
                labelHidden={false}
                variation="default"
                {...getOverrideProps(overrides, "TextField39343315")}
              ></TextField>
              <TextField
                width="unset"
                height="unset"
                label="CVC"
                grow="1"
                shrink="1"
                basis="0"
                placeholder=""
                size="default"
                isDisabled={false}
                labelHidden={false}
                variation="default"
                {...getOverrideProps(overrides, "TextField39343316")}
              ></TextField>
            </Flex>
          </Flex>
          <Flex
            gap="24px"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 32px 0px 32px"
            {...getOverrideProps(overrides, "Frame 410")}
          >
            <TextField
              width="unset"
              height="unset"
              label="Discount code"
              shrink="0"
              alignSelf="stretch"
              placeholder=""
              size="default"
              isDisabled={false}
              labelHidden={false}
              variation="default"
              {...getOverrideProps(overrides, "TextField39343319")}
            ></TextField>
          </Flex>
          <Flex
            gap="24px"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 32px 0px 32px"
            {...getOverrideProps(overrides, "Frame 41139343321")}
          >
            <Button
              width="unset"
              height="unset"
              shrink="0"
              alignSelf="stretch"
              size="large"
              isDisabled={false}
              variation="primary"
              children="Purchase"
              {...getOverrideProps(overrides, "Button")}
            ></Button>
          </Flex>
        </Flex>
        <Flex
          gap="24px"
          direction="column"
          width="400px"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 427")}
        >
          <Text
            fontFamily="Inter"
            fontSize="20px"
            fontWeight="700"
            color="rgba(13,26,38,1)"
            lineHeight="30px"
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
            children="Your order"
            {...getOverrideProps(overrides, "Your order")}
          ></Text>
          <Image
            width="unset"
            height="348px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            objectFit="cover"
            {...getOverrideProps(overrides, "image")}
          ></Image>
          <Flex
            gap="262px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="space-between"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Frame 316")}
          >
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="400"
              color="rgba(48,64,80,1)"
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
              children="Subtotal"
              {...getOverrideProps(overrides, "Subtotal")}
            ></Text>
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="400"
              color="rgba(13,26,38,1)"
              lineHeight="24px"
              textAlign="right"
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
              children="$320.00"
              {...getOverrideProps(overrides, "$320.00")}
            ></Text>
          </Flex>
          <Flex
            gap="273px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="space-between"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Frame 317")}
          >
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="400"
              color="rgba(48,64,80,1)"
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
              children="Shipping"
              {...getOverrideProps(overrides, "Shipping")}
            ></Text>
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="400"
              color="rgba(13,26,38,1)"
              lineHeight="24px"
              textAlign="right"
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
              children="$15.00"
              {...getOverrideProps(overrides, "$15.00")}
            ></Text>
          </Flex>
          <Flex
            gap="296px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="space-between"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Frame 318")}
          >
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="400"
              color="rgba(48,64,80,1)"
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
              children="Taxes"
              {...getOverrideProps(overrides, "Taxes")}
            ></Text>
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="400"
              color="rgba(13,26,38,1)"
              lineHeight="24px"
              textAlign="right"
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
              children="$26.80"
              {...getOverrideProps(overrides, "$26.80")}
            ></Text>
          </Flex>
          <Divider
            width="unset"
            height="1px"
            shrink="0"
            alignSelf="stretch"
            size="small"
            orientation="horizontal"
            {...getOverrideProps(overrides, "Divider")}
          ></Divider>
          <Flex
            gap="290px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="space-between"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Frame 319")}
          >
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="700"
              color="rgba(13,26,38,1)"
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
              children="Total"
              {...getOverrideProps(overrides, "Total")}
            ></Text>
            <Text
              fontFamily="Inter"
              fontSize="16px"
              fontWeight="700"
              color="rgba(13,26,38,1)"
              lineHeight="24px"
              textAlign="right"
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
              children="$361.80"
              {...getOverrideProps(overrides, "$361.80")}
            ></Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

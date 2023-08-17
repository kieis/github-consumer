import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

export const variants = {
  init: {
    opacity: "0%",
    translateX: "200%",
  },
  animate: {
    translateX: "0%",
    opacity: "100%",
    transition: {
      duration: 1,
    },
  },
  hover: {
    paddingBlock: "10px",
    marginBlock: "2px",
    translateY: "-2px",
    boxShadow: "3px 2px #48BB78",
  },
};

export const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

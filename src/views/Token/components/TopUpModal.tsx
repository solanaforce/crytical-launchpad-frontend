import { useCallback, useState } from "react";
import _toNumber from "lodash/toNumber";
import { Button } from "components/Button";
import { Box } from "components/Box";
import { Text } from "components/Text";
import { Modal, ModalActions } from "widgets/Modal";
import { useToast } from "contexts";
import { useAppDispatch } from "state";

interface DepositModalProps {
  chainId: number
  pool: `0x${string}`
  onDismiss?: () => void
}

const TopUpModal = ({
  onDismiss,
} : {
  onDismiss?: () => void
}) => { 
  return (
    <Modal title="" onDismiss={onDismiss}>
      asf
    </Modal>
  );
};

export default TopUpModal;
